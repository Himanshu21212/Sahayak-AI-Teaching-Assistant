
# Sahayak AI Educator

Lightweight Vite + React + TypeScript starter configured with shadcn/ui primitives and TailwindCSS. This repo is the frontend for the "Sahayak AI Educator" project — a UI that helps generate and share AI-powered lesson content.

## Quick summary

- Framework: Vite (React + TypeScript)
- Styling: Tailwind CSS
- Components: shadcn-style primitives (Radix + Tailwind)
- Dev server: Vite (default will attempt ports 8080/8081 then fall back; in my session it started on 8082)

## Prerequisites

- Node.js (recommended >= 18)
- npm (or pnpm/yarn if you prefer; commands below use npm)

## Getting started (development)

Open a terminal in the project root (`sahayak-ai-educator/`) and run:

```powershell
npm install
npm run dev
```

- The dev server will print the local URL (for example: `http://localhost:8082/`).
- To stop the server, focus the terminal and press Ctrl+C.

If you need to run the dev server on a specific port:

```powershell
npm run dev -- --port 3000
```

## Build & preview (production)

Create a production build and preview it locally:

```powershell
npm run build
npm run preview
```

`preview` serves the built assets so you can sanity-check the production output.

## Useful scripts

- `npm run dev` — start development server (Vite)
- `npm run build` — create production build
- `npm run build:dev` — build with development mode (non-minified)
- `npm run lint` — run eslint across the project

## Common tasks & troubleshooting

- If dependencies are missing or you switch Node versions:

```powershell
npm install
```

- If the server reports a port in use, either allow Vite to pick a new port (it will) or pass `--port <port>` to the command.

- Addressing vulnerabilities reported by npm:

```powershell
npm audit
npm audit fix
```

Note: automated fixes may not solve every issue; review the audit output before accepting risky upgrades.

## Project structure (important files)

- `index.html` — app entry HTML
- `src/main.tsx` — React entry
- `src/App.tsx` — top-level app component
- `src/pages/` — route pages (Dashboard, GenerateLesson, SharedLessons, etc.)
- `src/components/` — UI components and form components (LessonForm, QuizForm, Navbar, Sidebar, etc.)
- `src/services/api.ts` — API client / services
- `src/lib/utils.ts` — utility helpers
- `tailwind.config.ts` — Tailwind configuration
- `vite.config.ts` — Vite configuration

Explore `src/components/ui/` for the shared shadcn-style primitives and small atoms used across the app.

## Notes for contributors

- Follow existing TypeScript and Tailwind patterns.
- Run `npm run lint` before opening a PR.
- Add small, focused commits and include a short description of changes in the PR.

## Running in a different environment / CI

- In CI, run `npm ci` to install strictly from lockfile, then `npm run build`.

## Contact & license

This README was generated to help you run and develop the frontend. Check repository metadata for author/contributor and licensing details.

---

If you'd like, I can also:

- add a small `CONTRIBUTING.md` with a contributor checklist,
- wire up a basic GitHub Actions workflow to build & lint on push,
- or generate a short developer quick-start that documents where to change the dev port or environment variables.

