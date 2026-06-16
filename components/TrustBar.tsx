/**
 * Trust signals strip — fact-based, no fake reviews.
 * Reinforces credibility for a new business. Items are configurable
 * but default to the homepage trust signals.
 */

export type TrustItem = {
  label: string;
  detail: string;
  icon: TrustIconKey;
};

type TrustIconKey =
  | "clock"
  | "pin"
  | "phone"
  | "shield"
  | "home"
  | "chat"
  | "award";

const defaultItems: TrustItem[] = [
  {
    label: "Same-Day Estimates",
    detail: "Fast, free quotes",
    icon: "clock",
  },
  {
    label: "Local Ocean County Service",
    detail: "Owner-operated, nearby",
    icon: "pin",
  },
  {
    label: "24/7 Emergency Availability",
    detail: "Here when it matters",
    icon: "phone",
  },
  {
    label: "Insured",
    detail: "For your peace of mind",
    icon: "shield",
  },
  {
    label: "Rental & Shore Home Maintenance",
    detail: "Turnovers & seasonal upkeep",
    icon: "home",
  },
];

type Props = {
  items?: TrustItem[];
};

export default function TrustBar({ items = defaultItems }: Props) {
  return (
    <section className="border-y border-navy/10 bg-sand-100">
      <div className="mx-auto grid max-w-container grid-cols-2 gap-x-4 gap-y-5 px-4 py-6 sm:px-6 md:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-seafoam-500 text-white">
              <TrustIcon icon={item.icon} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-navy">{item.label}</p>
              <p className="text-xs text-navy/70">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustIcon({ icon }: { icon: TrustIconKey }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (icon) {
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 14" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.38 8.38 0 0 1 3 11.5a8.5 8.5 0 0 1 9-8.4 8.38 8.38 0 0 1 9 8.4z" />
        </svg>
      );
    case "award":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="6" />
          <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11" />
        </svg>
      );
  }
}
