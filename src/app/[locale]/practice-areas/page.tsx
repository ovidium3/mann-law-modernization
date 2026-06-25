import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";

// Aligned to the homepage cards, the reference site, and the supplied photos.
// `slug` powers the anchor links from the homepage cards (/practice-areas#slug).
const practiceAreas = [
  {
    title: "Asylum",
    slug: "asylum",
    img: "/images/practice/asylum.webp",
    overview:
      "Protection-based applications for individuals fleeing persecution, with affirmative and defensive filing strategy.",
    concerns: "One-year filing deadlines, country-condition evidence, and credibility preparation.",
    questions: ["Do I qualify for asylum?", "What is the one-year filing deadline?"],
  },
  {
    title: "Deportation Defense",
    slug: "deportation-defense",
    img: "/images/practice/deportation-defense.webp",
    overview:
      "Removal defense strategy, hearing preparation, and relief application support.",
    concerns: "Urgency, detention timelines, and procedural complexity.",
    questions: ["What relief options exist in my case?", "How quickly should I act?"],
  },
  {
    title: "Family Immigration",
    slug: "family-marriage-immigration",
    img: "/images/practice/family-immigration.jpg",
    overview:
      "Petitions and adjustment planning for spouses, children, parents, and extended family pathways.",
    concerns: "Timeline uncertainty, evidence requirements, and interview readiness.",
    questions: ["Which petition applies to my relationship?", "How long does processing take?"],
  },
  {
    title: "Green Cards",
    slug: "green-cards",
    img: "/images/practice/green-cards.jpg",
    overview:
      "Case evaluation, filing strategy, and interview preparation for permanent residency.",
    concerns: "Evidence sufficiency, waiver strategy, and processing delays.",
    questions: ["Do I qualify now?", "What if I have prior immigration violations?"],
  },
  {
    title: "Naturalization & Citizenship",
    slug: "naturalization-citizenship",
    img: "/images/practice/naturalization.jpg",
    overview:
      "N-400 eligibility reviews, filing support, civics preparation, and interview coaching.",
    concerns: "Continuous residence, tax history, and travel impact.",
    questions: ["Can extended travel affect eligibility?", "What records should I bring?"],
  },
  {
    title: "Waivers",
    slug: "waivers",
    img: "/images/practice/waivers.jpg",
    overview:
      "Inadmissibility and unlawful-presence waiver strategy to clear barriers to status.",
    concerns: "Demonstrating extreme hardship, documentation depth, and filing sequence.",
    questions: ["Which waiver applies to my situation?", "How do I prove extreme hardship?"],
  },
];

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";
const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-[#1a3a52] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#13283c]";

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
    title: "Practice Areas",
    description:
      "Immigration legal services including asylum, deportation defense, family immigration, green cards, naturalization, and waivers.",
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
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-3">
        <p className={eyebrow}>What We Do</p>
        <h1 className="font-serif text-4xl font-bold text-slate-900">Practice Areas</h1>
        <p className="text-base text-slate-600">
          Strategic immigration representation tailored to personal, family, and
          business goals — from first consultation through resolution.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {practiceAreas.map((area) => (
          <section
            key={area.title}
            id={area.slug}
            className="scroll-mt-28 overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-100"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={area.img}
                alt={area.title}
                fill
                unoptimized
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="font-serif text-xl font-bold text-slate-900">
                {area.title}
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Overview:</span>{" "}
                {area.overview}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Client concerns:</span>{" "}
                {area.concerns}
              </p>
              <div className="mt-3 text-sm text-slate-600">
                <p className="font-semibold text-slate-800">Common questions:</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {area.questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </div>
              <Link href={`/${locale}/contact`} className={`mt-5 ${btnPrimary}`}>
                Book Consultation
                <Arrow />
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
