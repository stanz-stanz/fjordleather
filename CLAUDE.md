
## Build Progress & Handoff Notes

> **Last updated:** 2026-03-14 — Session 3 complete.
> Repository: `https://github.com/stanz-stanz/fjordleather`
> Git remote name: `fjordleather`
> Resume: clone the repo, `npm install && npm run dev`.

---

### ✅ Completed

**Design system** (`docs/design/`)
- `design-system.md` — Brand principles, color, typography, spacing, motion, grid. Accent is Cognac `#8B5A2B` throughout (Fjord blue removed).
- `tokens.css` — Full Tailwind v4 `@theme inline` token system, aligned with globals.css
- `components.md` — Component specs, updated to reflect actual implementation (nav height 64px, button sizes 12/13/14px, focus rings cognac)

**Foundation**
- `next.config.ts` — `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`
- `app/globals.css` — Complete design token system. Accent: Cognac `#8B5A2B`. `.cta-primary` class (obsidian fill, 14px, hover → bark). `[data-animate="fade-up"]` + `.is-visible` CSS for AnimateOnScroll. No Google Fonts `@import` (redundant with next/font, causes Turbopack error).
- `app/layout.tsx` — Cormorant Garamond + Jost fonts, brand metadata, Navigation + Footer. No `<main>` wrapper — individual pages provide their own `<main id="main-content">`.

**Data layer**
- `data/types.ts` — `Product`, `ProductImage`, `ProductDimensions`, `ProductCategory`
- `data/products.ts` — 10 sample products (2 bags, 2 duffles, 2 wallets, 2 coin pouches, 2 accessories). 3 featured, 2 new. EUR pricing. Image paths use `.svg` extension.
- `data/categories.ts` — Category labels and order
- `data/utils.ts` — `getProductBySlug`, `getProductSlugs`, `getFeaturedProducts`, `getRelatedProducts`, etc.
- `data/product-intake.example.json` — Template for product import script

**Lib**
- `lib/utils.ts` — `formatPrice()`, `cn()`, `slugify()`
- `lib/constants.ts` — `BRAND_NAME`, `CONTACT_EMAIL`, `SITE_URL`, `NAV_LINKS`
- `lib/seo.ts` — `generateProductMetadata()`

**Components**
- `components/nav/Navigation.tsx` — Sticky 64px, always chalk/obsidian (no color flip — hero is light). Scroll-aware backdrop-blur. Mobile slide-in drawer from right. Escape key closes. Body scroll lock while open. Close on route change. Full focus trap implemented.
- `components/footer/Footer.tsx` — 3-column, espresso background
- `components/common/Button.tsx` — Primary (cognac fill) / Secondary (obsidian outline) / Ghost. Sizes: sm=12px, md=13px, lg=14px. Zero border-radius. Renders as `<Link>` when `href` passed.
- `components/common/Container.tsx` — Max-width 1440px responsive wrapper
- `components/common/AnimateOnScroll.tsx` — IntersectionObserver scroll-reveal for `[data-animate="fade-up"]` children
- `components/product-card/ProductCard.tsx` — 3:4 image, category overline, Cormorant name, price in obsidian, hover scale, New badge. Focus ring: cognac.
- `components/image-gallery/ImageGallery.tsx` — Active thumbnail, keyboard nav scoped to gallery region (tabIndex + onKeyDown, not global window listener). `aria-roledescription="carousel"`. Focus ring: cognac.

**Pages** (all render statically — `npm run build` passes with 18 pages, 0 TypeScript errors)
- `app/page.tsx` — Homepage: linen hero with 104px Cormorant heading left-aligned, cognac overline, 17px body copy, stacked CTA below body text, chalk products section, linen pull quote, chalk materials strip
- `app/catalog/page.tsx` — Collection: sticky filter bar, client-side category filter, staggered product grid
- `app/products/[slug]/page.tsx` — PDP: 60/40 gallery + info, sticky detail panel, related products, Inquire CTA → mailto
- `app/about/page.tsx` — Craft: 4 sections including full-bleed espresso maker's statement blockquote
- `app/contact/page.tsx` — Contact: two-column, bottom-border-only form inputs, mailto submit

**Assets & SEO**
- `public/images/products/` — 26 SVG placeholder files (warm leather-toned, one per product image)
- `public/robots.txt` — allow all crawlers
- `public/sitemap.xml` — 14 static routes
- `app/icon.svg` — "F" lettermark on obsidian background

**Tooling**
- `scripts/add-product.mjs` — Node ESM product intake CLI. Usage: `npm run add-product -- path/to/product.json`. Validates, generates slug, copies/renames images, appends product entry to `data/products.ts`.
- `package.json` — `"add-product": "node scripts/add-product.mjs"` script added

---

### ⏳ Pending — Resume Next Session

**Priority 1 — Visual completeness**
- [ ] **Product images**: All image paths are `.svg` placeholders. Replace with real photography when available. Import via `npm run add-product`.
- [ ] **Favicon**: `app/icon.svg` is a simple "F" mark — replace with a proper Fjordleather mark if one exists.

**Priority 2 — Awaiting domain**
- [ ] **`CONTACT_EMAIL`** and **`SITE_URL`**: Once domain is confirmed, update both in `lib/constants.ts`. `CONTACT_EMAIL` is also currently hardcoded as a local variable in `contact/page.tsx:14` — replace with the import.
- [ ] **Sitemap URLs**: Update `public/sitemap.xml` with real domain to match.
- [ ] **Deployment**: Connect `https://github.com/stanz-stanz/fjordleather` to Vercel. Framework: Next.js. Output dir: `out`. Auto-deploys on push to `main`.

**Priority 3 — Polish**
- [ ] **Contact form**: Smoke-test mailto link in browser — confirm pre-filled subject/body encodes correctly.

---

## Fjordleather: Handmade Leather Goods — Product Showcase Website

**Project overview**

Build a static product showcase website for a handmade leather goods brand. The site functions as a hybrid catalog and shop window — products are displayed with full descriptions and pricing, but there is no shopping cart, checkout, or payment flow of any kind. Visitors browse and discover; they do not transact.

---

**Brand identity & tone**

The brand's core pillars are:
- **Craftsmanship** — every item is made entirely by hand, with obsessive attention to detail and finishing
- **Materials** — exclusively full-grain Italian leather, sourced for its character, durability, and aging quality
- **Restraint** — the work speaks for itself; the brand does not shout

The visual and editorial tone should be **nordic minimalist, yet quietly sophisticated** — think long silences, honest materials, precise proportions. Not cold or sterile, but warm in a muted, natural way. The brand does not explain itself. It assumes you already understand.

Design inspiration: the *spirit* of sites like Loake — confidence without shouting, authority earned through restraint, typography that feels chosen by someone who reads books — translated into a Nordic idiom rather than copied literally.

---

**Design direction**

- **Color palette**: Warm neutrals — off-whites, stone, sand, warm grays, deep charcoal. Accent: Cognac `#8B5A2B` used sparingly (overlines, badges, focus rings, CTA hover)
- **Typography**: Cormorant Garamond (display, editorial) + Jost (body, UI). Hero heading up to 104px, tight line-height, left-aligned. Not centered.
- **Layout**: Generous whitespace. Editorial grid — asymmetric where appropriate, never cluttered.
- **Hero background**: Linen (`#F0EBE3`) — warm, not chalk/white. Gives character without darkness.
- **Motion**: Subtle only — fade-ins on scroll, gentle hover states on product cards.
- **No decorative gimmicks**: No gradients, no drop shadows on product cards, no rounded corners. Clean edges, intentional spacing.

---

**Site structure**

1. **Homepage** — Linen hero (brand statement, heading, CTA), featured products, pull quote, materials strip
2. **Catalog / Collection page** — Full product grid, filterable by category
3. **Product detail page** — Image gallery, editorial description, Inquire CTA
4. **About / Craft page** — Brand story focused on process and materials
5. **Contact page** — Minimal form with mailto action

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
- Copying reference sites literally — draw from their *spirit*, not their layout
