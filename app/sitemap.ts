import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllServiceSlugs } from "@/lib/services";
import { getAllLocationSlugs } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/services",
    "/service-areas",
    "/about",
    "/contact",
  ];

  const servicePaths = getAllServiceSlugs().map((slug) => `/services/${slug}`);
  const locationPaths = getAllLocationSlugs().map(
    (slug) => `/service-areas/${slug}`,
  );

  const all = [...staticPaths, ...servicePaths, ...locationPaths];
  const lastModified = new Date();

  return all.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.includes("/services/") ? 0.8 : 0.7,
  }));
}
