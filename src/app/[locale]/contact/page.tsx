import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForms } from "@/components/contact/contact-forms";
import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale: Locale = isLocale(locale) ? locale : "en";

  return makeMetadata({
    title: "Contact",
    description:
      "Contact Mann Law Group, request a consultation, and submit your immigration case details.",
    locale: activeLocale,
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">Contact & Consultation Requests</h1>
        <p className="text-sm text-slate-600">
          Use the forms below to contact our office and request a consultation.
        </p>
      </header>

      <ContactForms />

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Office Information</h2>
          <p className="mt-2 text-sm text-slate-700">{site.address}</p>
          <p className="mt-1 text-sm text-slate-700">{site.phone}</p>
          <p className="mt-1 text-sm text-slate-700">{site.email}</p>
          <h3 className="mt-4 text-sm font-semibold text-slate-900">Business Hours</h3>
          <ul className="mt-1 space-y-1 text-sm text-slate-700">
            {site.hours.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Find Our Office</h2>
          <iframe
            title={`Map showing ${site.name} at ${site.address}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-2 h-48 w-full rounded-xl border border-slate-200"
          />
        </div>
      </section>
    </div>
  );
}
