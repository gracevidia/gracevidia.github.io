<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js You Know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Rules

QA portfolio for gracevidia.github.io. Next.js 16 (pages router) + React 19 + Tailwind v4, static export for GitHub Pages. Keep it lazy: no new dependencies, no speculative abstractions, shortest working diff.

## Structure

- **All site content lives in `src/data/`** (`content.ts`, `profile.ts`, `constants.ts`). Change copy, lists, links, and durations there — never hardcode strings in components.
- One component per page section (`hero`, `about`, `skills`, `experience`, `education`, `projects`, `footer`). All sections render through `components/section.tsx` (wrap + scroll reveal; supports optional `title` and right-aligned `actions`).
- **All styling lives in `src/styles/globals.css`** as bespoke classes — no CSS modules, no inline styles (except computed values). Tailwind is used for preflight/utilities only.
- Fonts: Google Sans only, self-hosted via `next/font/local` in `components/layout.tsx`. Do not reintroduce other font families.

## Design System

- Colors come **only** from the palette variables: `--bg --ink --soft --card --tangerine(-soft) --teal(-soft) --sun(-soft) --sky-soft --action-link`. They're theme-aware via `[data-theme="dark"]`; never hardcode a theme color in a component.
- Signature style: 2–2.5px `var(--ink)` borders, hard shadows (`box-shadow: 3px 3px 0 var(--ink)`), rounded corners, rotated stickers. Hover = **pop only** (translate -1/-2px + slightly deeper shadow) — do not change colors on hover unless explicitly asked.
- Typography: one size family — section titles and the hero name share `clamp(28px, 4.5vw, 38px)`; "mono" accents are Google Sans 700 with letter-spacing, not a second font.
- Active/current indicators: `@keyframes ping` (1s `cubic-bezier(0,0,.2,1)`, scale 2 → fade) for ripples; `@keyframes pulse` for loading states. Solid dot + expanding ring, sun-colored.
- Counters (years, durations): IntersectionObserver-triggered count-up, 800ms, ease-out `1-(1-p)^3`; server state is 0 (no hydration mismatch); fall back to the final value when IntersectionObserver is missing.

## Known Gotchas (Learned the Hard Way)

- `overflow-x: auto` forces `overflow-y: auto` — a hover `translate(-2px)` clips card borders against the scroll container. Give the container 2px top/left padding.
- An `<img>` filling a bordered box covers the box's border; where needed, draw the frame as a `::after` overlay (see `.ticket-logo`).
- `next/font`: put `.className` (base font) + `.variable`s on the layout root div; a CSS var defined on a descendant never resolves on `body`.
- Theme: `next-themes` with `attribute="data-theme"` so the CSS keeps `[data-theme="dark"]` selectors; toggle must be hydration-safe (`useSyncExternalStore` mounted check).
- Tailwind v4: map utilities to palette vars with `@theme inline`. The IDE's "Unknown at rule @theme" warning is a false positive.
- ESLint `react-hooks/set-state-in-effect`: no synchronous `setState` in effect bodies — use lazy initial state, rAF, or observer callbacks.
- sharp (image work): the `resize(..., { background })` letterbox path is corrupted on this machine (channel-shuffled pixels) — avoid it; flatten/pad explicitly instead. Also, re-read files in a fresh process after sharp writes (stale reads happen).
- Image changes keep the same URL — the browser caches them. Mention hard refresh (Cmd+Shift+R) after swapping image files.

## Workflow

- **Verify before claiming done**: `npm run lint` and `npm run build` must be clean, and check the actual output (`grep out/`) for the claimed change. For visual changes, measure the rendered pixels — never assert "looks right" from CSS arithmetic alone.
- Don't commit, push, or alter anything remote unless the user asks.
- Keep content edits in the data files as plain, single strings where possible; avoid placeholder-splitting magic unless the user asks for it.
