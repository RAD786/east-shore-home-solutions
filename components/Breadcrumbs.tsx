/**
 * Accessible breadcrumb trail. Pair with breadcrumbSchema() for SEO.
 */

import Link from "next/link";

export type Crumb = { name: string; href: string };

type Props = {
  items: Crumb[];
  /** Render light-colored variant on dark backgrounds */
  light?: boolean;
};

export default function Breadcrumbs({ items, light = false }: Props) {
  const base = light ? "text-white/70" : "text-navy/70";
  const link = light ? "hover:text-white" : "hover:text-seafoam-600";
  const current = light ? "text-white" : "text-navy";

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${base}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className={`font-medium ${current}`}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className={`transition-colors ${link}`}>
                    {item.name}
                  </Link>
                  <span aria-hidden className="opacity-50">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
