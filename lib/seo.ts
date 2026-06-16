/**
 * SEO helpers — centralized Next.js Metadata builders so every page
 * gets consistent titles, descriptions, canonical URLs, and Open Graph
 * tags without repeating boilerplate.
 */

import type { Metadata } from "next";
import { siteConfig } from "./siteConfig";

const SITE_URL = siteConfig.url.replace(/\/$/, "");

/**
 * Site-wide default Open Graph / social share image.
 * NOTE: path is case-sensitive on production (Linux). Keep it exact.
 */
export const OG_IMAGE = "/images/OG-share-branded.png";

type BuildMetaArgs = {
  title: string;
  description: string;
  /** Path beginning with "/" (e.g. "/services/drywall-repair") */
  path?: string;
  /** Use this exact <title>, bypassing the auto brand suffix */
  titleOverride?: string;
  /** Optional OG image path */
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  titleOverride,
  image = OG_IMAGE,
  keywords = [],
  noIndex = false,
}: BuildMetaArgs): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle =
    titleOverride ??
    (path === "/"
      ? `${siteConfig.businessName} | ${siteConfig.tagline}`
      : `${title} | ${siteConfig.businessName}`);

  return {
    // `absolute` bypasses the root layout's title template so the
    // brand suffix isn't appended a second time.
    title: { absolute: fullTitle },
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.businessName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: siteConfig.businessName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export { SITE_URL };
