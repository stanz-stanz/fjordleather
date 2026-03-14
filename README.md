# Fjordleather

Static product showcase website for a handmade leather goods brand based in Oslo. Built with Next.js (static export), Tailwind v4, and no external UI libraries.

## Stack

- **Framework**: Next.js 16 App Router, `output: 'export'` (static HTML)
- **Styling**: Tailwind CSS v4 with `@theme inline` design token system
- **Fonts**: Cormorant Garamond (display) + Jost (body) via `next/font/google`
- **Language**: TypeScript

## Getting started

```bash
npm install
npm run dev       # development server at localhost:3000
npm run build     # static export to /out
```

## Adding a product

```bash
npm run add-product -- path/to/product.json
```

See `data/product-intake.example.json` for the expected format. The script validates fields, copies images to `public/images/products/`, and appends the product entry to `data/products.ts`.

## Project structure

```
app/                    # Next.js App Router pages
  page.tsx              # Homepage
  catalog/              # Collection / filter page
  products/[slug]/      # Product detail page
  about/                # Craft / brand story
  contact/              # Contact form
components/
  nav/                  # Navigation (sticky, mobile drawer)
  footer/               # Footer
  common/               # Button, Container, AnimateOnScroll
  product-card/         # ProductCard
  image-gallery/        # ImageGallery (PDP)
data/
  products.ts           # All product data
  categories.ts         # Category definitions
  types.ts              # TypeScript types
  utils.ts              # Data access helpers
lib/
  constants.ts          # BRAND_NAME, NAV_LINKS, SITE_URL, CONTACT_EMAIL
  utils.ts              # formatPrice, cn, slugify
  seo.ts                # generateProductMetadata
docs/design/            # Design system documentation
public/
  images/products/      # Product images (SVG placeholders until real photography)
  robots.txt
  sitemap.xml
scripts/
  add-product.mjs       # Product intake CLI
```

## Design

The brand is Nordic minimalist — warm neutrals, generous whitespace, Cormorant Garamond editorial type, no rounded corners, no drop shadows. Full design system documented in `docs/design/design-system.md`.

**Color accent**: Cognac `#8B5A2B` (not Fjord blue — docs updated accordingly).

## Deployment

Recommended: Vercel connected to the GitHub repo (`https://github.com/stanz-stanz/fjordleather`). Framework: Next.js. Output directory: `out`. Auto-deploys on push to `main`.

Once a domain is confirmed:
1. Update `SITE_URL` and `CONTACT_EMAIL` in `lib/constants.ts`
2. Replace the hardcoded email in `contact/page.tsx:14` with the `CONTACT_EMAIL` import
3. Update `public/sitemap.xml` URLs to the real domain

## Repository

`https://github.com/stanz-stanz/fjordleather`
