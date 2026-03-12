# Fiord Leather -- Component Specifications

> All measurements reference tokens from `design-system.md`. All colors, fonts, and spacing must use design tokens -- never raw values.

---

## 1. Navigation

### Desktop Navigation Bar

**Structure**: Full-width sticky bar. Logo left, navigation links center, utility icons right (search, account, cart with count badge).

| Property           | Value                                              |
|--------------------|----------------------------------------------------|
| Height             | 72px                                                |
| Background         | `chalk` with `backdrop-filter: blur(12px)` on scroll |
| Bottom border      | None at top. On scroll: `shadow-nav`                |
| Padding horizontal | Container padding (`space-md` mobile, `space-xl` desktop) |
| Z-index            | `z-sticky` (30)                                     |
| Position           | `sticky`, `top: 0`                                  |

**Logo**:
- Left-aligned
- Wordmark: "FIORD" in Jost 500, 16px, `letter-spacing: 0.2em`, uppercase, color `obsidian`
- Below wordmark: "LEATHER" in Jost 300, 10px, `letter-spacing: 0.3em`, uppercase, color `stone`
- Total logo block height: approximately 32px

**Navigation Links** (centered):
- Font: `text-overline` treatment (Jost 500, 11px, `letter-spacing: 0.15em`, uppercase)
- Color: `obsidian`
- Gap between links: `space-xl` (32px)
- Items: Women, Men, Objects, Artisan, Stories

**Link Hover State**:
- Underline animation: a 1px `obsidian` line grows from left to right beneath the text
- Width: 0 to 100% over `gentle` (300ms) with `ease-in-out`
- Underline sits 4px below the baseline

**Link Active State**:
- Persistent 1px underline in `obsidian`
- No additional color change (the underline alone signals active)

**Utility Icons** (right-aligned):
- Icon size: 20px
- Color: `obsidian`
- Gap between icons: `space-lg` (24px)
- Cart badge: 14px circle (`radius-full`), background `obsidian`, text `chalk`, Jost 500, 9px
- Hover: color transitions to `bark` over `gentle`

**Scroll Behavior**:
- On scroll past 1px: background gains `backdrop-filter: blur(12px)`, `shadow-nav` appears
- Transition: `gentle` (300ms) for background and shadow

### Mobile Navigation

**Trigger**: Hamburger icon (three lines, 20px wide, 1px stroke, `obsidian`) replaces centered nav links below `lg` (1024px) breakpoint.

**Drawer**:
- Slides in from left via `slideInLeft` animation (`drift`, 800ms)
- Full viewport height, width: 85vw (max 400px)
- Background: `chalk`
- Z-index: `z-max` (100)
- Overlay behind drawer: `obsidian` at 40% opacity, `z-overlay` (40)

**Drawer Content**:
- Padding: `space-2xl` (48px) top, `space-lg` (24px) horizontal
- Navigation links stacked vertically
- Font: Cormorant Garamond 300, 28px (display treatment for mobile nav)
- Color: `obsidian`
- Gap between links: `space-lg` (24px)
- Stagger animation: each link fades up with 75ms delay
- Close button: top-right corner, X icon 20px, padding `space-md`

### Accessibility

- `<nav>` landmark with `aria-label="Main navigation"`
- Mobile drawer: `role="dialog"`, `aria-modal="true"`, focus trapped within
- Close on `Escape` key
- Hamburger: `aria-expanded` toggles, `aria-controls` references drawer ID
- Skip-to-content link as first focusable element (visible on focus only)

---

## 2. Hero Section

### Layout

**Desktop** (>= `lg`):
- Full-bleed section, no max-width constraint on the image
- Image occupies the right 65% of the viewport (7 of 12 grid columns, bleeding right)
- Text content positioned in the left 45%, overlapping the image by approximately 10%
- This creates an asymmetric, editorial layout where text floats over the image edge
- Vertical padding: `space-4xl` (96px) top and bottom

**Mobile** (< `lg`):
- Stacked: image on top (full width, `aspect-editorial` 4:5), text below
- Text padding: `space-lg` (24px) horizontal, `space-xl` (32px) vertical

### Image

| Property       | Value                                          |
|----------------|------------------------------------------------|
| Object fit     | `cover`                                        |
| Min height     | 600px desktop, 400px mobile                    |
| Max height     | 85vh desktop                                   |
| Loading        | `priority` (Next.js Image with `priority` prop)|

### Text Content

| Element    | Style                                                                   |
|------------|-------------------------------------------------------------------------|
| Overline   | `text-overline` treatment, color `stone`, margin-bottom `space-md`       |
| Headline   | Cormorant Garamond 300 italic, `text-hero` (72px desktop, 40px mobile), color `obsidian` (or `chalk` on dark images) |
| Subhead    | Jost 300, `text-body-lg` (18px), color `bark`, max-width 480px, margin-top `space-lg` |
| CTA Button | Primary button (see Button System), margin-top `space-xl`               |

### Animation

- Content enters via `fadeUp` animation (`drift`, 800ms, `ease-out`)
- Stagger: overline at 0ms, headline at 150ms, subhead at 300ms, CTA at 450ms
- Triggered on page load (hero is always above the fold)

### Accessibility

- `<section>` with `aria-label` describing the campaign or collection
- Hero image: decorative if text conveys the same message (`alt=""`), otherwise descriptive alt text
- CTA button must have descriptive text (not "Shop Now" alone -- prefer "Shop the Fjord Collection")

---

## 3. Product Card

### Dimensions

| Property         | Value                              |
|------------------|------------------------------------|
| Width            | Fluid, determined by grid column   |
| Image ratio      | 3:4 (`aspect-product`)             |
| Internal padding | 0 (image flush to edges), `space-md` (16px) below image for text |
| Gap below image  | `space-md` (16px)                  |
| Text area height | Auto                               |

### Image Area

- `overflow: hidden` for hover scale effect
- Background: `linen` (visible during image load)
- Next.js `<Image>` with `sizes` attribute for responsive loading
- Skeleton loader: `linen` background with a subtle shimmer animation (gradient moving left to right, `drift` duration, infinite loop)

### Text Content

| Element       | Style                                                             |
|---------------|-------------------------------------------------------------------|
| Category      | `text-overline` treatment, color `stone`, margin-bottom `space-xs` |
| Product Name  | Cormorant Garamond 600, `text-title` (22px), color `obsidian`, margin-bottom `space-xs` |
| Material      | Jost 300, `text-body-sm` (14px), color `stone`                    |
| Price         | Jost 400, `text-body` (16px), color `obsidian`, margin-top `space-sm` |

### States

**Default**:
- No shadow
- Image at `scale(1)`
- Cursor: `pointer` (entire card is a link)

**Hover**:
- Image scales to `1.03` over `gentle` (300ms) with `ease-in-out`
- Shadow transitions from none to `shadow-product`
- Product name color remains `obsidian` (no color change)
- No underline appears on hover

**Focus-visible**:
- `outline: 2px solid fjord`, `outline-offset: 2px` on the card wrapper
- No other visual change

**Loading (Skeleton)**:
- Image area: `linen` background, shimmer gradient animation
- Text lines: 3 rounded rectangles (`radius-sm`), `linen` background, shimmer
- Line widths: 40% (category), 80% (name), 30% (price)

### Accessibility

- Entire card wrapped in a single `<a>` tag linking to the PDP
- `aria-label` includes full product info: "Intrecciato Medium Tote, Espresso, $3,200"
- Image `alt` describes the product visually: "Espresso brown woven leather tote bag"
- Skeleton state: `aria-busy="true"`, `aria-label="Loading product"`

### Implementation Notes

- Use Next.js `<Link>` wrapping the card for client-side navigation
- Image: `<Image>` component with `fill` and `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"`
- Card hover scale only applies to the image container, not the entire card

---

## 4. Button System

### Shared Properties

| Property         | Value                                   |
|------------------|-----------------------------------------|
| Font             | Jost 500, `letter-spacing: 0.1em`, uppercase |
| Border radius    | `radius-none` (0px) -- sharp edges      |
| Cursor           | `pointer`                                |
| Transition       | All properties over `gentle` (300ms) with `ease-in-out` |
| Focus ring       | 2px solid `fjord`, offset 2px            |
| Disabled opacity | 0.4, `cursor: not-allowed`               |

### Sizes

| Size | Font Size | Padding (y / x)        | Min Width | Height |
|------|-----------|------------------------|-----------|--------|
| `sm` | 10px      | `space-sm` / `space-md` | 100px     | 36px   |
| `md` | 11px      | `space-sm` / `space-lg` | 140px     | 44px   |
| `lg` | 12px      | 14px / `space-xl`       | 180px     | 52px   |

### Variants

#### Primary

| State    | Background  | Text    | Border |
|----------|-------------|---------|--------|
| Default  | `obsidian`  | `chalk` | None   |
| Hover    | `bark`      | `chalk` | None   |
| Active   | `espresso`  | `chalk` | None   |
| Disabled | `obsidian` at 0.4 opacity | `chalk` | None |
| Loading  | `obsidian`  | Hidden (spinner visible) | None |

#### Secondary

| State    | Background    | Text       | Border                |
|----------|---------------|------------|-----------------------|
| Default  | Transparent   | `obsidian` | 1px solid `obsidian`  |
| Hover    | `obsidian`    | `chalk`    | 1px solid `obsidian`  |
| Active   | `espresso`    | `chalk`    | 1px solid `espresso`  |
| Disabled | Transparent at 0.4 | `obsidian` at 0.4 | 1px solid `stone` |

#### Ghost

| State    | Background  | Text       | Decoration              |
|----------|-------------|------------|--------------------------|
| Default  | Transparent | `obsidian` | None                     |
| Hover    | Transparent | `obsidian` | 1px underline, left-to-right animation |
| Active   | Transparent | `bark`     | 1px underline            |
| Disabled | Transparent | `stone`    | None                     |

#### Icon Button

| Property    | Value                                   |
|-------------|-----------------------------------------|
| Size        | 44px square (touch target minimum)       |
| Icon size   | 20px                                     |
| Background  | Transparent                              |
| Hover       | Background `linen`                       |
| Border      | None                                     |
| Radius      | `radius-none`                            |

### Loading State

- Spinner: 16px circle, 2px stroke, `chalk` (primary) or `obsidian` (secondary)
- Spinner animation: `rotate 1s linear infinite`
- Button text hidden via `opacity: 0` (button maintains its size)
- `aria-busy="true"`, `aria-disabled="true"` while loading

### Accessibility

- Minimum touch target: 44px on all interactive buttons
- `<button>` element (never `<div>` or `<span>`)
- Icon-only buttons require `aria-label`
- Loading state: `aria-busy="true"`, visually hidden "Loading" text for screen readers
- Disabled buttons remain in the tab order with `aria-disabled="true"` (not `disabled` attribute, which removes from tab order)

---

## 5. Form Elements

### Text Input

**Structure**: Label above, input below. No box border -- bottom border only.

| Property             | Value                                       |
|----------------------|---------------------------------------------|
| Height               | 48px                                         |
| Background           | Transparent                                  |
| Border               | None except bottom: 1px solid `stone`        |
| Border (focus)       | Bottom: 2px solid `fjord`                    |
| Border (error)       | Bottom: 2px solid `error`                    |
| Font                 | Jost 300, `text-body` (16px), color `obsidian` |
| Padding              | 0 horizontal, `space-sm` (8px) bottom        |
| Placeholder color    | `stone`                                      |
| Caret color          | `fjord`                                      |

**Label**:
- Default: Jost 400, `text-label` (12px), color `stone`, positioned above input
- Animated float: when input is empty and unfocused, label sits at the input text baseline position (Jost 300, 16px, `stone`). On focus or when filled, label floats up to its position above with `text-label` size. Transition: `gentle` (300ms) with `ease-out`.
- Color on focus: `fjord`

**Error State**:
- Border bottom: 2px solid `error`
- Error message: Jost 400, `text-caption` (13px), color `error`, margin-top `space-xs` (4px)
- `aria-invalid="true"`, `aria-describedby` linking to error message ID

**Helper Text**:
- Jost 400, `text-caption` (13px), color `stone`, margin-top `space-xs`

### Select

- Same bottom-border-only style as text input
- Custom chevron icon (12px, `stone`, rotates on open)
- Dropdown: background `chalk`, `shadow-md`, `z-dropdown`
- Option hover: background `linen`
- Option font: Jost 300, `text-body` (16px)

### Textarea

- Same bottom-border style, extends to all four sides as a 1px `stone` border
- Min-height: 120px
- Resize: vertical only
- Padding: `space-md` (16px)
- Focus: full border changes to 1px solid `fjord`

### Accessibility

- Every input must have an associated `<label>` (visible or `sr-only`)
- Error messages linked via `aria-describedby`
- Required fields: `aria-required="true"` and visible "(Required)" text in label
- Inputs must not rely on placeholder text as the only label
- Color is never the sole indicator of error state (border + icon + text message)

---

## 6. Breadcrumb

Reference: Matches the breadcrumb visible in reference images (`Homepage > Women > Bags`).

### Structure

Horizontal list: `Home` > `Category` > **`Current Page`**

| Property            | Value                                            |
|---------------------|--------------------------------------------------|
| Font                | Jost 400, `text-label` (12px)                     |
| Link color          | `stone`                                           |
| Current page color  | `obsidian`, font-weight 500                       |
| Separator           | `>` character, color `stone`, padding 0 `space-sm` (8px) each side |
| Vertical position   | `space-lg` (24px) below nav, `space-lg` above page content |

### States

- Link hover: color transitions to `obsidian` over `swift` (150ms)
- Focus-visible: standard `fjord` focus ring on individual links

### Accessibility

- `<nav>` with `aria-label="Breadcrumb"`
- `<ol>` list structure for correct semantics
- Current page: `aria-current="page"`
- Separator is decorative: inserted via CSS (`::after`) or `aria-hidden="true"` on the character

---

## 7. Image Gallery / Carousel

Reference: Matches the PDP layout in reference image (`image.png`) -- large product image with dot navigation on the left side.

### Layout

**Desktop** (>= `lg`):
- Main image: large, occupying approximately 60% of the PDP width
- Thumbnail strip: vertical, positioned to the left of the main image
- Thumbnails: 64px wide, `aspect-product` (3:4), gap `space-sm` (8px)
- Active thumbnail: 1px border `obsidian`; inactive: 1px border `stone` at 30% opacity

**Mobile** (< `lg`):
- Full-width swipeable carousel
- Dot indicators on the left side, vertically stacked (matching reference image exactly)
- Active dot: 8px circle, `obsidian`
- Inactive dots: 6px circle, `stone`
- Dot gap: `space-sm` (8px)
- Dots positioned: left side, vertically centered against the image

### Image

| Property       | Value                                  |
|----------------|----------------------------------------|
| Background     | `linen` (loading placeholder)          |
| Aspect ratio   | `aspect-product` (3:4)                 |
| Object fit     | `contain` on white/light background    |
| Transition     | `fadeIn` on image load                 |

### Interaction

- **Swipe**: Touch gesture on mobile, drag on desktop (optional)
- **Thumbnail click**: Main image crossfades (`fadeIn`, `slow`)
- **Keyboard**: Arrow keys navigate between images when gallery is focused
- **Zoom**: On desktop, click main image to open fullscreen lightbox (`z-overlay`)

### Accessibility

- Gallery: `role="region"`, `aria-label="Product images"`
- `aria-roledescription="carousel"` on the container
- Each image: `role="tabpanel"`, `aria-label="Product image [n] of [total]"`
- Dots/thumbnails: `role="tablist"`, each is `role="tab"` with `aria-selected`
- Previous/Next (if visible): `aria-label="Previous image"` / `aria-label="Next image"`

---

## 8. Price Display

### Regular Price

| Property    | Value                                  |
|-------------|----------------------------------------|
| Font        | Jost 400, `text-body-lg` (18px)        |
| Color       | `obsidian`                              |
| Format      | Currency symbol, no space, comma-separated thousands: `$3,200` |

### Sale Price

| Element         | Style                                                    |
|-----------------|----------------------------------------------------------|
| Sale price      | Jost 400, `text-body-lg` (18px), color `error`           |
| Original price  | Jost 300, `text-body-sm` (14px), color `stone`, `line-through` decoration |
| Layout          | Sale price left, original price right with `space-sm` (8px) gap |

### PDP Price (larger)

| Property    | Value                                  |
|-------------|----------------------------------------|
| Font        | Jost 400, 24px                         |
| Color       | `obsidian`                              |

### Accessibility

- Prices wrapped in `<span>` with `aria-label` providing full price context: `aria-label="Price: $3,200"` or `aria-label="Sale price: $2,400, was $3,200"`
- Currency always visible (never icon-only)
- Sale: visually hidden text "Original price" and "Sale price" for screen readers

---

## 9. Badge / Tag

### Visual Style

| Property         | Value                                       |
|------------------|---------------------------------------------|
| Font             | Jost 400, 10px, `letter-spacing: 0.1em`, uppercase |
| Padding          | `space-xs` (4px) vertical, `space-sm` (8px) horizontal |
| Border radius    | `radius-none` (0px) -- sharp edges           |
| Display          | Inline-flex, center-aligned                   |

### Variants

| Variant     | Background  | Text        |
|-------------|-------------|-------------|
| New         | `obsidian`  | `chalk`     |
| Sale        | `error`     | `chalk`     |
| Bestseller  | Transparent | `obsidian`, border: 1px solid `stone` |
| Limited     | `fjord`     | `chalk`     |

### Positioning on Product Cards

- Absolute positioned: top-left corner of the image area
- Offset: `space-md` (16px) from top and left edges
- Z-index: `z-raised` (10)

### Accessibility

- Badges are informational: include in the card's `aria-label`
- If badge conveys critical info (e.g., "Sale"), it must not rely on color alone (text content carries the meaning)

---

## 10. Page Layouts

### Homepage

**Structure** (top to bottom):
1. **Navigation** (sticky)
2. **Hero Section** -- full-bleed editorial image with campaign text
3. **Category Row** -- 3 columns desktop, horizontal scroll mobile. Large editorial images (4:5) with category name overlay. Gap: `space-xl` (32px)
4. **Featured Products** -- Heading (Cormorant Garamond 300, `text-display`) + 4-column product grid. Section padding: `space-4xl` (96px) vertical
5. **Editorial Band** -- Full-bleed image with text overlay (alternating left/right alignment on successive bands). Background: `espresso` or editorial photograph
6. **New Arrivals Carousel** -- Horizontally scrolling product cards with peek (shows edge of next card). Heading + "View All" ghost link
7. **Brand Story** -- Two-column (text left, image right), padded within `container-fiord`. Text: Cormorant Garamond 300 italic pull quote + Jost body paragraph
8. **Footer** -- Background `espresso`, text `stone`/`chalk`

**Section Vertical Spacing**: `space-3xl` (64px) mobile, `space-4xl` (96px) desktop.

### Product Listing Page (PLP)

**Structure**:
1. **Navigation** (sticky)
2. **Breadcrumb** -- `space-lg` below nav
3. **Page Title** -- Cormorant Garamond 400, `text-headline` (40px), `space-lg` below breadcrumb
4. **Filter/Sort Bar** -- Height 48px, bottom border 1px `stone`. Filter triggers on left (Category, Color, Material, Size, Price), Sort dropdown on right. Font: `text-overline` treatment
5. **Product Grid** -- `container-fiord`, responsive columns:
   - Mobile: 2 columns, gap `space-md` (16px)
   - Tablet (`md`): 2 columns, gap `space-lg` (24px)
   - Desktop (`lg`): 3 columns, gap `space-xl` (32px)
   - Large (`xl`): 4 columns, gap `space-xl` (32px)
6. **Pagination** -- Centered, ghost-style page numbers. Active page: `obsidian` with underline. Prev/Next as ghost buttons.
7. **Footer**

**Product Count**: Jost 400, `text-body-sm`, color `stone`, positioned top-right of grid.

### Product Detail Page (PDP)

**Structure**:
1. **Navigation** (sticky)
2. **Breadcrumb** -- `space-lg` below nav
3. **Product Section** -- Two-column layout within `container-fiord`:
   - **Left column (55%)**: Image gallery (see Image Gallery component)
   - **Right column (45%)**: Product information, padding-left `space-2xl` (48px)
4. **Product Information** (right column, top to bottom):
   - Category: `text-overline`, color `stone`
   - Product Name: Cormorant Garamond 400, `text-headline` (40px on desktop, 28px mobile)
   - Price: Jost 400, 24px, margin-top `space-md`
   - Short Description: Jost 300, `text-body` (16px), color `bark`, margin-top `space-lg`, max-width 480px
   - Color Selector: Color swatches (24px circles with 1px border, gap `space-sm`), margin-top `space-xl`
   - Add to Cart: Primary button `lg`, full width, margin-top `space-xl`
   - Accordion sections below (Details, Materials, Shipping): border-top 1px `stone`, padding `space-md` vertical. Toggle icon rotates. Font: Jost 400, `text-body-sm` for headers; Jost 300, `text-body-sm` for content.
5. **Related Products** -- Section below, heading `text-subhead`, 4-column product card grid
6. **Footer**

**Mobile PDP**: Single column. Image gallery becomes swipeable carousel with dot indicators. Product info below.

### Accessibility (All Layouts)

- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<nav>`
- Heading hierarchy: exactly one `<h1>` per page, no skipped levels
- Landmark regions for all major page sections
- Skip-to-content link as first focusable element
- All interactive elements reachable by keyboard in logical order
- Images: meaningful alt text on product images, `alt=""` on decorative images
- Pagination: `<nav>` with `aria-label="Pagination"`, current page `aria-current="page"`
- Filter panel on mobile: opens as a dialog with focus trap

---

## Implementation Notes (General)

### Next.js Conventions

- Use the App Router (`/app` directory)
- Image optimization via `next/image` -- always specify `sizes` and use `fill` with parent positioning
- Hero images: `priority` prop for LCP optimization
- Product images: `loading="lazy"` (default)
- Metadata: use `generateMetadata` for SEO per page

### Tailwind CSS v4 Usage

- All design tokens are available via `@theme` in `tokens.css`
- Use token-based utilities: `text-obsidian`, `bg-chalk`, `font-display`, `shadow-product`
- Typography compound classes (`.text-style-hero`, `.text-style-overline`, etc.) are defined in `tokens.css` for convenience but can also be composed from atomic utilities
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Container: use `.container-fiord` class or compose with `mx-auto max-w-[1440px] px-4 md:px-8`

### Performance

- Fonts: loaded via Google Fonts with `display=swap`. Cormorant Garamond and Jost subsets should be preloaded for above-the-fold content.
- Critical CSS: hero section styles should be inlined or in the initial CSS chunk
- Product grid images: use `sizes` to prevent oversized downloads on mobile
- Animations: GPU-accelerated properties only (`transform`, `opacity`). Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
