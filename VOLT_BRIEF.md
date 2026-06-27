# VOLT — Creative Brief (build from scratch)

> Shared source of truth for every agent. VOLT is built **from zero** as an original project.
> Do NOT copy, port, or reference any previous implementation. This brief defines the *what* and
> the *constraints*; the Brand agent proposes the exact identity and Pablo approves it.

## What VOLT is
VOLT is a **premium high-performance training club** — strength, conditioning and recovery for people
who are serious about measurable progress. It is not a budget gym and not a generic template. The site
is a single, cinematic **landing page** whose job is to make a visitor feel the intensity of the brand
and convert them into a lead.

## Personality (the feeling)
Bold · disciplined · electric · precise · premium. Think high-end sports campaign film: dark,
high-contrast, confident, zero fluff. Every screen should feel deliberate and expensive.

## Audience
Ambitious adults ~20–45 who want real results and a serious training environment, willing to pay for
elite coaching.

## The signature differentiator
An **advanced, smooth scroll experience** that feels like a film: pinned scenes, reveals, animated
counters, a reactive marquee and a word-by-word manifesto. The motion IS the brand.

## Required sections (the skeleton — order matters)
1. **Navbar** — fixed, transparent over hero, becomes solid/blurred on scroll. Logo + links + primary CTA. Mobile burger → full-screen menu.
2. **Hero** — full-screen, oversized display type, primary + secondary CTA, background media with dark scrim, scroll cue.
3. **Marquee** — high-energy scrolling band that reacts to scroll velocity.
4. **Stats / proof** — a few big numbers with counters that animate on enter.
5. **Programs / disciplines** — visual cards; horizontal **pinned** scroll on desktop, natural stack on mobile.
6. **Manifesto** — sticky section where words light up one by one as you scroll.
7. **Plans / membership** — 3 tiers, one featured.
8. **Coaches** — grid; image hover reveal.
9. **Schedule** — weekly class table; horizontally scrollable on mobile.
10. **Final CTA + lead form** — closing pitch + email/name form (wired to PHP if enabled).
11. **Footer** — brand, internal anchors, legal line.

## Hard constraints (non-negotiable)
- **Stack:** React + Vite. **JavaScript only (no TypeScript).**
- **Data-driven:** ALL content lives in `src/data/volt.js`. No content hardcoded inside components.
- **Motion:** GSAP + ScrollTrigger + Lenis. **Must** respect `prefers-reduced-motion` (static fallback).
- **Responsive:** verified at 375 / 768 / 1440. No accidental horizontal overflow (except the intentional schedule scroll).
- **Accessible:** semantic HTML, ARIA where needed, keyboard navigation, visible focus, contrast AA.
- **Performance:** Lighthouse ≥ 90 on Performance and Accessibility.
- **Security:** no secrets in the repo; `.env` + `.gitignore`. PHP form validates and sanitizes server-side.
- **Originality:** original design and code. Nothing copied from any prior site.

## Library docs — always use Context7 (mandatory)
Whenever you use ANY third-party library — GSAP, ScrollTrigger, Lenis, React Router, Vite, etc. — consult
the **Context7 MCP** for its current, correct API before writing code. Do not rely on memory; these
libraries change and outdated/hallucinated APIs are a top source of bugs here. If Context7 is unavailable,
say so before guessing.

## Out of scope (do not build)
Booking, user accounts/auth, member dashboards, payments, any database, e-commerce. VOLT is a landing
page with one optional PHP lead form. If a task implies any of the above, the agent must STOP and flag it.

## Definition of done
Deployed landing with a real public URL, all sections present and on-brand, motion working and degrading

## Honest framing (for CV / interview)
Pablo is the **director**: he sets the brief, approves the brand, gives section orders, reviews every
explain every decision and every part of the code.
