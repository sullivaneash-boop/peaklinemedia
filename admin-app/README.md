# Peakline Admin (local dev)

This is a minimal Vite + React + TypeScript scaffold for the admin UI.
The build output is configured to go into `../admin` so after building the site will be served from `/admin/` in this repo.

Quick start:

```bash
cd admin-app
npm install
npm run build
# build artifacts will be placed into ../admin
```

Notes:
- The app includes a dev-only client-side password overlay to gate access; this is not secure for production.
- For production, use Netlify Identity / Netlify Access or another server-side auth solution.
