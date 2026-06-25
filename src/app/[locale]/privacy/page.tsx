import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";

const sections = [
  {
    heading: "Information We Collect",
    body: "When you submit our contact or consultation forms, we collect the information you provide — such as your name, email address, phone number, and any details about your matter. We may also collect limited technical data (such as IP address and browser type) through standard web analytics.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use your information to respond to your inquiry, evaluate and provide legal services, communicate with you about your matter, and improve our website. We do not sell your personal information.",
  },
  {
    heading: "Cookies & Analytics",
    body: "Our website may use cookies and third-party analytics tools to understand how visitors use the site. You can control cookies through your browser settings.",
  },
  {
    heading: "How We Share Information",
    body: "We share information only as needed to provide our services (for example, with service providers who support our operations) or where required by law. We do not sell your data to third parties.",
  },
  {
    heading: "Data Security",
    body: "We take reasonable measures to protect the information you provide. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    heading: "Your Choices",
    body: "You may request access to, correction of, or deletion of your personal information by contacting us using the details below.",
  },
  {
    heading: "Contact Us",
    body: `If you have questions about this Privacy Policy, contact us at ${site.email} or ${site.phone}.`,
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
    title: "Privacy Policy",
    description: "How Mann Law Group collects, uses, and protects your personal information.",
    locale: activeLocale,
    path: "/privacy",
  });
}

export default async function PrivacyPage({
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
        <h1 className="font-serif text-4xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: June 2026</p>
      </header>

      <p className="rounded-sm border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Template wording — the firm should have legal counsel review and finalize
        this policy before it is published.
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
