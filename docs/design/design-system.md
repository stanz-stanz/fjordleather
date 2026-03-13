# Fjordleather — Design System

> Nordic minimalist, quietly sophisticated. Silence as a design principle.

---

## 1. Brand Principles

### Stillhet (Stillness)
Every element earns its place. Generous negative space is not emptiness — it is restraint made visible. The page breathes. Where other brands fill, Fjordleather subtracts.

### Hantverk (Craft)
Every stitch is hours of hand-labor. Our digital experience mirrors this: every pixel, every transition, every typographic choice reflects deliberate craftsmanship.

### Nordisk Arv (Nordic Heritage)
Rooted in Scandinavian design tradition — functional beauty, honest materials, understated confidence. The palette draws from Norwegian landscapes: deep charcoal, weathered stone, pale winter linen.

### Tidloshet (Timelessness)
We do not chase trends. The design system favors enduring proportions, classical typography, and a neutral palette that will not date.

### On Inspiration
Reference sites like Loake inform the *spirit* of this design — confidence without shouting, authority earned through restraint, typography that feels chosen by someone who reads books — but are never copied literally. Fjordleather is Nordic, not English. The voice is the maker's, not a brand's.

---

## 2. Color System

### Primary Palette

| Token       | Name     | Hex       | Usage                                        |
|-------------|----------|-----------|----------------------------------------------|
| `obsidian`  | Obsidian | `#0F0D0C` | Primary text, button fills, headers          |
| `espresso`  | Espresso | `#1E160F` | Footer backgrounds, dark overlays, CTA hover |
| `bark`      | Bark     | `#3D2B1F` | Hover states on dark elements, CTA hover     |
| `stone`     | Stone    | `#C4B5A8` | Secondary text, borders, dividers, metadata  |
| `linen`     | Linen    | `#F0EBE3` | Hero background, section alternation, cards  |
| `chalk`     | Chalk    | `#FAF9F7` | Page background, nav bar, input backgrounds  |

### Accent Palette

| Token           | Name          | Hex       | Usage                                              |
|-----------------|---------------|-----------|----------------------------------------------------|
| `cognac`        | Cognac        | `#8B5A2B` | Overlines, badges, focus rings, hover accents      |
| `cognac-light`  | Cognac Light  | `#C4956A` | Text selection highlight background                |

### Semantic Colors

| Token     | Name    | Hex       | Usage                                    |
|-----------|---------|-----------|------------------------------------------|
| `error`   | Error   | `#C4432A` | Form validation errors                   |
| `success` | Success | `#4A7C59` | Success states                           |

### Accessibility Notes

- **Obsidian on Chalk** (`#0F0D0C` / `#FAF9F7`): contrast ratio 18.7:1 — exceeds WCAG AAA
- **Obsidian on Linen** (`#0F0D0C` / `#F0EBE3`): contrast ratio 15.2:1 — exceeds WCAG AAA
- **Stone on Chalk** (`#C4B5A8` / `#FAF9F7`): contrast ratio 2.1:1 — **fails WCAG AA for body text**. Use Stone only for decorative/non-essential text (metadata, overlines, borders).
- **Chalk on Obsidian** (`#FAF9F7` / `#0F0D0C`): contrast ratio 18.7:1 — exceeds WCAG AAA.
- **Error on Chalk** (`#C4432A` / `#FAF9F7`): contrast ratio 5.0:1 — passes WCAG AA.

### Usage Rules

1. **Cognac is the sole accent.** It is used for overlines, focus rings, the "New" badge, and hover hints. Never as a background for body text.
2. **Stone is for metadata and decorative text only.** It must never carry essential information without an accompanying Obsidian label.
3. **Dark backgrounds** (Obsidian, Espresso) are reserved for the footer, mobile navigation drawer, and the `.cta-primary` button. The primary page surface is always Chalk or Linen.
4. **Linen (`#F0EBE3`) is warmer than Chalk** — use it for the hero and alternating editorial sections to avoid a "whiteboard" feeling.

---

## 3. Typography System

### Font Families

| Token          | Family             | Role                                  | Fallback Stack                                         |
|----------------|--------------------|---------------------------------------|--------------------------------------------------------|
| `font-display` | Cormorant Garamond | Headlines, heroes, editorial display  | `'Cormorant Garamond', 'Georgia', 'Times New Roman', serif` |
| `font-body`    | Jost               | Body copy, UI, navigation, forms      | `'Jost', 'Helvetica Neue', 'Arial', sans-serif`        |

Both loaded via `next/font/google` in `app/layout.tsx`. Do not add a Google Fonts `@import url()` in CSS — it is redundant and breaks Turbopack.

### Type Scale

#### Display (Cormorant Garamond)

| Token           | Size   | Line Height | Letter Spacing | Weight | Usage                          |
|-----------------|--------|-------------|----------------|--------|--------------------------------|
| `text-hero`     | 72px   | 1.0         | -0.02em        | 400    | Homepage hero — scales to 104px via `clamp()` |
| `text-display`  | 56px   | 1.05        | -0.02em        | 400    | Section titles, campaign heads |
| `text-headline` | 40px   | 1.15        | -0.01em        | 400    | Page titles, H1                |
| `text-subhead`  | 28px   | 1.25        | 0em            | 400    | Section subheads, H2           |
| `text-title`    | 22px   | 1.3         | 0em            | 400    | Card titles, H3                |

#### Body (Jost)

| Token           | Size   | Line Height | Letter Spacing | Weight | Usage                               |
|-----------------|--------|-------------|----------------|--------|---------------------------------------|
| `text-body-lg`  | 18px   | 1.65        | 0em            | 300    | Lead paragraphs, product descriptions |
| `text-body`     | 16px   | 1.65        | 0em            | 300    | Default body text                     |
| `text-body-sm`  | 14px   | 1.6         | 0.005em        | 400    | Secondary body text, form help text   |
| `text-caption`  | 13px   | 1.5         | 0.01em         | 400    | Captions, timestamps, fine print      |
| `text-label`    | 12px   | 1.4         | 0.03em         | 400    | Input labels, small metadata          |
| `text-overline` | 11px   | 1.3         | 0.15em         | 500    | Category tags, overlines (always uppercase) |

### Typography Rules

1. **Hero heading**: `clamp(60px, 9vw, 104px)`, Cormorant Garamond weight 400, `lineHeight: 0.95`, `letterSpacing: -0.03em`, left-aligned. Not centered. Italic only for editorial `<em>` within the headline.
2. **Cormorant Garamond** is for display only. Never use it for body copy, buttons, or UI elements.
3. **Jost is the workhorse.** All UI text, navigation, buttons, forms, prices, and body copy use Jost.
4. **Overline treatment** (nav links, category labels): Jost 500, 11px, `letter-spacing: 0.15em`, `text-transform: uppercase`. Consistent across all instances.
5. **Never italicize Jost.** Italics are exclusive to Cormorant Garamond in editorial/display contexts.
6. **Maximum line length**: Body text must not exceed ~70 characters per line. Use an explicit `max-width`.
7. **Minimum body size in production**: 16px (never below). Editorial body copy: 17px.

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

1. **Mobile gutters**: 16px (`space-md`). **Desktop gutters**: 32px (`space-xl`).
2. **Section vertical spacing**: 80px mobile, 100–120px on hero sections.
3. **Always use the 4px grid.** No off-grid values.

---

## 5. Border Radius

| Token        | Value    | Usage                                              |
|--------------|----------|----------------------------------------------------|
| `radius-none`| 0px      | Buttons, cards, product images — brand default     |
| `radius-sm`  | 2px      | Inputs, badges, tags (used minimally)              |
| `radius-full`| 9999px   | Avatar circles, dot indicators                     |

### Radius Rules

1. **Buttons have no border radius.** Sharp, architectural edges are a brand signature.
2. **Cards have no border radius.** Product cards are rectangular.
3. When in doubt, use `radius-none`.

---

## 6. Shadow System

The brand says **no drop shadows** on product cards or decorative elements. Shadows are allowed only on the navigation bar (structural, not decorative).

| Token        | Value                                  | Usage               |
|--------------|----------------------------------------|---------------------|
| `shadow-nav` | `0 1px 0 rgba(196, 181, 168, 0.4)`    | Sticky nav bottom edge |

### Shadow Rules

1. **No shadow on product cards** — at rest or on hover.
2. **No shadow on modals or dropdowns** — use borders instead.
3. The single permitted shadow is `shadow-nav` on the navigation bar after scroll.

---

## 7. Motion System

### Duration Tokens

| Token    | Value  | Usage                                        |
|----------|--------|----------------------------------------------|
| `swift`  | 150ms  | Micro-interactions: button press             |
| `gentle` | 300ms  | Hover states, focus rings, color transitions |
| `slow`   | 500ms  | Page element entrances                       |
| `drift`  | 800ms  | Hero animations, staggered list reveals      |

### Easing Curves

| Token         | Value                             | Usage                          |
|---------------|-----------------------------------|--------------------------------|
| `ease-out`    | `cubic-bezier(0.16, 1, 0.3, 1)`  | Entrances — elements arriving  |
| `ease-in-out` | `cubic-bezier(0.76, 0, 0.24, 1)` | Transitions — state changes    |

### Component Animations

| Animation | Duration | Easing     | Description                                          |
|-----------|----------|------------|------------------------------------------------------|
| `fadeUp`  | `drift`  | `ease-out` | TranslateY 20px → 0, opacity 0 → 1. Scroll reveals. |
| `fadeIn`  | `slow`   | `ease-out` | Opacity 0 → 1. Image loading.                        |
| `scaleIn` | `slow`   | `ease-out` | Scale 0.98 → 1, opacity 0 → 1.                      |
| Hover lift| `gentle` | `ease-in-out` | Product card image scale 1 → 1.03.              |

### Motion Rules

1. **Subtlety only.** No bounce, no overshoot. No animations that distract from the objects.
2. **No workshop animations, particle effects, or background motion.** The brand is quiet.
3. **Stagger delays**: When multiple elements enter together (e.g., product grid), stagger each by 80ms.
4. **Respect `prefers-reduced-motion`**: All animations collapse to instant transitions.
5. **Scroll-triggered animations** fire once only.

---

## 8. Breakpoints

Mobile-first responsive design.

| Token | Min Width | Usage                          |
|-------|-----------|--------------------------------|
| `sm`  | 640px     | Large phones, landscape        |
| `md`  | 768px     | Tablets                        |
| `lg`  | 1024px    | Small laptops                  |
| `xl`  | 1280px    | Desktops                       |
| `2xl` | 1536px    | Large displays                 |

---

## 9. Grid System

| Property          | Mobile (< 768px) | Desktop (>= 768px) |
|-------------------|-------------------|--------------------|
| Columns           | 4                 | 12                 |
| Gutter            | 16px              | 32px               |
| Max Width         | 100%              | 1440px             |
| Container Padding | 16px              | 32px (→ 96px at xl)|

Container class: `.container-fiord` (defined in `globals.css`).

### Grid Rules

1. **Product listing grids**: 1 column mobile, 2 columns tablet (`sm:`), 3 columns desktop (`lg:`).
2. **Content max-width**: 1440px centered.
3. **Full-bleed sections** span the full viewport width (hero, editorial bands, footer).

---

## 10. Z-Index Scale

| Token      | Value | Usage                              |
|------------|-------|------------------------------------|
| `z-base`   | 0     | Default content layer              |
| `z-raised` | 10    | Cards on hover, badges             |
| `z-sticky` | 30    | Sticky navigation bar              |
| `z-overlay`| 40    | Background overlays                |
| `z-modal`  | 50    | Modal dialogs                      |
| `z-max`    | 100   | Mobile nav drawer                  |

### Z-Index Rules

1. **Never use arbitrary z-index values.** Always reference a token.
2. **The mobile nav drawer** sits at `z-max` (100) — covers everything.
