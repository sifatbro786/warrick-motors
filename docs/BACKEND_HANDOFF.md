# Backend hand-off — MongoDB, Nodemailer, Admin Dashboard

The frontend is finished against mock data. This is the checklist for turning it into a live,
admin-managed site **without touching page or component code**.

---

## 1. Where data enters today (the only files to change)

| Concern                                                                     | Today (mock)          | Swap point                                                    | Cache tag to revalidate  |
| --------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------- | ------------------------ |
| Cars / inventory                                                            | `lib/data/cars.js`    | `lib/services/car.service.js` → `source()` + query helpers    | `cars`, `car:<slug>`     |
| Brands / logos                                                              | `lib/data/brands.js`  | `lib/services/content.service.js` → `getBrands`               | `content`                |
| Home & page content (hero, stats, FAQ, process, services, gallery, founder) | `lib/data/content.js` | `lib/services/content.service.js` → `read(key)`               | `content`                |
| Legal pages                                                                 | `lib/data/legal.js`   | `getLegalPage`                                                | `content`, `legal:<key>` |
| SEO (titles, descriptions, keywords)                                        | `lib/data/seo.js`     | `lib/services/seo.service.js`                                 | `seo`, `seo:<key>`       |
| Site settings (phones, WhatsApp, address, hours)                            | `lib/config/site.js`  | move to `SiteSettings` doc, read via a `settings.service.js`  | `settings`               |
| Leads (visit, pre-order, contact)                                           | `console.info`        | `lib/actions/visit.actions.js`, `lib/actions/lead.actions.js` | —                        |

Rule: components never import `lib/data/*`. Keep it that way and the swap stays invisible to the UI.

---

## 2. Suggested Mongoose models

Enums come from `lib/constants/inventory.js` and `lib/validation/lead.js` — import them, don't copy.

```js
// models/Car.js
{
  slug: { type: String, unique: true, index: true },
  stockNo: { type: String, unique: true },
  title, brand, model, grade, year, registration, condition, auctionGrade,
  price: Number, negotiable: Boolean, mileage: Number, engineCc: Number,
  fuelType: { enum: FUEL_TYPES }, transmission, bodyType: { enum: BODY_TYPES }, color,
  stockStatus: { enum: Object.values(STOCK_STATUS), index: true },
  location: { enum: LOCATIONS }, eta: String, isFeatured: Boolean, isPublished: { type: Boolean, default: true },
  images: [{ src: String, alt: String }],          // src = "/uploads/cars/<file>" or CDN URL
  specs: { engine, power, torque, drivetrain, fuelEconomy, battery, range, seats, length, groundClearance, wheels },
  features: [String], description: String,
  seo: { title: String, description: String, keywords: [String] },   // optional overrides (buildCarMetadata)
  timestamps: true,
}
// indexes: { stockStatus: 1, createdAt: -1 }, { brand: 1, model: 1 }, { price: 1 }

// models/Lead.js
{
  type: { enum: ["visit", "pre-order", "contact"], index: true },
  reference: { type: String, unique: true },
  status: { enum: ["new", "contacted", "won", "lost"], default: "new" },
  name, phone, email, carId: ObjectId|null, payload: Object,   // the validated `data` object from the action
  timestamps: true,
}

// models/Brand.js       { name, monogram, origin, logo, sort }
// models/SeoSettings.js { siteName, titleTemplate, defaultTitle, description, keywords, twitterHandle, locale }
// models/PageSeo.js     { key: { unique: true }, title, description, keywords, image, noindex }
// models/Content.js     { key: { unique: true }, value: Mixed }   // heroSlides, faqs, services, …
// models/SiteSettings.js — contents of lib/config/site.js
```

`car.service.js` filtering maps 1:1 to a Mongo query: `brands → { brand: { $in } }`, `bodyTypes`, `fuelTypes`,
`yearMin/yearMax → year range`, `priceMin/priceMax → price range`, `status → stockStatus`, `q → $text` (add a text index on title/brand/model/grade/stockNo).
Always `.lean()` and map `_id → id` so components receive plain objects.

---

## 3. Server Actions → real persistence + email

Every action already returns the UI contract `{ ok, message, fieldErrors?, reference? }`. Replace the `TODO(backend)` lines:

```js
await connectDB();
const lead = await Lead.create({ type: "pre-order", reference, ...pick(data), payload: data });
await sendMail({
    to: process.env.SALES_INBOX,
    subject: `[Pre-order] ${data.brand} ${data.model} — ${reference}`,
    html: preorderTemplate(lead),
});
```

- Keep validation server-side (`lib/validation/lead.js`) — it already sanitises, caps lengths and checks the honeypot.
- Add rate limiting per IP/phone (e.g. 5 submissions / 10 min) before `Lead.create`.
- Optional: WhatsApp Business API notification to the sales desk.

---

## 4. Admin dashboard

- Routes under `app/(admin)/admin/*` with their own layout; protect with `proxy.js` (Next 16's middleware) + session auth.
- After any admin mutation call `revalidateTag(<tag>)` (or `updateTag` inside a Server Action) from the table in §1 —
  the public pages refresh automatically; no redeploy.
- Image uploads: save to `/public/uploads/...` or S3/R2; store the path in `images[].src`. Local paths use Next's optimizer,
  Unsplash/Pexels/CDN URLs use `lib/utils/image-loader.js`. Add any new CDN host to `next.config.mjs` → `images.remotePatterns`
  (and a loader if it resizes via URL params).
- SEO screen edits `SeoSettings` + `PageSeo` (keys: `home, cars, preOrder, showroom, about, contact, terms, privacy`) and per-car `seo`.

---

## 5. Environment variables

```
NEXT_PUBLIC_SITE_URL=https://warrickmotors.com.bd
MONGODB_URI=
SMTP_HOST= SMTP_PORT= SMTP_USER= SMTP_PASS=
SALES_INBOX=sales@warrickmotors.com.bd
AUTH_SECRET=
```

---

## 6. Before launch

- [ ] Real phone/WhatsApp/address/hours in `lib/config/site.js`
- [ ] Real car photos (replace Unsplash) and official brand logos in `public/brands/`
- [ ] Replace placeholder testimonials, delivery photos, stats, founder name/quote
- [ ] Lawyer review of `/terms` and `/privacy`
- [ ] Set `NEXT_PUBLIC_SITE_URL`, submit `/sitemap.xml` in Google Search Console, test JSON-LD in Rich Results Test
- [ ] Lighthouse on the production host
