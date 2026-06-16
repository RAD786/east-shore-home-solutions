/**
 * Location data for city/area landing pages.
 * Each entry powers a /service-areas/[slug] page with locally-relevant,
 * UNIQUE copy and SEO keywords — no thin duplicate pages, no fake claims.
 */

import type { FAQ } from "./services";

export type Location = {
  /** City/area display name */
  cityName: string;
  /** URL slug */
  slug: string;
  /** Short name for nav/cards */
  shortName: string;
  /** Headline used on the location page (H1) */
  headline: string;
  /** Intro / short description (locally flavored) */
  shortDescription: string;
  /** Neighborhoods / nearby spots to mention naturally */
  nearbyAreas: string[];
  /** Primary SEO keywords for this city */
  targetKeywords: string[];
  /** A couple of locally-relevant blurbs (rental areas, shore homes, etc.) */
  localNotes: string[];
  /** City-specific FAQ (written for real users, not keyword filler) */
  faqs: FAQ[];
  /** CTA button text tuned to the city */
  ctaText: string;
  /** SEO <title> (brand suffix added automatically) */
  metaTitle: string;
  /** SEO meta description */
  metaDescription: string;
  /** Placeholder image */
  image: string;
};

export const locations: Location[] = [
  {
    cityName: "Toms River, NJ",
    slug: "toms-river",
    shortName: "Toms River",
    headline: "Handyman & Home Repair in Toms River, NJ",
    shortDescription:
      "As an Ocean County–based business, Toms River is home turf. East Shore Home Solutions provides dependable handyman and home repair services throughout Toms River, NJ — from drywall and door repairs to TV mounting, deck work, and rental property maintenance for year-round homes and Jersey Shore getaways alike.",
    nearbyAreas: [
      "Downtown Toms River",
      "Silverton",
      "Pleasant Plains",
      "Ortley Beach",
      "North Dover",
    ],
    targetKeywords: [
      "handyman Toms River NJ",
      "handyman services Toms River NJ",
      "home repair Toms River NJ",
      "property maintenance Toms River NJ",
    ],
    localNotes: [
      "We help Toms River homeowners with everyday repairs, upgrades, and full punch lists.",
      "Popular with local landlords and Ortley Beach shore-home owners for turnover and seasonal maintenance.",
    ],
    faqs: [
      {
        question: "Do you cover all of Toms River, including Ortley Beach?",
        answer:
          "Yes — we work throughout Toms River, from Silverton and Pleasant Plains to North Dover and the barrier-island sections like Ortley Beach, where we handle a lot of shore-home and rental upkeep.",
      },
      {
        question: "Can you help landlords with Toms River rental turnovers?",
        answer:
          "Absolutely. We're a go-to for Toms River landlords and property managers needing make-ready repairs and punch lists between tenants, with photo updates so you can stay hands-off.",
      },
      {
        question: "How fast can I get an estimate in Toms River?",
        answer:
          "Since Toms River is right in our backyard, we can usually provide a free, same-day estimate. Call us or send a request with a photo and we'll get back to you quickly.",
      },
    ],
    ctaText: "Get a Toms River Estimate",
    metaTitle: "Handyman in Toms River, NJ",
    metaDescription:
      "Local handyman & home repair in Toms River, NJ — drywall, doors, decks, TV mounting, and rental maintenance for shore and year-round homes. Same-day estimates.",
    image: "/images/locations/toms-river.jpg",
  },
  {
    cityName: "Brick, NJ",
    slug: "brick",
    shortName: "Brick",
    headline: "Handyman & Home Repair in Brick, NJ",
    shortDescription:
      "Serving Brick Township and the surrounding bayfront and lake communities, East Shore Home Solutions delivers reliable handyman services — drywall repair, door and deck work, fixture installation, and ongoing home maintenance for Brick, NJ homeowners, landlords, and seasonal property owners along the Jersey Shore.",
    nearbyAreas: [
      "Greenbriar",
      "Herbertsville",
      "Cedarwood Park",
      "Breton Woods",
      "Normandy Beach area",
    ],
    targetKeywords: [
      "handyman Brick NJ",
      "handyman services Brick NJ",
      "home repair Brick NJ",
      "property maintenance Brick NJ",
    ],
    localNotes: [
      "Quick, communicative service for Brick homeowners near the Metedeconk River and Barnegat Bay.",
      "Trusted by rental owners in the bayfront and barrier-island sections for seasonal upkeep.",
    ],
    faqs: [
      {
        question: "Which parts of Brick do you serve?",
        answer:
          "All of Brick Township — from Greenbriar and Herbertsville to the bayfront and barrier-island sections near Normandy Beach. If you're in Brick, we can help.",
      },
      {
        question: "Do you handle deck and fence repairs on Brick's waterfront homes?",
        answer:
          "Yes. Bayfront and lagoon-front homes in Brick take a beating from the weather, so non-structural deck board, railing, and fence repairs are some of our most common Brick jobs.",
      },
      {
        question: "Do you offer emergency service in Brick?",
        answer:
          "Yes — we offer 24/7 emergency service. If something can't wait, call and we'll do our best to get to you quickly in Brick.",
      },
    ],
    ctaText: "Get a Brick Estimate",
    metaTitle: "Handyman in Brick, NJ",
    metaDescription:
      "Reliable handyman & home repair in Brick, NJ — drywall, doors, decks, and fixtures for bayfront, lake, and year-round homes in Ocean County. Free quotes.",
    image: "/images/locations/brick.jpg",
  },
  {
    cityName: "Lakewood, NJ",
    slug: "lakewood",
    shortName: "Lakewood",
    headline: "Handyman & Home Repair in Lakewood, NJ",
    shortDescription:
      "East Shore Home Solutions provides fast, reliable handyman and home repair services across Lakewood, NJ. From drywall patching and door repairs to rental turnovers and general maintenance, we keep Lakewood homes, multi-family units, and rentals in great shape across Ocean County.",
    nearbyAreas: [
      "Downtown Lakewood",
      "Leisure Village",
      "Fairways",
      "Pine Park area",
    ],
    targetKeywords: [
      "handyman Lakewood NJ",
      "handyman services Lakewood NJ",
      "home repair Lakewood NJ",
      "property maintenance Lakewood NJ",
    ],
    localNotes: [
      "Great fit for Lakewood landlords and property managers handling multiple units.",
      "Fast scheduling for tenant-turnover punch lists and make-ready repairs.",
    ],
    faqs: [
      {
        question: "Do you work on multi-family and rental units in Lakewood?",
        answer:
          "Yes — Lakewood has a lot of multi-family and rental housing, and we help landlords and property managers keep units rent-ready with fast turnovers, punch lists, and ongoing repairs.",
      },
      {
        question: "What neighborhoods in Lakewood do you cover?",
        answer:
          "We serve all of Lakewood, including downtown, Leisure Village, the Fairways, and the Pine Park area.",
      },
      {
        question: "Can you handle several small repairs in one visit?",
        answer:
          "Definitely. Bundling a punch list into a single Lakewood visit is exactly what we're built for — it saves you time and money.",
      },
    ],
    ctaText: "Get a Lakewood Estimate",
    metaTitle: "Handyman in Lakewood, NJ",
    metaDescription:
      "Dependable handyman & home repair in Lakewood, NJ — drywall, doors, fixtures, and fast rental turnover punch lists for homes and multi-family units. Free quotes.",
    image: "/images/locations/lakewood.jpg",
  },
  {
    cityName: "Jackson, NJ",
    slug: "jackson",
    shortName: "Jackson",
    headline: "Handyman & Home Repair in Jackson, NJ",
    shortDescription:
      "From the neighborhoods near Jackson Premium Outlets to the quiet wooded subdivisions, East Shore Home Solutions handles handyman and home repair work across Jackson, NJ — drywall, doors, decks, fixtures, trim, and the whole home to-do list for Ocean County families.",
    nearbyAreas: [
      "Jackson Mills",
      "Cassville",
      "Holmeson",
      "Whitesville area",
    ],
    targetKeywords: [
      "handyman Jackson NJ",
      "handyman services Jackson NJ",
      "home repair Jackson NJ",
      "property maintenance Jackson NJ",
    ],
    localNotes: [
      "Helping Jackson homeowners with single repairs and full punch lists across the township.",
      "Same-day estimates from the outlets area to the wooded edges of town.",
    ],
    faqs: [
      {
        question: "Which parts of Jackson do you serve?",
        answer:
          "All of Jackson Township — from the neighborhoods near Jackson Premium Outlets to Jackson Mills, Cassville, and the wooded subdivisions on the township's edges.",
      },
      {
        question: "Can you tackle a full home to-do list in Jackson?",
        answer:
          "Yes. Many Jackson homeowners save up a list of small jobs — drywall, doors, trim, fixtures, furniture assembly — and we knock them out in a single visit.",
      },
      {
        question: "Do you provide free estimates in Jackson?",
        answer:
          "We do, and we aim to get them to you the same day whenever possible. Send a few photos with your request for a faster, more accurate quote.",
      },
    ],
    ctaText: "Get a Jackson Estimate",
    metaTitle: "Handyman in Jackson, NJ",
    metaDescription:
      "Local handyman & home repair in Jackson, NJ — drywall, doors, decks, trim, and full to-do lists for homes across Ocean County. Same-day estimates.",
    image: "/images/locations/jackson.jpg",
  },
  {
    cityName: "Point Pleasant, NJ",
    slug: "point-pleasant",
    shortName: "Point Pleasant",
    headline: "Handyman & Home Repair in Point Pleasant, NJ",
    shortDescription:
      "Point Pleasant and Point Pleasant Beach homes take a beating from shore weather. East Shore Home Solutions provides handyman repairs and seasonal maintenance — deck and fence repair, door sealing, drywall, and rental upkeep — for Point Pleasant, NJ homeowners and short-term rental hosts near the Jersey Shore.",
    nearbyAreas: [
      "Point Pleasant Beach",
      "Bay Head border",
      "Manasquan River area",
    ],
    targetKeywords: [
      "handyman Point Pleasant NJ",
      "handyman services Point Pleasant NJ",
      "home repair Point Pleasant NJ",
      "property maintenance Point Pleasant NJ",
    ],
    localNotes: [
      "Seasonal open-up and close-up service for shore homes near the boardwalk and inlet.",
      "Turnover maintenance for summer rentals and Airbnb hosts steps from the beach.",
    ],
    faqs: [
      {
        question: "Do you serve both Point Pleasant and Point Pleasant Beach?",
        answer:
          "Yes — we cover Point Pleasant Borough and Point Pleasant Beach, plus the nearby Bay Head border and homes along the Manasquan River.",
      },
      {
        question: "Can you maintain my summer rental near the boardwalk?",
        answer:
          "Absolutely. We handle between-guest fixes, seasonal open-ups and close-ups, and turnover maintenance for summer rentals and Airbnb hosts close to the beach and boardwalk.",
      },
      {
        question: "Do you repair decks and fences damaged by shore weather?",
        answer:
          "Yes — salt air and storms are hard on Point Pleasant decks and fences, so non-structural board, railing, and fence repairs are a regular part of what we do here.",
      },
    ],
    ctaText: "Get a Point Pleasant Estimate",
    metaTitle: "Handyman in Point Pleasant, NJ",
    metaDescription:
      "Handyman & home repair in Point Pleasant, NJ — deck & fence repair, door sealing, drywall, and seasonal rental upkeep for Jersey Shore homes. Same-day estimates.",
    image: "/images/locations/point-pleasant.jpg",
  },
  {
    cityName: "Barnegat, NJ",
    slug: "barnegat",
    shortName: "Barnegat",
    headline: "Handyman & Home Repair in Barnegat, NJ",
    shortDescription:
      "East Shore Home Solutions serves Barnegat, NJ with dependable handyman and home repair services. From the bayfront to the inland developments, we handle drywall, doors, decks, fixtures, grab bars, and general home maintenance for Ocean County families and active-adult communities.",
    nearbyAreas: [
      "Barnegat Township",
      "Pheasant Run",
      "Mirage / Heritage Point",
      "Bayfront sections",
    ],
    targetKeywords: [
      "handyman Barnegat NJ",
      "home repair Barnegat NJ",
      "property maintenance Barnegat NJ",
      "handyman services Barnegat NJ",
    ],
    localNotes: [
      "Popular with Barnegat's active-adult communities for grab bars and aging-in-place safety upgrades.",
      "Reliable seasonal and turnover maintenance for bayfront and inland homes.",
    ],
    faqs: [
      {
        question: "Do you install grab bars in Barnegat's 55+ communities?",
        answer:
          "Yes — grab bars and handrails are popular requests in Barnegat's active-adult communities like Pheasant Run and Heritage Point. We anchor them securely so they hold real weight for safe aging in place.",
      },
      {
        question: "Which areas of Barnegat do you cover?",
        answer:
          "All of Barnegat Township, from the bayfront sections to the inland developments.",
      },
      {
        question: "Do you handle seasonal maintenance for Barnegat homes?",
        answer:
          "We do — seasonal upkeep and turnover maintenance for both year-round and seasonal Barnegat homes is part of our regular work.",
      },
    ],
    ctaText: "Get a Barnegat Estimate",
    metaTitle: "Handyman in Barnegat, NJ",
    metaDescription:
      "Handyman & home repair in Barnegat, NJ — drywall, doors, decks, fixtures, and grab bar installation for bayfront homes and active-adult communities. Free quotes.",
    image: "/images/locations/barnegat.jpg",
  },
  {
    cityName: "Stafford / Manahawkin, NJ",
    slug: "stafford-manahawkin",
    shortName: "Stafford / Manahawkin",
    headline: "Handyman & Home Repair in Stafford & Manahawkin, NJ",
    shortDescription:
      "As the gateway to LBI, Stafford Township and Manahawkin see a steady mix of year-round homes and Jersey Shore rentals. East Shore Home Solutions provides handyman repairs, deck and fence work, and rental maintenance across Stafford and Manahawkin, NJ — including the lagoon-front homes of Beach Haven West.",
    nearbyAreas: [
      "Manahawkin",
      "Beach Haven West",
      "Ocean Acres",
      "Stafford Township",
    ],
    targetKeywords: [
      "handyman Stafford NJ",
      "handyman Manahawkin NJ",
      "home repair Manahawkin NJ",
      "property maintenance Stafford NJ",
    ],
    localNotes: [
      "Lagoon-front homes in Beach Haven West rely on us for deck and waterfront repairs (non-structural).",
      "A convenient base for serving LBI just over the causeway, plus seasonal rental upkeep.",
    ],
    faqs: [
      {
        question: "Do you work in Beach Haven West and Ocean Acres?",
        answer:
          "Yes — we cover all of Stafford Township and Manahawkin, including the lagoon-front homes of Beach Haven West and the Ocean Acres development.",
      },
      {
        question: "Can you repair lagoon-front decks in Beach Haven West?",
        answer:
          "We handle non-structural deck and waterfront repairs — board replacement, railings, and hardware — on Beach Haven West's lagoon-front homes. Full structural rebuilds are referred to a licensed contractor.",
      },
      {
        question: "Do you also serve LBI from Stafford?",
        answer:
          "Yes. Our Stafford/Manahawkin base is right at the foot of the causeway, so we serve LBI and Beach Haven just across the bridge, along with seasonal rental upkeep.",
      },
    ],
    ctaText: "Get a Stafford / Manahawkin Estimate",
    metaTitle: "Handyman in Stafford & Manahawkin, NJ",
    metaDescription:
      "Handyman & home repair in Stafford and Manahawkin, NJ — deck & fence work, drywall, and rental maintenance for Beach Haven West and the gateway to LBI. Free quotes.",
    image: "/images/locations/stafford-manahawkin.jpg",
  },
  {
    cityName: "LBI / Beach Haven, NJ",
    slug: "lbi-beach-haven",
    shortName: "LBI / Beach Haven",
    headline: "Handyman & Home Repair on LBI & Beach Haven, NJ",
    shortDescription:
      "Long Beach Island's shore homes and vacation rentals need reliable, communicative upkeep. East Shore Home Solutions provides handyman repairs and seasonal maintenance across LBI and Beach Haven, NJ — deck and fence repair, door sealing, drywall, fixtures, and rental turnovers for seasonal Jersey Shore properties.",
    nearbyAreas: [
      "Beach Haven",
      "Ship Bottom",
      "Surf City",
      "Long Beach Township",
      "Harvey Cedars",
    ],
    targetKeywords: [
      "handyman LBI NJ",
      "handyman Beach Haven NJ",
      "vacation rental maintenance Ocean County NJ",
      "shore house maintenance Ocean County NJ",
    ],
    localNotes: [
      "Specialized in vacation-rental turnover and seasonal shore-home maintenance up and down the island.",
      "Photo updates keep off-island owners in the loop on every repair.",
    ],
    faqs: [
      {
        question: "Where on Long Beach Island do you work?",
        answer:
          "Up and down the island — Beach Haven, Ship Bottom, Surf City, Long Beach Township, and Harvey Cedars, plus the surrounding LBI communities.",
      },
      {
        question: "Can you manage repairs if I'm an off-island owner?",
        answer:
          "Yes — that's a specialty. We send photo updates so off-island LBI owners can approve and follow along on every repair without driving out to the island.",
      },
      {
        question: "Do you handle vacation rental turnovers on LBI?",
        answer:
          "Definitely. Between-guest fixes, seasonal open-ups and close-ups, and turnover maintenance keep LBI vacation rentals five-star ready all season.",
      },
    ],
    ctaText: "Get an LBI / Beach Haven Estimate",
    metaTitle: "Handyman on LBI & Beach Haven, NJ",
    metaDescription:
      "Handyman & home repair on LBI and Beach Haven, NJ — deck repair, door sealing, drywall, and vacation rental turnovers with photo updates for off-island owners.",
    image: "/images/locations/lbi-beach-haven.jpg",
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}
