/**
 * Accessible FAQ accordion using native <details>/<summary>
 * (no client JS needed). Automatically emits FAQPage JSON-LD for the
 * questions it renders, so any page using this component gets rich-result
 * structured data for free. Set `includeSchema={false}` to opt out.
 */

import SectionHeading from "./SectionHeading";
import type { FAQ } from "@/lib/services";
import { faqSchema, jsonLd } from "@/lib/schema";

type Props = {
  faqs: FAQ[];
  title?: string;
  eyebrow?: string;
  /** Emit FAQPage JSON-LD (default true). */
  includeSchema?: boolean;
};

export default function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  eyebrow = "Good to know",
  includeSchema = true,
}: Props) {
  if (!faqs.length) return null;

  return (
    <section className="bg-white">
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(faqs)) }}
        />
      )}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-navy/10 bg-sand-100 px-5 py-4 open:bg-white open:shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-navy">
                {faq.question}
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-seafoam-500 text-white transition-transform group-open:rotate-45">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
