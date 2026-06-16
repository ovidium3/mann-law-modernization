import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";

const practiceAreas = [
  {
    title: "Family-based immigration",
    overview:
      "Petitions and adjustment planning for spouses, children, parents, and extended family pathways.",
    concerns: "Timeline uncertainty, evidence requirements, and interview readiness.",
    questions: ["Which petition applies to my relationship?", "How long does processing take?"],
  },
  {
    title: "Employment-based immigration",
    overview:
      "Strategic support for employers and professionals pursuing temporary and permanent work pathways.",
    concerns: "Maintaining status, job transitions, and compliance documentation.",
    questions: ["What visa category aligns with this role?", "Can I change employers?"],
  },
  {
    title: "Green cards",
    overview:
      "Case evaluation, filing strategy, and interview preparation for permanent residency.",
    concerns: "Evidence sufficiency, waiver strategy, and processing delays.",
    questions: ["Do I qualify now?", "What if I have prior immigration violations?"],
  },
  {
    title: "Citizenship and naturalization",
    overview:
      "N-400 eligibility reviews, filing support, civics preparation, and interview coaching.",
    concerns: "Continuous residence, tax history, and travel impact.",
    questions: ["Can extended travel affect eligibility?", "What records should I bring?"],
  },
  {
    title: "Visa services",
    overview:
      "Comprehensive visa planning for students, visitors, workers, and family pathways.",
    concerns: "Consular processing, document quality, and denial risk mitigation.",
    questions: ["Which visa is most appropriate?", "How should I prepare for consular interviews?"],
  },
  {
    title: "Deportation defense",
    overview:
      "Removal defense strategy, hearing preparation, and relief application support.",
    concerns: "Urgency, detention timelines, and procedural complexity.",
    questions: ["What relief options exist in my case?", "How quickly should I act?"],
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
    title: "Practice Areas",
    description:
      "Explore immigration legal services including family petitions, work visas, green cards, citizenship, and deportation defense.",
    locale: activeLocale,
    path: "/practice-areas",
  });
}

export default async function PracticeAreasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">Practice Areas</h1>
        <p className="max-w-3xl text-sm text-slate-600">
          We provide strategic immigration representation tailored to personal, family, and business goals.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {practiceAreas.map((area) => (
          <section key={area.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">{area.title}</h2>
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">Overview:</span> {area.overview}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">Client concerns:</span> {area.concerns}
            </p>
            <div className="mt-3 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Common questions:</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {area.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="mt-5 inline-block rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white"
            >
              Book Consultation
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
