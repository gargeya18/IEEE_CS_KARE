# IEEE CSE Branch — Frontend

This repository contains the frontend for the IEEE Computer Society Student Branch site.

Layout
- `frontend/` — actual frontend source (React + Vite + Tailwind).
- `frontend/dist/` — production build artifacts (should be ignored in git).

Notes for maintainers
- Run `npm install` in the project root (or in `frontend/` if you prefer) and use `npm run dev` to start the dev server.
- Build: `npm run build` (from the `frontend/` directory) — output goes to `frontend/dist`.
- Netlify: Netlify is configured to build from the `frontend` base directory and publish the `dist` folder (see `netlify.toml`).

Backend
- This repo is frontend-only. Create a separate `backend/` directory or repository to implement server APIs. Use client-side API stubs or environment variables to point to the backend.
