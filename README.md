# East Shore Home Solutions

Local SEO lead-generation website for **East Shore Home Solutions** — a
handyman & home repair business serving Ocean County, NJ.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, with
**React Hook Form + Zod** powering the lead form. Deploys to **Vercel**.

---

## Table of contents

- [Run locally](#run-locally)
- [Deploy to Vercel](#deploy-to-vercel)
- [Environment variables](#environment-variables)
- [How the contact form works](#how-the-contact-form-works)
- [Optional integrations](#optional-integrations)
- [Add / edit services](#add--edit-services)
- [Add / edit locations](#add--edit-locations)
- [Replace placeholder images](#replace-placeholder-images)
- [Update metadata / SEO](#update-metadata--seo)
- [Project structure](#project-structure)
- [Checklists & docs](#checklists--docs)
- [Compliance note](#compliance-note)

---

## Run locally

Requires **Node 18.17+** (Node 20+ recommended).

```bash
npm install
cp .env.example .env.local   # optional — the site runs without it
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build (also runs lint + type-check)
npm run start   # serve the production build locally
npm run lint    # ESLint
```

---

## Deploy to Vercel

The fastest path (no config needed — Vercel auto-detects Next.js):

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected). Leave build/output settings default.
4. Add environment variables (see below) under **Settings → Environment Variables**.
   At minimum set `NEXT_PUBLIC_SITE_URL`. Integrations can be added later.
5. **Deploy.** Every push to the main branch redeploys automatically.

> Full step-by-step list: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
> Connecting the real domain later: [docs/DEPLOYMENT.md#connecting-the-domain](docs/DEPLOYMENT.md#connecting-the-domain)

---

## Environment variables

Copy `.env.example` → `.env.local` for local dev, and add the same keys in
Vercel for production. **Every integration is optional** — with none set, the
contact form validates, logs the lead to the server console, and returns a
success message.

| Variable | Purpose | Required? |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, metadata, sitemap | Recommended |
| `LEAD_NOTIFY_EMAIL` | Owner inbox for new-lead emails | For email |
| `OWNER_PHONE` | Owner phone for SMS alerts (E.164) | For SMS |
| `RESEND_API_KEY` | Enables owner + customer emails | Optional |
| `RESEND_FROM_EMAIL` | Verified Resend "from" address | For email |
| `GHL_WEBHOOK_URL` | POST each lead into GoHighLevel | Optional |
| `TWILIO_ACCOUNT_SID` | Twilio SMS | For SMS |
| `TWILIO_AUTH_TOKEN` | Twilio SMS | For SMS |
| `TWILIO_FROM_NUMBER` | Twilio sending number | For SMS |

Never commit real secrets — `.env*.local` is gitignored.

---

## How the contact form works

1. The **`ContactForm`** component ([components/ContactForm.tsx](components/ContactForm.tsx))
   validates input on the client with React Hook Form + the shared Zod schema
   ([lib/validators.ts](lib/validators.ts)), then submits as `multipart/form-data`
   (so a photo can be attached) to **`/api/contact`**.
2. The route ([app/api/contact/route.ts](app/api/contact/route.ts)) re-validates
   server-side, builds a clean lead object, and fans out to whatever
   integrations are configured.
3. The user sees a loading state, then a success or error state. The success
   state thanks them and surfaces the phone number for emergencies.

The form fields, validation rules, urgency options, and service list all live
in [lib/validators.ts](lib/validators.ts). A hidden honeypot field blocks
basic spam bots.

---

## Optional integrations

All are env-gated and isolated, so a missing or failing one never crashes the
request or loses a lead.

- **Resend** (`RESEND_API_KEY` + `RESEND_FROM_EMAIL`) — sends the owner a
  new-lead email **and** the customer a confirmation email, via the Resend REST
  API (no SDK dependency).
- **Twilio** (`TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM_NUMBER`)
  — texts an alert to `OWNER_PHONE`, via the Twilio REST API.
- **GoHighLevel** (`GHL_WEBHOOK_URL`) — POSTs the lead to an inbound webhook
  (creates contact/opportunity; payload includes a suggested `"New Lead"`
  pipeline stage).
- **Photo storage** — currently stubbed in `storePhoto()` with a clear TODO; the
  file is received but not yet persisted (see [docs/IMAGES.md](docs/IMAGES.md)).

> Setup steps for each: [docs/INTEGRATIONS.md](docs/INTEGRATIONS.md)

---

## Add / edit services

All services live in **[lib/services.ts](lib/services.ts)** in the `services`
array. Each object generates its own `/services/[slug]` page, card, footer link,
sitemap entry, and JSON-LD automatically.

To **add** a service, append an object with all `Service` fields:

```ts
{
  title: "Gutter Repair",
  slug: "gutter-repair",              // becomes /services/gutter-repair
  shortTitle: "Gutter Repair",        // nav/cards
  shortDescription: "…",              // card teaser
  longDescription: "…",               // page intro / H1 subtitle
  icon: "maintenance",                // a ServiceIcon key (see ServiceCard.tsx)
  image: "/images/services/gutter-repair.jpg",
  primaryKeywords: ["…"],
  includedServices: ["…"],
  commonProblems: ["…"],
  notIncluded: ["…"],
  licensedTradeNotice: false,         // true = show the standard trade-limit notice
  ctaText: "Get a Gutter Quote",
  faqs: [{ question: "…", answer: "…" }],
  metaTitle: "Gutter Repair in Ocean County, NJ",
  metaDescription: "…",
}
```

- To **feature** it on the homepage, add the slug to `featuredSlugs` in
  [app/page.tsx](app/page.tsx).
- `notIncluded` and `licensedTradeNotice` keep the copy compliant — see the
  [compliance note](#compliance-note).
- Smaller offerings without their own page go in `secondaryServices`.

---

## Add / edit locations

City/area pages live in **[lib/locations.ts](lib/locations.ts)** in the
`locations` array. Each generates a `/service-areas/[slug]` page with unique
copy, FAQ, and JSON-LD.

To add a city page, append a `Location` object (`cityName`, `slug`, `shortName`,
`headline`, `shortDescription`, `nearbyAreas`, `targetKeywords`, `localNotes`,
`faqs`, `ctaText`, `metaTitle`, `metaDescription`, `image`). Then add a matching
entry to `serviceAreas` in [lib/siteConfig.ts](lib/siteConfig.ts) with
`hasPage: true` so it appears in nav/footer/cards.

- Towns that should be **mentioned but not get a page** go in `serviceAreas`
  with `hasPage: false`, and/or in the `areaServed` list used for LocalBusiness
  schema.
- Keep each city's copy genuinely local — avoid thin duplicate pages.

---

## Replace placeholder images

The site currently renders **CSS-gradient placeholders** (no image files
needed), so it builds and looks finished with zero assets. Image paths are
already defined in the data files.

To add real photos:

1. Drop optimized files into `public/images/...` at the paths listed in
   [public/images/README.md](public/images/README.md) and
   [docs/IMAGES.md](docs/IMAGES.md).
2. Replace the gradient placeholder blocks with `next/image` (the
   `next.config.js` is already image-ready).

> Full guidance, paths, and the OG image note: [docs/IMAGES.md](docs/IMAGES.md)

---

## Update metadata / SEO

- **Per-page titles/descriptions** are built with `buildMetadata()` in
  [lib/seo.ts](lib/seo.ts). Static pages pass their own copy; service and city
  pages derive `metaTitle` / `metaDescription` from their data files.
- **Business info** (name, phone, email, hours, areas served, social links,
  domain) lives in [lib/siteConfig.ts](lib/siteConfig.ts) — update once,
  reflected everywhere including JSON-LD.
- **Structured data** builders (LocalBusiness, Service, FAQPage, Breadcrumb,
  Location) are in [lib/schema.ts](lib/schema.ts).
- **Sitemap & robots** are generated by [app/sitemap.ts](app/sitemap.ts) and
  [app/robots.ts](app/robots.ts) — no manual upkeep needed.
- After buying the domain, set `NEXT_PUBLIC_SITE_URL` so canonical URLs, OG
  tags, and the sitemap all point to the live domain.

---

## Project structure

```
app/
  page.tsx                       Home
  about/page.tsx                 About
  services/page.tsx              Services index
  services/[slug]/page.tsx       Individual service pages
  service-areas/page.tsx         Service areas index
  service-areas/[slug]/page.tsx  City/area pages
  contact/page.tsx               Contact + lead form
  api/contact/route.ts           Lead handler (Resend / Twilio / GHL stubs)
  sitemap.ts / robots.ts         SEO routing
  layout.tsx / globals.css       Shell + global styles
components/                      Reusable UI (Header, Footer, Hero, ContactForm…)
lib/                             siteConfig, services, locations, seo, schema, validators
public/images/                   Image placeholders (see README there)
docs/                            Deployment, integration, QA, and image notes
```

---

## Checklists & docs

- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — pre-launch deployment checklist + domain setup
- [docs/INTEGRATIONS.md](docs/INTEGRATIONS.md) — GHL / Resend / Twilio setup
- [docs/QA-CHECKLIST.md](docs/QA-CHECKLIST.md) — pre-launch QA pass
- [docs/IMAGES.md](docs/IMAGES.md) — adding real photos + OG image

---

## Compliance note

This site markets **general handyman work only**. Copy intentionally avoids
implying licensed plumbing, electrical, or HVAC trade work — it uses wording
like "minor repairs," "fixture replacement," and "insured," and refers
licensed-trade jobs out to the appropriate professional. Keep this wording when
editing copy; the `notIncluded` and `licensedTradeNotice` fields on services
exist for exactly this reason. Do not add reviews, ratings, awards,
certifications, or year-count claims that aren't true.
