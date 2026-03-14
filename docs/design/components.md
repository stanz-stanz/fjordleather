# Fjordleather — Component Specifications

> All measurements reference tokens from `design-system.md`. All colors, fonts, and spacing must use design tokens — never raw values.

---

## 1. Site Header

**Component**: `components/nav/SiteHeader.tsx` — Static Server Component. Renders above the sticky nav, in normal document flow.

| Property         | Value                                                                      |
|------------------|----------------------------------------------------------------------------|
| Background       | `linen` — `#FEEBCF` (sampled from logo background)                        |
| `marginBottom`   | `-48px` — pulls the nav upward to overlap the gradient zone               |
| Position         | Normal flow (not sticky, not fixed)                                        |

**Logo image**:
- File: `public/images/logo.png`
- Tag: plain `<img>` (not `next/image` — static export, `images.unoptimized: true`)
- Class: `site-header-logo` (defined in `globals.css`)
- Width: `96%` on mobile, `80%` at `min-width: 768px` — no max-width cap
- Left offset: `margin-left: 1%`
- Height: `auto` — preserves native aspect ratio (4.53:1), no cropping
- Link wrapper: `<Link href="/">` with `paddingTop: 12px` for breathing room
- Wraps in a `<Link href="/">` for homepage navigation

**Gradient**:
- A 48px `<div>` placed as a block element *below* the image (not absolutely positioned over it)
- `background: linear-gradient(to bottom, #FEEBCF, rgba(254,235,207,0.6) 60%, transparent)`
- Fades the linen header color into transparency, overlapping the obsidian nav below
- `pointer-events: none`, `aria-hidden="true"`

> **Do not** use absolute positioning for the gradient — it would overlay the bottom of the logo artwork.

---

## 2. Navigation

### Desktop Navigation Bar

**Component**: `components/nav/Navigation.tsx` — Client Component (`'use client'`).

| Property           | Value                                                             |
|--------------------|-------------------------------------------------------------------|
| Height             | 56px                                                              |
| Background         | Obsidian (`#0F0D0C`) — always. Never chalk or white.             |
| Bottom border      | 1px solid `stone/20` on scroll; `transparent` at top             |
| Backdrop blur      | `backdrop-blur-[8px]` on scroll                                   |
| Padding horizontal | Container padding (`space-md` mobile, `space-xl` desktop)         |
| Z-index            | `z-sticky` (30)                                                   |
| Position           | `sticky`, `top: 0`                                                |

**Navigation Links** (right-aligned, hidden below `lg`):
- Font: Jost 400, 14px, `letter-spacing: 0.14em`, uppercase
- Color: chalk (`#FAF9F7`) — applied via inline `style` (Tailwind token resolution unreliable here)
- Gap between links: `gap-10` (Tailwind)

**Scroll Behavior**:
- On scroll past 1px: `border-b border-stone/20`, `backdrop-blur-[8px]`
- Transition: 300ms

### Mobile Navigation

**Trigger**: Hamburger icon (three chalk lines, 20px wide, 1px stroke) — visible below `lg` breakpoint.

**Drawer**:
- Slides in from the **right** via CSS `translate-x-full → translate-x-0`
- Duration: 700ms, `cubic-bezier(0.16, 1, 0.3, 1)`
- Width: 80vw (max 360px)
- Full viewport height
- Background: `obsidian`
- Z-index: `z-max` (100)
- Overlay behind drawer: `obsidian/30` at `z-overlay` (40)

**Drawer Content**:
- Close button top-right: `×` character, 28px, opacity 60% → 100% on hover
- Navigation links: EB Garamond 400, 28px, stacked with `gap-6`
- Color: `obsidian/60` inactive → `obsidian` active/hover
- Contact email at the bottom: Jost 300, 13px, `stone`

### Accessibility

- `<nav>` landmark with `aria-label="Main navigation"`
- Mobile drawer: `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation menu"`
- Close on `Escape` key
- Hamburger: `aria-expanded` toggles, `aria-controls` references drawer ID
- Body scroll locked while drawer open
- Drawer closes on route change
- Skip-to-content link as first focusable element (visible on focus only), targets `#main-content`
- **Focus trap implemented**: Tab/Shift+Tab cycles within drawer only. Focus moves to first focusable element on open; returns to hamburger button on close.

---

## 3. Hero Section (Homepage)

### Layout

Full-width section, no image. Typography carries the space until real photography arrives.

| Property           | Value                                          |
|--------------------|------------------------------------------------|
| Background         | Warm ivory `#F0E6D0` — never white, never chalk |
| Padding top        | 96px                                           |
| Padding bottom     | 120px                                          |

### Content (left-aligned, max-width 820px)

| Element    | Style                                                                                  |
|------------|----------------------------------------------------------------------------------------|
| Overline   | Jost 300, 13px, uppercase, `letter-spacing: 0.2em`, color `cognac`, mb 40px           |
| Headline   | Cormorant Garamond 400, `clamp(60px, 9vw, 104px)`, `lineHeight: 0.95`, `letterSpacing: -0.03em`, color `obsidian`, mb 48px |
| Body copy  | Jost 300, 17px, `lineHeight: 1.7`, color `obsidian`, `maxWidth: 380px`, mb 40px       |
| CTA        | `.cta-primary` — stacked below body copy, not beside it                                |

### `.cta-primary` class

Defined in `globals.css`. Obsidian fill, chalk text, 14px Jost 400 uppercase, `letter-spacing: 0.14em`, `padding: 16px 40px`. Hover → `bark`. Zero border-radius.

### Accessibility

- `<section>` with `aria-label`
- One `<h1>` per page — this is it
- CTA must have descriptive text

---

## 4. Product Card

### Dimensions

| Property    | Value                              |
|-------------|------------------------------------|
| Width       | Fluid, determined by grid column   |
| Image ratio | 3:4 (`aspect-product`)             |

### Image Area

- `overflow: hidden` for hover scale
- Background: `linen` (visible during load / placeholder)
- Next.js `<Image>` with `fill` and `sizes` attribute

### Text Content

| Element       | Style                                                             |
|---------------|-------------------------------------------------------------------|
| Category      | `.text-style-overline`, color `stone`                            |
| Product Name  | Cormorant Garamond 400, 22px, `leading-tight`, color `obsidian`  |
| Price         | Jost 300, 16px, color `obsidian`                                 |

### States

**Default**: No shadow. Image at `scale(1)`.

**Hover**: Image scales to `1.03` over 500ms `cubic-bezier(0.16, 1, 0.3, 1)`. No shadow added.

**Focus-visible**: `outline: 2px solid cognac`, `outline-offset: 2px` on the card link.

### "New" Badge

- Absolute top-left of image, `z-raised`
- Jost 500, 9px, uppercase, `letter-spacing: 0.12em`
- Background: `cognac`, text: `chalk`
- Zero border-radius

### Accessibility

- Entire card is a single `<Link>` wrapping image + text
- `aria-label` on the link: `"${name} — ${formatPrice(price, currency)}"`
- Image `alt` describes the product

---

## 5. Button System

### Shared Properties

| Property      | Value                                                  |
|---------------|--------------------------------------------------------|
| Font          | Jost 400–500, `letter-spacing: 0.1em`, uppercase       |
| Border radius | 0px — sharp edges, brand signature                     |
| Cursor        | `pointer`                                              |
| Transition    | All properties 300ms `cubic-bezier(0.76, 0, 0.24, 1)` |
| Focus ring    | `2px solid cognac`, `outline-offset: 2px`              |
| Disabled      | `opacity: 0.4`, `cursor: not-allowed`                  |

### Sizes

| Size | Font Size | Height | Padding (x) | Min Width |
|------|-----------|--------|-------------|-----------|
| `sm` | 12px      | 40px   | 20px        | 100px     |
| `md` | 13px      | 48px   | 28px        | 140px     |
| `lg` | 14px      | 56px   | 40px        | 200px     |

### Variants

#### Primary

| State    | Background | Text    |
|----------|------------|---------|
| Default  | `cognac`   | `chalk` |
| Hover    | `bark`     | `chalk` |
| Active   | `espresso` | `chalk` |
| Disabled | `cognac` at 0.4 opacity | `chalk` |

#### Secondary

| State    | Background  | Text       | Border               |
|----------|-------------|------------|----------------------|
| Default  | Transparent | `obsidian` | 1px solid `obsidian` |
| Hover    | `obsidian`  | `chalk`    | 1px solid `obsidian` |
| Active   | `espresso`  | `chalk`    | 1px solid `espresso` |
| Disabled | Transparent | `obsidian` at 0.4 | 1px solid `stone` |

#### Ghost

| State    | Background  | Text       | Decoration                          |
|----------|-------------|------------|-------------------------------------|
| Default  | Transparent | `obsidian` | Bottom border `obsidian`            |
| Hover    | Transparent | `obsidian` | 60% opacity                         |
| Active   | Transparent | `bark`     | Bottom border                       |
| Disabled | Transparent | `stone`    | No border, `opacity: 1`             |

### Implementation Note

`Button` renders as `<Link>` when `href` is passed, as `<button>` otherwise. The `.cta-primary` CSS class in `globals.css` is a simpler alternative safe for Server Components (no client-side interactivity needed).

---

## 6. Form Elements

### Text Input

Bottom-border-only style — no box border.

| Property          | Value                                    |
|-------------------|------------------------------------------|
| Height            | 48px                                     |
| Background        | Transparent                              |
| Border            | Bottom only: 1px solid `stone`           |
| Border (focus)    | Bottom: 2px solid `obsidian`             |
| Border (error)    | Bottom: 2px solid `error`                |
| Font              | Jost 300, 16px, color `obsidian`         |
| Placeholder color | `stone`                                  |

**Label**: Jost 300, 13px, color `stone`, positioned above input.

**Error State**: Border bottom 2px `error`. Error message: Jost 400, 13px, `error`, margin-top 4px. `aria-invalid="true"`, `aria-describedby` pointing to error message.

### Textarea

Same bottom-border style. Min-height 120px. Resize: vertical only. On focus: `border-color: obsidian`.

### Accessibility

- Every input has an associated `<label>`
- Error messages linked via `aria-describedby`
- Color is never the sole indicator of error state

---

## 7. Image Gallery (PDP)

### Layout

**Desktop** (>= `lg`):
- Main image: ~60% of PDP width
- Thumbnail strip: vertical, to the left of the main image
- Thumbnails: 64px wide, `aspect-product` (3:4), gap 8px
- Active thumbnail: 1px border `obsidian`; inactive: `stone/30`

**Mobile** (< `lg`):
- Full-width horizontal scroll
- Thumbnail strip scrolls horizontally below the main image

### Interaction

- Thumbnail click: sets active image
- Keyboard: Arrow keys navigate when `tabIndex={0}` gallery region has focus — scoped to `onKeyDown` on the region element (not a global `window` listener)

### Accessibility

- `role="region"`, `aria-label="Product images"`
- `aria-roledescription="carousel"` on the container
- Each image: descriptive `alt` text
- Focus ring: `outline: 2px solid cognac`

---

## 8. AnimateOnScroll

Wrapper component using `IntersectionObserver`. Adds `.is-visible` class to child elements with `[data-animate="fade-up"]` when they enter the viewport.

CSS (in `globals.css`):
```css
[data-animate="fade-up"] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
}
[data-animate="fade-up"].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

Use `style={{ transitionDelay: `${i * 80}ms` }}` on each staggered child.

Respects `prefers-reduced-motion` via the global rule in `globals.css`.

---

## 9. Page Layouts

### Homepage

Top to bottom:
1. **SiteHeader** — linen logo zone, static in document flow
2. **Navigation** — obsidian sticky bar, 56px
3. **Hero** — warm ivory (`#F0E6D0`) background, left-aligned large EB Garamond heading, cognac overline, body copy, `.cta-primary` stacked below copy
4. **Selected Works** — warm section (non-white), 3-column product grid with `AnimateOnScroll`
5. **Pull Quote** — linen background, large italic EB Garamond blockquote, left-aligned
6. **Materials** — warm section, 3-column text grid with cognac overlines
7. **Footer**

### Catalog

1. **SiteHeader** + **Navigation** (sticky, `top: 0`)
2. **Sticky filter bar** — `top-[56px]`, category filter pills, client-side filter (no reload)
3. **Product grid** — 1 col mobile, `sm:grid-cols-2` tablet, `lg:grid-cols-3` desktop

### Product Detail Page (PDP)

1. **SiteHeader** + **Navigation** (sticky)
2. **Two-column layout** (60/40):
   - Left: `ImageGallery`
   - Right: sticky detail panel — category overline, name, price, description, materials, dimensions, Inquire CTA (mailto link)
3. **Related products** — 4-column grid below
4. **Footer**

### About

4 sections: hero statement, craft process, materials (full-bleed espresso maker's blockquote), values.

### Contact

Two-column on desktop: contact info left, form right. Form fields: bottom-border-only. Submit: mailto link.

---

## 9. Footer

**Background**: `espresso`
**Text**: `stone` / `chalk`
**Layout**: 3 columns on desktop, stacked mobile
**Content**: Brand name + tagline, nav links, contact email

---

## Implementation Notes

### Next.js Conventions

- App Router (`/app` directory), Server Components by default
- Event handlers and hooks require `'use client'` directive
- `next/image` with `fill` + `sizes` for all product images
- Hero images: `priority` prop
- `generateMetadata` for per-page SEO

### Tailwind CSS v4

- Tokens via `@theme inline` in `globals.css`
- Custom utilities: `.container-fiord`, `.cta-primary`, `.text-style-overline`, `.aspect-product`, `.scrollbar-hide`
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

### Performance

- Fonts loaded via `next/font/google` — no `@import url()` in CSS
- GPU-accelerated animations only: `transform`, `opacity`. Never animate `width`, `height`, `margin`, or `padding`.
- Product grid images: use `sizes` to prevent oversized downloads on mobile
