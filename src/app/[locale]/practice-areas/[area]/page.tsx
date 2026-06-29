import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  getPracticeArea,
  practiceAreaSlugs,
  type PracticeArea,
} from "@/content/practice-areas";

const NAVY = "#1a3a52";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";
const card = "rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-100";
const btnPrimaryOnDark =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#1a3a52] transition hover:bg-slate-100";

function Arrow() {
  return (
    <span aria-hidden className="text-base leading-none">
      →
    </span>
  );
}

// Statically generate one page per practice area; Next composes these with the
// locale params from the parent [locale] segment, yielding locale × area pages.
export function generateStaticParams() {
  return practiceAreaSlugs.map((area) => ({ area }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; area: string }>;
}): Promise<Metadata> {
  const { locale, area } = await params;
  const activeLocale: Locale = isLocale(locale) ? locale : "en";
  const data = getPracticeArea(area);

  if (!data) {
    return makeMetadata({
      title: "Practice Areas",
      description: "Immigration legal services at Mann Law Group.",
      locale: activeLocale,
      path: "/practice-areas",
    });
  }

  return makeMetadata({
    title: `${data.title} | Immigration Lawyers`,
    description: data.overview,
    locale: activeLocale,
    path: `/practice-areas/${data.slug}`,
  });
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ locale: string; area: string }>;
}) {
  const { locale, area } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const data = getPracticeArea(area);
  if (!data) {
    notFound();
  }

  const related = data.related
    .map((slug) => getPracticeArea(slug))
    .filter((entry): entry is PracticeArea => Boolean(entry));

  // schema.org Service describing this offering, tied to the firm as provider.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    serviceType: data.title,
    description: data.overview,
    areaServed: "United States",
    provider: {
      "@type": "LegalService",
      name: site.name,
      url: `${site.domain}/${locale}`,
      telephone: site.phone,
    },
  };

  // BreadcrumbList so the path renders in search results.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Practice Areas", item: `${site.domain}/${locale}/practice-areas` },
      { "@type": "ListItem", position: 2, name: data.title, item: `${site.domain}/${locale}/practice-areas/${data.slug}` },
    ],
  };

  return (
    <>
      {/* Hero — photo where we have one, branded navy fallback otherwise. */}
      <section className="relative overflow-hidden bg-[#1a3a52]">
        {data.img ? (
          <>
            <Image
              src={data.img}
              alt=""
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, ${NAVY}f2 0%, ${NAVY}d9 45%, ${NAVY}73 100%)`,
              }}
            />
          </>
        ) : null}
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-white sm:px-6 md:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-xs text-blue-200">
            <Link href={`/${locale}/practice-areas`} className="hover:underline">
              Practice Areas
            </Link>
            <span aria-hidden className="px-2">
              /
            </span>
            <span className="text-white">{data.title}</span>
          </nav>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight md:text-5xl">
            {data.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-200 md:text-lg">
            {data.tagline}
          </p>
          <Link href={`/${locale}/contact`} className={`mt-8 ${btnPrimaryOnDark}`}>
            Request Consultation
            <Arrow />
          </Link>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        {/* Overview */}
        <section className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <p className={eyebrow}>Overview</p>
            {data.body.map((paragraph) => (
              <p key={paragraph} className="text-base text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
          <aside className={`${card} h-fit`}>
            <h2 className="text-lg font-semibold text-slate-900">Who this is for</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {data.whoItsFor.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="text-[#1a3a52]">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {/* How we work the case */}
        <section className="rounded-sm bg-[#1a3a52] p-8 text-white md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            How We Work
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-white">
            A clear path forward
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {data.process.map((step, index) => (
              <li key={step.title} className="md:border-l md:border-white/15 md:pl-5">
                <span className="text-4xl font-bold text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Common questions */}
        <section className="space-y-6">
          <div>
            <p className={eyebrow}>FAQ</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
              Common questions
            </h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {data.questions.map((question) => (
              <li key={question} className={`${card} text-sm text-slate-700`}>
                {question}
              </li>
            ))}
          </ul>
          <Link
            href={`/${locale}/faq`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]"
          >
            View full FAQ
            <Arrow />
          </Link>
        </section>

        {/* Related areas */}
        {related.length > 0 ? (
          <section className="space-y-6">
            <div>
              <p className={eyebrow}>Related</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
                Related practice areas
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((entry) => (
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

        {/* Closing CTA */}
        <section
          className="rounded-sm px-8 py-14 text-center text-white md:px-12"
          style={{ backgroundColor: NAVY }}
        >
          <h2 className="font-serif text-3xl font-bold">Have a {data.title.toLowerCase()} question?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-300">
            Complete a short intake and receive next-step guidance from our team.
          </p>
          <Link
            href={`/${locale}/contact`}
            className={`mt-8 ${btnPrimaryOnDark} mx-auto`}
          >
            Request Consultation
            <Arrow />
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
