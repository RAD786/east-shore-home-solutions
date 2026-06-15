# East Shore Home Solutions

Local SEO lead-generation website for **East Shore Home Solutions** — a
handyman & home repair business serving Ocean County, NJ.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, with
**React Hook Form + Zod** powering the lead form. Ready for **Vercel**.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — site works without it
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  page.tsx                     Home
  about/page.tsx               About
  services/page.tsx            Services index
  services/[slug]/page.tsx     Individual service pages (SEO landing pages)
  service-areas/page.tsx       Service areas index
  service-areas/[slug]/page.tsx City/area landing pages
  contact/page.tsx             Contact + lead form
  api/contact/route.ts         Lead form handler (email/SMS/GHL/webhook stubs)
  sitemap.ts / robots.ts       SEO routing
components/                    Reusable UI (Header, Footer, Hero, ContactForm…)
lib/                           Data + config (siteConfig, services, locations, seo, schema, validators)
public/images/                 Placeholder image references (see README there)
```

## Content lives in `lib/`

Edit business info in `lib/siteConfig.ts`, services in `lib/services.ts`,
and city pages in `lib/locations.ts`. Pages, nav, footer, sitemap, and
schema all derive from these — change once, update everywhere.

## Lead form integrations (future)

The contact handler in `app/api/contact/route.ts` is integration-agnostic.
With no env vars it logs leads and returns success. Set env vars in
`.env.local` (see `.env.example`) to activate Resend (email), Twilio (SMS),
GoHighLevel (webhook), or a generic webhook — the dispatchers are stubbed
and commented with TODOs.

## Compliance note

This site markets **general handyman work only**. Copy intentionally avoids
implying licensed plumbing, electrical, or HVAC trade work.
# east-shore-home-solutions
