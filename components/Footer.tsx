/**
 * Site footer with NAP, services, service areas, and hours.
 * Reinforces local SEO with internal links to every key page.
 */

import Link from "next/link";
import { siteConfig, cityPages } from "@/lib/siteConfig";
import { services } from "@/lib/services";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-container px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-navy"
              >
                ES
              </span>
              <span className="text-lg font-bold">East Shore Home Solutions</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Trusted local handyman & home repair serving {siteConfig.region}.
              Same-day estimates. Insured. Locally owned.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href={siteConfig.phoneHref}
                className="block font-semibold text-white hover:text-seafoam-100"
              >
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.emailHref}
                className="block text-white/80 hover:text-white"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-seafoam-100">
              Services
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="font-semibold text-seafoam-100 hover:text-white"
                >
                  View all services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-seafoam-100">
              Service Areas
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {cityPages.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/service-areas/${c.slug}`}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="font-semibold text-seafoam-100 hover:text-white"
                >
                  All areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-seafoam-100">
              Hours
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {siteConfig.hoursStructured.map((h) => (
                <li key={h.days} className="flex flex-col">
                  <span className="font-medium text-white">{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-seafoam-100">
              {siteConfig.emergencyAvailability}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.businessName}. All rights reserved. Insured.
          </p>
          <p className="max-w-xl sm:text-right">
            General handyman & home repair services. We do not perform licensed
            plumbing, electrical, or HVAC trade work.
          </p>
        </div>
      </div>
    </footer>
  );
}
