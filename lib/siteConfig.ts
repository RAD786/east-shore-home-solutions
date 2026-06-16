/**
 * Central business configuration for East Shore Home Solutions.
 * Single source of truth for NAP (Name, Address, Phone), hours,
 * service-area cities, and brand copy. Imported everywhere so the
 * site stays consistent and is trivial to update.
 */

export type ServiceAreaCity = {
  name: string;
  /** true = has a dedicated /service-areas/[slug] page */
  hasPage: boolean;
  /** slug for the dedicated page (only meaningful when hasPage = true) */
  slug?: string;
};

const rawPhone = "(609) 994-1137";

export const siteConfig = {
  businessName: "East Shore Home Solutions",
  shortName: "East Shore",
  tagline: "Ocean County's Trusted Local Handyman",
  description:
    "Reliable handyman and home repair services across Ocean County, NJ. Drywall repair, TV mounting, door & deck repair, rental property maintenance and more. Same-day estimates, local owner, insured.",

  // ── Contact / NAP ──────────────────────────────────────────
  phone: rawPhone,
  phoneHref: "tel:+16099941137",
  phoneRaw: "+16099941137",
  email: "EastshorepropertyLLC@gmail.com",
  emailHref: "mailto:EastshorepropertyLLC@gmail.com",

  // ── Location ───────────────────────────────────────────────
  region: "Ocean County, NJ",
  regionShort: "Ocean County",
  mainCity: "Toms River, NJ",
  state: "NJ",
  stateLong: "New Jersey",
  geo: {
    // Approx. Toms River, NJ — used for LocalBusiness schema
    latitude: 39.9537,
    longitude: -74.1979,
  },

  // ── Hours / availability ───────────────────────────────────
  hours: "Mon–Sat 8am–8pm",
  hoursStructured: [
    { days: "Monday – Saturday", time: "8:00 AM – 8:00 PM" },
    { days: "Sunday", time: "Emergency service only" },
  ],
  emergencyAvailability: "24/7 emergency service available",
  emergencyService: "24/7 emergency service available",

  // ── Trust signals (no fake reviews — facts only) ───────────
  trust: {
    insured: true,
    localOwner: true,
    sameDayEstimates: true,
    yearsInBusiness: "Locally owned & operated",
  },

  // ── Domain / URLs ──────────────────────────────────────────
  // Domain placeholder — swap when the real domain is live.
  domain: "https://www.eastshorehomesolutions.com",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.eastshorehomesolutions.com",

  // ── Social placeholders (fill in when accounts exist) ──────
  social: {
    facebook: "", // e.g. https://www.facebook.com/eastshorehomesolutions
    instagram: "", // e.g. https://www.instagram.com/eastshorehomesolutions
    google: "", // Google Business Profile URL
    yelp: "", // Yelp listing URL
  },

  // ── Service area cities ────────────────────────────────────
  // Cities flagged hasPage:true get a dedicated location page.
  // The rest are mentioned naturally on the Service Areas page.
  serviceAreas: [
    { name: "Toms River", hasPage: true, slug: "toms-river" },
    { name: "Brick", hasPage: true, slug: "brick" },
    { name: "Lakewood", hasPage: true, slug: "lakewood" },
    { name: "Jackson", hasPage: true, slug: "jackson" },
    { name: "Point Pleasant", hasPage: true, slug: "point-pleasant" },
    { name: "Barnegat", hasPage: true, slug: "barnegat" },
    { name: "Stafford / Manahawkin", hasPage: true, slug: "stafford-manahawkin" },
    { name: "LBI / Beach Haven", hasPage: true, slug: "lbi-beach-haven" },
    { name: "Point Pleasant Beach", hasPage: false },
    { name: "Bay Head", hasPage: false },
    { name: "Lavallette", hasPage: false },
    { name: "Long Beach Island", hasPage: false },
  ] satisfies ServiceAreaCity[],

  // Flat list of individual towns for LocalBusiness `areaServed` schema
  // (kept granular for local SEO — separate Stafford/Manahawkin, LBI, etc.).
  areaServed: [
    "Toms River",
    "Brick",
    "Lakewood",
    "Jackson",
    "Point Pleasant",
    "Point Pleasant Beach",
    "Barnegat",
    "Stafford",
    "Manahawkin",
    "Long Beach Island",
    "Beach Haven",
    "Lavallette",
    "Bay Head",
  ],

  // Primary / secondary calls-to-action used across the site
  primaryCTA: "Request Same-Day Estimate",
  secondaryCTA: "Get a Free Quote",
  cta: {
    call: "Call Now",
    estimate: "Request Same-Day Estimate",
    quote: "Get a Free Quote",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Cities that have their own dedicated landing page. */
export const cityPages = siteConfig.serviceAreas.filter((c) => c.hasPage);
