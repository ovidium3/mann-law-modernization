"use client";

import { useEffect } from "react";

import type { Locale } from "@/lib/i18n";

/**
 * The root layout renders a single `<html lang="en">` and cannot know the active
 * locale (it sits above the `[locale]` segment). This syncs the document's `lang`
 * attribute to the active locale after hydration so assistive tech and language
 * tooling see the correct language on `/es`, `/uk`, `/ro`. The `hreflang`
 * alternates in metadata carry the SSR/SEO language signal.
 */
export function HtmlLangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
