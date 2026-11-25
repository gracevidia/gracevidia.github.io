<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js You Know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Rules

Website for gracevidia.github.io. Next.js 16 (pages router) + React 19 + Tailwind v4, static export for GitHub Pages. Keep it lazy: no new dependencies, no speculative abstractions, shortest working diff.

## Structure

- **All site content lives in `src/data/`** (`content.ts`, `profile.ts`, `constants.ts`). Change copy, lists, links, and durations there — never hardcode strings in components. Every experience entry explicitly declares `isActive: boolean`.
- One component per page section (`hero`, `about`, `skills`, `experience`, `education`, `projects`, `footer`). All sections render through `components/section.tsx` (wrap + scroll reveal; supports optional `title` and right-aligned `actions`).
- Shared small helpers live in `src/lib/` (`cn.ts`, `use-count-up.ts`).
- **All styling lives in `src/styles/globals.css`** as bespoke, strictly mobile-first classes — no CSS modules, no inline styles (except computed values like carousel scrollbar thumb position). Tailwind is used for preflight/utilities only.
- Fonts: Google Sans only (`400`, `500`, `700`), self-hosted via `next/font/local` in `components/layout.tsx`. Do not reintroduce other font families or synthetic weights (`600`/`800`).

## Design System

- **Color Scheme — Figma #52: Wraith**: Core swatches are `--wraith-espresso: #1E1702`, `--wraith-umber: #342005`, `--wraith-olive: #8C886B`, `--wraith-mist: #E5E3E4`, `--wraith-white: #FFFFFF`, and `--wraith-emerald: #047C58`. Consume only semantic palette tokens (`--bg`, `--card`, `--surface-subtle`, `--ink`, `--ink-secondary`, `--soft`, `--olive(-soft/-border)`, `--accent(-hover/-ink/-soft/-border)`, `--border(-strong/-hover)`, `--topbar`, `--shadow-*`). They are theme-aware via `[data-theme="dark"]`; never hardcode theme colors in components.
- **Clean Mobile-First Aesthetic**: Hairline `1px solid var(--border)` borders, soft diffused elevation (`--shadow-sm` / `--shadow-md`), un-rotated portrait frame (no sticker text on the PFP frame), and progressive enhancement at `480px`, `640px`, `768px`, and `1024px`.
- **Golden Ratio ($\varphi = 1.618$) Scale**:
  - Typography anchored at `1rem` (`16px`): desktop `body` `16px` → `h2` `1.618rem` (`~25.9px`) → `h1` `2.618rem` (`~41.9px`); mobile half-steps ($\sqrt{\varphi} = 1.272$); body line-height `1.618`.
  - Spacing tokens `--space-1` (`0.382rem`) through `--space-6` (`4.236rem`), $\varphi$-scaled radii (`6px`, `10px`, `16px`, `26px`), `1.618fr : 1fr` desktop hero grid (`61.8%` copy : `38.2%` portrait), `61.8ch` summary measure, and `1fr : 1.618fr` info-card grid aligned to `61.8%` width.
- **Unified Metadata Pills**: Experience (`emp-type`, `ticket-period`, `ticket-duration`), Education (`edu-grade`, `edu-period`), and Project categories (`ptype`) all share the same Wraith olive pill block style (`--olive-soft` / `--olive-border` / `--ink-secondary`).
- **Interactions (Web & Mobile Parity)**:
  - Hover states live inside `@media (hover: hover) and (pointer: fine)` so mobile taps never stay stuck highlighted.
  - Touch `:active` states apply immediately (`transition-duration: 0ms`) and smoothly ease back via the base transition on release; `a, button` set `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent`, paired with a passive `touchstart` listener in `layout.tsx` for iOS Safari.
  - Only clickable buttons/links highlight emerald (`--accent`) on hover/press. Non-button cards and `.skill-chip` items use neutral lift (`--border-hover` + subtle shadow) without accent color shifts.
  - Profile summary highlights `PROFILE.role` and `{years}+ years` with bold emerald text (`.about-highlight`, `.about-years`), no background block.
- **Active Experience Indicators**: `@keyframes ping` (1.2s `cubic-bezier(0,0,.2,1)`, scale 2.1 → fade) on emerald solid dots on the **left** only (active timeline node `.ticket--active::before/::after` and left list bullets `.ticket--active .ticket-list li::before/::after`). Do not add an active dot after the job title.
- **Counters (years, durations)**: Shared `useCountUp` hook (`src/lib/use-count-up.ts`) — IntersectionObserver-triggered count-up, 800ms, ease-out `1-(1-p)^3`; server state is `0` (no hydration mismatch); falls back to the final target when IntersectionObserver is missing.
- **Projects Carousel**: Mobile-first horizontal scroll-snap (`1` card + peek on mobile, `2` on tablet, `3` on desktop) with dynamic visible-card pagination and a responsive percentage-based draggable scrollbar.

## Known Gotchas (Learned the Hard Way)

- `overflow-x: auto` forces `overflow-y: auto` — hover lifts clip card borders against the scroll container. Give `.proj-grid` top/side/bottom padding (`4px 2px 12px`).
- Use `overflow-x: clip` (never `overflow: hidden`) on `.site-shell` so `position: sticky` on `.topbar` keeps working.
- Keep `.wrap` horizontal-only (`padding-inline`) so breakpoint updates never overwrite `.topbar-inner`'s vertical `padding-block`.
- An `<img>` filling a bordered box covers the box's border; draw the frame as a `::after` overlay (see `.ticket-logo`).
- `next/font`: put `.className` + `.variable` on `.site-shell` and resolve `var(--font-google-sans)` on `.site-shell` (not `:root`, where descendant variables don't exist and Tailwind v4's `--font-sans` would win).
- Scroll reveal (`useReveal`): use a tiny threshold (`0.01`) so tall sections like Experience reveal immediately on short mobile screens.
- Theme: `next-themes` with `attribute="data-theme"` so `[data-theme="dark"]` selectors work; toggle must be hydration-safe (`useSyncExternalStore` mounted check).
- Tailwind v4: map utilities to palette vars with `@theme inline`. The IDE's "Unknown at rule @theme" warning is a false positive.
- ESLint `react-hooks/set-state-in-effect`: no synchronous `setState` in effect bodies — use lazy initial state, rAF, or observer callbacks.
- sharp (image work): the `resize(..., { background })` letterbox path is corrupted on this machine (channel-shuffled pixels) — avoid it; flatten/pad explicitly instead. Re-read files in a fresh process after sharp writes.
- Image changes keep the same URL — the browser caches them. Mention hard refresh (Cmd+Shift+R) after swapping image files.

## Workflow

- **Verify before claiming done**: `npm run lint` and `npm run build` must be clean, and check the actual output (`grep out/`) for the claimed change. For visual changes, measure rendered pixels across desktop and mobile — never assert "looks right" from CSS arithmetic alone.
- Don't commit, push, or alter anything remote unless the user asks.
- Keep content edits in `src/data/` as plain, single strings where possible; avoid placeholder-splitting magic unless requested.
