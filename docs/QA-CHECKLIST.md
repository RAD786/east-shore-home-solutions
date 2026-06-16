# QA Checklist — Pre-Launch

Run this before showing the client and before going live. Test on a real phone
and a desktop browser.

---

## Build & code health

- [ ] `npm run build` succeeds (also runs lint + type-check)
- [ ] `npm run lint` is clean
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No console errors in the browser on any page

## Responsive layout

- [ ] **Mobile (≤640px):** header, hero, cards, footer stack cleanly
- [ ] **Tablet (~768px):** grids reflow without awkward gaps
- [ ] **Desktop (≥1024px):** content is centered, max-width respected
- [ ] No horizontal scroll at any width
- [ ] Sticky **mobile call bar** shows on mobile, hidden on desktop, and doesn't
      cover the footer (body has bottom padding on mobile)
- [ ] Top trust bar + header spacing looks right; header stays sticky on scroll

## Navigation

- [ ] Desktop nav links work: Home, Services, Service Areas, About, Contact
- [ ] Mobile hamburger opens/closes; links navigate and close the menu
- [ ] Footer links (services, cities, all-services, all-areas) all work
- [ ] No broken internal links (all `/services/*` and `/service-areas/*` resolve)
- [ ] 404 page renders for an unknown URL with a way back home

## Conversion / forms

- [ ] Phone CTAs dial the number on mobile (`tel:` link)
- [ ] Contact form: required fields error when empty
- [ ] Valid submission shows the loading → success state
- [ ] Forced failure shows the error state with a "call us" fallback
- [ ] Service pages prefill the matching service in the form
- [ ] Photo upload accepts an image and shows the filename
- [ ] Buttons/links have comfortable tap targets (~44px)

## Accessibility

- [ ] One `<h1>` per page; heading order is logical
- [ ] All form inputs have visible labels (and `aria-invalid` on error)
- [ ] Visible focus ring when tabbing through links/buttons/fields
- [ ] Full keyboard navigation works (including the mobile menu & FAQ accordions)
- [ ] Color contrast: gold CTA buttons use dark text; body text is legible
- [ ] When real images are added, every `<Image>` has descriptive `alt` text

## SEO / metadata

- [ ] Every page has a unique `<title>` and meta description
- [ ] `/sitemap.xml` and `/robots.txt` resolve
- [ ] View source on a service & city page → JSON-LD present
      (LocalBusiness, Service/LocalBusiness, FAQPage, BreadcrumbList)
- [ ] `NEXT_PUBLIC_SITE_URL` is set so canonical URLs are correct
- [ ] OG image exists at `/images/og-default.jpg` (see IMAGES.md) before sharing

## Content accuracy

- [ ] Phone, email, hours, and service-area towns are correct
- [ ] No fake reviews, ratings, awards, certifications, or year claims
- [ ] Licensed-trade limitation wording present on plumbing/fixture pages
- [ ] Spelling/grammar pass on hero, services, and contact copy

## Performance (nice-to-have)

- [ ] Run Lighthouse (mobile) — aim for green Performance/SEO/Best Practices/A11y
- [ ] Replace gradient placeholders with optimized real images (see IMAGES.md)
