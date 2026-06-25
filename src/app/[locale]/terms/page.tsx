import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";

const sections = [
  {
    heading: "No Attorney–Client Relationship",
    body: "Using this website or contacting Mann Law Group through it does not create an attorney–client relationship. An attorney–client relationship is formed only after we have agreed to represent you in a signed engagement agreement.",
  },
  {
    heading: "Not Legal Advice",
    body: "The information on this website is provided for general informational purposes only and does not constitute legal advice. You should not act or rely on any information here without seeking advice from a qualified attorney about your specific situation.",
  },
  {
    heading: "No Guarantee of Results",
    body: "Prior results do not guarantee a similar outcome. Every immigration matter is unique, and outcomes depend on the specific facts and the law that applies to them.",
  },
  {
    heading: "Confidentiality",
    body: "Please do not send confidential or time-sensitive information through this website until an attorney–client relationship has been established in writing.",
  },
  {
    heading: "Third-Party Links",
    body: "This website may link to third-party websites for your convenience. We are not responsible for the content, accuracy, or practices of any external sites.",
  },
  {
    heading: "Contact",
    body: `Questions about these terms can be directed to ${site.email} or ${site.phone}.`,
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
    title: "Terms & Disclaimer",
    description: "Terms of use and legal disclaimer for the Mann Law Group website.",
    locale: activeLocale,
    path: "/terms",
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <p className={eyebrow}>Legal</p>
        <h1 className="font-serif text-4xl font-bold text-slate-900">Terms &amp; Disclaimer</h1>
        <p className="text-sm text-slate-500">Last updated: June 2026</p>
      </header>

      <p className="rounded-sm border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Template wording — the firm should have legal counsel review and finalize
        this disclaimer before it is published.
      </p>

      <div className="space-y-6">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-xl font-bold text-slate-900">{section.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
