# VOLT — Brand Identity & Design Tokens

> Approved identity spec for the VOLT landing page. Source of truth for *how* VOLT looks, feels and speaks.
> Personality in one line: **electric, disciplined, expensive — a high-end sports campaign film, not a gym flyer.**

## 1. Palette

VOLT runs on restraint and contrast: a near-black stage, graphite surfaces, off-white ink and exactly one
high-energy accent — electric lime-yellow. Color is rationed so that when the accent appears, it means
action, current, progress or emphasis.

| Token | Hex | Role |
|---|---:|---|
| `bg` | `#0A0B0D` | Page base / stage |
| `surface` | `#121419` | Cards, navbar-on-scroll, raised panels |
| `surface-2` | `#1B1E26` | Hover / nested panels / inputs |
| `ink` | `#F4F6F8` | Primary text, display type |
| `ink-soft` | `#9AA1AD` | Secondary text, captions, labels |
| `ink-faint` | `#5B616E` | Disabled, hairlines-as-text, fine print |
| `line` | `#262A33` | Borders, dividers, table grid |
| `accent` | `#D7FF1E` | CTAs, marquee, active states, accent word |
| `accent-dim` | `#A8C700` | Hover/pressed state |
| `on-accent` | `#0A0B0D` | Text on accent fill |

Rules:
- Accent is for action and emphasis only: CTA fill, highlighted hero/manifesto word, marquee band,
  featured-plan badge, focus rings and active states.
- Never tint large surfaces with accent.
- Never introduce a second accent.
- Text on bright accent is always near-black.

## 2. Type System

Two families:
- Display/headlines/nav/stats/tags: **Archivo** with expanded, heavy treatment where available.
- Body/paragraphs/form/fine print: **Inter**.

Type behavior:
- Eyebrows, nav links, tags, button labels and table headers are uppercase with wide tracking.
- Display titles are heavy, uppercase, tight and cinematic.
- Body copy stays readable and neutral; never set long paragraphs in the display face.
- Numbers can use tabular figures so counters do not jitter.

## 3. Spacing, Radii And Surfaces

VOLT leans sharp and engineered. Mostly small radii; pills only for buttons/chips. Use borders and subtle
surface changes rather than heavy shadows.

Layout rules:
- Page gutters use responsive padding around `clamp(20px, 5vw, 64px)`.
- Main content max width sits around `1240px` to `1320px`.
- Sections need cinematic vertical space, especially hero, programs, manifesto and CTA.
- Cards are premium: image-led, high contrast, restrained hover state.

## 4. Motion Personality

VOLT motion is sharp, weighted and confident. It should feel like heavy equipment moving with control:
fast on entry, smooth on scroll, never playful or bouncy.

Motion rules:
- Lenis smooth scroll is the spine.
- GSAP + ScrollTrigger power parallax, counters, pinned scenes and word-by-word manifesto.
- Marquee reacts to scroll velocity.
- One hero moment per viewport; never animate everything at once.
- `prefers-reduced-motion` is mandatory: disable Lenis/GSAP-driven motion and keep content readable.
- Prefer transforms/opacity; avoid layout thrash.

## 5. Logo Concept

The logo is a pure **VOLT** wordmark: uppercase, heavy, industrial, and precise. A single accent spark or
mark is enough. Do not add gradients, icons, extra colors or decorative effects that make it feel like a
generic gym flyer.

## 6. Brand Voice

Adjectives: electric, disciplined, direct, confident, uncompromising.

Do:
- Lead with the outcome and the standard.
- Use specific, measurable, second-person language.
- Be terse; cut filler.

Don't:
- No clichés like "unleash your potential", "no pain no gain", "beast mode" or "fitness journey".
- No discount/budget language.
- No emoji, hashtags or exclamation spam.

Example lines:
- "Strength is built, not bought. We build it."
- "Elite coaching. Measured progress. Zero noise."
- "Train like it counts."

## 7. Token Contract

Current implementation uses compact CSS custom properties in `src/styles.css` and theme overrides in
`src/theme.js`. Agents must preserve the intent of these values and avoid hardcoded brand drift.

```css
:root {
  --accent: #D7FF1E;
  --accent-ink: #0A0A0A;
  --bg: #0B0B0C;
  --surface: #131316;
  --surface-2: #1B1C20;
  --ink: #F4F4F2;
  --ink-soft: #A7A7A4;
  --line: rgba(255,255,255,.10);
  --line-strong: rgba(255,255,255,.22);
  --font-display: "Archivo", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --maxw: 1240px;
  --pad: clamp(20px, 5vw, 64px);
  --radius: 16px;
  --ease: cubic-bezier(.16,1,.3,1);
}
```

Implementation notes:
- `src/data/volt.js` owns content and theme inputs.
- `src/theme.js` applies gym-level accent/background overrides.
- `src/hooks/useScrollExperience.js` owns Lenis, ScrollTrigger, reveals, counters and manifesto lighting.
- Any agent changing motion must verify the reduced-motion path.
