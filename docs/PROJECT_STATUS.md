# Warrick Motors — Project Status & Handoff

> **New chat / new PC?** Read this file first, then `docs/ARCHITECTURE.md`.
> Update the "Phase log" section at the end of every phase.

## Stack (locked)
- Next.js **16.4** (App Router, Turbopack, `cacheComponents: true`, `partialPrefetching: true`, React Compiler)
- React **19.3**, Tailwind CSS **v4** (CSS-first `@theme` in `app/globals.css`, loaded via `@tailwindcss/turbopack`)
- **Pure JavaScript** — no TypeScript. Components `.jsx`, app route files `.js`.
- Zero UI dependencies: icons are inline SVG (`components/ui/Icon.jsx`), fonts self-hosted (`app/fonts/`).
- ⚠️ Next 16.4 differs from older docs — check `node_modules/next/dist/docs/` before using an API (see `AGENTS.md`).

## Design direction
- References: Kraftwerk Elite (editorial type, dark spec band, underline-input inquiry form),
  rRw (hero with overlapping search bar, tall brand tiles), Marlin Motors (search filter card, loan calculator).
- Palette: matte navy `ink-900 #0A111E` / slate `ink-800 #0F172A`, paper `#F8FAFC`, warm band `#F3F1EC`,
  crimson CTA `crimson-600 #E11D48`, logo gold `gold-500 #C39A3D`.
  Rule: **crimson = action, gold = premium detail** — never both on one element.
- Type: Plus Jakarta Sans (display) · Geist (body) · Instrument Serif *italic* (one accent word per heading via `<Accent>`).
- Human touches: numbered eyebrows (`01 —— INVENTORY`), stock numbers (`WM-2417`), auction grade, BDT lakh formatting,
  dashed price divider, paper grain on light bands. **No** glow, purple gradients, glass stat bars, count-up numbers.

## 5-Phase plan
| # | Phase | Scope | Status |
|---|-------|-------|--------|
| 1 | Foundation | Tokens, fonts, layout shell (header/footer/floating WhatsApp), mock data, service layer, filter contract, core car components | ✅ Done |
| 2 | Home page | Hero slider + quick search, featured cars, status tabs, Why Warrick, showroom CTA, deliveries & testimonials, brand rail | ⏳ Next |
| 3 | Inventory | `/cars` with URL-driven sidebar filters + sort + pagination, `/cars/[id]` gallery/specs/price/CTAs, `ShowroomVisitModal` | ⬜ |
| 4 | Forms & pages | `/pre-order`, `/contact`, `/showroom`, `/about`; form state via Server Actions stubs (`lib/actions/*`) + validation | ⬜ |
| 5 | Polish & SEO | metadata per route, sitemap/robots, JSON-LD (AutoDealer + Car), loading/error/not-found, a11y + perf pass, final docs | ⬜ |

## Phase log

### Phase 1 — Foundation (2026-10-08) ✅
Files created:
- `next.config.mjs` — image `qualities`, AVIF/WebP, `remotePatterns` (Unsplash/Pexels)
- `app/globals.css` — full token system + utilities (`container-page`, `eyebrow`, `nums`, `text-display`, `paper-grain`, `no-scrollbar`)
- `app/fonts.js` + `app/fonts/*.woff2` — self-hosted fonts via `next/font/local`
- `app/layout.js` — metadata template, skip link, header/footer/WhatsApp
- `app/page.js` — **temporary** featured grid (replaced in Phase 2)
- `lib/config/site.js` — brand, phones, WhatsApp, showrooms, hours, nav (**edit real numbers here**)
- `lib/constants/inventory.js` — stock status enum + meta, fuel/body/budget/sort options, spec labels
- `lib/data/cars.js` — 16 mock cars (Mongo-shaped)
- `lib/services/car.service.js` — `getCars`, `getCarById`, `getFeaturedCars`, `getCarsByStatus`, `getRelatedCars`, `getFilterOptions`, `getAllCarSlugs` (all `"use cache"` + `cacheTag("cars")`)
- `lib/filters/car-filters.js` — `parseCarFilters` / `serializeCarFilters` (URL ↔ filters)
- `lib/utils/format.js` (BDT lakh format, `cn`), `lib/utils/contact.js` (WhatsApp deep link)
- `components/ui/` — `Icon`, `Button`, `SectionHeading` + `Accent`, `Logo`
- `components/layout/` — `SiteHeader` (sticky, utility strip, mobile sheet), `SiteFooter`, `FloatingWhatsApp`
- `components/cars/` — `CarCard`, `CarImage` (fallback on broken photo), `StockBadge`, `SpecChips`, `PriceTag`

Notes for next phase:
- Header supports a transparent "overlay" mode — add `"/"` to `OVERLAY_ROUTES` in `SiteHeader.jsx` when the dark hero lands,
  and pull the hero under the header (`-mt-[72px]`).
- Car photos are Unsplash shots of the same body style; real stock photos come from the admin later.
