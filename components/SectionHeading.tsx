/**
 * Reusable section heading with optional eyebrow + subtitle.
 * Keeps headings consistent across the site.
 */

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Heading = "h2",
  className = "",
}: Props) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-seafoam-600">
          {eyebrow}
        </p>
      )}
      <Heading className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-navy/70">{subtitle}</p>
      )}
    </div>
  );
}
