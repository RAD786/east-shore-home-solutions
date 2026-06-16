/**
 * Reusable call-to-action band. Drop near the bottom of any page.
 */

import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

type Props = {
  title?: string;
  subtitle?: string;
  variant?: "seafoam" | "navy";
};

export default function CTASection({
  title = "Tell us what needs fixing.",
  subtitle = `Call or send a few details and we'll get back to you with a free, same-day estimate. Local owner, insured, and serving every town in ${siteConfig.regionShort}.`,
  variant = "seafoam",
}: Props) {
  const bg =
    variant === "seafoam"
      ? "bg-seafoam-600"
      : "bg-navy";

  return (
    <section className={`${bg} text-white`}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-white/85">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-navy shadow-lg transition-transform hover:scale-[1.02]"
          >
            {siteConfig.cta.call}: {siteConfig.phone}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            {siteConfig.cta.quote}
          </Link>
        </div>
      </div>
    </section>
  );
}
