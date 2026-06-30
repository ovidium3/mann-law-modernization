import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";
const card = "rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-100";

// Why work here, adapted from mannlawgrp.com/careers.
const values = [
  {
    title: "Careful preparation",
    body: "Our cases often turn on facts, records, timing, and thoughtful organization. We sweat the details because our clients' lives depend on them.",
  },
  {
    title: "Respectful service",
    body: "We serve clients from many countries, cultures, languages, and life circumstances — and we treat every one of them with dignity.",
  },
  {
    title: "Focused advocacy",
    body: "Every role here supports a practice dedicated exclusively to immigration law. It's the only work we do.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale: Locale = isLocale(locale) ? locale : "en";

  return makeMetadata({
    title: "Careers",
    description:
      "Join an immigration team built for serious advocacy. Mann Law Group welcomes resumes from people who care about doing immigration work carefully and well.",
    locale: activeLocale,
    path: "/careers",
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "About", item: `${site.domain}/${locale}/about` },
      { "@type": "ListItem", position: 2, name: "Careers", item: `${site.domain}/${locale}/careers` },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-4">
        <p className={eyebrow}>Careers</p>
        <h1 className="font-serif text-4xl font-bold text-slate-900">
          Join an immigration team built for serious advocacy.
        </h1>
        <p className="text-base text-slate-600">
          Immigration law takes patience, accuracy, and steady communication with
          people navigating important moments in their lives. If that sounds like
          you, we&rsquo;d like to hear from you.
        </p>
      </header>

      <section className="space-y-6">
        <div>
          <p className={eyebrow}>Why Work Here</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
            What we value in the work
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className={card}>
              <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-sm bg-slate-50 p-8 md:p-12">
        <p className={eyebrow}>Open Positions</p>
        <h2 className="mt-3 font-serif text-2xl font-bold text-slate-900">
          No openings right now — but we&rsquo;re still listening.
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          We don&rsquo;t have an open position at the moment. If you&rsquo;d like
          to be considered when one opens, send your resume and a short note about
          why immigration work matters to you to{" "}
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("Careers — Resume for future consideration")}`}
            className="font-semibold text-[#1a3a52] underline underline-offset-2 hover:text-[#13283c]"
          >
            {site.email}
          </a>
          .
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
