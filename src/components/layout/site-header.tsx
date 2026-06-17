import Link from "next/link";

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
        <div>
          <p className="text-sm font-semibold tracking-wide text-slate-500">
            Immigration Law
          </p>
          <Link
            href={`/${locale}`}
            className="text-xl font-semibold text-slate-900 hover:text-slate-700"
          >
            {site.name}
          </Link>
        </div>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-4 text-sm">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-slate-700 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-0 flex items-center gap-2 lg:ml-4">
            {locales.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  item === locale
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-slate-300 text-slate-600 hover:border-blue-200 hover:text-blue-700"
                }`}
                hrefLang={item}
                //locale={false}
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
