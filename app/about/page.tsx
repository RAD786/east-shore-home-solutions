import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { siteConfig } from "@/lib/siteConfig";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About East Shore Home Solutions",
  description:
    "Locally owned and insured, East Shore Home Solutions brings reliable, premium handyman and home repair services to Ocean County, NJ. Learn about our values and approach.",
  path: "/about",
  keywords: ["local handyman Ocean County NJ", "handyman contractor Ocean County NJ"],
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

const values = [
  {
    title: "Reliability first",
    body: "We show up when we say we will and follow through. No no-shows, no chasing us down.",
  },
  {
    title: "Premium workmanship",
    body: "We take pride in clean, careful work — the kind you'd want in your own home.",
  },
  {
    title: "Honest & insured",
    body: "Straightforward pricing, insured for your peace of mind, and honest about what we do and don't do.",
  },
  {
    title: "Local & invested",
    body: `We live and work in ${siteConfig.regionShort}. Your neighbors are our customers.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="About us"
        title="Your Local Ocean County Handyman"
        subtitle="East Shore Home Solutions was founded to bring real reliability and premium craftsmanship back to home repair across the Jersey Shore."
      >
        <div className="mt-6">
          <Breadcrumbs items={crumbs} light />
        </div>
      </Hero>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }}
      />

      <TrustBar />

      <section className="bg-white">
        <div className="container-page py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="copy">
              <SectionHeading
                align="left"
                eyebrow="Our story"
                title="Built on doing right by our neighbors"
              />
              <div className="mt-6">
                <p>
                  East Shore Home Solutions is a locally owned home repair and
                  maintenance business serving {siteConfig.region}. We may be a
                  newer name, but our standard is simple: treat every home like
                  it&apos;s our own and communicate every step of the way.
                </p>
                <p>
                  Too many homeowners and landlords have a story about a
                  handyman who didn&apos;t call back, didn&apos;t show, or
                  didn&apos;t finish the job. We started East Shore to be the
                  opposite — dependable, communicative, and genuinely skilled at
                  the everyday repairs that keep a home running.
                </p>
                <p>
                  From drywall and doors to decks, fixtures, and full rental
                  turnovers, we focus on premium general handyman work. For
                  licensed plumbing, electrical, or HVAC trade jobs, we&apos;ll
                  point you to a trusted local pro — because doing right by you
                  matters more than taking every job.
                </p>
              </div>
            </div>

            {/* Placeholder visual */}
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-navy/10 bg-gradient-to-br from-navy via-navy-600 to-seafoam-700 text-center text-white shadow-card">
              <div className="px-6">
                <p className="text-sm font-medium uppercase tracking-wider text-seafoam-100">
                  Placeholder image
                </p>
                <p className="mt-2 text-lg font-semibold">
                  The East Shore team at work
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand-100">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="What we stand for"
            title="Our Values"
            subtitle="The principles behind every job we take on."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card"
              >
                <h3 className="text-lg font-semibold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
