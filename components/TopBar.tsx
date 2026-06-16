/**
 * Slim announcement / trust strip above the header.
 * Premium contractor touch: quick trust signals on the left,
 * one-tap phone (with 24/7 emergency note) on the right.
 * Trust signals collapse on small screens to stay uncluttered.
 */

import { siteConfig } from "@/lib/siteConfig";

const trustItems = [
  "Same-Day Estimates",
  "Insured",
  `Serving All of ${siteConfig.regionShort}`,
];

export default function TopBar() {
  return (
    <div className="bg-navy-800 text-white">
      <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6">
        {/* Trust signals — hidden on the smallest screens */}
        <ul className="hidden items-center gap-5 sm:flex">
          {trustItems.map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-white/80">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent-400"
                aria-hidden
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        {/* Emergency + phone — always visible */}
        <a
          href={siteConfig.phoneHref}
          className="flex items-center gap-2 font-medium text-white transition-colors hover:text-accent-400"
        >
          <span className="hidden text-white/70 sm:inline">
            24/7 Emergency:
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              width="13"
              height="13"
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
            {siteConfig.phone}
          </span>
        </a>
      </div>
    </div>
  );
}
