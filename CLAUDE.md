
---

## Build Progress & Handoff Notes

> **Last updated:** 2026-03-12 — Session 1 complete. All 5 pages built and building cleanly.
> Resume by cloning `https://github.com/stanz-stanz/fiordleather.git` and running `npm install && npm run dev`.

### ✅ Completed

**Design system** (`docs/design/`)
- `design-system.md` — Brand principles, color, typography, spacing, motion, grid
- `tokens.css` — Full Tailwind v4 `@theme inline` token system *(note: docs still reference Fjord blue accent — reconciled to Cognac in app/globals.css; update docs next session)*
- `components.md` — Component specs for all 10 components

**Foundation**
- `next.config.ts` — `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`
- `app/globals.css` — Complete design token system. Accent: Cognac `#8B5A2B` (NOT Fjord blue). No product card shadows.
- `app/layout.tsx` — Cormorant Garamond + Jost fonts, brand metadata, Navigation + Footer wrappers

**Data layer**
- `data/types.ts` — `Product`, `ProductImage`, `ProductDimensions`, `ProductCategory`
- `data/products.ts` — 10 sample products (2 bags, 2 duffles, 2 wallets, 2 coin pouches, 2 accessories). 3 featured, 2 new. EUR pricing. Editorial descriptions referencing Badalassi Carlo, Conceria Walpier.
- `data/categories.ts` — Category labels and order
- `data/utils.ts` — `getProductBySlug`, `getProductSlugs`, `getFeaturedProducts`, `getRelatedProducts`, etc.

**Lib**
- `lib/utils.ts` — `formatPrice()`, `cn()`, `slugify()`
- `lib/constants.ts` — `BRAND_NAME`, `CONTACT_EMAIL`, `SITE_URL`, `NAV_LINKS`
- `lib/seo.ts` — `generateProductMetadata()`

**Components**
- `components/nav/Navigation.tsx` — Sticky, scroll-aware bg, active underline animation, mobile slide-in drawer
- `components/footer/Footer.tsx` — 3-column, Espresso background
- `components/common/Button.tsx` — Primary/Secondary/Ghost, zero border-radius, renders as `<Link>` when `href` passed
- `components/common/Container.tsx` — Max-width 1440px responsive wrapper
- `components/common/AnimateOnScroll.tsx` — IntersectionObserver scroll-reveal for `[data-animate="fade-up"]` children
- `components/product-card/ProductCard.tsx` — 3:4 image, category overline, Cormorant name, price, hover scale, New badge
- `components/image-gallery/ImageGallery.tsx` — Active thumbnail, keyboard nav, mobile horizontal scroll

**Pages** (all render statically — `npm run build` passes with 17 pages, 0 TypeScript errors)
- `app/page.tsx` — Homepage: typography hero, asymmetric 3-product cascade grid, brand statement, material callout strip
- `app/catalog/page.tsx` — Collection: sticky filter bar, client-side category filter, staggered product grid
- `app/products/[slug]/page.tsx` — PDP: 60/40 gallery + info, sticky detail panel, related products, Inquire CTA → mailto
- `app/about/page.tsx` — Craft: 4 sections including full-bleed Espresso maker's statement blockquote
- `app/contact/page.tsx` — Contact: two-column, bottom-border-only form inputs, mailto submit

---

### ⏳ Pending — Resume Next Session

**Priority 1 — Visual completeness**
- [ ] **Product images**: All image paths are placeholders (`/images/products/[slug]-1.jpg`). Add real photography OR create CSS/SVG placeholder tiles in `public/images/products/`. Without images, product cards and galleries show broken image slots.
- [ ] **Favicon**: Replace default Next.js favicon (`app/favicon.ico`) with a Fjordleather mark

**Priority 2 — Polish & correctness**
- [ ] **Responsive audit**: Test all 5 pages at 375px (mobile), 768px (tablet), 1024px, 1440px. Fix any layout breaks.
- [ ] **Accessibility pass**: Keyboard nav through product grid, focus trap in mobile nav drawer, ARIA on ImageGallery carousel
- [ ] **AnimateOnScroll wiring**: Verify `AnimateOnScroll` wrapper is correctly applied around product grids on Homepage and Catalog. Check that `.is-visible` CSS transition is defined in `globals.css`.
- [ ] **Contact form**: Smoke-test mailto link generation in browser — confirm pre-filled subject/body encodes correctly
- [ ] **Design system docs sync**: Update `docs/design/tokens.css` to replace Fjord blue accent with Cognac `#8B5A2B` (the app uses cognac but the docs still show the old palette)

**Priority 3 — Deployment prep**
- [ ] `public/robots.txt` — allow all crawlers
- [ ] `public/sitemap.xml` — list all static routes for SEO
- [ ] Configure hosting target (Vercel recommended — connects to GitHub repo, auto-deploys on push; set framework to Next.js, output dir to `out/`)
- [ ] Update `SITE_URL` in `lib/constants.ts` from placeholder to real domain once known

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

The visual and editorial tone should be **nordic minimalist, yet quietly sophisticated** — think long silences, honest materials, precise proportions. Not cold or sterile, but warm in a muted, natural way. Think Aesop or Quiet Luxury editorial spreads, not an e-commerce platform.

---

**Design direction**

- **Color palette**: Warm neutrals — off-whites, stone, sand, warm grays, deep charcoal. One restrained accent (e.g. a deep cognac or aged brass tone) used sparingly
- **Typography**: Pair a refined serif display font (for product names and section headers) with a quiet, slightly condensed sans-serif for body copy and metadata (price, material, dimensions). Avoid generic system fonts entirely
- **Layout**: Generous whitespace. Products presented in an editorial grid — asymmetric where appropriate, never cluttered. Let images breathe
- **Imagery**: Assume high-quality product photography will be provided. Use placeholder images sized realistically (landscape and portrait orientations mixed). No stock photo filler text
- **Motion**: Subtle only — soft fade-ins on scroll, gentle hover states on product cards. Nothing that distracts from the objects themselves
- **No decorative gimmicks**: No gradients, no drop shadows, no rounded corners on cards. Clean edges, intentional spacing, quiet confidence

---

**Site structure**

1. **Homepage** — Brand statement (one or two lines, not a paragraph), hero image or featured product, and a gateway to the catalog
2. **Catalog / Collection page** — Full product grid, filterable by category (Bags, Travel Duffles, Wallets, Coin Pouches, Accessories). Each card shows: product name, category tag, and price
3. **Product detail page** — Full-bleed image (or image gallery), product name, category, a thorough editorial description (material, construction method, dimensions, aging/patina notes), and price. A clear "inquire" or "contact" CTA instead of "add to cart"
4. **About / Craft page** — Short brand story focused on process, materials (Italian leather provenance), and the maker's philosophy. No fluff
5. **Contact page** — Minimal form (name, email, message) or just an email link. No social media links unless explicitly requested later

---

**Technical requirements**

- Static site — HTML/CSS/JS or a lightweight framework (Next.js static export is acceptable if it aids structure)
- Mobile-first, fully responsive
- Semantic HTML throughout (important for accessibility and future SEO)
- No external UI libraries or component kits — design from scratch
- CSS custom properties for the entire design token system (colors, spacing scale, type scale)
- Product data should live in a simple JSON file or JS object so items can be added/edited easily without touching layout code
- No backend, no database, no payment integrations

---

**What to avoid**

- Any e-commerce UI patterns (cart icons, "Buy Now" buttons, stock indicators, reviews/ratings)
- Busy layouts or visual noise
- Generic sans-serif fonts or purple-tinted palettes
- Animations that feel playful or tech-startup-like
- Anything that makes the site feel like a Shopify template

---
