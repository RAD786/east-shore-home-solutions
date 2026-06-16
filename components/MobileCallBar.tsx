/**
 * Sticky bottom call/quote bar shown only on mobile.
 * Keeps the phone number one tap away on every page.
 */

import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/10 bg-white/95 px-3 py-2.5 shadow-[0_-4px_20px_-8px_rgba(15,42,63,0.25)] backdrop-blur md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={siteConfig.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-navy"
        >
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
          Call Now
        </a>
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center rounded-lg border border-navy/20 px-4 py-3 text-sm font-semibold text-navy"
        >
          Request Estimate
        </Link>
      </div>
    </div>
  );
}
