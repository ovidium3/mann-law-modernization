import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import { practiceAreaSlugs } from "@/content/practice-areas";
import { attorneySlugs } from "@/content/attorneys";

const paths = [
  "",
  "/practice-areas",
  ...practiceAreaSlugs.map((slug) => `/practice-areas/${slug}`),
  "/attorney",
  ...attorneySlugs.map((slug) => `/attorney/${slug}`),
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.domain}/${locale}${path}`,
      lastModified: updatedAt,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
  );
}
