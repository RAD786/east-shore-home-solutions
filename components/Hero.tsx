/**
 * Page hero. Used on the homepage and as a flexible header on
 * inner pages. Coastal gradient background + dual CTAs.
 */

import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Show the primary call + quote CTAs */
  showCtas?: boolean;
  /** Compact variant for inner pages */
  compact?: boolean;
  children?: React.ReactNode;
};

export default function Hero({
  eyebrow,
  title,
  subtitle,
  showCtas = true,
  compact = false,
  children,
}: Props) {
  return (
    <section
      className={`relative overflow-hidden bg-navy text-white ${
        compact ? "py-14 sm:py-16" : "py-20 sm:py-28"
      }`}
    >
      {/* Decorative coastal gradient + wave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy via-navy-600 to-seafoam-700 opacity-95"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-seafoam-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-container px-4 sm:px-6">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-seafoam-100">
              {eyebrow}
            </p>
          )}
          <h1
            className={`font-bold tracking-tight ${
              compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl lg:text-6xl"
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
              {subtitle}
            </p>
          )}

          {showCtas && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-semibold text-navy shadow-lg transition-colors hover:bg-accent-600"
              >
                <PhoneIcon />
                {siteConfig.cta.call}: {siteConfig.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                {siteConfig.cta.estimate}
              </Link>
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
