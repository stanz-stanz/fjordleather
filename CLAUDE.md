
## Build Progress & Handoff Notes

> **Last updated:** 2026-03-15 — Session 10 complete.
> Repository: `https://github.com/stanz-stanz/fjordleather`
> Git remote name: `fjordleather`
> Resume: clone the repo, `npm install && npm run dev`.

---

### Completed

**Design system** (`docs/design/`)
- `design-system.md` — Brand principles, color, typography, spacing, motion, grid. Accent is Cognac `#8B5A2B`. Display font: EB Garamond. No white/chalk backgrounds ever.
- `tokens.css` — Full Tailwind v4 `@theme inline` token system, aligned with globals.css
- `components.md` — Component specs: SiteHeader + Navigation (56px obsidian, chalk links), focus trap implemented, hero background buckskin `#DED0B6`

**Foundation**
- `next.config.ts` — `trailingSlash: true` only. `output: 'export'` removed to enable serverless API routes on Vercel.
- `app/globals.css` — Complete design token system. Accent: Cognac `#8B5A2B`. `--color-linen: #FEEBCF` (sampled from logo). `.cta-primary` class. `[data-animate="fade-up"]` + `.is-visible` CSS for AnimateOnScroll. `.site-header-logo` responsive class (90% / max 560px mobile, 65% / max 680px desktop) — logo centered via flexbox on the Link wrapper. No Google Fonts `@import`.
- `app/layout.tsx` — EB Garamond (`--font-display`) + Cormorant Garamond (`--font-display-fallback`) + Jost. Renders `SiteHeader` then `Navigation` then `{children}` then `Footer`. No `<main>` wrapper.

**Data layer**
- `data/types.ts` — `Product`, `ProductImage`, `ProductDimensions`, `ProductCategory`, `Tannery`. Fields: `id`, `slug`, `name`, `category`, `price`, `currency`, `description`, `material`, `construction`, `dimensions`, `images`, `tannery?`, `sold?`. No `featured`, `isNew`, `patina`, or `shortDescription`.
- `data/products.ts` — 11 products (2 bags, 2 duffles, 2 wallets, 2 coin pouches, 2 accessories, 1 real wallet). EUR pricing for originals, DKK for Vaskebjornen-1. SVG placeholders for original 10; real PNGs for Vaskebjornen-1. All 10 products with identifiable tanneries have `tannery` field set.
- `data/tanneries.ts` — `TANNERY_REGISTRY`: map of all 17 Genuine Italian Vegetable-Tanned Leather consortium tanneries → `{ url?, logo }`. Logo files in `public/images/tanneries/`.
- `data/categories.ts` — Category labels and order
- `data/utils.ts` — `getAllProducts`, `getProductBySlug`, `getProductSlugs`, `getRelatedProducts`, `getAdjacentProducts` (returns prev/next within same category, null at boundaries).
- `data/product-intake.example.json` — Template for product import script. Fields: `name`, `category`, `price`, `currency`, `description`, `construction`, `dimensions`, `images`.
- `data/intake/` — 10 wallet JSON files (`wallet-1.json` through `wallet-10.json`) ready for filling and importing via `npm run add-product`

**Lib**
- `lib/utils.ts` — `formatPrice()`, `cn()`, `slugify()`
- `lib/constants.ts` — `BRAND_NAME`, `CONTACT_EMAIL`, `SITE_URL`, `NAV_LINKS`
- `lib/seo.ts` — deleted (unused; product pages define metadata inline)

**Components**
- `components/nav/SiteHeader.tsx` — Static server component. Brand logo (`public/images/logo_new.png`, 1220x680px, cropped tight) as plain `<img>` with `.site-header-logo` class. Logo centered via `display: flex; justifyContent: center` on Link wrapper. Linen background (`#FEEBCF`). 12px top padding on link wrapper. 48px gradient block below fades to transparent. `marginBottom: '-48px'` pulls nav up into gradient zone.
- `components/nav/Navigation.tsx` — Sticky 56px. Obsidian background always. Chalk nav links via inline styles (Tailwind color classes unreliable). Mobile slide-in drawer (obsidian bg, chalk links via inline styles). Escape key closes. Body scroll lock. Close on route change. Full focus trap: Tab/Shift+Tab cycles within drawer only; focus returns to hamburger on close.
- `components/footer/Footer.tsx` — Espresso background. Brand name (EB Garamond italic) + tagline on one row, copyright on line below.
- `components/common/Button.tsx` — Primary (cognac fill) / Secondary (obsidian outline) / Ghost. Sizes: sm=12px, md=13px, lg=14px. Zero border-radius. Renders as `<Link>` when `href` passed.
- `components/common/Container.tsx` — Max-width 1440px responsive wrapper
- `components/common/AnimateOnScroll.tsx` — IntersectionObserver scroll-reveal for `[data-animate="fade-up"]` children
- `components/hero/HeroHeading.tsx` — `'use client'`. Picks a random phrase from `data/hero-phrases.ts` on mount, renders as large EB Garamond h1. Uses ` / ` as line-break delimiter. Returns null until client hydrates (prevents hydration mismatch).
- `components/product-inquiry/ProductInquiryForm.tsx` — `'use client'`. Inline inquiry form on PDP. Initially renders as a single button; click expands into name/email/message fields. Message pre-filled with product-specific template (editable in `DEFAULT_MESSAGE`). POSTs to `/api/contact`. Shows sending state, success confirmation, cancel button.
- `components/product-card/ProductCard.tsx` — `'use client'` (required for mouse event handlers). Default `aspect-[4/5]`. Accepts `compact` prop which switches to `aspect-square` (used in related products strip). Wallet cards: dark brown gradient background (`linear-gradient(to bottom right, #2A1A10, #1A0E08)`). All other cards: `bg-linen`. FJORDLEATHER text overlay (14px, `#C4B5A8`, opacity 0.4) at bottom of wallet cards. Image at `scale(1.0)`, hover `scale(1.03)`, `object-contain`. When `product.sold` is true: diagonal "Gone" text + dark veil overlay on image. No New badge. No featured badge.
- `components/image-gallery/ImageGallery.tsx` — Active thumbnail, keyboard nav scoped to gallery region. `aria-roledescription="carousel"`. Focus ring: cognac. Aspect ratio `3/2.6` (landscape, tuned for wallet photos). Uses `flex items-center justify-center` + plain `<img>` with `max-width/max-height: 100%` for reliable centering (NOT Next.js `<Image fill>` — global CSS reset breaks it). Inner padding `p-6`.

**Pages** (all render statically — `npm run build` passes, 0 TypeScript errors)
- `app/page.tsx` — Homepage: buckskin hero (`#DED0B6`) with randomised EB Garamond heading (via `HeroHeading` client component), cognac overline, 17px body copy, CTA. Linen pull quote (Malcolm McCollough, linked to MIT Press). Materials strip (3-column). No "Selected Works" product grid.
- `data/hero-phrases.ts` — Pool of hero heading phrases (11 entries). Each phrase uses ` / ` as a line-break delimiter. Edit freely to add/remove phrases. Rendered by `components/hero/HeroHeading.tsx` (client component, picks randomly on mount).
- `app/catalog/page.tsx` — Collection: sticky filter bar (`top-[56px]`), URL-based category filter via `useSearchParams` + `router.replace` (persists on back navigation). Wrapped in `Suspense` for static export. Grid: `grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8`.
- `app/products/[slug]/page.tsx` — PDP: async params (`await params` — Next.js 16 requirement). Page top: breadcrumb bar → prev/next nav strip (category-scoped, no wrap, no product names). 60/40 gallery + info panel. Info panel: category overline, product name, price, divider, details grid (Material, Construction, Dimensions) + description, certification badge (consortium logo, "Certified Leather", tannery logo). CTA: `ProductInquiryForm` inline inquiry form (replaces mailto). Related products: compact 3-column horizontal strip.
- `app/about/page.tsx` — Craft: 3 sections. Section 1: buckskin `#DED0B6`, `minHeight: 40vh`, "Made by hand. Finished by time." heading (no overline). Section 2: linen, vertical editorial chapters per process step (32px step name + 18px prose, 36px gap, stone dividers, cognac overline "How it's made", no step numbers). Section 3: buckskin `#DED0B6`, centered maker's statement blockquote in obsidian.
- `app/contact/page.tsx` — Contact: two-column layout. Left: heading, body copy, direct email link. Right: form (name, email, subject, message) — POSTs to `/api/contact` via Resend. Sending state + error display. `CONTACT_EMAIL` imported from `lib/constants`.

**Assets & SEO**
- `public/images/logo_new.png` — Active logo (1220x680px, square-ish, cropped tight). Rendered via `.site-header-logo` CSS class.
- `public/images/pelle-vegetale-logo.jpg` — Pelle Conciata al Vegetale in Toscana consortium mark. 200px wide in badge.
- `public/images/tanneries/` — 17 tannery logos downloaded from pellealvegetale.it. Filenames match `TANNERY_REGISTRY` entries in `data/tanneries.ts`.
- `public/images/products/` — SVG placeholders for original 10 products + real PNGs for Vaskebjornen-1 (`vaskebjornen-1-1.png`, `vaskebjornen-1-2.png`).
- `public/robots.txt` — allow all crawlers
- `public/sitemap.xml` — static routes (domain placeholder — update when live)
- `app/icon.svg` — "F" lettermark on obsidian background

**Tooling**
- `scripts/add-product.mjs` — Node ESM product intake CLI. Usage: `npm run add-product -- path/to/product.json`. Validates, generates slug, copies/renames images (extension inferred from source file), appends product entry to `data/products.ts`. `material` field optional (defaults to "Full-grain Italian leather"). Does not require `shortDescription`, `featured`, `isNew`, or `patina`.
- `tools/admin-core.mjs` — All pure admin logic exported for testing: `parseMultipart`, `addProduct`, `updateProduct`, `deleteProduct`, `replaceInSource`, `buildProductEntry`, `parseProducts`, `log`, etc. Image upload bug fixed here: `Content-Disposition` regex uses `;\s*name=` (not greedy `name=`) to avoid matching `filename=`.
- `tools/admin-server.mjs` — Local-only admin UI (port 3001). Run with `npm run admin`. Thin HTTP layer importing from `admin-core.mjs`. Two tabs: **Add Product** (category filter → copy-from dropdown, image upload with drag-to-reorder) and **Edit Product** (category filter → product dropdown, pre-fills all fields + images, Save/Delete buttons, Mark as Sold checkbox). Product lists refresh automatically after every add/edit/delete. `EADDRINUSE` prints kill command; `SIGINT`/`SIGTERM` close cleanly.
- `tools/admin-server.test.mjs` — 70 unit tests (node:test, zero deps). Run with `npm run test:admin`.
- `app/api/contact/route.ts` — POST handler. Reads `name`, `email`, `subject`, `message` from JSON body. Sends via Resend from `contact@fjordleather.com` to `CONTACT_EMAIL` env var (falls back to `hello@fjordleather.com`). `replyTo` set to sender's email. Requires `RESEND_API_KEY` env var (set in Vercel + `.env.local` for local dev).
- `package.json` — scripts: `"add-product"`, `"admin"`, `"test:admin": "node --test tools/admin-server.test.mjs"`

---

### Pending — Resume Next Session

**Priority 1 — Product data**
- [ ] Replace SVG placeholders for original 10 products with real photography when available.
- [ ] Favicon: `app/icon.svg` is a simple "F" mark — replace with a proper Fjordleather mark if one exists.
- [ ] Stein Key Fob (`id: 09`) has no `tannery` field — description says "workshop offcuts". Add tannery once known.

**Priority 2 — Awaiting domain**
- [ ] Update `CONTACT_EMAIL` and `SITE_URL` in `lib/constants.ts` once domain is confirmed.
- [ ] Update `public/sitemap.xml` with real domain.

**Priority 3 — Polish**
- [ ] Responsive audit: test all pages at 375px, 768px, 1024px, 1440px.
- [ ] Smoke-test contact form and product inquiry form end-to-end in production.

---

## Fjordleather: Handmade Leather Goods — Product Showcase Website

**Project overview**

Static product showcase website for a handmade leather goods brand. Hybrid catalog and shop window — products displayed with full descriptions and pricing, no shopping cart, checkout, or payment flow.

---

**Brand identity & tone**

- **Craftsmanship** — every item made entirely by hand
- **Materials** — exclusively full-grain Italian leather
- **Restraint** — the work speaks for itself

Nordic minimalist, quietly sophisticated. Not cold or sterile — warm in a muted, natural way.

---

**Design direction**

- **Color palette**: Warm neutrals. Accent: Cognac `#8B5A2B` used sparingly.
- **Typography**: EB Garamond (display) + Jost (body/UI). Hero heading up to 104px, left-aligned.
- **Layout**: Generous whitespace. Editorial grid, never cluttered.
- **Backgrounds**: Buckskin `#DED0B6` for hero and about page opener. Linen (`#FEEBCF`) for site header/logo zone and process section. Dark brown gradient for wallet product cards.
- **Motion**: Subtle only — fade-ins on scroll, gentle hover states.
- **No decorative gimmicks**: No drop shadows on cards, no rounded corners.

---

**Technical requirements**

- Next.js on Vercel — static pages + serverless API routes (`/api/contact` via Resend)
- Mobile-first, fully responsive
- Semantic HTML throughout
- No external UI libraries or component kits
- CSS custom properties for the entire design token system
- Product data in `data/products.ts` — add/edit without touching layout code
- No shopping cart, checkout, or payment integrations

---

**What to avoid**

- Any e-commerce UI patterns (cart icons, "Buy Now" buttons, stock indicators, reviews/ratings)
- Busy layouts or visual noise
- Generic sans-serif fonts or blue/purple palettes
- Animations that feel playful or tech-startup-like
- Anything that makes the site feel like a Shopify template
- White or chalk backgrounds — always warm ivory/linen tones
