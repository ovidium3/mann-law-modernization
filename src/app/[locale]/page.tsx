import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";

const services = [
  "Family-based immigration",
  "Employment-based immigration",
  "Green cards",
  "Citizenship and naturalization",
  "Visa services",
  "Deportation defense",
];

const faqs = [
  "How long does a green card process usually take?",
  "What documents should I prepare before a consultation?",
  "Can I apply for citizenship while traveling?",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale: Locale = isLocale(locale) ? locale : "en";

  return makeMetadata({
    title: "Home",
    description:
      "Strategic immigration representation focused on outcomes, clarity, and responsive client communication.",
    locale: activeLocale,
  });
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-8 text-white md:p-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-200">
          Boutique Immigration Counsel
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Build your future in the U.S. with experienced immigration representation.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-200 md:text-lg">
          We support families, professionals, and businesses with clear legal guidance, strategic filings, and responsive communication from intake through resolution.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/contact`}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
          >
            Request Consultation
          </Link>
          <Link
            href={`/${locale}/practice-areas`}
            className="rounded-full border border-blue-200 px-6 py-3 text-sm font-semibold text-blue-100"
          >
            Explore Services
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Immigration Services</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">{service}</h3>
              <p className="mt-2 text-sm text-slate-600">
                Structured case planning and documentation support tailored to your goals.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-2xl bg-white p-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Attorney Credibility</h2>
          <p className="mt-3 text-sm text-slate-600">
            Led by an experienced immigration attorney with multilingual support and a client-first approach focused on clarity and case strategy.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>15+ years of immigration law practice</li>
            <li>Family and employment case concentration</li>
            <li>Fluent support in English, Spanish, Ukrainian, and Romanian</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Client Testimonials</h3>
          <blockquote className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            “Professional, responsive, and deeply knowledgeable. We felt supported at every stage of our case.”
          </blockquote>
          <blockquote className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            “The consultation process was organized and transparent, and we always knew our next step.”
          </blockquote>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">FAQ Preview</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {faqs.map((faq) => (
              <li key={faq} className="rounded-lg bg-slate-50 p-3">
                {faq}
              </li>
            ))}
          </ul>
          <Link
            href={`/${locale}/faq`}
            className="mt-5 inline-block text-sm font-semibold text-blue-700"
          >
            View Full FAQ →
          </Link>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">Consultation Booking</h2>
          <p className="mt-3 text-sm text-slate-600">
            Complete a short intake form and receive a response from our team with next-step guidance.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-5 inline-block rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white"
          >
            Start Intake
          </Link>
        </article>
      </section>
    </div>
  );
}
