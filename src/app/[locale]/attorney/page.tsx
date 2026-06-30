import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { attorneys } from "@/content/attorneys";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";
const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-[#1a3a52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#13283c]";

function Arrow() {
  return (
    <span aria-hidden className="text-base leading-none">
      →
    </span>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale: Locale = isLocale(locale) ? locale : "en";

  return makeMetadata({
    title: "Our Attorneys",
    description:
      "Meet the immigration attorneys of Mann Law Group — credentials, experience, languages, and practice focus across the firm.",
    locale: activeLocale,
    path: "/attorney",
  });
}

export default async function AttorneyDirectoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  // schema.org list of the firm's attorneys for the directory page.
  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: attorneys.map((attorney, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Attorney",
        name: attorney.name,
        jobTitle: attorney.role,
        url: `${site.domain}/${locale}/attorney/${attorney.slug}`,
      },
    })),
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-4">
        <p className={eyebrow}>Our Team</p>
        <h1 className="font-serif text-4xl font-bold text-slate-900">Our Attorneys</h1>
        <p className="text-base text-slate-600">
          Our attorneys combine legal strategy with compassionate, multilingual
          client service. Many came to immigration law through their own families&rsquo;
          immigrant journeys. Explore each profile for credentials, experience, and
          practice focus.
        </p>
        <Link href={`/${locale}/contact`} className={btnPrimary}>
          Request a Consultation
          <Arrow />
        </Link>
      </header>

      <section className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {attorneys.map((attorney) => (
          <Link
            key={attorney.slug}
            href={`/${locale}/attorney/${attorney.slug}`}
            className="group flex flex-col overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
              <Image
                src={attorney.img}
                alt={attorney.name}
                fill
                unoptimized
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover object-top transition group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h2 className="font-serif text-base font-bold text-slate-900">
                {attorney.name}
              </h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#1a3a52]">
                {attorney.role}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]">
                View profile
                <Arrow />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />
    </div>
  );
}
