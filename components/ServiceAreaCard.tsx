/**
 * Card linking to a city/service-area landing page.
 */

import Link from "next/link";
import type { Location } from "@/lib/locations";

type Props = {
  location: Pick<Location, "slug" | "shortName" | "shortDescription">;
};

export default function ServiceAreaCard({ location }: Props) {
  return (
    <Link
      href={`/service-areas/${location.slug}`}
      className="group flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-seafoam-500/40 hover:shadow-cardHover"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-seafoam-600">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
        <h3 className="text-lg font-semibold text-navy">
          {location.shortName}
        </h3>
      </div>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-navy/65">
        {location.shortDescription}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-seafoam-600">
        View {location.shortName} services
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-x-1"
          aria-hidden
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </Link>
  );
}
