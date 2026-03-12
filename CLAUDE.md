
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
