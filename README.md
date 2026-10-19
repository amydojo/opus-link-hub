# OPUS — Dr. Frew Link Hub

Standalone **Next.js App Router** design preview of the official OPUS Plastic Surgery links page.
Built for design review on a separate Vercel project and an easy handoff into the existing OPUS website.

## URLs

- Preview: https://opus-link-hub.vercel.app
- Standalone root and /links render the same page.
- Final destination after the main-site integration: https://opusplasticsurgery.ai/links

## Link destinations

1. **Request First Access** → https://opusplasticsurgery.ai/first-access (request only, no immediate booking guarantee)
2. **Explore Procedures** → https://opusplasticsurgery.ai/procedures
3. **Before & After Gallery** → https://opusplasticsurgery.ai/gallery
4. **@opusresults** → https://www.instagram.com/opusresults/ (secondary footer link)
5. Official OPUS logo in header → https://opusplasticsurgery.ai/

These destinations are absolute on the independent Vercel preview and relative on the official OPUS domain so no internal navigation creates fake campaign attribution.

## Visual system

- Typographic OPUS lockup and display name: Cormorant Garamond, confirmed in the official OPUS Canva Brand Kit Canon.
- Utility text: Inter, confirmed by the same brand canon.
- Restrained espresso and warm paper editorial layout, warm cognac-clay accents.
- The typographic wordmark is not represented as the canonical approved SVG; replace it with the authentic OPUS asset if supplied.
- Fonts load from Bunny Fonts (same provider used by the main OPUS site). Preserve or adjust CSP allowances during integration.
- The link route is self-contained with a CSS Module.

## Handoff to Frew / Claude Code

1. Copy only the `app/links/` folder into the existing main-site project (or `src/app/links/`).
2. Preserve all existing global components, analytics, lead tracking, forms, CRM and Content Security Policy.
3. Replace typography-based OPUS wordmark with official vector/image logo if available, preserving proportions and accessibility.
4. Check font loading (Cormorant Garamond and Inter) against the existing site font setup/CSP.
5. Preview the page at `/links` on desktop and mobile; confirm all destinations.
6. The `opus_linkhub_click` dataLayer event is optional navigation tracking and is **not** a lead conversion; do not count it as `first_access_submit`.
7. Deploy under the official OPUS domain and update the @dr.frew Instagram link only after production checks.

This preview is intentionally private-to-workflow, not a public commercial OPUS advertising destination. The connected personal Vercel account uses Hobby; commercial hosting belongs on the approved business site/plan. No patient photos or data are included.
