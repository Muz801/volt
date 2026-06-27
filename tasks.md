# VOLT — Task Board (`tasks.md`)

> **Single source of truth for all agents.** The Orchestrator owns this file. Every other agent reads it
> before doing anything and updates it after. This board reflects the current `voltoriginal` codebase.

## Rules (read before touching anything)
1. **Before working:** open this file. Find tasks where `Owner` = your role AND `Status` is `TODO` or
   `CHANGES-REQUESTED`. Respect `Depends-on` — never start a task whose dependencies aren't `DONE`.
2. **When you start:** set the task to `IN-PROGRESS` and write your name/role + date in `Notes`.
3. **When you finish:** set it to `REVIEW` and summarize what you did + where (files) in `Notes`.
4. **Only the Orchestrator** moves tasks to `DONE` after review or back to `CHANGES-REQUESTED` with
   concrete reasons. Specialists never self-approve.
5. **Never delete tasks.** Add new ones at the bottom of Backlog with the next `T-###` id.
6. Keep every change faithful to `VOLT_BRIEF.md`. If a task implies booking/auth/dashboard/payments/DB,
   set it `BLOCKED` and flag the Orchestrator.

## Status legend
`TODO` · `IN-PROGRESS` · `REVIEW` · `CHANGES-REQUESTED` · `DONE` · `BLOCKED`

## Owners (roles)
`orchestrator` · `brand` · `ui-architecture` · `sections` · `motion` · `responsive-a11y` · `backend` · `qa-deploy`

## Project Map
- App shell: `src/App.jsx`
- Data/content/theme inputs: `src/data/volt.js`
- Theme bridge: `src/theme.js`
- Main landing component: `src/components/VoltLanding.jsx`
- Small UI bits: `src/components/bits.jsx`
- Motion system: `src/hooks/useScrollExperience.js`
- Global styles and responsive layout: `src/styles.css`
- Entry point: `src/main.jsx`

---

## Backlog

### T-001 · Project bootstrap (React + Vite, JS)
- Owner: ui-architecture
- Status: DONE
- Depends-on: —
- Acceptance: React + Vite project runs with JavaScript only; `npm run dev`, `npm run build`, and `npm run preview` scripts exist; no TypeScript; GSAP and Lenis installed for the scroll experience.
- Notes: Bootstrap present in `package.json`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`. Dependencies include React 18, Vite 5, GSAP and Lenis. Orchestrator reviewed current structure and accepted it for this compact build.

### T-002 · Brand identity and visual direction
- Owner: brand
- Status: DONE
- Depends-on: —
- Acceptance: Approved VOLT direction exists: dark premium stage, electric lime accent, direct performance-gym voice, cinematic motion personality, and token guidance for implementation.
- Notes: Brand spec recorded in `docs/brand.md`. Current implementation follows the approved identity via `src/styles.css` variables and `src/data/volt.js` theme values.

### T-003 · Content and data model
- Owner: brand
- Status: DONE
- Depends-on: T-002
- Acceptance: Landing content lives in `src/data/volt.js`; hero, marquee, stats, programs, manifesto, plans, coaches, schedule and CTA are populated with non-placeholder copy.
- Notes: `src/data/volt.js` contains the VOLT dataset, Unsplash media, program cards, membership tiers, coaches and schedule. Content is centralized rather than scattered through the app.

### T-004 · Landing structure and section composition
- Owner: sections
- Status: DONE
- Depends-on: T-003
- Acceptance: Navbar, hero, marquee, stats, programs, manifesto, plans, coaches, schedule/contact/CTA and footer render from the data model; component structure exposes hooks for motion.
- Notes: Implemented in `src/components/VoltLanding.jsx`. It uses `data-reveal`, `data-count`, `data-hscroll`, `data-hscroll-track`, `data-manifesto`, `data-word` and `data-parallax` markers for the Motion agent.

### T-005 · UI system and styling pass
- Owner: ui-architecture
- Status: DONE
- Depends-on: T-002, T-004
- Acceptance: Global styles define the VOLT visual system, responsive spacing, buttons, nav, cards, plans, coaches, schedule, CTA, footer and mobile rules.
- Notes: Implemented in `src/styles.css` with compact variables (`--accent`, `--bg`, `--surface`, `--ink`, `--maxw`, `--pad`, `--radius`, `--ease`) plus section-specific styles.

### T-006 · Motion system and scroll experience
- Owner: motion
- Status: DONE
- Depends-on: T-004
- Acceptance: Lenis smooth scroll, ScrollTrigger integration, scroll progress bar, reveal mechanism, animated counters, hero title entrance, parallax, desktop pinned horizontal programs, manifesto word lighting and reactive marquee are implemented with reduced-motion fallback.
- Notes: Implemented in `src/hooks/useScrollExperience.js`, `src/components/bits.jsx` and `VoltLanding.jsx` markers. Reduced motion bypasses Lenis/marquee and reveals static content.

### T-007 · Responsive/a11y verification pass
- Owner: responsive-a11y
- Status: TODO
- Depends-on: T-006
- Acceptance: Verify at 375/768/1440; keyboard navigation works; focus states visible; burger/menu behavior is accessible; contrast AA; no accidental horizontal overflow except intended program/schedule behavior; reduced-motion verified.
- Notes: Needs hands-on browser QA. Current code has responsive CSS and ARIA basics, but this task remains open until tested.

### T-008 · Production QA and deploy package
- Owner: qa-deploy
- Status: TODO
- Depends-on: T-007
- Acceptance: `npm run build` and preview pass; README exists with stack, run instructions and AI workflow note; title/meta/OG/favicon reviewed; Lighthouse target ≥ 90 Performance and Accessibility; public deploy URL recorded if deployed.
- Notes: 2026-06-27 orchestrator — `npm run build` passes after agentic-config migration. Preview, README, meta/OG/favicon, Lighthouse and deploy remain pending.

### T-009 · Optional PHP lead endpoint
- Owner: backend
- Status: BLOCKED
- Depends-on: T-004
- Acceptance: Only if Pablo explicitly enables it: `contact.php` validates required fields + email server-side, sanitizes inputs/header values, sends mail, returns JSON, documents config and commits no secrets.
- Notes: Out of scope until ordered. Current CTAs can link externally/anchor without backend.
