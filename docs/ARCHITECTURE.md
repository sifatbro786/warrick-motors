# Architecture — built for the Admin Dashboard + MongoDB phase

```
app/                    routes only (thin): read data via services, compose components
components/
  ui/                   primitives (Button, Icon, SectionHeading, Logo) — no data knowledge
  layout/               header, footer, floating WhatsApp
  cars/                 inventory components — accept plain car objects as props
  home/  forms/  …      (Phase 2+)
lib/
  config/site.js        brand/contact settings      → later: SiteSettings collection
  constants/            enums shared by UI + future Mongoose schemas
  data/                 MOCK data only — imported by services, never by components
  services/             data access layer (the swap point)
  filters/              URL ↔ filter parsing (reusable in API routes / Server Actions)
  utils/                pure helpers
  actions/              (Phase 4) Server Actions for forms
docs/                   status + architecture
```

## Rules that keep the backend migration cheap
1. **Components never import `lib/data/*`.** Only `lib/services/*` does.
2. Service functions are `async` and return **plain serialisable objects** (Mongo: use `.lean()` and map `_id → id`).
3. Every cached read uses `cacheTag("cars")`. Admin create/update/delete → `revalidateTag("cars")`
   (or `updateTag` inside a Server Action) and the whole site refreshes.
4. Car URLs use `slug`; `getCarById()` also resolves `id` and `stockNo`, so admin links keep working.
5. Filters live in the URL (`?brand=Toyota&budget=30-60`) and are parsed by `parseCarFilters` —
   the same function validates a future `GET /api/cars` request.
6. Forms (Phase 4) post to Server Actions in `lib/actions/` that return `{ ok, message, fieldErrors }`.
   Today they validate + log; later they call Nodemailer / insert a `Lead` document — the UI doesn't change.
7. Images: `car.images[] = { src, alt }`. `src` can be remote or a local `/uploads/...` path from the admin uploader;
   `CarImage` shows a branded fallback if a file is missing.

## Mongo switch checklist (future)
- [ ] `lib/db/mongoose.js` (cached connection) + `models/Car.js` using enums from `lib/constants/inventory.js`
- [ ] Replace `source()` and filtering in `car.service.js` with `Car.find(query).sort(sort).skip().limit().lean()`
- [ ] Add `MONGODB_URI`, `SMTP_*` to `.env.local`
- [ ] Admin routes under `app/(admin)/admin/*` with auth (proxy.js) — public components untouched
