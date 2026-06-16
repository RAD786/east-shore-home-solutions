import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-sand-100">
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-seafoam-600">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-navy sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-navy/70">
          Sorry, we couldn&apos;t find that page. Let&apos;s get you back on
          track — or call us and we&apos;ll help directly.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-navy px-6 py-3 text-base font-semibold text-white hover:bg-navy-600"
          >
            Back home
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-navy hover:bg-accent-600"
          >
            Call {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
