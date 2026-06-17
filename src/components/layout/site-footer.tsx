import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-lg font-semibold">{site.name}</h2>
          <p className="mt-2 text-sm text-slate-300">{site.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Office</h3>
          <p className="mt-2 text-sm text-slate-300">{site.address}</p>
          <p className="mt-1 text-sm text-slate-300">{site.phone}</p>
          <p className="mt-1 text-sm text-slate-300">{site.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Business Hours</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            {site.hours.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-400">Language route: /{locale}</p>
        </div>
      </div>
    </footer>
  );
}
