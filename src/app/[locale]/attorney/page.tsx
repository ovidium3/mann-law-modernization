import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

// NOTE: Names come from the supplied headshots; roles are PLACEHOLDERS pending
// the firm's real titles/bios. George P. Mann is listed first as the firm's
// namesake — confirm his actual title.
const attorneys = [
  { name: "George P. Mann", role: "Founding Attorney", img: "/images/attorneys/George-P.-Mann.png" },
  { name: "Aleksandra Dragovic", role: "Immigration Attorney", img: "/images/attorneys/Aleksandra-Dragovic.png" },
  { name: "Moses A. El-Sayed", role: "Immigration Attorney", img: "/images/attorneys/Moses-A.-El-Sayed.png" },
  { name: "Nadine Kassem", role: "Immigration Attorney", img: "/images/attorneys/Nadine-Kassem.png" },
  { name: "Oana C. Marina", role: "Immigration Attorney", img: "/images/attorneys/Oana-C.-Marina.png" },
  { name: "Rachel Lehr", role: "Immigration Attorney", img: "/images/attorneys/Rachel-Lehr.png" },
  { name: "Rebecca Rook", role: "Immigration Attorney", img: "/images/attorneys/Rebecca-Rook.png" },
];

const attorneyProfile = {
  name: "Mann Law Group Attorneys",
  credentials: [
    "J.D., Accredited U.S. Law School",
    "Member, State Bar of Michigan",
    "Immigration law and federal filings focus",
  ],
  experience:
    "45+ years of combined experience supporting family petitions, business immigration pathways, and removal defense.",
  languages: ["English", "Spanish", "Ukrainian", "Romanian"],
  focus: [
    "Family-based petitions",
    "Employment immigration",
    "Citizenship and naturalization",
    "Complex case strategy and intake",
  ],
  bio: "Our attorneys combine legal strategy with compassionate client service, focusing on clear communication, realistic expectations, and proactive risk management throughout every stage of the immigration process.",
};

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale: Locale = isLocale(locale) ? locale : "en";

  return makeMetadata({
    title: "Attorney",
    description:
      "Meet the Mann Law Group attorney team, credentials, experience, languages, and immigration practice focus.",
    locale: activeLocale,
    path: "/attorney",
  });
}

export default async function AttorneyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const attorneySchema = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: attorneyProfile.name,
    knowsLanguage: attorneyProfile.languages,
    worksFor: site.name,
    areaServed: "United States",
    description: attorneyProfile.bio,
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-4">
        <p className={eyebrow}>Our Team</p>
        <h1 className="font-serif text-4xl font-bold text-slate-900">Our Attorneys</h1>
        <p className="text-base text-slate-600">{attorneyProfile.bio}</p>
        <Link href={`/${locale}/contact`} className={btnPrimary}>
          Request a Consultation
          <Arrow />
        </Link>
      </header>

      {/* Team grid */}
      <section className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {attorneys.map((attorney) => (
          <article
            key={attorney.name}
            className="overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-100"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
              <Image
                src={attorney.img}
                alt={attorney.name}
                fill
                unoptimized
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-4">
              <h2 className="font-serif text-base font-bold text-slate-900">
                {attorney.name}
              </h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#1a3a52]">
                {attorney.role}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* Firm overview */}
      <section className="grid gap-5 md:grid-cols-2">
        <article className={card}>
          <h2 className="font-serif text-lg font-bold text-slate-900">Credentials</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {attorneyProfile.credentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className={card}>
          <h2 className="font-serif text-lg font-bold text-slate-900">Practice Focus</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {attorneyProfile.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className={card}>
          <h2 className="font-serif text-lg font-bold text-slate-900">Experience</h2>
          <p className="mt-3 text-sm text-slate-700">{attorneyProfile.experience}</p>
        </article>
        <article className={card}>
          <h2 className="font-serif text-lg font-bold text-slate-900">Languages Spoken</h2>
          <p className="mt-3 text-sm text-slate-700">{attorneyProfile.languages.join(", ")}</p>
        </article>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attorneySchema) }}
      />
    </div>
  );
}
