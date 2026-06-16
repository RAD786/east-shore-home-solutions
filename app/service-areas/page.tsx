import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import ServiceAreaCard from "@/components/ServiceAreaCard";
import CTASection from "@/components/CTASection";
import { locations } from "@/lib/locations";
import { siteConfig } from "@/lib/siteConfig";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Service Areas in Ocean County, NJ",
  description:
    "East Shore Home Solutions provides handyman and home repair services across Ocean County, NJ — Toms River, Brick, Lakewood, Jackson, Point Pleasant, Barnegat, Stafford/Manahawkin, LBI and more.",
  path: "/service-areas",
  keywords: [
    "handyman Ocean County NJ",
    "Ocean County home repair services",
    "local handyman Ocean County NJ",
  ],
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Service Areas", href: "/service-areas" },
];

// Additional shore towns mentioned naturally on this page.
const mentionedTowns = [
  "Point Pleasant Beach",
  "Bay Head",
  "Lavallette",
  "Beach Haven",
  "Long Beach Island",
  "Stafford",
  "Manahawkin",
];

export default function ServiceAreasPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="Where we work"
        title="Handyman Services Throughout Ocean County, NJ"
        subtitle="From Toms River to the barrier islands, East Shore Home Solutions is your local, dependable handyman across the Jersey Shore."
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
              East Shore Home Solutions serves{" "}
              <span className="font-semibold text-navy">homeowners</span>,{" "}
              <span className="font-semibold text-navy">rental property owners</span>,{" "}
              <span className="font-semibold text-navy">landlords</span>,{" "}
              <span className="font-semibold text-navy">property managers</span>,
              and{" "}
              <span className="font-semibold text-navy">shore homeowners</span>{" "}
              throughout {siteConfig.region}. Wherever you are along the coast —
              year-round home, rental, or seasonal getaway — you get one local,
              insured handyman with same-day estimates and clear communication.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sand-100">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Featured areas"
            title="Communities We Serve"
            subtitle="Click your town for local details — or call us no matter where you are in Ocean County."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((loc) => (
              <ServiceAreaCard key={loc.slug} location={loc} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page py-16">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow="And more nearby"
              title="We Cover the Whole Shore"
            />
            <p className="mt-4 text-navy/70">
              In addition to our featured towns, we proudly serve surrounding
              shore communities including{" "}
              {mentionedTowns.map((t, i) => (
                <span key={t} className="font-medium text-navy">
                  {t}
                  {i < mentionedTowns.length - 1 ? ", " : ""}
                </span>
              ))}
              , and nearby {siteConfig.regionShort} communities. Don&apos;t see
              your town? Give us a call — if you&apos;re in or near{" "}
              {siteConfig.regionShort}, we can likely help.
            </p>
            <a
              href={siteConfig.phoneHref}
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-navy hover:bg-accent-600"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
