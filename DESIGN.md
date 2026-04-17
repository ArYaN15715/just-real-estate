# Design Brief — Just Real Estate Cinematic

## Direction
Premium Dark Cinematic — A global-level interactive luxury product experience replacing the local trust-first aesthetic with immersive depth, glassmorphism, and editorial precision.

## Tone
Cinematic, editorial, premium tech. Bold commitment to dark mode, parallax depth, and glass surfaces. Every section feels intentional, alive, and interactive.

## Differentiation
Glassmorphism core: frosted glass cards, backdrop blur on every surface. Parallax layers create perceived depth without heavy shadows. Electric cyan accents on warm gold CTAs. The design feels like a luxury fintech or premium real estate platform, not a local website.

## Color Palette

| Token | OKLCH | Role |
|-------|-------|------|
| background | 0.12 0.01 260 | Deep charcoal cinematic base, immersive |
| foreground | 0.95 0.01 260 | Crisp white text, editorial clarity |
| card | 0.18 0.015 260 | Glassmorphism surface, slightly elevated |
| primary | 0.72 0.22 250 | Electric cyan/bright blue, evolved accent for dark |
| accent | 0.65 0.18 60 | Warm gold/amber, premium CTA color |
| muted | 0.25 0.01 260 | Subtle dark grey for secondary hierarchy |
| border | 0.28 0.015 260 | Deep blue-tinted borders for glass cards |

## Typography

- Display: Satoshi — hero headlines, section titles, "Real Estate. Reimagined." with text reveal animation
- Body: DM Sans — body copy, property descriptions, UI labels
- Mono: General Sans — prices, property IDs, technical details

## Elevation & Depth

Glassmorphism + parallax layering: frosted glass overlays (0.8–0.9 opacity with 12–16px blur) on every card. Soft dark shadows (charcoal-based, not black). Depth through layering (card stacking) and parallax scroll effects, not heavy drop shadows.

## Structural Zones

| Zone | Background | Treatment |
|------|-----------|-----------|
| Header | card (0.18) with glass effect | Sticky, white text, subtle border-bottom |
| Hero | background (0.12) | Fullscreen cinematic image, parallax zoom, glass overlay |
| Content sections | Alternate: background / secondary (0.22) | Glass cards on dark background |
| Property showcase | background (0.12) | Horizontal scroll panels, glass cards, image overlays |
| CTAs (primary) | primary cyan (0.72 0.22 250) | Hover = scale + glow with cyan light |
| CTAs (gold) | accent gold (0.65 0.18 60) | Hover = scale + glow with gold light |
| Scroll indicator | primary cyan | Top-bar progress, 3px height |
| Footer | card (0.18) with glass | White text, border-top |

## Component Patterns

**Glass Card**: `background: oklch(var(--card) / 0.8); backdrop-filter: blur(12px); border: 1px solid oklch(var(--border) / 0.5);`. Hero Text Reveal (staggered letter animation, 0.6s). Property Panel: full-screen glass overlay with image background. CTA: gold accent with hover scale + glow. Floating WhatsApp: pulse animation on dark background with cyan ring. Scroll reveal on section entry.

## Motion

**Entrance**: Fade-in + slide (0.3–0.8s ease-out). Hero text reveal with staggered letter-by-letter (0.6s). **Hover**: Scale 1.05 + glow on buttons (0.3s smooth). **Scroll**: Parallax zoom on hero, section fade-in as scroll progress. **Attention**: Pulse on floating CTA (2s loop). **Constraint**: Motion serves clarity; no distraction or autoplay.

## Responsive Breakpoints

- **Mobile**: Single column, sticky header, swipe-friendly property scroll, large tap targets, bottom action bar
- **Tablet (md)**: 2-col grids, expanded spacing, property showcase remains horizontal scroll
- **Desktop (lg)**: Full horizontal scroll showcase, parallax active, generous breathing room

## Constraints

- Dark mode primary (no light mode toggle)
- Glassmorphism mandatory on every card surface
- Electric cyan primary, warm gold for CTAs (no other accent colors)
- Parallax on scroll, text reveal on hero
- All OKLCH, no arbitrary colors or hex literals
- Motion library (12.34.3) for animations
- Generous spacing: 2–4rem section gaps, 1–2rem content padding
- Premium feel > content richness

## Signature Detail

**Glassmorphism Everywhere**: Every card, overlay, and modal uses frosted glass with backdrop blur. This is the core visual language and differentiator. **Parallax Hero**: Fullscreen cinematic with slow zoom-in + text reveal. **Scroll Progress**: Top bar tracks scroll depth in electric cyan.


