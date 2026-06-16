/**
 * JSON-LD structured data builders for rich results / local SEO.
 * Rendered into pages via <script type="application/ld+json">.
 */

import { siteConfig } from "./siteConfig";
import { SITE_URL } from "./seo";
import type { Service } from "./services";
import type { Location } from "./locations";

/** LocalBusiness / HomeAndConstructionBusiness schema for the whole site. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: siteConfig.businessName,
    description: siteConfig.description,
    url: SITE_URL,
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    image: `${SITE_URL}/images/og-default.jpg`,
    priceRange: "$$",
    areaServed: siteConfig.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toms River",
      addressRegion: siteConfig.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    // Social profiles, when configured (no fake/empty entries).
    sameAs: (Object.values(siteConfig.social) as string[]).filter(
      (url) => url.length > 0,
    ),
  };
}

/** Service schema for an individual service page. */
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.longDescription,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${SITE_URL}/#business`,
      name: siteConfig.businessName,
      telephone: siteConfig.phoneRaw,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.region,
    },
    url: `${SITE_URL}/services/${service.slug}`,
  };
}

/** FAQPage schema from a list of Q&A. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/** BreadcrumbList schema. */
export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

/** Location-specific service schema for a city page. */
export function locationSchema(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: `${siteConfig.businessName} — ${location.shortName}`,
    description: location.shortDescription,
    url: `${SITE_URL}/service-areas/${location.slug}`,
    telephone: siteConfig.phoneRaw,
    image: `${SITE_URL}/images/og-default.jpg`,
    areaServed: {
      "@type": "City",
      name: location.cityName,
    },
    parentOrganization: {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${SITE_URL}/#business`,
      name: siteConfig.businessName,
    },
  };
}

/** Helper component-friendly serializer. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data);
}
