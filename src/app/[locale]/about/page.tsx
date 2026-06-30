import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { legalServiceNode } from "@/lib/schema";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";
const card = "rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-100";
const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-[#1a3a52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#13283c]";

// The firm's story and values, drawn from mannlawgrp.com. Factual claims (years,
// founding date, founder's background) match the attorney profiles in
// src/content/attorneys.ts — keep them consistent.
const story = [
  "Mann Law Group has represented immigration clients for more than 45 years. The firm was founded in 1980 by George P. Mann, who came to the United States as a refugee from communist Romania — an experience that still shapes how the firm treats every client who walks through its doors.",
  "We handle difficult cases at every level: immigration court, agency appeals, waivers, federal litigation, and mandamus actions. From our office in Farmington Hills, Michigan, we serve individuals, families, employers, and organizations throughout the United States and abroad.",
  "Whatever your background or your matter, we believe you deserve clear advice, serious preparation, and respectful counsel — and that conviction has made us one of Metro Detroit's most experienced immigration law firms.",
];

const pillars = [
  {
    title: "Advocacy",
    body: "Fair, humane, and strategic legal work for people navigating one of the most consequential moments of their lives.",
  },
  {
    title: "Clarity",
    body: "Plain-language communication at every stage, so you always understand where your case stands and what comes next.",
  },
  {
    title: "Community",
    body: "Deep roots in Metro Detroit's immigrant communities, built over four decades of service across countries, cultures, and languages.",
  },
  {
    title: "Excellence",
    body: "Careful, prepared, immigration-focused representation — this is the only kind of law we practice.",
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
    title: "About the Firm",
    description:
      "Mann Law Group has practiced immigration law for over 45 years. Founded in 1980 by a former refugee, the firm serves families, professionals, and employers nationwide.",
    locale: activeLocale,
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  // AboutPage whose mainEntity is the firm's complete canonical entity (shared
  // with the homepage via the same @id). Google validates per-page and doesn't
  // dereference @id across URLs, so the full node must appear here too.
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${site.name}`,
    url: `${site.domain}/${locale}/about`,
    mainEntity: legalServiceNode(locale),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.domain}/${locale}` },
      { "@type": "ListItem", position: 2, name: "About", item: `${site.domain}/${locale}/about` },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-4">
        <p className={eyebrow}>About the Firm</p>
        <h1 className="font-serif text-4xl font-bold text-slate-900">
          We live the immigrant experience.
        </h1>
        <p className="text-base text-slate-600">
          For more than 45 years, Mann Law Group has stood with immigrants,
          families, and employers — combining serious legal advocacy with the
          empathy that comes from having walked the same road.
        </p>
        <Link href={`/${locale}/contact`} className={btnPrimary}>
          Request a Consultation
          <span aria-hidden className="text-base leading-none">→</span>
        </Link>
      </header>

      <section className="relative aspect-[21/9] w-full overflow-hidden rounded-sm">
        <Image
          src="/images/team.jpg"
          alt="The attorneys of Mann Law Group"
          fill
          unoptimized
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
      </section>

      <section className="max-w-3xl space-y-5">
        <p className={eyebrow}>Our Story</p>
        {story.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-slate-600">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="space-y-8">
        <div className="max-w-2xl">
          <p className={eyebrow}>What We Stand For</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
            Four principles, every case
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article key={pillar.title} className={card}>
              <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Link
          href={`/${locale}/about/beliefs`}
          className={`${card} group transition hover:shadow-md`}
        >
          <p className={eyebrow}>Our Beliefs</p>
          <h3 className="mt-2 font-serif text-xl font-bold text-slate-900">
            The convictions behind the work
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            The principles that have guided the firm since 1980 — born from our
            own histories as refugees and immigrants.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]">
            Read our beliefs
            <span aria-hidden className="text-base leading-none">→</span>
          </span>
        </Link>
        <Link
          href={`/${locale}/careers`}
          className={`${card} group transition hover:shadow-md`}
        >
          <p className={eyebrow}>Careers</p>
          <h3 className="mt-2 font-serif text-xl font-bold text-slate-900">
            Join the team
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            We&rsquo;re always glad to hear from people who care about doing
            immigration work carefully and well.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]">
            Explore careers
            <span aria-hidden className="text-base leading-none">→</span>
          </span>
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
