import Link from "next/link";

import { HeaderNav } from "@/components/layout/header-nav";
import { localeLabels, type Locale, locales } from "@/lib/i18n";
import { getNavigation, site } from "@/lib/site";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const navigation = getNavigation(locale);

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link
          href={`/${locale}`}
          aria-label={`${site.name} — home`}
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#1a3a52] font-serif text-base font-bold text-white">
            ML
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-bold text-slate-900">
              {site.name}
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Immigration Law
            </span>
          </span>
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-5 text-sm">
          <HeaderNav navigation={navigation} />
          <div className="ml-0 flex items-center gap-2 lg:ml-4">
            {locales.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={`rounded-sm border px-3 py-1 text-xs font-semibold ${
                  item === locale
                    ? "border-[#1a3a52] bg-[#1a3a52] text-white"
                    : "border-slate-300 text-slate-600 hover:border-[#1a3a52] hover:text-[#1a3a52]"
                }`}
                hrefLang={item}
              >
                {localeLabels[item]}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
