# Adding Real Photos

The site ships with **CSS-gradient placeholders**, so it builds and looks
polished with zero image files. When real photography is available, swap them
in. Real job photos build far more trust than stock — use the owner's actual
work once there's a library of it.

> Do **not** fabricate before/after photos or use misleading stock as if it were
> the owner's work.

---

## Where images are referenced

Image paths are already defined in the data files (they're used for OG/meta and
will be used by `next/image` once wired):

- Services: `image` field in [lib/services.ts](../lib/services.ts)
  → `/images/services/<slug>.jpg`
- Locations: `image` field in [lib/locations.ts](../lib/locations.ts)
  → `/images/locations/<slug>.jpg`
- Default OG/share image: `/images/OG-share-branded.png` (added)

The full expected file list is in
[public/images/README.md](../public/images/README.md).

---

## How to swap a placeholder for a real image

The placeholders are gradient `<div>` blocks (search for `Placeholder image`).
To use a real photo:

1. Add the optimized file under `public/images/...` at the matching path.
2. Replace the placeholder block with `next/image`, e.g.:

```tsx
import Image from "next/image";

<Image
  src={service.image}
  alt={`${service.title} by East Shore Home Solutions in Ocean County, NJ`}
  width={1280}
  height={720}
  className="rounded-2xl object-cover shadow-card"
/>
```

`next.config.js` is already image-ready (and allows `images.unsplash.com` for
temporary stock during development).

---

## Image guidelines

- **Format/size:** WebP or optimized JPG, generally < 200 KB each.
- **Dimensions:** hero/feature ~1280×720 (16:9); cards can be smaller.
- **Alt text:** always descriptive and local, e.g.
  "Drywall patch repair in Toms River, NJ." Never leave `alt` empty on
  meaningful images.
- **OG image:** a branded share image is already in place at
  `/images/OG-share-branded.png` (referenced site-wide for link previews via
  `OG_IMAGE` in `lib/seo.ts`). Ideal OG dimensions are **1200×630**.

---

## Lead photo uploads

The contact form lets customers attach a photo. The API route currently
**receives** the file but does not persist it — see the `storePhoto()` TODO in
[app/api/contact/route.ts](../app/api/contact/route.ts).

To finish it, pick a storage provider and return a public URL:

- **Vercel Blob** — simplest on Vercel: `npm i @vercel/blob`, set
  `BLOB_READ_WRITE_TOKEN`, then `put(...)` inside `storePhoto()`.
- **AWS S3 / Cloudinary** — also fine; store under a unique key and return the
  URL.

Once `storePhoto()` returns a URL, it automatically flows into the owner email,
SMS, and GHL payload (the route already wires `photoUrl` through).
