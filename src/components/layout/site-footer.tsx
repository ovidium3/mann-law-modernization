import Link from "next/link";

import { SocialLinks } from "@/components/layout/social-links";
import type { Locale } from "@/lib/i18n";
import { getNavigation, site } from "@/lib/site";

type SiteFooterProps = {
  locale: Locale;
};

// Official government resources commonly useful to immigration clients.
const resourceLinks = [
  { label: "USCIS Case Status", href: "https://egov.uscis.gov/casestatus/landing.do" },
  { label: "USCIS Processing Times", href: "https://egov.uscis.gov/processing-times/" },
  { label: "USCIS Office Locator", href: "https://www.uscis.gov/about-us/find-a-uscis-office/field-offices" },
  { label: "DOS Visa Bulletin", href: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html" },
  { label: "Visa Wait Times", href: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html" },
];

export function SiteFooter({ locale }: SiteFooterProps) {
  const navigation = getNavigation(locale);
  const telHref = `tel:+1${site.phone.replace(/\D/g, "")}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-[#13283c] text-slate-200">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 font-serif text-base font-bold text-white">
              M
            </span>
            <span className="font-serif text-lg font-bold text-white">{site.name}</span>
          </div>
          <p className="mt-3 text-sm text-slate-300">{site.description}</p>
          <SocialLinks
            className="mt-4 flex items-center gap-3"
            linkClassName="text-slate-300 transition hover:text-white"
            iconClassName="h-5 w-5"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate-300 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">Office</h3>
          <p className="mt-3 text-sm text-slate-300">{site.address}</p>
          <p className="mt-2 text-sm">
            <a href={telHref} className="text-slate-300 transition hover:text-white">
              {site.phone}
            </a>
          </p>
          <p className="mt-1 text-sm text-slate-300">Fax: {site.fax}</p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${site.email}`} className="text-slate-300 transition hover:text-white">
              {site.email}
            </a>
          </p>
          <ul className="mt-3 space-y-1 text-xs text-slate-400">
            {site.hours.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">Resources</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {resourceLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 transition hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-slate-400 sm:px-6 lg:px-8">
          <p>© {year} {site.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href={`/${locale}/privacy`} className="font-medium text-slate-300 transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href={`/${locale}/terms`} className="font-medium text-slate-300 transition hover:text-white">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
