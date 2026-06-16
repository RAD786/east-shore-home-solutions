import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { services, secondaryServices, servicesNotOffered } from "@/lib/services";
import { siteConfig } from "@/lib/siteConfig";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Handyman & Home Repair Services in Ocean County, NJ",
  description:
    "Full list of handyman and home repair services from East Shore Home Solutions — drywall, TV mounting, doors, decks, fixtures, trim, rental maintenance and more across Ocean County, NJ.",
  path: "/services",
  keywords: [
    "handyman services Ocean County NJ",
    "home repair Ocean County NJ",
    "residential handyman Ocean County NJ",
    "handyman contractor Ocean County NJ",
  ],
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];

// Most profitable / most-requested services to highlight.
// Move-out punch list work is covered under rental property maintenance.
const popularServices = [
  { label: "Drywall Repair", href: "/services/drywall-repair" },
  { label: "Deck & Fence Repair", href: "/services/deck-fence-repair" },
  { label: "Door Repair & Installation", href: "/services/door-repair-installation" },
  {
    label: "Ceiling Fan & Light Fixture Installation",
    href: "/services/ceiling-fan-light-fixture-installation",
  },
  { label: "TV Mounting", href: "/services/tv-mounting" },
  {
    label: "Rental Property Maintenance",
    href: "/services/rental-property-maintenance",
  },
  {
    label: "Move-Out Punch List Repairs",
    href: "/services/rental-property-maintenance",
  },
  {
    label: "Grab Bar & Handrail Installation",
    href: "/services/grab-bar-handrail-installation",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="Our services"
        title="Handyman & Home Repair Services in Ocean County, NJ"
        subtitle="Premium repairs and dependable maintenance from a local, insured handyman — with same-day estimates and clear communication."
      >
        <div className="mt-6">
          <Breadcrumbs items={crumbs} light />
        </div>
      </Hero>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }}
      />

      {/* Intro */}
      <section className="bg-white">
        <div className="container-page py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-navy/75">
              East Shore Home Solutions helps{" "}
              <span className="font-semibold text-navy">homeowners</span>,{" "}
              <span className="font-semibold text-navy">landlords</span>,{" "}
              <span className="font-semibold text-navy">property managers</span>,{" "}
              <span className="font-semibold text-navy">Airbnb &amp; short-term rental owners</span>
              , and{" "}
              <span className="font-semibold text-navy">seasonal shore homeowners</span>{" "}
              across {siteConfig.region} with reliable repairs and ongoing
              maintenance. From a single fix to a full punch list, you get one
              trusted local pro who shows up, communicates clearly, and does
              premium work — without the runaround.
            </p>
          </div>
        </div>
      </section>

      {/* Most popular / most profitable services */}
      <section className="bg-sand-100">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Most requested"
            title="Our Most Popular Services"
            subtitle="The repairs Ocean County homeowners and property owners ask for most often."
          />
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {popularServices.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3.5 transition-colors hover:border-seafoam-500/50"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-navy">
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
                  <span className="flex-1 font-semibold text-navy">
                    {item.label}
                  </span>
                  <span
                    className="text-seafoam-600 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* All services */}
      <section className="bg-white">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Browse everything"
            title="All Handyman Services"
            subtitle="Each service has its own page with details, FAQs, and a quick way to get a quote."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Secondary services */}
      <section className="bg-sand-100">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Also available"
            title="More Ways We Help"
            subtitle="Smaller jobs and add-ons we handle alongside our main services."
          />
          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {secondaryServices.map((s) => (
              <li
                key={s.name}
                className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-seafoam-500 text-white">
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
                <span className="text-sm font-medium text-navy">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we don't do (compliance) */}
      <section className="bg-white">
        <div className="container-page py-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-navy/10 bg-sand-100 p-8 shadow-card">
            <h2 className="text-xl font-bold text-navy">
              What we don&apos;t handle
            </h2>
            <p className="mt-2 text-navy/70">
              To keep your home safe and up to code, we stick to general
              handyman work and refer licensed trade jobs to trusted local pros.
              We do not perform:
            </p>
            <ul className="mt-4 space-y-2">
              {servicesNotOffered.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-navy/75">
                  <span className="mt-1 text-accent" aria-hidden>
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-navy/70">
              Not sure if your project is a fit? Just ask — if it&apos;s not
              something we do, we&apos;ll happily point you in the right
              direction.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
