import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FaqSearch } from "@/components/faq/faq-search";
import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";
const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-[#1a3a52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#13283c]";

const faqItems = [
  {
    category: "Green Card",
    question: "How long does a family-based green card take?",
    answer:
      "Timing depends on category, priority date, and USCIS/consular processing conditions. We provide timeline planning during intake.",
  },
  {
    category: "Citizenship",
    question: "Can I apply for naturalization if I travel often?",
    answer:
      "Potentially, but travel duration and frequency can affect continuous residence and physical presence analysis.",
  },
  {
    category: "Employment",
    question: "What if my employer changes during visa processing?",
    answer:
      "Case strategy depends on category and stage of filing. Some pathways allow portability with additional filings.",
  },
  {
    category: "Consultation",
    question: "What should I bring to my first consultation?",
    answer:
      "Bring passport copies, current status documents, prior filing history, key notices, and any deadlines you have received.",
  },
  {
    category: "Deportation Defense",
    question: "What should I do if I receive a Notice to Appear?",
    answer:
      "Act quickly. Preserve all notices and meet with counsel to evaluate relief options and hearing strategy.",
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
    title: "FAQ",
    description:
      "Browse categorized immigration FAQs and common client questions about visas, green cards, citizenship, and consultation preparation.",
    locale: activeLocale,
    path: "/faq",
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <p className={eyebrow}>FAQ</p>
        <h1 className="font-serif text-4xl font-bold text-slate-900">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-slate-600">
          Search and browse frequently asked immigration questions by category.
        </p>
      </header>

      <FaqSearch items={faqItems} />

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-sm bg-slate-50 p-6">
        <div>
          <h2 className="font-serif text-lg font-bold text-slate-900">
            Still have questions?
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Get answers specific to your case in a consultation.
          </p>
        </div>
        <Link href={`/${locale}/contact`} className={btnPrimary}>
          Contact Us
          <span aria-hidden className="text-base leading-none">
            →
          </span>
        </Link>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
