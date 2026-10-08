@AGENTS.md

# Warrick Motors — working notes for Claude

- Start every session by reading `docs/PROJECT_STATUS.md` (phase plan + log) and `docs/ARCHITECTURE.md`.
- Pure JavaScript only (no TypeScript). Path alias `@/*` → project root.
- Data access only through `lib/services/*`; never import `lib/data/*` from components or routes.
- Tokens live in `app/globals.css` `@theme` — use token classes (`bg-ink-900`, `text-gold-600`, `bg-crimson-600`), no raw hex in JSX.
- After each phase: run `npx next build` + `npx eslint .`, then append to the Phase log in `docs/PROJECT_STATUS.md`.
