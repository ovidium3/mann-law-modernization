import Link from "next/link";

import { HeaderNav } from "@/components/layout/header-nav";
import { SocialLinks } from "@/components/layout/social-links";
import { localeLabels, type Locale, locales } from "@/lib/i18n";
import { getNavigation, site } from "@/lib/site";

type SiteHeaderProps = {
  locale: Locale;
};

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2z" />
    </svg>
  );
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const navigation = getNavigation(locale);
  const telHref = `tel:+1${site.phone.replace(/\D/g, "")}`;

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      {/* Top utility tier (same surface as the header — one cohesive bar) */}
      <div className="border-b border-slate-100">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <a href={telHref} className="flex items-center gap-1.5 font-medium text-[#1a3a52] hover:underline">
              <PhoneIcon className="h-3.5 w-3.5" />
              <span>{site.phone}</span>
            </a>
            <span className="hidden text-slate-500 sm:inline">
              Farmington Hills, MI · Mon–Fri 9–5
            </span>
          </div>
          <SocialLinks
            className="flex items-center gap-3"
            linkClassName="text-slate-400 transition hover:text-[#1a3a52]"
            iconClassName="h-4 w-4"
          />
        </div>
      </div>

      {/* Main row */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link
          href={`/${locale}`}
          aria-label={`${site.name} — home`}
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#1a3a52] font-serif text-lg font-bold text-white">
            M
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
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <HeaderNav navigation={navigation} />
          <Link
            href={`/${locale}/contact`}
            className="rounded-sm bg-[#1a3a52] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#13283c]"
          >
            Schedule
          </Link>
          <div className="flex items-center gap-2 md:ml-4">
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
