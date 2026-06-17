import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const attorneyProfile = {
  name: "Mann Law Group Attorney Team",
  credentials: [
    "J.D., Accredited U.S. Law School",
    "Member, State Bar of Michigan",
    "Immigration law and federal filings focus",
  ],
  experience:
    "15+ years supporting family petitions, business immigration pathways, and removal defense preparation.",
  languages: ["English", "Spanish", "Ukrainian", "Romanian"],
  focus: [
    "Family-based petitions",
    "Employment immigration",
    "Citizenship and naturalization",
    "Complex case strategy and intake",
  ],
  bio: "Our attorney team combines legal strategy with compassionate client service, focusing on clear communication, realistic expectations, and proactive risk management throughout every stage of the immigration process.",
};

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
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">Attorney Profile</h1>
        <p className="text-sm text-slate-600">{attorneyProfile.bio}</p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Credentials</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {attorneyProfile.credentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Practice Focus</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {attorneyProfile.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Experience</h2>
        <p className="mt-3 text-sm text-slate-700">{attorneyProfile.experience}</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Languages Spoken</h2>
        <p className="mt-3 text-sm text-slate-700">{attorneyProfile.languages.join(", ")}</p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attorneySchema) }}
      />
    </div>
  );
}
