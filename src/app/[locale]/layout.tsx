import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FloatingIntakeAssistant } from "@/components/ai/floating-intake-assistant";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = isLocale(locale) ? locale : "en";

  return makeMetadata({
    title: "Immigration Legal Services",
    description:
      "Trusted immigration counsel for families, professionals, and employers.",
    locale: activeLocale,
  });
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const activeLocale: Locale = locale;

  return (
    <div className="min-h-screen">
      <SiteHeader locale={activeLocale} />
      <main>{children}</main>
      <SiteFooter locale={activeLocale} />
      <FloatingIntakeAssistant />
    </div>
  );
}
