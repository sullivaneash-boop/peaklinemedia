# Peakline Media Website

Georgia's trusted NIL partner connecting college athletes with local brands.

## Deployment

This site is deployed via Cloudflare Pages connected to GitHub.

### Auto-deployment
- Push to `main` branch triggers automatic deployment
- Cloudflare Pages settings:
  - Build command: (none - static site)
  - Build output directory: `/`
  - Root directory: `/`

### Local Development
Simply open `index.html` in a browser or use a local server:
```bash
npx serve
```

## File Structure
- `/css/` - All stylesheets
- `/js/` - All JavaScript files
- `/public/` - Static assets (favicon, etc.)
- `*.html` - Page templates
