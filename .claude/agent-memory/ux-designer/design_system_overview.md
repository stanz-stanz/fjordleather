---
name: Fiord Leather Design System Overview
description: Core design tokens, brand direction, and key rules for the Fiord Leather Nordic luxury brand design system
type: project
---

Fiord Leather design system established 2026-03-12. Nordic luxury minimalism for a woven leather goods brand (Bottega Veneta-style intrecciato).

**Key files**:
- `docs/design/design-system.md` — Full token specs (colors, type, spacing, motion, grid, z-index)
- `docs/design/tokens.css` — Production Tailwind v4 @theme configuration with CSS custom properties
- `docs/design/components.md` — Component specs (nav, hero, product card, buttons, forms, gallery, breadcrumb, badges, page layouts)
- `docs/design/references/img/` — 4 reference images (editorial model shots, product photography, PDP with breadcrumb and dot carousel)

**Brand signature decisions**:
- Buttons and cards: radius-none (sharp, architectural)
- Shadows: warm Espresso-based rgba(30,22,15,...), never pure black
- Overline treatment (nav links, categories, breadcrumbs): Jost 500, 11px, letter-spacing 0.15em, uppercase
- Fjord (#8AA5BC) is the signature accent — used for focus rings, links, CTA highlights, NOT as a background for text
- Stone (#C4B5A8) fails WCAG AA on Chalk for body text — metadata/decorative only
- Motion is slow/restrained: prefer gentle (300ms) and slow (500ms), no bounce or overshoot
- Hero layout: asymmetric (image 65%, text overlaps)

**Why:** Establishes the single source of truth for all design reviews and implementation. All future UX reviews must cite rules from these files.
**How to apply:** Always read docs/design/ before making any design judgment or edit.
