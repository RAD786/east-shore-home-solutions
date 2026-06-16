/**
 * Service catalog for East Shore Home Solutions.
 *
 * `services` = main, profitable services that each get a dedicated
 *   /services/[slug] landing page (SEO-first).
 * `secondaryServices` = additional offerings listed on the main
 *   Services page but without individual pages (avoids thin content).
 *
 * Compliance note: copy intentionally uses "minor", "non-structural",
 * "basic", and "fixture replacement" wording, and each service spells
 * out what is NOT included (`notIncluded`) plus a `licensingDisclaimer`
 * where relevant. We do NOT advertise licensed plumbing, electrical,
 * or HVAC trade work.
 */

export type FAQ = {
  question: string;
  answer: string;
};

export type Service = {
  /** Full service name (page H1) */
  title: string;
  /** URL slug */
  slug: string;
  /** Short label for cards/nav */
  shortTitle: string;
  /** One-line teaser for cards/grids */
  shortDescription: string;
  /** Full intro paragraph for the service page */
  longDescription: string;
  /** Lucide-style icon key (rendered as inline SVG in ServiceCard) */
  icon: ServiceIcon;
  /** Placeholder image reference */
  image: string;
  /** Primary SEO keywords this page targets */
  primaryKeywords: string[];
  /** Bullet list of what's included */
  includedServices: string[];
  /** Real, service-specific problems we solve (unique content) */
  commonProblems: string[];
  /** What we do NOT do (sets expectations, supports compliance) */
  notIncluded: string[];
  /** Optional licensing/compliance disclaimer shown on the page */
  licensingDisclaimer?: string;
  /**
   * When true, render the standardized licensed-trade limitation
   * notice (used on minor-plumbing & fixture-related pages).
   */
  licensedTradeNotice?: boolean;
  /** CTA button text tuned to the service */
  ctaText: string;
  /** Service-specific FAQ */
  faqs: FAQ[];
  /** SEO <title> (brand suffix added automatically) */
  metaTitle: string;
  /** SEO meta description */
  metaDescription: string;
};

export type ServiceIcon =
  | "drywall"
  | "tv"
  | "door"
  | "deck"
  | "rental"
  | "fan"
  | "plumbing"
  | "grabbar"
  | "trim"
  | "maintenance";

export const services: Service[] = [
  {
    title: "Drywall Repair",
    slug: "drywall-repair",
    shortTitle: "Drywall Repair",
    shortDescription:
      "Seamless patches for holes, cracks, water stains, and nail pops.",
    longDescription:
      "From doorknob holes to water-stained ceilings, our drywall repair in Ocean County, NJ delivers smooth, paint-ready walls. We patch, tape, sand, and texture-match so repairs disappear into the surrounding surface.",
    icon: "drywall",
    image: "/images/services/drywall-repair.jpg",
    primaryKeywords: [
      "drywall repair Ocean County NJ",
      "drywall patch repair Ocean County NJ",
      "wall repair Ocean County NJ",
      "sheetrock repair Ocean County NJ",
    ],
    includedServices: [
      "Small to large hole patching",
      "Crack and seam repair",
      "Nail pop and screw pop fixes",
      "Water-stain and ceiling repair (non-structural)",
      "Texture matching and sanding",
      "Paint-ready finishing",
    ],
    notIncluded: [
      "Structural framing or load-bearing wall changes",
      "Mold remediation or active-leak source repair",
      "Full-room re-drywalling of new construction",
    ],
    licensingDisclaimer:
      "We repair existing drywall surfaces. If a repair reveals an active plumbing or electrical issue behind the wall, we'll pause and refer you to the appropriate licensed trade before closing it up.",
    commonProblems: [
      "Doorknob holes punched through hallway and bedroom walls",
      "Cracks spreading from corners of doors and windows",
      "Sagging or water-stained ceilings after a past leak",
      "Popped nails and screws telegraphing through the paint",
      "Holes left behind after removing TVs, shelves, or anchors",
      "Patches from a previous repair that never blended in",
    ],
    ctaText: "Get My Drywall Quote",
    faqs: [
      {
        question: "Do you paint after repairing the drywall?",
        answer:
          "We sand and finish every patch paint-ready. We also offer touch-up painting on request so the repair blends into the wall.",
      },
      {
        question: "Can you match my existing wall texture?",
        answer:
          "Yes. We match common textures like knockdown, orange peel, and smooth finishes so the patch blends in.",
      },
    ],
    metaTitle: "Drywall Repair in Ocean County, NJ",
    metaDescription:
      "Seamless drywall & sheetrock repair across Ocean County, NJ — holes, cracks, water stains, and texture matching. Paint-ready finishes. Same-day estimates.",
  },
  {
    title: "TV Mounting & Wall Installation",
    slug: "tv-mounting",
    shortTitle: "TV Mounting",
    shortDescription:
      "Securely mounted TVs with clean, hidden wiring — including over fireplaces.",
    longDescription:
      "Professional TV mounting across Ocean County, NJ. We anchor your TV safely to studs or masonry, level it perfectly, and hide the wires for a clean, finished look — including tricky fireplace and corner installs.",
    icon: "tv",
    image: "/images/services/tv-mounting.jpg",
    primaryKeywords: [
      "TV mounting Ocean County NJ",
      "TV wall mounting Ocean County NJ",
      "fireplace TV mounting Ocean County NJ",
      "TV mounting with wire hiding Ocean County NJ",
    ],
    includedServices: [
      "Mounting on drywall, studs, brick, and stone",
      "Fireplace and corner mounting",
      "In-wall and surface wire concealment",
      "Soundbar and shelf mounting",
      "TV-to-bracket fitment and leveling",
      "Customer-supplied or recommended mounts",
    ],
    notIncluded: [
      "Adding a new powered electrical outlet behind the TV",
      "New circuits or wiring runs (licensed electrician required)",
      "Drywall rebuilds beyond minor patching",
    ],
    licensingDisclaimer:
      "In-wall wire concealment covers low-voltage A/V cabling only. We do not perform licensed electrical work — adding a new powered outlet behind the TV would be referred to a licensed electrician.",
    commonProblems: [
      "A new TV that needs to be mounted level and secure",
      "Visible cords you want hidden inside the wall",
      "Mounting over a fireplace or in an awkward corner",
      "An old mount or bracket that needs swapping out",
      "A TV that feels too high, too low, or off-center",
      "Brick or stone walls that need the right anchors",
    ],
    licensedTradeNotice: true,
    ctaText: "Book My TV Mounting",
    faqs: [
      {
        question: "Can you hide the cables in the wall?",
        answer:
          "Yes — we route low-voltage A/V cables through the wall for a clean look. New electrical outlets require a licensed electrician, which we can recommend.",
      },
      {
        question: "Can you mount a TV above my fireplace?",
        answer:
          "Absolutely. Fireplace mounts are one of our most popular requests. We assess the surface and use the correct anchors for a secure install.",
      },
    ],
    metaTitle: "TV Mounting in Ocean County, NJ",
    metaDescription:
      "Professional TV wall mounting in Ocean County, NJ — drywall, brick, and fireplace installs with hidden wiring. Secure, level, and clean. Same-day estimates.",
  },
  {
    title: "Door Repair & Installation",
    slug: "door-repair-installation",
    shortTitle: "Door Repair",
    shortDescription:
      "Interior and exterior doors that hang straight, latch right, and seal tight.",
    longDescription:
      "Sticking, sagging, or drafty doors? We repair and install interior and exterior doors throughout Ocean County, NJ — adjusting, replacing hardware, repairing frames, and hanging new slabs and pre-hung units.",
    icon: "door",
    image: "/images/services/door-repair.jpg",
    primaryKeywords: [
      "door repair Ocean County NJ",
      "door installation Ocean County NJ",
      "interior door repair Ocean County NJ",
      "exterior door repair Ocean County NJ",
      "door frame repair Ocean County NJ",
    ],
    includedServices: [
      "Interior and exterior door installation",
      "Sticking and sagging door adjustment",
      "Hinge, latch, and lockset replacement",
      "Door frame and jamb repair",
      "Weatherstripping and threshold sealing",
      "Storm door and screen door installation",
    ],
    notIncluded: [
      "Structural header or load-bearing opening changes",
      "Smart locks requiring new electrical wiring",
      "Garage door spring/opener (specialized) repair",
    ],
    commonProblems: [
      "A door that sticks, drags, or won't latch",
      "Drafty exterior doors letting in cold or moisture",
      "Sagging hinges or a door that swings on its own",
      "Worn or broken knobs, deadbolts, and strike plates",
      "Damaged or rotted door frames and jambs",
      "A new slab or pre-hung door that needs installing",
    ],
    ctaText: "Fix My Door",
    faqs: [
      {
        question: "My door won't close properly — can you fix it?",
        answer:
          "Most likely yes. Misaligned hinges, swollen frames, and worn strike plates are common and quick to correct.",
      },
      {
        question: "Do you install pre-hung exterior doors?",
        answer:
          "Yes, we install pre-hung interior and exterior doors and seal them properly against the weather.",
      },
    ],
    metaTitle: "Door Repair & Installation in Ocean County, NJ",
    metaDescription:
      "Interior & exterior door repair and installation in Ocean County, NJ — sticking doors, frame repair, hardware, and weather sealing. Same-day estimates.",
  },
  {
    title: "Deck & Fence Repair",
    slug: "deck-fence-repair",
    shortTitle: "Deck & Fence Repair",
    shortDescription:
      "Replace rotted boards, wobbly railings, and broken gates before they get worse.",
    longDescription:
      "Shore weather is tough on decks and fences. We repair wood decks and fences across Ocean County, NJ — replacing rotted boards, securing loose railings, and fixing sagging gates so your outdoor spaces stay safe and looking sharp.",
    icon: "deck",
    image: "/images/services/deck-fence-repair.jpg",
    primaryKeywords: [
      "deck repair Ocean County NJ",
      "deck board replacement Ocean County NJ",
      "deck railing repair Ocean County NJ",
      "fence repair Ocean County NJ",
      "fence gate repair Ocean County NJ",
      "wood fence repair Ocean County NJ",
    ],
    includedServices: [
      "Deck board and plank replacement",
      "Railing and baluster repair (non-structural)",
      "Fence panel and picket replacement",
      "Fence post resetting and gate repair",
      "Hardware and fastener replacement",
      "Sanding and surface prep",
    ],
    notIncluded: [
      "New deck construction requiring permits",
      "Full structural rebuilds or footing/foundation work",
      "Engineered load-bearing framing changes",
    ],
    licensingDisclaimer:
      "We handle non-structural deck and fence repairs. Full structural rebuilds or new deck construction requiring permits would be referred to a licensed contractor.",
    commonProblems: [
      "Soft, splintered, or rotted deck boards",
      "Wobbly or loose deck railings and balusters",
      "Fence panels and pickets damaged by shore storms",
      "A leaning fence post that needs resetting",
      "A gate that sags, drags, or won't latch",
      "Loose nails and failing hardware throughout",
    ],
    ctaText: "Repair My Deck or Fence",
    faqs: [
      {
        question: "Can you replace just a few rotted deck boards?",
        answer:
          "Yes — board-by-board replacement is one of the most cost-effective ways to extend the life of your deck.",
      },
      {
        question: "My fence gate is dragging — can you fix it?",
        answer:
          "Definitely. Sagging gates usually need realignment, new hinges, or a post reset, all of which we handle.",
      },
    ],
    metaTitle: "Deck & Fence Repair in Ocean County, NJ",
    metaDescription:
      "Wood deck & fence repair in Ocean County, NJ — rotted board replacement, railing fixes, fence panels, and gate repair built for shore weather. Free quotes.",
  },
  {
    title: "Rental Property Maintenance",
    slug: "rental-property-maintenance",
    shortTitle: "Rental Maintenance",
    shortDescription:
      "Reliable turn-key repairs for landlords, realtors, and short-term rental hosts.",
    longDescription:
      "One trusted handyman for your entire portfolio. We help Ocean County, NJ landlords, realtors, and Airbnb hosts keep properties guest-ready with fast turnover repairs, punch lists, and ongoing maintenance — with reliable communication you can count on.",
    icon: "rental",
    image: "/images/services/rental-maintenance.jpg",
    primaryKeywords: [
      "rental property maintenance Ocean County NJ",
      "landlord repair services Ocean County NJ",
      "tenant turnover repairs Ocean County NJ",
      "Airbnb maintenance Ocean County NJ",
      "short term rental maintenance Ocean County NJ",
    ],
    includedServices: [
      "Tenant turnover and make-ready repairs",
      "Move-in / move-out punch lists",
      "Airbnb and short-term rental upkeep",
      "Drywall, doors, fixtures, and minor repairs",
      "Recurring seasonal maintenance",
      "Fast scheduling and clear photo updates",
    ],
    notIncluded: [
      "Licensed plumbing, electrical, or HVAC trade work",
      "Major renovations or structural construction",
      "Code-violation work requiring a permitted trade",
    ],
    commonProblems: [
      "A unit that needs to be rent-ready between tenants",
      "A growing punch list before a move-in or showing",
      "Wear-and-tear repairs piling up across the property",
      "Last-minute fixes between short-term rental guests",
      "An out-of-area owner who needs eyes and updates on site",
      "Multiple small issues that no single trade will take",
    ],
    ctaText: "Get Reliable Rental Help",
    faqs: [
      {
        question: "Do you work with property managers and realtors?",
        answer:
          "Yes. We're a great fit for landlords, property managers, realtors, and short-term rental hosts who need dependable, communicative repair help.",
      },
      {
        question: "Can you handle turnovers between guests quickly?",
        answer:
          "We prioritize turnover work and provide photo updates so you can stay confident your rental is guest-ready.",
      },
    ],
    metaTitle: "Rental Property Maintenance in Ocean County, NJ",
    metaDescription:
      "Dependable rental property maintenance in Ocean County, NJ for landlords, realtors & Airbnb hosts — turnover repairs, punch lists, and fast photo updates.",
  },
  {
    title: "Ceiling Fan & Light Fixture Installation",
    slug: "ceiling-fan-light-fixture-installation",
    shortTitle: "Fans & Fixtures",
    shortDescription:
      "Swap out fans and fixtures using existing wiring — leveled and secure.",
    longDescription:
      "Upgrade your lighting and comfort with professional ceiling fan and light fixture installation in Ocean County, NJ. We replace existing fans and fixtures using your home's current wiring and boxes, balanced and securely mounted.",
    icon: "fan",
    image: "/images/services/ceiling-fan.jpg",
    primaryKeywords: [
      "ceiling fan installation Ocean County NJ",
      "ceiling fan replacement Ocean County NJ",
      "light fixture installation Ocean County NJ",
      "light fixture replacement Ocean County NJ",
    ],
    includedServices: [
      "Ceiling fan replacement and installation",
      "Light fixture swap-outs",
      "Vanity and bathroom fixture replacement",
      "Pendant and flush-mount installation",
      "Fan balancing and secure box mounting",
      "Bulb and shade fitment",
    ],
    notIncluded: [
      "New electrical circuits or wiring runs",
      "Installing a box where none exists",
      "Electrical panel or breaker work",
    ],
    licensingDisclaimer:
      "We replace fixtures and fans using existing, properly wired electrical boxes. New circuits, new wiring runs, or panel work require a licensed electrician — we'll gladly point you to one.",
    commonProblems: [
      "An old ceiling fan that wobbles or rattles",
      "A dated light fixture you'd like swapped for a new one",
      "A bathroom vanity light that needs replacing",
      "A new pendant or flush-mount waiting to be installed",
      "A fan or fixture that fell or pulled loose from the box",
      "Bulbs and shades that need the right fitment",
    ],
    licensedTradeNotice: true,
    ctaText: "Install My Fan or Fixture",
    faqs: [
      {
        question: "Can you replace my old fixture with a new one I bought?",
        answer:
          "Yes — replacing an existing fixture or fan on existing wiring is exactly what we do. Just have the new unit on hand.",
      },
      {
        question: "Can you add a fan where there isn't one now?",
        answer:
          "If there's no existing wired box, new wiring is required and should be done by a licensed electrician, which we can recommend.",
      },
    ],
    metaTitle: "Ceiling Fan & Light Fixture Installation in Ocean County, NJ",
    metaDescription:
      "Ceiling fan & light fixture replacement in Ocean County, NJ using existing wiring — balanced, leveled, and securely mounted. Same-day estimates.",
  },
  {
    title: "Minor Plumbing Repairs",
    slug: "minor-plumbing-repairs",
    shortTitle: "Minor Plumbing",
    shortDescription:
      "Faucet, toilet, and disposal fixes — fixture-level repairs, no heavy plumbing.",
    longDescription:
      "Drips, runs, and clogs add up. We handle minor plumbing repairs across Ocean County, NJ — faucet and fixture replacement, toilet repairs, and garbage disposal swaps. For fixture-level work that keeps your home running smoothly.",
    icon: "plumbing",
    image: "/images/services/minor-plumbing.jpg",
    primaryKeywords: [
      "minor plumbing repairs Ocean County NJ",
      "faucet replacement Ocean County NJ",
      "toilet repair Ocean County NJ",
      "garbage disposal replacement Ocean County NJ",
    ],
    includedServices: [
      "Faucet replacement and repair",
      "Toilet repair and replacement",
      "Garbage disposal replacement",
      "Supply line and shut-off valve swaps",
      "Showerhead and fixture replacement",
      "Minor leak fixes at fixtures",
    ],
    notIncluded: [
      "Re-piping or in-wall pipe work",
      "Water heater installation or repair",
      "Gas lines, sewer lines, or main line work",
    ],
    licensingDisclaimer:
      "We handle minor, fixture-level plumbing repairs only. Re-piping, gas lines, water heaters, and work requiring a plumbing license are referred to a licensed plumber.",
    commonProblems: [
      "A dripping or worn-out faucet that needs replacing",
      "A toilet that runs, rocks, or won't stop filling",
      "A garbage disposal that's jammed or finally died",
      "A leaky shut-off valve or supply line under the sink",
      "A showerhead or fixture you'd like upgraded",
      "Minor drips at fixtures that keep getting worse",
    ],
    licensedTradeNotice: true,
    ctaText: "Schedule a Minor Repair",
    faqs: [
      {
        question: "What counts as a 'minor' plumbing repair?",
        answer:
          "Fixture-level work — faucets, toilets, disposals, supply lines, and shut-off valves. We don't do re-piping, water heaters, or gas work, which require a licensed plumber.",
      },
      {
        question: "Can you replace a leaking faucet?",
        answer:
          "Yes, faucet replacement is one of our most common minor plumbing jobs.",
      },
    ],
    metaTitle: "Minor Plumbing Repairs in Ocean County, NJ",
    metaDescription:
      "Minor plumbing repairs in Ocean County, NJ — faucet, toilet, and garbage disposal replacement plus shut-off valve swaps. Fixture-level work, done right.",
  },
  {
    title: "Grab Bar & Handrail Installation",
    slug: "grab-bar-handrail-installation",
    shortTitle: "Grab Bars & Handrails",
    shortDescription:
      "Secure bathroom safety bars and handrails anchored to hold real weight.",
    longDescription:
      "Help loved ones stay safe at home. We install grab bars and handrails throughout Ocean County, NJ — anchored into studs or backed with proper hardware so they hold real weight in bathrooms, hallways, and on stairs.",
    icon: "grabbar",
    image: "/images/services/grab-bar.jpg",
    primaryKeywords: [
      "grab bar installation Ocean County NJ",
      "handrail installation Ocean County NJ",
      "bathroom safety bar installation Ocean County NJ",
      "senior home safety upgrades Ocean County NJ",
    ],
    includedServices: [
      "Bathroom and shower grab bars",
      "Stairway and hallway handrails",
      "Exterior step and porch railings (non-structural)",
      "Stud-anchored, weight-rated mounting",
      "ADA-style placement guidance",
      "Senior aging-in-place safety upgrades",
    ],
    notIncluded: [
      "Engineered structural ramp construction",
      "Permitted accessibility remodels",
      "Stair rebuilding or load-bearing changes",
    ],
    commonProblems: [
      "A slippery shower or tub that needs a secure grab bar",
      "A loved one aging in place who needs added support",
      "Stairways and hallways missing a sturdy handrail",
      "An existing bar that pulled loose and feels unsafe",
      "Front steps or a porch that need a graspable rail",
      "Bathroom safety upgrades before or after a hospital stay",
    ],
    ctaText: "Make My Home Safer",
    faqs: [
      {
        question: "Will the grab bar actually hold weight?",
        answer:
          "Yes — we anchor into studs or use heavy-duty backing hardware so bars are rated to support real weight, not just decoration.",
      },
      {
        question: "Can you advise on placement for aging-in-place?",
        answer:
          "We follow ADA-style placement guidance to position bars and rails where they're most useful and safe.",
      },
    ],
    metaTitle: "Grab Bar & Handrail Installation in Ocean County, NJ",
    metaDescription:
      "Grab bar & handrail installation in Ocean County, NJ — stud-anchored, weight-rated bathroom safety bars and stair rails for safe aging in place. Free quotes.",
  },
  {
    title: "Interior Trim & Carpentry",
    slug: "interior-trim-carpentry",
    shortTitle: "Trim & Carpentry",
    shortDescription:
      "Crisp baseboards, crown molding, and finish carpentry with tight joints.",
    longDescription:
      "Sharp trim makes a room. We provide interior trim and finish carpentry across Ocean County, NJ — baseboards, crown molding, casing, and detail work installed with tight, clean joints and a paint-ready finish.",
    icon: "trim",
    image: "/images/services/trim-carpentry.jpg",
    primaryKeywords: [
      "trim installation Ocean County NJ",
      "baseboard installation Ocean County NJ",
      "finish carpentry Ocean County NJ",
      "crown molding installation Ocean County NJ",
    ],
    includedServices: [
      "Baseboard installation and replacement",
      "Crown molding installation",
      "Door and window casing",
      "Chair rail and wainscoting",
      "Trim repair and gap-filling",
      "Caulking and paint-ready finishing",
    ],
    notIncluded: [
      "Structural framing or load-bearing carpentry",
      "Custom cabinetry fabrication from scratch",
      "Permitted additions or rough framing",
    ],
    commonProblems: [
      "Missing or damaged baseboards after flooring work",
      "Gaps and separating joints in existing trim",
      "A room that would feel finished with crown molding",
      "Door and window casing that's dinged or incomplete",
      "Scuffed trim that needs repair before painting",
      "A chair rail or wainscoting project you've put off",
    ],
    ctaText: "Get a Trim Quote",
    faqs: [
      {
        question: "Do you install crown molding?",
        answer:
          "Yes — crown molding, baseboards, casing, and chair rail are all part of our finish carpentry work.",
      },
      {
        question: "Can you match existing trim in my home?",
        answer:
          "We match existing profiles where possible so new trim blends seamlessly with what's already there.",
      },
    ],
    metaTitle: "Interior Trim & Finish Carpentry in Ocean County, NJ",
    metaDescription:
      "Interior trim & finish carpentry in Ocean County, NJ — baseboards, crown molding, casing, and chair rail with tight, paint-ready joints. Same-day estimates.",
  },
  {
    title: "Home Maintenance Services",
    slug: "home-maintenance-services",
    shortTitle: "Home Maintenance",
    shortDescription:
      "Your go-to local handyman for the punch list that never seems to end.",
    longDescription:
      "Knock out the whole to-do list with one reliable, local handyman. We handle general home maintenance and basic repairs across Ocean County, NJ — from furniture assembly and gutter cleaning to seasonal upkeep and the small fixes that pile up.",
    icon: "maintenance",
    image: "/images/services/home-maintenance.jpg",
    primaryKeywords: [
      "home maintenance Ocean County NJ",
      "property maintenance Ocean County NJ",
      "residential handyman Ocean County NJ",
      "seasonal home maintenance Ocean County NJ",
    ],
    includedServices: [
      "General handyman to-do lists",
      "Furniture and equipment assembly",
      "Gutter cleaning and pressure washing",
      "Caulking, weatherproofing, and seasonal prep",
      "Smart home device installation",
      "Shelving, hardware, and small repairs",
    ],
    notIncluded: [
      "Licensed plumbing, electrical, or HVAC trade work",
      "Roof structural repair or full re-roofing",
      "Permitted renovations or structural construction",
    ],
    commonProblems: [
      "A growing to-do list of small jobs you can't get to",
      "Flat-pack furniture and equipment that needs assembling",
      "Clogged gutters and grimy siding, decks, or walkways",
      "Seasonal prep for a shore home or rental",
      "Smart doorbells, locks, and cameras waiting to be set up",
      "Shelves, hardware, and odd fixes all over the house",
    ],
    ctaText: "Tackle My To-Do List",
    faqs: [
      {
        question: "Can I give you a list of small jobs at once?",
        answer:
          "Please do — handling a full punch list in one visit is exactly what we're built for and saves you money.",
      },
      {
        question: "Do you do seasonal shore-home prep?",
        answer:
          "Yes. Seasonal maintenance for shore and rental homes — open-ups, close-ups, and weatherproofing — is a specialty.",
      },
    ],
    metaTitle: "Home Maintenance Services in Ocean County, NJ",
    metaDescription:
      "General home maintenance in Ocean County, NJ — furniture assembly, gutter cleaning, pressure washing, smart home setup, and seasonal shore-home prep. Free quotes.",
  },
];

/**
 * Standardized licensed-trade limitation notice. Shown verbatim on
 * minor-plumbing and fixture-related service pages (services flagged
 * with `licensedTradeNotice: true`).
 */
export const TRADE_LIMITATION_NOTICE =
  "East Shore Home Solutions handles minor repair and replacement work. For major plumbing, electrical, HVAC, or work requiring a licensed trade contractor, we recommend contacting the appropriate licensed professional.";

/** Additional services listed on the Services page (no dedicated page). */
export const secondaryServices: { name: string; keyword: string }[] = [
  { name: "Move-In / Move-Out Punch List Repairs", keyword: "punch list repairs Ocean County NJ" },
  { name: "Furniture Assembly", keyword: "furniture assembly Ocean County NJ" },
  { name: "Gutter Cleaning", keyword: "gutter cleaning Ocean County NJ" },
  { name: "Pressure Washing", keyword: "pressure washing Ocean County NJ" },
  { name: "Smart Home Device Installation", keyword: "smart home installation Ocean County NJ" },
  { name: "Smart Lock & Video Doorbell Installation", keyword: "smart lock installation Ocean County NJ" },
  { name: "Security Camera Installation", keyword: "security camera installation Ocean County NJ" },
  { name: "Pre-Listing & Realtor Repairs", keyword: "pre listing repairs Ocean County NJ" },
  { name: "Seasonal Shore-Home Maintenance", keyword: "shore house maintenance Ocean County NJ" },
];

/** Services we intentionally DO NOT offer (compliance). */
export const servicesNotOffered = [
  "Heavy or licensed plumbing (re-piping, water heaters, gas lines)",
  "Licensed electrical work (new circuits, panels, rewiring)",
  "HVAC installation or repair",
  "Structural construction requiring permits or a trade license",
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
