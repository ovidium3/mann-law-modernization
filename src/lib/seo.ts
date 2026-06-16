import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";

const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  uk: "uk_UA",
  ro: "ro_RO",
};

export function localeAlternates(path = "") {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `/${locale}${path}`]),
  );

  return {
    canonical: `/en${path}`,
    languages,
  };
}

export function makeMetadata({
  title,
  description,
  locale,
  path = "",
}: {
  title: string;
  description: string;
  locale: Locale;
  path?: string;
}): Metadata {
  const absoluteUrl = `${site.domain}/${locale}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(site.domain),
    alternates: localeAlternates(path),
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      type: "website",
      siteName: site.name,
      locale: ogLocaleMap[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
