# Deployment Checklist — Vercel

A step-by-step list to take East Shore Home Solutions from repo to live site.

---

## 1. Pre-deploy (local)

- [ ] `npm install` runs clean
- [ ] `npm run build` succeeds with no errors
- [ ] `npm run lint` passes
- [ ] Review business info in [lib/siteConfig.ts](../lib/siteConfig.ts)
      (phone, email, hours, areas) — it drives the whole site
- [ ] Confirm `.env.local` is **not** committed (it's gitignored)

## 2. Push to Git

- [ ] Repo pushed to GitHub / GitLab / Bitbucket
- [ ] Main branch is the one you want auto-deploying

## 3. Create the Vercel project

- [ ] vercel.com → **Add New → Project** → import the repo
- [ ] Framework preset detected as **Next.js** (leave build settings default)
- [ ] Don't deploy yet if you want env vars in place first (optional)

## 4. Environment variables (Vercel → Settings → Environment Variables)

Add for the **Production** (and optionally Preview) environment:

- [ ] `NEXT_PUBLIC_SITE_URL` = `https://www.eastshorehomesolutions.com`
- [ ] `LEAD_NOTIFY_EMAIL` = `EastshorepropertyLLC@gmail.com`
- [ ] `OWNER_PHONE` = `+16099941137`
- [ ] `RESEND_API_KEY` (when email is ready — see INTEGRATIONS.md)
- [ ] `RESEND_FROM_EMAIL` (verified domain/address in Resend)
- [ ] `GHL_WEBHOOK_URL` (if/when GHL is used)
- [ ] `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM_NUMBER` (for SMS)

> The site deploys and the form works even with **none** of the integration
> vars set (leads are logged server-side). Set `NEXT_PUBLIC_SITE_URL` first so
> canonical URLs and the sitemap are correct.

## 5. Deploy & smoke test

- [ ] Trigger the deploy; wait for "Ready"
- [ ] Visit the `*.vercel.app` URL
- [ ] Run through [QA-CHECKLIST.md](QA-CHECKLIST.md)
- [ ] Submit a test lead and confirm the success state
- [ ] Check Vercel **Logs** to confirm the lead was received (and emailed/texted
      if integrations are configured)

## 6. Post-deploy SEO

- [ ] Visit `/sitemap.xml` and `/robots.txt` — both should resolve
- [ ] Once the domain is live, submit the sitemap in **Google Search Console**
- [ ] Set up / claim the **Google Business Profile** (huge for local SEO)
- [ ] Add real social URLs to `social` in [lib/siteConfig.ts](../lib/siteConfig.ts)
      (they feed the LocalBusiness `sameAs` schema)

---

## Connecting the domain

Once `eastshorehomesolutions.com` is purchased:

1. **Vercel → Project → Settings → Domains → Add.**
   Add both `eastshorehomesolutions.com` and `www.eastshorehomesolutions.com`.
2. Pick the primary (the site is configured for the **`www`** version — keep
   `www` primary and let the apex redirect to it, or adjust
   `NEXT_PUBLIC_SITE_URL` to match whichever you choose).
3. **Update DNS at the registrar** (GoDaddy, Namecheap, etc.) using the records
   Vercel shows — typically:
   - `A` record for the apex `@` → Vercel's IP, **or** an `ALIAS`/`ANAME` to
     `cname.vercel-dns.com`
   - `CNAME` for `www` → `cname.vercel-dns.com`
4. Wait for DNS propagation; Vercel auto-provisions the SSL certificate.
5. **Confirm `NEXT_PUBLIC_SITE_URL` matches the final primary domain**, then
   redeploy so canonical URLs, OG tags, and the sitemap all point to it.
6. Re-run the smoke test on the real domain and resubmit the sitemap to GSC.

> If you change the primary domain later, update `NEXT_PUBLIC_SITE_URL` and the
> `domain`/`url` values in [lib/siteConfig.ts](../lib/siteConfig.ts) (the env var
> overrides at runtime, but keep the fallback accurate).
