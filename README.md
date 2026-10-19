# OPUS — Surgeon Link Hub

Independent **Next.js App Router** design prototype for Dr. Tyler Frew's OPUS Plastic Surgery Instagram bio. Built as a private design-review workflow with a live Vercel preview and an integration-ready `/links` route.

## Pages
- `/` displays the hub on the standalone Vercel preview.
- `/links` displays the identical hub; copy `app/links/` into the official OPUS Next.js app for production.
- All links point to real OPUS destinations; no login, form, CMS, or patient data.

## Destinations
1. **Get First Access** → `https://opusplasticsurgery.ai/first-access` (consultation requests, not direct booking).
2. **Patient Results** → `https://www.instagram.com/opusresults/`.
3. **Explore OPUS** → `https://opusplasticsurgery.ai/`.

## Development
```sh
npm install
npm run dev
npm run build
```
Vercel deploys the `main` branch automatically. The current Vercel deployment is for **internal preview only** and is not the public marketing destination. Vercel Hobby restricts commercial usage; arrange an eligible business plan if using Vercel for an ongoing OPUS commercial deployment.

## Handoff to Dr. Frew / Claude Code
In the existing `opusplasticsurgery.ai` repository:
1. Add the folder `app/links/` (or `src/app/links/` as appropriate).
2. Swap the typographic OPUS fallback for the official wordmark, and align fonts with existing site tokens. Scoped CSS prevents global clashes.
3. Do **not** copy `app/page.tsx`, `app/layout.tsx`, or `app/globals.css`; these are only for this standalone preview.
4. Preserve the site's existing Google Analytics, tag manager, CSP, forms, Google Ads GCLID, Pixel, CRM and all lead conversions.
5. Verify `/links` in an official-site staging deployment, including mobile and actual URLs. The `opus_linkhub_click` dataLayer event is a navigation event, **not** a consultation conversion.
6. Publish on the official business Vercel project at `https://opusplasticsurgery.ai/links`, then update the Instagram bio and retire the independent prototype URL.

## Notes
- No patient photos or patient health information are included.
- `@opusresults` should be populated with consented cases before being promoted as a finished gallery.
- No new paid services or trackers are required.
