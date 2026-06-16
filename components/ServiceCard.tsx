/**
 * Service card used in service grids. Links to the service's
 * dedicated landing page. Renders a simple inline icon per service.
 */

import Link from "next/link";
import type { Service, ServiceIcon } from "@/lib/services";

type Props = {
  service: Pick<Service, "slug" | "shortTitle" | "shortDescription" | "icon">;
};

export default function ServiceCard({ service }: Props) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-seafoam-500/40 hover:shadow-cardHover"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-seafoam-50 text-seafoam-600 transition-colors group-hover:bg-seafoam-500 group-hover:text-white">
        <ServiceIconGlyph icon={service.icon} />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-navy">
        {service.shortTitle}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">
        {service.shortDescription}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-seafoam-600">
        Learn more
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

/** Minimal inline icons keyed by service.icon. */
export function ServiceIconGlyph({ icon }: { icon: ServiceIcon }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "drywall":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M3 9h18M9 3v18" />
        </svg>
      );
    case "tv":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "door":
      return (
        <svg {...common}>
          <path d="M4 21h16M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" />
          <circle cx="15" cy="12" r="1" />
        </svg>
      );
    case "deck":
      return (
        <svg {...common}>
          <path d="M3 10h18M3 14h18M6 14v6M18 14v6M4 10l2-4h12l2 4" />
        </svg>
      );
    case "rental":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "fan":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2" />
          <path d="M12 10c0-3 0-6-3-6s-3 4 0 6M12 14c0 3 0 6 3 6s3-4 0-6M10 12c-3 0-6 0-6 3s4 3 6 0M14 12c3 0 6 0 6-3s-4-3-6 0" />
        </svg>
      );
    case "plumbing":
      return (
        <svg {...common}>
          <path d="M9 3v6a3 3 0 0 0 3 3h0a3 3 0 0 1 3 3v6" />
          <path d="M6 3h6M15 18h4" />
        </svg>
      );
    case "grabbar":
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="3" rx="1.5" />
          <path d="M6 11v8M18 11v8M6 19h12" />
        </svg>
      );
    case "trim":
      return (
        <svg {...common}>
          <path d="M3 20h18M5 20V8l4-4h10v16" />
          <path d="M9 20V8h10" />
        </svg>
      );
    case "maintenance":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-2.1 2.5-2.5z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
