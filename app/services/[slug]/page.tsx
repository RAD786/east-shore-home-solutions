import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import ServiceCard, { ServiceIconGlyph } from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";
import {
  getService,
  getAllServiceSlugs,
  services,
  TRADE_LIMITATION_NOTICE,
} from "@/lib/services";
import { cityPages, siteConfig } from "@/lib/siteConfig";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    // Use the real service photo for OG when one exists; otherwise the
    // branded default OG image is used.
    image: service.hasPhoto ? service.image : undefined,
    keywords: service.primaryKeywords,
  });
}

export default function ServicePage({ params }: Params) {
  const service = getService(params.slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.shortTitle, href: `/services/${service.slug}` },
  ];

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Hero
        compact
        eyebrow="Service"
        title={`${service.title} in Ocean County, NJ`}
        subtitle={service.longDescription}
      >
        <div className="mt-6">
          <Breadcrumbs items={crumbs} light />
        </div>
      </Hero>

      {/* Structured data (FAQPage JSON-LD is emitted by <FAQSection />) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }}
      />

      <section className="bg-sand-100">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* Main content */}
            <div>
              {service.hasPhoto ? (
                /* Real service photo */
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-navy/10 shadow-card">
                  <Image
                    src={service.image}
                    alt={`${service.title} by ${siteConfig.businessName} in ${siteConfig.regionShort}, NJ`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                /* Branded visual panel (swap for a real photo when available) */
                <div className="flex aspect-[16/9] items-center justify-center rounded-2xl border border-navy/10 bg-gradient-to-br from-navy via-navy-600 to-seafoam-700 text-center text-white shadow-card">
                  <div className="px-6">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <ServiceIconGlyph icon={service.icon} />
                    </span>
                    <p className="mt-3 text-lg font-semibold">{service.title}</p>
                    <p className="mt-1 text-sm text-seafoam-100">
                      {siteConfig.regionShort}, NJ
                    </p>
                  </div>
                </div>
              )}

              <div className="copy mt-8">
                <h2 className="text-2xl font-bold text-navy">
                  What&apos;s included
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {service.includedServices.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-xl border border-navy/10 bg-white px-4 py-3"
                    >
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
                      <span className="text-sm text-navy/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common problems solved */}
              {service.commonProblems.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-navy">
                    Common problems we solve
                  </h2>
                  <p className="mt-2 text-navy/65">
                    A few of the issues Ocean County homeowners and property
                    owners call us about:
                  </p>
                  <ul className="mt-5 space-y-3">
                    {service.commonProblems.map((problem) => (
                      <li
                        key={problem}
                        className="flex items-start gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3"
                      >
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy/5 text-seafoam-600"
                          aria-hidden
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </span>
                        <span className="text-sm text-navy/80">{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Why hire East Shore */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-navy">
                  Why hire East Shore Home Solutions
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      t: "Local owner-operated",
                      b: "You work directly with a local owner who answers the phone and stands behind the work.",
                    },
                    {
                      t: "Same-day estimates",
                      b: "Fast, free quotes — often the same day — so you're not left waiting.",
                    },
                    {
                      t: "Premium, careful work",
                      b: "Quality repairs done right the first time, with clean job sites and respect for your home.",
                    },
                    {
                      t: "Insured & communicative",
                      b: "Insured for your peace of mind, with clear updates from first call to finish.",
                    },
                  ].map((item) => (
                    <div
                      key={item.t}
                      className="rounded-xl border border-navy/10 bg-white p-5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-seafoam-500 text-white">
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
                        <h3 className="font-semibold text-navy">{item.t}</h3>
                      </div>
                      <p className="mt-2 text-sm text-navy/65">{item.b}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's not included — sets expectations + compliance */}
              {service.notIncluded.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-navy">
                    What this service doesn&apos;t cover
                  </h2>
                  <p className="mt-2 text-sm text-navy/65">
                    To keep your home safe and up to code, we refer these to a
                    trusted licensed pro:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {service.notIncluded.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-navy/75"
                      >
                        <span className="mt-0.5 font-bold text-accent" aria-hidden>
                          ✕
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/*
                Standardized licensed-trade limitation on minor-plumbing &
                fixture pages; otherwise the service-specific disclaimer.
              */}
              {(service.licensedTradeNotice || service.licensingDisclaimer) && (
                <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-5">
                  <p className="flex items-start gap-2 text-sm text-navy/75">
                    <span className="mt-0.5 font-bold text-accent" aria-hidden>
                      ⓘ
                    </span>
                    <span>
                      {service.licensedTradeNotice
                        ? TRADE_LIMITATION_NOTICE
                        : service.licensingDisclaimer}
                    </span>
                  </p>
                </div>
              )}

              <div className="mt-8 rounded-2xl bg-navy p-6 text-white sm:p-8">
                <h2 className="text-xl font-bold">
                  Need {service.shortTitle.toLowerCase()} in {siteConfig.regionShort}?
                </h2>
                <p className="mt-2 text-white/80">
                  Call for a same-day estimate or request a free quote — we
                  serve all of {siteConfig.region}.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={siteConfig.phoneHref}
                    className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-navy hover:bg-accent-600"
                  >
                    Call {siteConfig.phone}
                  </a>
                  <a
                    href="#quote"
                    className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    {service.ctaText}
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar form */}
            <aside id="quote" className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card">
                <h2 className="text-xl font-bold text-navy">
                  Get a free quote
                </h2>
                <p className="mt-1 text-sm text-navy/65">
                  Same-day estimates whenever possible.
                </p>
                <div className="mt-5">
                  <ContactForm defaultService={service.slug} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FAQSection faqs={service.faqs} />

      {/* Related services */}
      <section className="bg-white">
        <div className="container-page py-16">
          <SectionHeading eyebrow="Explore more" title="Related Services" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="text-sm font-semibold text-seafoam-600 hover:underline"
            >
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Service area mention */}
      <section className="bg-sand-100">
        <div className="container-page py-14">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-navy">
              {service.shortTitle} across {siteConfig.region}
            </h2>
            <p className="mt-3 text-navy/70">
              We bring {service.shortTitle.toLowerCase()} to homeowners,
              landlords, and shore-home owners throughout {siteConfig.regionShort}
              , including:
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {cityPages.map((city) => (
                <Link
                  key={city.slug}
                  href={`/service-areas/${city.slug}`}
                  className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-seafoam-500 hover:text-seafoam-600"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <Link
              href="/service-areas"
              className="mt-5 inline-block text-sm font-semibold text-seafoam-600 hover:underline"
            >
              See all service areas →
            </Link>
          </div>
        </div>
      </section>

      <CTASection variant="navy" />
    </>
  );
}
