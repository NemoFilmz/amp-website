# Action Media Production (AMP) Website

A premium, dark, cinematic single-page site positioning **Action Media Production** as the cinematic
industrial storytelling + AI production studio for governments, energy, oil & gas, aviation,
infrastructure and culture. Built to the client brief (`Website 2026-05`).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Stack

- Vite + React + TypeScript
- Tailwind CSS (custom theme in `tailwind.config.js`)
- Framer Motion (scroll reveals, magnetic CTAs, accordions)
- Lenis (smooth scroll)
- lucide-react (icons)

## Design system

- **Palette:** obsidian base `#08090B`, surfaces `#0E1014` / `#14171C`, hairlines `#1B1F26`; text
  `#F4F5F7 / #A6ADB8 / #6B7280`; **AMP yellow `#F9C00C`** primary accent; **cyan `#2BD9FF`** used sparingly
  for the holographic/data glow that echoes AMP's real ADIPEC look.
- **Type (Adobe Fonts kit `kiu3xgz`):** `font-display` = Impact (headlines), `font-body` = Roboto,
  `font-light` = Roboto Extralight (large elegant statements). Loaded in `index.html`.
- **No monospace, ever.** The `font-mono` token is deliberately remapped to Roboto as a safety net.
  Technical micro-labels use the `.eyebrow` / `.index-tag` classes (Roboto, uppercase, wide tracking).
- **No em dashes** in any copy.

## Structure

Multi-route app (react-router-dom). Content is data-driven; edit copy in one place:

```
src/data/site.ts        ← ALL copy + content (verbatim from the brief) + PAGES hero copy
src/components/         ← Layout, Nav, Footer, SmoothScroll, Reveal, Wordmark, ui (primitives)
src/sections/           ← one file per homepage section, in brief order
src/pages/              ← HomePage + route pages (About, Work, Technology, Academy, Careers, Contact)
src/App.tsx             ← <Routes>; src/components/Layout.tsx wraps every route (Nav + Footer + scroll)
```

**Routes:** `/` (home), `/about`, `/work`, `/technology`, `/academy`, `/careers`, `/contact`.

Homepage section order (matches the brief): Hero · Who We Are · Industries · Services · Why AMP ·
Global Presence · Philosophy · AMP Academy · Client Experience · CTA + inquiry form · Footer.

## Swapping in real AMP assets

Everything visual is a clearly-marked placeholder:

- **Placeholder images:** temporary cinematic stills live in `public/placeholders/` (`hero`, `gov`,
  `oilgas`, `energy`, `aviation`, `heavy`). Replace any file in place (keep the name) to swap in your own
  shot, or change the path in `src/data/site.ts`. Each image is graded and sits over a procedural
  `CinematicBackdrop`, and hides itself if it fails to load so the backdrop always remains.
- **Hero showreel:** set `HERO.videoSrc` in `src/data/site.ts` to your video URL and it replaces the hero
  still automatically. `HERO.posterImage` is the still / video poster.
- **Logo:** the header/footer use a text wordmark (`ACTI`+yellow `ON`+`MEDIA`) so it reads on dark. Swap in
  a light/white PNG/SVG of the real logo in `src/components/Wordmark.tsx` if preferred.

## Placeholder content to replace

These pages use clearly-labeled representative content until you supply the real thing:

- **Work (`/work`):** the case studies are representative samples over the placeholder images. Edit the
  `CASES` array in `src/pages/WorkPage.tsx` with real productions (title, industry tag, scope, image).
- **Careers (`/careers`):** the open roles are sample postings. Edit the `ROLES` array in
  `src/pages/CareersPage.tsx` with live vacancies. Applications route to `careers@actionmpro.com`.
- **Forms** (Contact page + homepage CTA) are front-end only; wire them to your email/CRM endpoint.

## Notes / next phase

- **EN / AR:** the nav has a language indicator (EN active, layout is RTL-ready). Full Arabic copy and
  `dir="rtl"` switching is a follow-up phase.
- **Academy** now exists both as a rich homepage chapter and a dedicated `/academy` page.

## Importing into Bolt

Bolt is React/Vite-native. Import this project (or push to a repo and connect it). All sections are small,
self-contained components with copy centralized in `src/data/site.ts`, so it extends cleanly.
