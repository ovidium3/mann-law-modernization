import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";

// The firm's stated convictions, adapted faithfully from mannlawgrp.com/our-beliefs.
const beliefs = [
  {
    title: "Migration is a civil right",
    body: "We see migration, and the laws that govern it, as a central issue in the struggle for greater civil rights in the 21st century.",
  },
  {
    title: "A vehicle for human fulfillment",
    body: "Migration is an indispensable vehicle for human fulfillment — the phenomenon that largely made this country what it is today.",
  },
  {
    title: "The laws need to change",
    body: "Immigration laws in wealthy nations too often function as flawed and unjust tools for controlling the movement of people from countries lacking in opportunity.",
  },
  {
    title: "Commitment to our clients",
    body: "Within the system as it exists today, we help our clients seek immigration, lawful status, citizenship, and defense against deportation — with everything we have.",
  },
  {
    title: "We understand",
    body: "Our approach is grounded in our own experiences as former refugees and immigrants who were given the opportunity to seek, and find, a better life.",
  },
  {
    title: "A responsibility to advocate",
    body: "Success carries an obligation: to fight for more humane ways to regulate migration and to publicly advocate for the changes that are needed.",
  },
  {
    title: "Migration equality",
    body: "Our ultimate hope is a world in which every person can travel from one place to another, regardless of where they happened to be born.",
  },
  {
    title: "Excellence in our field",
    body: "As the descendants of survivors and immigrants, we bring intense passion, empathy, and devotion to the practice of immigration law.",
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
    title: "Our Beliefs",
    description:
      "The convictions that have guided Mann Law Group since 1980 — born from our own histories as refugees and immigrants.",
    locale: activeLocale,
    path: "/about/beliefs",
  });
}

export default async function BeliefsPage({
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
      { "@type": "ListItem", position: 2, name: "Our Beliefs", item: `${site.domain}/${locale}/about/beliefs` },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-4">
        <p className={eyebrow}>Our Beliefs</p>
        <h1 className="font-serif text-4xl font-bold text-slate-900">
          The convictions behind the work
        </h1>
        <p className="text-base text-slate-600">
          These are the principles that have guided this firm since 1980 — born
          from our own histories as refugees and immigrants.
        </p>
      </header>

      <ol className="space-y-8">
        {beliefs.map((belief, index) => (
          <li key={belief.title} className="flex gap-5">
            <span className="font-serif text-3xl font-bold text-slate-200">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900">
                {belief.title}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                {belief.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="border-t border-slate-100 pt-8">
        <Link
          href={`/${locale}/about`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]"
        >
          <span aria-hidden className="text-base leading-none">←</span>
          Back to About
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
