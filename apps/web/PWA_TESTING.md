# PWA Testing Guide — KUKUNET Digital

This document explains how to verify Progressive Web App installation and offline behavior across devices.

## Prerequisites

1. Start the API: `cd api && npm run start:dev`
2. Start the web app: `cd web && npm run dev`
3. For install testing, use **HTTPS** or `localhost` (browsers require a secure context for service workers).

Production build (recommended for final PWA checks):

```bash
cd web
npm run build
npm run start
```

## What is configured

| Asset | Purpose |
|-------|---------|
| `public/manifest.json` | App name, icons, theme colors, `display: standalone` |
| `public/sw.js` | Caches shell pages and static assets; network-first for API |
| `public/offline.html` | Fallback page when navigation fails offline |
| `app/layout.tsx` | Viewport, theme-color, apple-touch-icon, manifest link |
| `components/pwa-register.tsx` | Registers the service worker on load |

## Desktop (Chrome / Edge)

1. Open `http://localhost:3000`
2. Open DevTools → **Application** → **Manifest**
   - Confirm name: **KUKUNET Digital**
   - Confirm `display: standalone`
   - Confirm icons load from `/icons/`
3. Open **Service Workers** and verify `/sw.js` is **activated**
4. Click the install icon in the address bar (or Application → Manifest → **Install**)
5. Launch the installed app — it should open without browser chrome

### Offline test (desktop)

1. DevTools → **Network** → enable **Offline**
2. Reload `/dashboard` — cached shell may load; API calls return a JSON offline message
3. Navigate to an uncached route — you should see `/offline.html`

## Android (Chrome)

1. Deploy or expose dev server on your LAN (e.g. `next dev -H 0.0.0.0`) **or** use a deployed HTTPS URL
2. Open the site in Chrome
3. Tap the menu → **Install app** or **Add to Home screen**
4. Confirm the home-screen icon and standalone launch
5. Toggle airplane mode and reopen the app to verify the offline fallback

## iOS (Safari)

1. Open the site in Safari (HTTPS required except localhost on device is not typical — use a tunnel or staging URL)
2. Tap **Share** → **Add to Home Screen**
3. Confirm app title **KUKUNET Digital** and icon
4. Launch from home screen — runs in standalone mode with dark status bar (`black-translucent`)

> **Note:** iOS has limited service worker support compared to Chrome. Offline caching works for static assets; background sync is not available.

## Lighthouse audit

1. DevTools → **Lighthouse**
2. Select **Progressive Web App** category
3. Run audit against production build on `localhost`

Expected passing areas:

- Manifest present with required fields
- Service worker registered
- Viewport and theme-color meta tags
- Installable over HTTPS

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No install prompt | Use HTTPS or localhost; ensure `sw.js` registers without errors |
| Old cached content | DevTools → Application → Clear storage → Unregister SW → hard reload |
| API fails offline | Expected — auth and dashboard data require network; offline page covers navigation |
| Icons missing on iOS | Replace SVG apple-touch-icon with PNG (180×180) in `public/icons/` if needed |

## Where to see the mobile UI

The mobile reference designs (Home, Track, Progress, Profile) live **after sign-in** at `/dashboard`, not on the marketing landing page.

| URL | Mobile (&lt;768px) | Desktop (≥768px) |
|-----|-------------------|------------------|
| `/` | Dark mobile app launcher (Sign In / Register) | Full marketing landing page |
| `/login`, `/register` | Full-screen mobile auth forms | Centered auth card |
| `/dashboard/*` | Full-screen app with bottom navigation | Sidebar workspace layout |

If you are already signed in, visiting `/` redirects to `/dashboard` automatically.

## Install button

A floating **Install KUKUNET Digital** banner appears at the bottom of the screen. If dismissed, tap the small **Install** pill button at bottom-right.

Chrome may also show a native install icon in the address bar when all PWA criteria are met.

| Viewport | Expected UI |
|----------|-------------|
| &lt; 768px | Full-screen mobile dashboard with bottom nav (Home, Track, Progress, Profile) |
| ≥ 768px | Desktop sidebar workspace layout (existing premium dashboard design) |

Resize the browser or use DevTools device emulation at **767px** and **768px** to confirm the layout switches completely (not gradual scaling).
