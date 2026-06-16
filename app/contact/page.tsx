import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import { siteConfig, cityPages } from "@/lib/siteConfig";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Free Estimate",
  description:
    "Request a free, same-day handyman estimate in Ocean County, NJ. Call East Shore Home Solutions or send a quick request with photos — we'll get right back to you.",
  path: "/contact",
  keywords: ["handyman near me", "handyman Ocean County NJ", "home repair Ocean County NJ"],
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

const contactFaqs = [
  {
    question: "How quickly will you respond to my request?",
    answer:
      "We respond as fast as we can — usually the same day during business hours (Mon–Sat 8am–8pm). For emergencies, calling is always the fastest way to reach us.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes. Estimates are free, and we aim to get them to you the same day whenever possible. Adding a photo to your request helps us quote faster and more accurately.",
  },
  {
    question: "What areas do you serve?",
    answer: `We serve all of ${siteConfig.region}, including Toms River, Brick, Lakewood, Jackson, Point Pleasant, Barnegat, Stafford/Manahawkin, and the LBI/Beach Haven area.`,
  },
  {
    question: "Do you handle emergencies?",
    answer: `Yes — ${siteConfig.emergencyService} If something can't wait, please call us directly at ${siteConfig.phone} rather than using the form.`,
  },
  {
    question: "Can I upload a photo of the problem?",
    answer:
      "Absolutely. The form includes an optional photo upload, which helps us understand the job and give you a more accurate estimate before we arrive.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        compact
        showCtas={false}
        eyebrow="Get in touch"
        title="Request a Handyman Estimate in Ocean County, NJ"
        subtitle="Call us or fill out the quick form below and we'll get right back to you with a free estimate. For urgent or emergency needs, calling is always fastest — we're here Mon–Sat 8am–8pm with 24/7 emergency service."
      >
        <div className="mt-6">
          <Breadcrumbs items={crumbs} light />
        </div>
      </Hero>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }}
      />

      <section className="bg-sand-100">
        <div className="container-page py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[420px_1fr]">
            {/* Contact details */}
            <div>
              <h2 className="text-2xl font-bold text-navy">
                Talk to a real local owner
              </h2>
              <p className="mt-3 text-navy/70">
                No call centers, no runaround. Reach out however works best for
                you.
              </p>

              <div className="mt-8 space-y-4">
                <ContactRow
                  label="Call or text"
                  value={siteConfig.phone}
                  href={siteConfig.phoneHref}
                  icon="phone"
                />
                <ContactRow
                  label="Email"
                  value={siteConfig.email}
                  href={siteConfig.emailHref}
                  icon="mail"
                />
                <ContactRow
                  label="Service area"
                  value={siteConfig.region}
                  icon="pin"
                />
                <ContactRow
                  label="Hours"
                  value={siteConfig.hours}
                  icon="clock"
                />
              </div>

              <div className="mt-8 rounded-2xl bg-seafoam-600 p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-wide text-seafoam-100">
                  Emergency service
                </p>
                <p className="mt-1 text-lg font-bold">
                  {siteConfig.emergencyAvailability}
                </p>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-navy"
                >
                  Call {siteConfig.phone}
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-bold text-navy">Send a request</h2>
              <p className="mt-1 text-sm text-navy/65">
                Add a photo of the job for a faster, more accurate estimate.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service area reminder */}
      <section className="border-t border-navy/10 bg-sand-100">
        <div className="container-page py-14">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-navy">
              Proudly serving all of {siteConfig.region}
            </h2>
            <p className="mt-3 text-navy/70">
              From Toms River to the barrier islands, we&apos;re a quick call
              away. Find your town below or reach out no matter where you are in{" "}
              {siteConfig.regionShort}.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
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
          </div>
        </div>
      </section>

      <FAQSection faqs={contactFaqs} eyebrow="Questions" />
    </>
  );
}

function ContactRow({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: "phone" | "mail" | "pin" | "clock";
}) {
  const inner = (
    <div className="flex items-center gap-4 rounded-2xl border border-navy/10 bg-white px-5 py-4 shadow-card">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-seafoam-50 text-seafoam-600">
        <RowIcon icon={icon} />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-navy/60">
          {label}
        </p>
        <p className="font-semibold text-navy">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-transform hover:scale-[1.01]">
      {inner}
    </a>
  ) : (
    inner
  );
}

function RowIcon({ icon }: { icon: "phone" | "mail" | "pin" | "clock" }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (icon) {
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 5L2 7" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 14" />
        </svg>
      );
  }
}
