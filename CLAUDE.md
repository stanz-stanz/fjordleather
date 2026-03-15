
## Build Progress & Handoff Notes

> **Last updated:** 2026-03-15 — Session 4 complete.
> Repository: `https://github.com/stanz-stanz/fjordleather`
> Git remote name: `fjordleather`
> Resume: clone the repo, `npm install && npm run dev`.

---

### Completed

**Design system** (`docs/design/`)
- `design-system.md` — Brand principles, color, typography, spacing, motion, grid. Accent is Cognac `#8B5A2B`. Display font: EB Garamond. No white/chalk backgrounds ever.
- `tokens.css` — Full Tailwind v4 `@theme inline` token system, aligned with globals.css
- `components.md` — Component specs: SiteHeader + Navigation (56px obsidian, chalk links), focus trap implemented, hero background warm ivory

**Foundation**
- `next.config.ts` — `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`
- `app/globals.css` — Complete design token system. Accent: Cognac `#8B5A2B`. `--color-linen: #FEEBCF` (sampled from logo). `.cta-primary` class. `[data-animate="fade-up"]` + `.is-visible` CSS for AnimateOnScroll. `.site-header-logo` responsive class (96% mobile, 80% at 768px+). No Google Fonts `@import`.
- `app/layout.tsx` — EB Garamond (`--font-display`) + Cormorant Garamond (`--font-display-fallback`) + Jost. Renders `SiteHeader` then `Navigation` then `{children}` then `Footer`. No `<main>` wrapper.

**Data layer**
- `data/types.ts` — `Product`, `ProductImage`, `ProductDimensions`, `ProductCategory`, `Tannery`. Fields: `id`, `slug`, `name`, `category`, `price`, `currency`, `description`, `material`, `construction`, `dimensions`, `images`, `tannery?`. No `featured`, `isNew`, `patina`, or `shortDescription`.
- `data/products.ts` — 11 products (2 bags, 2 duffles, 2 wallets, 2 coin pouches, 2 accessories, 1 real wallet). EUR pricing for originals, DKK for Vaskebjornen-1. SVG placeholders for original 10; real PNGs for Vaskebjornen-1. All 10 products with identifiable tanneries have `tannery` field set.
- `data/tanneries.ts` — `TANNERY_REGISTRY`: map of all 17 Genuine Italian Vegetable-Tanned Leather consortium tanneries → `{ url?, logo }`. Logo files in `public/images/tanneries/`.
- `data/categories.ts` — Category labels and order
- `data/utils.ts` — `getProductBySlug`, `getProductSlugs`, `getFeaturedProducts` (returns `slice(0,3)`), `getRelatedProducts`, etc.
- `data/product-intake.example.json` — Template for product import script. Fields: `name`, `category`, `price`, `currency`, `description`, `construction`, `dimensions`, `images`.
- `data/intake/` — 10 wallet JSON files (`wallet-1.json` through `wallet-10.json`) ready for filling and importing via `npm run add-product`

**Lib**
- `lib/utils.ts` — `formatPrice()`, `cn()`, `slugify()`
- `lib/constants.ts` — `BRAND_NAME`, `CONTACT_EMAIL`, `SITE_URL`, `NAV_LINKS`
- `lib/seo.ts` — `generateProductMetadata()` — uses `product.description` (not shortDescription)

**Components**
- `components/nav/SiteHeader.tsx` — Static server component. Brand logo (`public/images/logo.png`, 2176x480px) as plain `<img>` with `.site-header-logo` class (96% width mobile, 80% at 768px+, no max-width cap). 1% left margin. Linen background (`#FEEBCF`). 12px top padding on link wrapper. 48px gradient block below fades to transparent. `marginBottom: '-48px'` pulls nav up into gradient zone.
- `components/nav/Navigation.tsx` — Sticky 56px. Obsidian background always. Chalk nav links via inline styles (Tailwind color classes unreliable). Mobile slide-in drawer (obsidian bg, chalk links via inline styles). Escape key closes. Body scroll lock. Close on route change. Full focus trap: Tab/Shift+Tab cycles within drawer only; focus returns to hamburger on close.
- `components/footer/Footer.tsx` — 3-column, espresso background
- `components/common/Button.tsx` — Primary (cognac fill) / Secondary (obsidian outline) / Ghost. Sizes: sm=12px, md=13px, lg=14px. Zero border-radius. Renders as `<Link>` when `href` passed.
- `components/common/Container.tsx` — Max-width 1440px responsive wrapper
- `components/common/AnimateOnScroll.tsx` — IntersectionObserver scroll-reveal for `[data-animate="fade-up"]` children
- `components/product-card/ProductCard.tsx` — `'use client'` (required for mouse event handlers). 4:5 aspect ratio. Wallet cards: dark brown gradient background (`linear-gradient(to bottom right, #2A1A10, #1A0E08)`). All other cards: `bg-linen`. FJORDLEATHER text overlay (14px, `#C4B5A8`, opacity 0.4) at bottom of wallet cards, rendered after image div so it sits on top. Image at `scale(1.0)`, hover `scale(1.03)`, `object-contain`. No New badge. No featured badge.
- `components/image-gallery/ImageGallery.tsx` — Active thumbnail, keyboard nav scoped to gallery region. `aria-roledescription="carousel"`. Focus ring: cognac. Aspect ratio `3/2.6` (landscape, tuned for wallet photos). Uses `flex items-center justify-center` + plain `<img>` with `max-width/max-height: 100%` for reliable centering (NOT Next.js `<Image fill>` — global CSS reset breaks it). Inner padding `p-6`.

**Pages** (all render statically — `npm run build` passes, 0 TypeScript errors)
- `app/page.tsx` — Homepage: warm ivory hero (`#F0E6D0`) with 104px EB Garamond heading left-aligned, cognac overline, 17px body copy, stacked CTA. Products section, linen pull quote, materials strip.
- `app/catalog/page.tsx` — Collection: sticky filter bar (`top-[56px]`), URL-based category filter via `useSearchParams` + `router.replace` (persists on back navigation). Wrapped in `Suspense` for static export. Grid: `grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8`.
- `app/products/[slug]/page.tsx` — PDP: async params (`await params` — Next.js 16 requirement). 60/40 gallery + info, sticky detail panel, related products, Inquire CTA via mailto. Right info panel layout: details grid (Material, Construction, Dimensions, Tannery) + description in left column; certification badge (`flex: 0 0 300px`, `#F0E6D0` bg, aligned with Material row) in right column with vertical divider. Tannery logo + "Sourced from" inside badge. All font sizes bumped (labels 20px, values 19px, description 21px, price 27px). Button `md` size is 16px.
- `app/about/page.tsx` — Craft: 4 sections including full-bleed espresso maker's statement blockquote
- `app/contact/page.tsx` — Contact: two-column, bottom-border-only form inputs, mailto submit

**Assets & SEO**
- `public/images/logo.png` — Brand logo. 2176x480px. Do not crop. Rendered via `.site-header-logo` CSS class.
- `public/images/pelle-vegetale-logo.jpg` — Pelle Conciata al Vegetale in Toscana consortium mark. 200px wide in badge.
- `public/images/tanneries/` — 17 tannery logos downloaded from pellealvegetale.it. Filenames match `TANNERY_REGISTRY` entries in `data/tanneries.ts`.
- `public/images/products/` — SVG placeholders for original 10 products + real PNGs for Vaskebjornen-1 (`vaskebjornen-1-1.png`, `vaskebjornen-1-2.png`). Also `bifold-1-1.svg` and `bifold-1-2.svg` (unused placeholder SVGs).
- `public/robots.txt` — allow all crawlers
- `public/sitemap.xml` — static routes (domain placeholder — update when live)
- `app/icon.svg` — "F" lettermark on obsidian background

**Tooling**
- `scripts/add-product.mjs` — Node ESM product intake CLI. Usage: `npm run add-product -- path/to/product.json`. Validates, generates slug, copies/renames images (extension inferred from source file), appends product entry to `data/products.ts`. `material` field optional (defaults to "Full-grain Italian leather"). Does not require `shortDescription`, `featured`, `isNew`, or `patina`.
- `package.json` — `"add-product": "node scripts/add-product.mjs"` script added

---

### Pending — Resume Next Session

**Priority 1 — Product data**
- [ ] Fill in `data/intake/wallet-2.json` through `wallet-10.json` with real names, descriptions, prices, and construction details. Then run `npm run add-product -- data/intake/wallet-N.json` for each.
- [ ] Replace SVG placeholders for original 10 products with real photography when available.
- [ ] Favicon: `app/icon.svg` is a simple "F" mark — replace with a proper Fjordleather mark if one exists.
- [ ] Stein Key Fob (`id: 09`) has no `tannery` field — description says "workshop offcuts". Add tannery once known.

**Priority 2 — Awaiting domain**
- [ ] Update `CONTACT_EMAIL` and `SITE_URL` in `lib/constants.ts` once domain is confirmed.
- [ ] `CONTACT_EMAIL` is also hardcoded as a local variable in `contact/page.tsx:14` — replace with the import.
- [ ] Update `public/sitemap.xml` with real domain.
- [ ] Connect `https://github.com/stanz-stanz/fjordleather` to Vercel. Framework: Next.js. Output dir: `out`. Auto-deploys on push to `main`.

**Priority 3 — Polish**
- [ ] Responsive audit: test all pages at 375px, 768px, 1024px, 1440px.
- [ ] Contact form: smoke-test mailto link in browser.

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
- **Backgrounds**: Warm ivory (`#F0E6D0`) for hero. Linen (`#FEEBCF`) for site header/logo zone. Dark brown gradient for wallet product cards.
- **Motion**: Subtle only — fade-ins on scroll, gentle hover states.
- **No decorative gimmicks**: No drop shadows on cards, no rounded corners.

---

**Technical requirements**

- Static site — Next.js static export (`output: 'export'`)
- Mobile-first, fully responsive
- Semantic HTML throughout
- No external UI libraries or component kits
- CSS custom properties for the entire design token system
- Product data in `data/products.ts` — add/edit without touching layout code
- No backend, no database, no payment integrations

---

**What to avoid**

- Any e-commerce UI patterns (cart icons, "Buy Now" buttons, stock indicators, reviews/ratings)
- Busy layouts or visual noise
- Generic sans-serif fonts or blue/purple palettes
- Animations that feel playful or tech-startup-like
- Anything that makes the site feel like a Shopify template
- White or chalk backgrounds — always warm ivory/linen tones
