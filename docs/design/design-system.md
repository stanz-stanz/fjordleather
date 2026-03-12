# Fiord Leather -- Design System

> Refined Nordic luxury minimalism. Silence as a design principle.

---

## 1. Brand Principles

### Stillhet (Stillness)
Every element earns its place. Generous negative space is not emptiness -- it is restraint made visible. The page breathes. Where other brands fill, Fiord subtracts.

### Hantverk (Craft)
The intrecciato weave is hours of hand-labor compressed into a single surface. Our digital experience mirrors this: every pixel, every transition, every typographic choice reflects deliberate craftsmanship.

### Nordisk Arv (Nordic Heritage)
Rooted in Scandinavian design tradition -- functional beauty, honest materials, understated confidence. The palette draws from Norwegian fjords: deep water, weathered stone, pale winter sky.

### Tidloshet (Timelessness)
We do not chase trends. The design system favors enduring proportions, classical typography, and a neutral palette that will not date. Seasonal accents evolve; the foundation does not.

---

## 2. Color System

### Primary Palette

| Token       | Name     | Hex       | Usage                                       |
|-------------|----------|-----------|---------------------------------------------|
| `obsidian`  | Obsidian | `#0F0D0C` | Primary text, primary button fills, headers  |
| `espresso`  | Espresso | `#1E160F` | Secondary dark, footer backgrounds, overlays |
| `bark`      | Bark     | `#3D2B1F` | Tertiary dark, hover states on dark elements |
| `stone`     | Stone    | `#C4B5A8` | Secondary text, borders, dividers, metadata  |
| `linen`     | Linen    | `#F0EBE3` | Card backgrounds, section alternation        |
| `chalk`     | Chalk    | `#FAF9F7` | Page background, nav bar, input backgrounds  |

### Accent Palette

| Token  | Name | Hex       | Usage                                           |
|--------|------|-----------|--------------------------------------------------|
| `fjord`| Fjord| `#8AA5BC` | Signature accent: links, focus rings, CTAs, highlights |
| `mist` | Mist | `#B8CEDA` | Light accent: hover tints, tag backgrounds, decorative |
| `sage` | Sage | `#9BA89E` | Tertiary accent: sustainability messaging, secondary tags |

### Semantic Colors

| Token     | Name    | Hex       | Usage                                    |
|-----------|---------|-----------|------------------------------------------|
| `error`   | Error   | `#C4432A` | Form validation errors, destructive actions |
| `success` | Success | `#4A7C59` | Success states, add-to-cart confirmation    |

### Accessibility Notes

- **Obsidian on Chalk** (`#0F0D0C` / `#FAF9F7`): contrast ratio 18.7:1 -- exceeds WCAG AAA
- **Obsidian on Linen** (`#0F0D0C` / `#F0EBE3`): contrast ratio 15.2:1 -- exceeds WCAG AAA
- **Stone on Chalk** (`#C4B5A8` / `#FAF9F7`): contrast ratio 2.1:1 -- **fails WCAG AA for body text**. Use Stone only for decorative/non-essential text at 16px+ or pair with Obsidian background.
- **Fjord on Chalk** (`#8AA5BC` / `#FAF9F7`): contrast ratio 3.1:1 -- passes WCAG AA for large text (18px+) only. For interactive elements at smaller sizes, use Fjord on Espresso or underline links.
- **Fjord on Obsidian** (`#8AA5BC` / `#0F0D0C`): contrast ratio 6.0:1 -- passes WCAG AA and AAA for large text.
- **Chalk on Obsidian** (`#FAF9F7` / `#0F0D0C`): contrast ratio 18.7:1 -- exceeds WCAG AAA.
- **Error on Chalk** (`#C4432A` / `#FAF9F7`): contrast ratio 5.0:1 -- passes WCAG AA.

### Usage Rules

1. **Never use Fjord as a background for body text.** It is an accent, not a surface.
2. **Stone is for metadata and decorative text only.** It must never carry essential information without an accompanying Obsidian label.
3. **Dark backgrounds** (Obsidian, Espresso) are reserved for hero overlays, footer, and the mobile navigation drawer. The primary page surface is always Chalk or Linen.
4. **Sale/discount pricing** uses Error red. Regular pricing uses Obsidian.

---

## 3. Typography System

### Font Families

| Token          | Family               | Role                | Fallback Stack                          |
|----------------|----------------------|---------------------|-----------------------------------------|
| `font-display` | Cormorant Garamond   | Headlines, heroes, editorial display | `'Cormorant Garamond', 'Georgia', 'Times New Roman', serif` |
| `font-body`    | Jost                 | Body copy, UI, navigation, forms     | `'Jost', 'Helvetica Neue', 'Arial', sans-serif`              |

### Type Scale

#### Display (Cormorant Garamond)

| Token           | Size   | Line Height | Letter Spacing | Weight | Usage                          |
|-----------------|--------|-------------|----------------|--------|--------------------------------|
| `text-hero`     | 72px   | 1.0         | -0.02em        | 300    | Homepage hero headline         |
| `text-display`  | 56px   | 1.05        | -0.02em        | 300    | Section titles, campaign heads |
| `text-headline` | 40px   | 1.15        | -0.01em        | 400    | Page titles, H1                |
| `text-subhead`  | 28px   | 1.25        | 0em            | 400    | Section subheads, H2           |
| `text-title`    | 22px   | 1.3         | 0em            | 600    | Card titles, H3                |

#### Body (Jost)

| Token           | Size   | Line Height | Letter Spacing | Weight | Usage                               |
|-----------------|--------|-------------|----------------|--------|---------------------------------------|
| `text-body-lg`  | 18px   | 1.65        | 0em            | 300    | Lead paragraphs, product descriptions |
| `text-body`     | 16px   | 1.65        | 0em            | 300    | Default body text                     |
| `text-body-sm`  | 14px   | 1.6         | 0.005em        | 400    | Secondary body text, form help text   |
| `text-caption`  | 13px   | 1.5         | 0.01em         | 400    | Captions, timestamps, fine print      |
| `text-label`    | 12px   | 1.4         | 0.03em         | 400    | Input labels, small metadata          |
| `text-overline` | 11px   | 1.3         | 0.15em         | 500    | Category tags, nav links, breadcrumbs (always uppercase) |

### Typography Rules

1. **Hero and display sizes** always use Cormorant Garamond weight 300 (Light). Use italic sparingly and only for editorial emphasis on heroes and campaign headlines.
2. **Cormorant Garamond 600 (SemiBold)** is reserved exclusively for `text-title` (H3/card titles).
3. **Jost is the workhorse.** All UI text, navigation, buttons, forms, prices, and body copy use Jost.
4. **Overline treatment** (navigation links, category labels, breadcrumbs): Jost 500, 11px, `letter-spacing: 0.15em`, `text-transform: uppercase`. This is a signature treatment and must be consistent across all instances.
5. **Italic usage in display**: Only Cormorant Garamond 300 italic for hero headlines. Never italicize Jost. Never italicize Cormorant Garamond body-sized text.
6. **Responsive scaling**: Hero text scales from 40px (mobile) to 72px (desktop). Display scales from 36px to 56px. Headline scales from 28px to 40px. Body sizes remain fixed.
7. **Maximum line length**: Body text must not exceed 70 characters per line (approximately 640px at 16px). Use `max-w-prose` or an explicit `max-width: 40rem`.

---

## 4. Spacing System

Base unit: **4px**

| Token      | Value  | Usage                                        |
|------------|--------|----------------------------------------------|
| `space-xs` | 4px    | Inline icon gaps, tight optical adjustments   |
| `space-sm` | 8px    | Input padding-y, badge padding, tight gaps    |
| `space-md` | 16px   | Default component padding, form field gaps    |
| `space-lg` | 24px   | Card padding, section sub-spacing             |
| `space-xl` | 32px   | Grid gutters (desktop), between card groups   |
| `space-2xl`| 48px   | Between sections on desktop                   |
| `space-3xl`| 64px   | Major section separation                      |
| `space-4xl`| 96px   | Hero vertical padding                         |
| `space-5xl`| 128px  | Page-level vertical rhythm on desktop         |

### Spacing Rules

1. **Mobile gutters**: 24px (`space-lg`). **Desktop gutters**: 32px (`space-xl`).
2. **Section vertical spacing**: 64px (`space-3xl`) on mobile, 96px (`space-4xl`) on desktop.
3. **Card internal padding**: 24px (`space-lg`) all sides.
4. **Always use the 4px grid.** No off-grid values. If a design comp shows 10px, use 8px or 12px instead.

---

## 5. Border Radius

| Token        | Value    | Usage                                              |
|--------------|----------|----------------------------------------------------|
| `radius-none`| 0px      | Buttons, cards, product images (default -- sharp)  |
| `radius-sm`  | 2px      | Inputs, badges, tags                                |
| `radius-md`  | 4px      | Tooltips, dropdowns, toasts                         |
| `radius-full`| 9999px   | Avatar circles, dot indicators, pills               |

### Radius Rules

1. **Buttons have no border radius.** This is a brand signature -- sharp, architectural edges.
2. **Cards have no border radius.** Product cards and content cards are rectangular.
3. **Images have no border radius** unless explicitly clipped to a circle (avatars only).
4. Border radius is used sparingly. When in doubt, use `radius-none`.

---

## 6. Shadow System

All shadows use warm brown undertones, not pure black, to maintain palette cohesion.

| Token            | Value                                              | Usage                        |
|------------------|----------------------------------------------------|------------------------------|
| `shadow-sm`      | `0 1px 2px rgba(30, 22, 15, 0.06)`                | Subtle depth: inputs on focus |
| `shadow-md`      | `0 4px 12px rgba(30, 22, 15, 0.08)`               | Cards at rest, dropdowns      |
| `shadow-lg`      | `0 12px 32px rgba(30, 22, 15, 0.12)`              | Modals, elevated panels       |
| `shadow-product` | `0 8px 24px rgba(30, 22, 15, 0.10)`               | Product card hover state      |
| `shadow-nav`     | `0 1px 0 rgba(30, 22, 15, 0.05)`                  | Sticky nav bottom edge        |

### Shadow Rules

1. **Product cards** have no shadow at rest. Shadow appears only on hover (transition to `shadow-product`).
2. **Navigation bar** gains `shadow-nav` only after scroll (when it becomes sticky).
3. **Never use pure black shadows** (`rgba(0,0,0,...)`). Always use the warm Espresso-based `rgba(30, 22, 15, ...)`.

---

## 7. Motion System

### Duration Tokens

| Token     | Value  | Usage                                        |
|-----------|--------|----------------------------------------------|
| `instant` | 0ms    | Immediate state changes (checkbox, radio)    |
| `swift`   | 150ms  | Micro-interactions: button press, icon swap  |
| `gentle`  | 300ms  | Hover states, focus rings, color transitions |
| `slow`    | 500ms  | Page element entrances, card hover lifts     |
| `drift`   | 800ms  | Hero animations, staggered list reveals      |

### Easing Curves

| Token              | Value                          | Usage                          |
|--------------------|--------------------------------|--------------------------------|
| `ease-out`         | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances -- elements arriving  |
| `ease-in-out`      | `cubic-bezier(0.76, 0, 0.24, 1)`| Transitions -- state changes   |
| `ease-in`          | `cubic-bezier(0.55, 0.05, 0.68, 0.53)` | Exits -- elements departing |

### Component Animations

| Animation     | Duration | Easing      | Description                                          |
|---------------|----------|-------------|------------------------------------------------------|
| `fadeUp`      | `drift`  | `ease-out`  | Translate Y 24px to 0, opacity 0 to 1. Hero content, section reveals. |
| `fadeIn`      | `slow`   | `ease-out`  | Opacity 0 to 1. Image loading, overlay appearance.   |
| `scaleIn`     | `slow`   | `ease-out`  | Scale 0.97 to 1, opacity 0 to 1. Modal entrance.     |
| `slideInLeft` | `drift`  | `ease-out`  | Translate X -100% to 0. Mobile nav drawer.            |
| Hover lift    | `gentle` | `ease-in-out` | Product card image scale 1 to 1.03, shadow appears. |
| Nav underline | `gentle` | `ease-in-out` | Width 0 to 100% from left. Nav link hover.          |

### Motion Rules

1. **Luxury is patience.** Prefer `gentle` (300ms) and `slow` (500ms) over `swift` (150ms). Fast animations feel cheap.
2. **Stagger delays**: When multiple elements enter together (e.g., product grid), stagger each by 75ms.
3. **Respect `prefers-reduced-motion`**: All animations must be wrapped in a media query check. Reduced motion falls back to instant opacity transitions.
4. **No bounce, no overshoot.** Easing curves are smooth and decelerating. Spring physics are not used.
5. **Scroll-triggered animations** fire once only. Elements do not re-animate when scrolled out and back in.

---

## 8. Breakpoints

Mobile-first responsive design.

| Token   | Min Width | Usage                          |
|---------|-----------|--------------------------------|
| `sm`    | 640px     | Large phones, landscape         |
| `md`    | 768px     | Tablets                         |
| `lg`    | 1024px    | Small laptops, tablet landscape |
| `xl`    | 1280px    | Desktops                        |
| `2xl`   | 1536px    | Large displays                  |

---

## 9. Grid System

| Property     | Mobile (< 768px) | Desktop (>= 768px) |
|--------------|-------------------|---------------------|
| Columns      | 4                 | 12                  |
| Gutter       | 24px              | 32px                |
| Margin       | 16px              | 32px                |
| Max Width    | 100%              | 1440px              |
| Container Padding | 16px         | 32px                |

### Grid Rules

1. **Product listing grids**: 1 column mobile, 2 columns tablet, 3 columns small desktop, 4 columns large desktop.
2. **Content max-width**: 1440px centered. Content within the grid should not touch the viewport edge (maintained by container padding).
3. **Asymmetric hero layouts**: The hero image occupies 7 of 12 columns (approximately 58%) on desktop. Text content overlaps from the remaining columns, shifted left to overlay the image edge.
4. **Full-bleed sections** break out of the container and span the full viewport width (used for hero images, editorial bands).

---

## 10. Z-Index Scale

| Token        | Value | Usage                              |
|--------------|-------|------------------------------------|
| `z-base`     | 0     | Default content layer               |
| `z-raised`   | 10    | Sticky elements, cards on hover     |
| `z-dropdown` | 20    | Dropdown menus, tooltips            |
| `z-sticky`   | 30    | Sticky navigation bar               |
| `z-overlay`  | 40    | Background overlays, lightbox dim   |
| `z-modal`    | 50    | Modal dialogs                        |
| `z-toast`    | 60    | Toast notifications                  |
| `z-max`      | 100   | Mobile nav drawer, critical overlays |

### Z-Index Rules

1. **Never use arbitrary z-index values.** Always reference a token.
2. **The mobile nav drawer** sits at `z-max` because it must cover everything including modals.
3. **Toast notifications** sit above modals (`z-toast`) so they remain visible during modal interactions.
