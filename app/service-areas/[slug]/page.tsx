import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";
import { getLocation, getAllLocationSlugs } from "@/lib/locations";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/siteConfig";
import { buildMetadata } from "@/lib/seo";
import { locationSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const location = getLocation(params.slug);
  if (!location) return {};
  return buildMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/service-areas/${location.slug}`,
    image: location.image,
    keywords: location.targetKeywords,
  });
}

export default function LocationPage({ params }: Params) {
  const location = getLocation(params.slug);
  if (!location) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: location.shortName, href: `/service-areas/${location.slug}` },
  ];

  const featured = services.slice(0, 6);

  return (
    <>
      <Hero
        compact
        eyebrow={`Serving ${location.shortName}`}
        title={`Handyman Services in ${location.cityName}`}
        subtitle={location.shortDescription}
      >
        <div className="mt-6">
          <Breadcrumbs items={crumbs} light />
        </div>
      </Hero>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(locationSchema(location)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }}
      />
      {/* FAQPage JSON-LD is emitted by <FAQSection /> below. */}

      <section className="bg-sand-100">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <div>
              {/* Local notes */}
              <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-8">
                <h2 className="text-2xl font-bold text-navy">
                  Local handyman service in {location.shortName}
                </h2>
                <ul className="mt-5 space-y-3">
                  {location.localNotes.map((note) => (
                    <li key={note} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-seafoam-500 text-white">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-navy/80">{note}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-seafoam-600">
                  Neighborhoods & areas we cover
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {location.nearbyAreas.map((n) => (
                    <span
                      key={n}
                      className="rounded-full bg-sand-200 px-3 py-1 text-sm text-navy/75"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services in this area */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-navy">
                  Popular services in {location.shortName}
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {featured.map((s) => (
                    <ServiceCard key={s.slug} service={s} />
                  ))}
                </div>
                <Link
                  href="/services"
                  className="mt-6 inline-block text-sm font-semibold text-seafoam-600 hover:underline"
                >
                  View all services →
                </Link>
              </div>

              {/* Rental & shore home angle */}
              <div className="mt-10 rounded-2xl border border-seafoam-500/20 bg-seafoam-50 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-navy">
                  Rental & shore home maintenance in {location.shortName}
                </h2>
                <p className="mt-2 text-navy/75">
                  Beyond one-off repairs, we help {location.shortName} landlords,
                  property managers, Airbnb hosts, and seasonal shore-home owners
                  keep properties guest- and tenant-ready — turnovers, punch
                  lists, and ongoing upkeep, with clear photo updates so you
                  always know the job is done right.
                </p>
                <Link
                  href="/services/rental-property-maintenance"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-seafoam-600 hover:underline"
                >
                  Explore rental property maintenance →
                </Link>
              </div>
            </div>

            {/* Sidebar form */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
                <h2 className="text-xl font-bold text-navy">
                  Free quote in {location.shortName}
                </h2>
                <p className="mt-1 text-sm text-navy/65">
                  Same-day estimates whenever possible.
                </p>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-4 flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-navy hover:bg-accent-600"
                >
                  {location.ctaText}
                </a>
                <div className="mt-5">
                  <ContactForm />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={location.faqs}
        eyebrow="Questions"
        title={`${location.shortName} Handyman FAQs`}
      />

      <section className="bg-sand-100">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="Nearby towns served"
            title="Other Areas We Serve"
          />
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
            {siteConfig.serviceAreas
              .filter((c) => c.hasPage && c.slug !== location.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/service-areas/${c.slug}`}
                  className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-seafoam-500 hover:text-seafoam-600"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
