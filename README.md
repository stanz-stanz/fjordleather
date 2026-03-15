# Fjordleather

Product showcase website for a handmade leather goods brand based in Vejle, Denmark. Built with Next.js on Vercel, Tailwind v4, and no external UI libraries.

## Stack

- **Framework**: Next.js 16 App Router — static pages + serverless API routes
- **Styling**: Tailwind CSS v4 with `@theme inline` design token system
- **Fonts**: EB Garamond (display) + Jost (body/UI) via `next/font/google`
- **Email**: Resend (`/api/contact`) — contact form + product inquiry form
- **Language**: TypeScript

## Getting started

```bash
npm install
npm run dev     # development server at localhost:3000
npm run build   # production build
```

Add a `.env.local` file at the root with your Resend API key for local email testing:

```
RESEND_API_KEY=re_your_key_here
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key — set in Vercel and `.env.local` |
| `CONTACT_EMAIL` | No | Override recipient address (defaults to `hello@fjordleather.com`) |

## Adding or editing products

**Admin UI (recommended):**

```bash
npm run admin   # opens local admin at http://localhost:3001
```

Two tabs: **Add Product** (category filter → copy-from dropdown, drag-and-drop images) and **Edit Product** (category filter → product dropdown, update fields/images, mark as sold, delete). Product lists refresh automatically after every save. Local only — never deployed.

**CLI (alternative):**

```bash
npm run add-product -- path/to/product.json
npm run test:admin   # run admin unit tests (70 tests, no deps)
```

See `data/product-intake.example.json` for the expected format.

## Project structure

```
app/                       # Next.js App Router pages
  page.tsx                 # Homepage (random hero phrase, pull quote, materials)
  catalog/                 # Collection / filter page
  products/[slug]/         # Product detail page + inline inquiry form
  about/                   # Craft / brand story
  contact/                 # Contact form
  api/contact/             # POST — sends email via Resend
components/
  nav/                     # SiteHeader (logo) + Navigation (sticky, mobile drawer)
  footer/                  # Footer
  common/                  # Button, Container, AnimateOnScroll
  hero/                    # HeroHeading (random phrase picker)
  product-card/            # ProductCard
  product-inquiry/         # ProductInquiryForm (inline PDP inquiry)
  image-gallery/           # ImageGallery (PDP)
data/
  products.ts              # All product data
  hero-phrases.ts          # Hero heading phrase pool — edit freely
  categories.ts            # Category definitions
  tanneries.ts             # TANNERY_REGISTRY — 17 Tuscan tanneries
  types.ts                 # TypeScript types
  utils.ts                 # Data access helpers
lib/
  constants.ts             # BRAND_NAME, NAV_LINKS, SITE_URL, CONTACT_EMAIL
  utils.ts                 # formatPrice, cn, slugify
docs/design/               # Design system documentation
public/
  images/products/         # Product images (SVG placeholders until real photography)
  images/tanneries/        # Tannery logo files
  robots.txt
  sitemap.xml
scripts/
  add-product.mjs          # Product intake CLI
tools/
  admin-core.mjs           # Pure admin logic (exported, testable)
  admin-server.mjs         # Local admin UI (port 3001) — not deployed
  admin-server.test.mjs    # Unit test suite (npm run test:admin)
```

## Design

Nordic minimalist — warm neutrals, generous whitespace, EB Garamond editorial type, no rounded corners, no drop shadows. Full design system in `docs/design/design-system.md`.

**Color accent**: Cognac `#8B5A2B`. **Logo zone**: Linen `#FEEBCF`. **Hero / about opener**: Buckskin `#DED0B6`. White backgrounds are forbidden.

The site header (`SiteHeader`) is a static, in-flow component that displays the brand logo centered. The sticky navigation (`Navigation`) sits below it with an obsidian background and chalk text.

## Deployment

Vercel connected to `https://github.com/stanz-stanz/fjordleather`. Auto-deploys on push to `main`.

**Domain & email routing**: `fjordleather.com` is registered on Cloudflare. Inbound email (`hello@fjordleather.com`) is handled via Cloudflare Email Routing — forwarded to the owner's personal inbox. No mail server required. Outbound transactional email (contact/inquiry forms) goes through Resend.

**Environment variables to set in Vercel:**
- `RESEND_API_KEY` — from resend.com dashboard
- `CONTACT_EMAIL` — recipient for contact/inquiry emails

**Pending after domain confirmed:**
1. Update `SITE_URL` and `CONTACT_EMAIL` in `lib/constants.ts`
2. Update `public/sitemap.xml` with real domain

## Repository

`https://github.com/stanz-stanz/fjordleather`
