import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FaqSearch } from "@/components/faq/faq-search";
import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";

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
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">Frequently Asked Questions</h1>
        <p className="text-sm text-slate-600">
          Search and browse frequently asked immigration questions by category.
        </p>
      </header>

      <FaqSearch items={faqItems} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
