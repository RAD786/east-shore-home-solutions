import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/siteConfig";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Handyman Services in Ocean County, NJ",
  titleOverride:
    "Handyman Services Ocean County NJ | East Shore Home Solutions",
  description:
    "East Shore Home Solutions provides handyman, home repair, drywall repair, TV mounting, door repair, deck and fence repair, fixture installation, and property maintenance services throughout Ocean County, NJ.",
  path: "/",
  keywords: [
    "handyman Ocean County NJ",
    "handyman services Ocean County NJ",
    "home repair Ocean County NJ",
    "property maintenance Ocean County NJ",
    "local handyman Ocean County NJ",
  ],
});

// Featured service cards (order per homepage spec).
const featuredSlugs = [
  "drywall-repair",
  "tv-mounting",
  "door-repair-installation",
  "deck-fence-repair",
  "rental-property-maintenance",
  "ceiling-fan-light-fixture-installation",
  "minor-plumbing-repairs",
  "grab-bar-handrail-installation",
];
const featuredServices = featuredSlugs
  .map((slug) => services.find((s) => s.slug === slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s));

// "Why choose us" points.
const whyChoose = [
  {
    title: "A local owner you'll actually talk to",
    body: "You deal directly with the owner — not a call center. Real accountability on every job.",
    icon: "user",
  },
  {
    title: "Clear, honest communication",
    body: "Calls and texts returned, straightforward quotes, and updates so you're never left guessing.",
    icon: "chat",
  },
  {
    title: "Reliable scheduling",
    body: "We show up when we say we will and respect your time — including same-day estimates.",
    icon: "calendar",
  },
  {
    title: "Premium workmanship",
    body: "Careful, quality repairs done right the first time — the standard we'd want in our own home.",
    icon: "award",
  },
  {
    title: "Clean job sites",
    body: "We protect your space and clean up when we're done. You'd never know we were there — except the repair.",
    icon: "broom",
  },
  {
    title: "Respect for every property",
    body: "Homes, rentals, and shore properties treated with the same care and attention to detail.",
    icon: "home",
  },
];

const homeFaqs = [
  {
    question: "What areas do you serve?",
    answer:
      "We serve all of Ocean County, NJ — including Toms River, Brick, Lakewood, Jackson, Point Pleasant, Barnegat, Stafford/Manahawkin, and the LBI/Beach Haven area, plus surrounding shore towns like Point Pleasant Beach, Bay Head, and Lavallette.",
  },
  {
    question: "Do you really offer same-day estimates?",
    answer:
      "Yes — we provide free estimates and aim to get them to you the same day whenever possible. Call or send a request with a few photos and we'll get right back to you.",
  },
  {
    question: "Do you offer emergency service?",
    answer: `Yes. ${siteConfig.emergencyService} — if something can't wait, call us and we'll do our best to help right away.`,
  },
  {
    question: "Can I send photos of the job?",
    answer:
      "Please do. Our contact form lets you upload a photo, which helps us give you a faster, more accurate estimate before we even arrive.",
  },
  {
    question: "Do you handle plumbing and electrical work?",
    answer:
      "We handle minor, fixture-level plumbing (faucets, toilets, garbage disposals) and fixture/fan replacement on existing wiring. We're insured but do not perform licensed plumbing, electrical, or HVAC trade work — for those we'll point you to a trusted licensed pro.",
  },
  {
    question: "Do you work with landlords and rental properties?",
    answer:
      "Absolutely. We help landlords, property managers, realtors, and Airbnb/short-term rental hosts with tenant turnovers, punch lists, and ongoing maintenance — with photo updates and reliable scheduling.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1 ── Hero */}
      <Hero
        eyebrow={`Locally owned • Serving all of ${siteConfig.regionShort}`}
        title="Handyman & Home Repair Services in Ocean County, NJ"
        subtitle="One local, insured handyman for the repairs and upkeep your home actually needs — done right, cleaned up, and communicated clearly. Homeowners, landlords, and shore-home owners across Ocean County count on us for honest work and same-day estimates."
      >
        <p className="mt-6 text-sm text-white/70">
          Proudly serving Toms River, Brick, Lakewood, Jackson, Point Pleasant,
          Barnegat, Manahawkin, and LBI.
        </p>
      </Hero>

      {/* 2 ── Trust bar */}
      <TrustBar />

      {/* 3 ── Main services */}
      <section className="bg-sand-100">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="What we do"
            title="Handyman & Home Repair Services"
            subtitle="The repairs and upgrades Ocean County homeowners, landlords, and shore-home owners call us for most. No job too small, no runaround."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg bg-navy px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-navy-600"
            >
              View all services
            </Link>
          </div>
        </div>
      </section>

      {/* 4 ── Why choose us */}
      <section className="bg-white">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Why East Shore"
            title="Why Choose East Shore Home Solutions"
            subtitle="A newer name with an old-school standard: do premium work, communicate clearly, and treat every home like our own."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-navy/10 bg-sand-100 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-seafoam-50 text-seafoam-600">
                  <WhyIcon icon={item.icon} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 ── Service areas */}
      <section className="bg-navy text-white">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-seafoam-200">
                Proudly local
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Serving Ocean County & the Jersey Shore
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                We&apos;re based right here in Ocean County, so we know these
                towns and the homes in them — from year-round houses inland to
                rentals and shore homes near the water. Find your town below, or
                just give us a call.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-navy hover:bg-accent-600"
                >
                  Call {siteConfig.phone}
                </a>
                <Link
                  href="/service-areas"
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
                >
                  Explore service areas
                </Link>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                "Toms River",
                "Brick",
                "Lakewood",
                "Jackson",
                "Point Pleasant",
                "Point Pleasant Beach",
                "Bay Head",
                "Lavallette",
                "Beach Haven",
                "LBI",
                "Stafford",
                "Manahawkin",
                "Barnegat",
              ].map((town) => (
                <li
                  key={town}
                  className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white/85"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-seafoam-200"
                    aria-hidden
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {town}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6 ── Rental & shore home maintenance */}
      <section className="bg-sand-100">
        <div className="container-page py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Landlords & shore owners"
                title="Rental & Shore Home Maintenance You Can Trust"
                subtitle="One reliable handyman for your whole portfolio — with the communication and consistency property owners need."
              />
              <ul className="mt-8 space-y-4">
                {[
                  {
                    t: "Landlords & property managers",
                    b: "Tenant turnovers, punch lists, and ongoing repairs that keep units rent-ready.",
                  },
                  {
                    t: "Airbnb & short-term rental hosts",
                    b: "Fast between-guest fixes and upkeep so your listing stays five-star ready.",
                  },
                  {
                    t: "Seasonal shore homeowners",
                    b: "Open-ups, close-ups, and weatherproofing for homes near the water — with photo updates for off-island owners.",
                  },
                ].map((item) => (
                  <li key={item.t} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-seafoam-500 text-white">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold text-navy">{item.t}</p>
                      <p className="text-sm text-navy/65">{item.b}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/services/rental-property-maintenance"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-navy hover:bg-accent-600"
                >
                  Rental property maintenance
                </Link>
              </div>
            </div>

            {/* Placeholder visual */}
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-navy/10 bg-gradient-to-br from-navy via-navy-600 to-seafoam-700 text-center text-white shadow-card">
              <div className="px-6">
                <p className="text-sm font-medium uppercase tracking-wider text-seafoam-100">
                  Placeholder image
                </p>
                <p className="mt-2 text-lg font-semibold">
                  Shore & rental property upkeep
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 ── FAQ */}
      <FAQSection faqs={homeFaqs} eyebrow="Questions" />

      {/* 8 ── Final CTA */}
      <CTASection />
    </>
  );
}

function WhyIcon({ icon }: { icon: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (icon) {
    case "user":
      return (
        <svg {...common}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.38 8.38 0 0 1 3 11.5a8.5 8.5 0 0 1 9-8.4 8.38 8.38 0 0 1 9 8.4z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "award":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="6" />
          <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11" />
        </svg>
      );
    case "broom":
      return (
        <svg {...common}>
          <path d="M19.4 4.6 14 10M9.5 21H5a1 1 0 0 1-1-1v-2.5L9.5 12l3.5 3.5L9.5 21z" />
          <path d="M13 15.5 18.5 21M11 13.5 16.5 19" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
