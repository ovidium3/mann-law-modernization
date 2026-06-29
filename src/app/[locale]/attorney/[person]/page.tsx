import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { attorneySlugs, getAttorney } from "@/content/attorneys";
import { getPracticeArea, type PracticeArea } from "@/content/practice-areas";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";
const card = "rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-100";
const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-[#1a3a52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#13283c]";

function Arrow() {
  return (
    <span aria-hidden className="text-base leading-none">
      →
    </span>
  );
}

// One page per attorney; Next composes these with the parent [locale] params.
export function generateStaticParams() {
  return attorneySlugs.map((person) => ({ person }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; person: string }>;
}): Promise<Metadata> {
  const { locale, person } = await params;
  const activeLocale: Locale = isLocale(locale) ? locale : "en";
  const data = getAttorney(person);

  if (!data) {
    return makeMetadata({
      title: "Our Attorneys",
      description: "Meet the immigration attorneys of Mann Law Group.",
      locale: activeLocale,
      path: "/attorney",
    });
  }

  return makeMetadata({
    title: `${data.name}, ${data.role} | Immigration Attorney`,
    description: data.tagline,
    locale: activeLocale,
    path: `/attorney/${data.slug}`,
  });
}

export default async function AttorneyProfilePage({
  params,
}: {
  params: Promise<{ locale: string; person: string }>;
}) {
  const { locale, person } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const data = getAttorney(person);
  if (!data) {
    notFound();
  }

  const practiceAreas = data.practiceSlugs
    .map((slug) => getPracticeArea(slug))
    .filter((entry): entry is PracticeArea => Boolean(entry));

  // schema.org Attorney — name search + E-E-A-T signal for the firm.
  const attorneySchema = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: data.name,
    jobTitle: data.role,
    description: data.bio.join(" "),
    image: `${site.domain}${data.img}`,
    knowsLanguage: data.languages,
    url: `${site.domain}/${locale}/attorney/${data.slug}`,
    worksFor: { "@type": "LegalService", name: site.name, url: `${site.domain}/${locale}` },
    alumniOf: data.education,
    areaServed: "United States",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Our Attorneys", item: `${site.domain}/${locale}/attorney` },
      { "@type": "ListItem", position: 2, name: data.name, item: `${site.domain}/${locale}/attorney/${data.slug}` },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
        <Link href={`/${locale}/attorney`} className="hover:underline">
          Our Attorneys
        </Link>
        <span aria-hidden className="px-2">
          /
        </span>
        <span className="text-slate-700">{data.name}</span>
      </nav>

      {/* Header — portrait + identity */}
      <header className="grid gap-8 md:grid-cols-[260px_1fr]">
        <div className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-sm bg-slate-100 shadow-sm ring-1 ring-slate-100">
          <Image
            src={data.img}
            alt={data.name}
            fill
            priority
            unoptimized
            sizes="260px"
            className="object-cover object-top"
          />
        </div>
        <div className="space-y-4">
          <p className={eyebrow}>{data.role}</p>
          <h1 className="font-serif text-4xl font-bold text-slate-900">{data.name}</h1>
          <p className="text-base text-slate-600">{data.tagline}</p>
          <div className="space-y-3 pt-2">
            {data.bio.map((paragraph) => (
              <p key={paragraph} className="text-base text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
          <Link href={`/${locale}/contact`} className={btnPrimary}>
            Request a Consultation
            <Arrow />
          </Link>
        </div>
      </header>

      {/* Credentials grid — only render sections that have content */}
      <section className="grid gap-5 md:grid-cols-2">
        <article className={card}>
          <h2 className="font-serif text-lg font-bold text-slate-900">Education</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {data.education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className={card}>
          <h2 className="font-serif text-lg font-bold text-slate-900">Bar & Court Admissions</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {data.admissions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className={card}>
          <h2 className="font-serif text-lg font-bold text-slate-900">Practice Focus</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {data.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className={card}>
          <h2 className="font-serif text-lg font-bold text-slate-900">Languages</h2>
          <p className="mt-3 text-sm text-slate-700">{data.languages.join(", ")}</p>
          {data.awards.length > 0 ? (
            <>
              <h2 className="mt-5 font-serif text-lg font-bold text-slate-900">
                Awards & Honors
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {data.awards.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
        </article>
      </section>

      {/* Related practice areas */}
      {practiceAreas.length > 0 ? (
        <section className="space-y-6">
          <div>
            <p className={eyebrow}>Practice</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-slate-900">
              {data.name.split(" ")[0]}&rsquo;s practice areas
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {practiceAreas.map((entry) => (
              <Link
                key={entry.slug}
                href={`/${locale}/practice-areas/${entry.slug}`}
                className="group rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{entry.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{entry.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]">
                  Learn more
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attorneySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
