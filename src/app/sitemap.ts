import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";

const paths = ["", "/practice-areas", "/attorney", "/faq", "/contact"];

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
