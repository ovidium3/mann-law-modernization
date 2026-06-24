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

const differentiators = [
  {
    title: "Immigration-only focus",
    body: "We practice exclusively in immigration and nationality law — not a side specialty.",
  },
  {
    title: "Multilingual team",
    body: "Client support across multiple languages so nothing is lost in translation.",
  },
  {
    title: "Courtroom advocacy",
    body: "Hands-on experience representing clients before immigration courts when it matters most.",
  },
];

const steps = [
  {
    title: "Schedule",
    body: "Book a consultation and tell us about your situation.",
  },
  {
    title: "Strategy",
    body: "We review your case and map the strongest path forward.",
  },
  {
    title: "Filing",
    body: "We prepare and submit your documentation with care.",
  },
  {
    title: "Resolution",
    body: "We advocate for you through to a decision.",
  },
];

const testimonials = [
  "Professional, responsive, and deeply knowledgeable. We felt supported at every stage of our case.",
  "The consultation process was organized and transparent, and we always knew our next step.",
];

const faqs = [
  "How long does a green card process usually take?",
  "What documents should I prepare before a consultation?",
  "Can I apply for citizenship while traveling?",
];

// Swappable image placeholder sized to the final layout. Replace with a real
// <Image> (or <img>) once licensed photography is available — the surrounding
// layout is sized so no reflow occurs on swap.
function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={`flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 ${className}`}
    >
      <span className="px-3 text-center text-xs font-medium tracking-wide text-slate-400 uppercase">
        {label}
      </span>
    </div>
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
    <div className="mx-auto w-full max-w-6xl space-y-20 px-4 py-10 sm:px-6 lg:px-8">
      {/* 1. Hero */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
        <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-200 uppercase">
              Immigration · Nationality · Legacy
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Your American Dream, Defended.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-200 md:text-lg">
              We support families, professionals, and businesses with clear legal
              guidance, strategic filings, and responsive communication — from
              intake through resolution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Request Consultation
              </Link>
              <Link
                href={`/${locale}/practice-areas`}
                className="rounded-full border border-blue-200 px-6 py-3 text-sm font-semibold text-blue-100 transition hover:bg-white/10"
              >
                Explore Practice Areas
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <dt className="text-2xl font-semibold">45+</dt>
                <dd className="text-xs text-slate-300">Years of experience</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold">8</dt>
                <dd className="text-xs text-slate-300">Languages supported</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold">4.7★</dt>
                <dd className="text-xs text-slate-300">From 303 reviews</dd>
              </div>
            </dl>
          </div>
          <ImagePlaceholder
            label="Hero photo — attorney / Statue of Liberty"
            className="aspect-[4/5] w-full"
          />
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="space-y-8">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <ImagePlaceholder
            label="Team / office photo"
            className="order-last aspect-[4/3] w-full md:order-first"
          />
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
              Who We Are
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              45+ years serving immigrant communities
            </h2>
            <p className="mt-4 text-base text-slate-600">
              An immigration-focused practice built on clarity, strategy, and a
              client-first approach at every stage of your case.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {differentiators.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. What We Do */}
      <section className="space-y-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
            What We Do
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Practice areas
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-md"
            >
              <ImagePlaceholder
                label={service}
                className="aspect-[16/10] w-full rounded-none border-0 border-b border-slate-200"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">{service}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Structured case planning and documentation support tailored to
                  your goals.
                </p>
                <Link
                  href={`/${locale}/practice-areas`}
                  className="mt-4 inline-block text-sm font-semibold text-blue-700"
                >
                  Learn more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="space-y-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            A clear path, four steps
          </h2>
        </div>
        <ol className="grid gap-5 md:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. Testimonials */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
              Testimonials
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              What clients say
            </h2>
          </div>
          <p className="text-sm font-medium text-slate-600">
            4.7★ average · 303 Google reviews
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((quote) => (
            <blockquote
              key={quote}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700"
            >
              <p className="text-amber-500" aria-hidden>
                ★★★★★
              </p>
              <p className="mt-3">“{quote}”</p>
            </blockquote>
          ))}
        </div>
      </section>

      {/* 6. FAQ Preview */}
      <section className="space-y-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Common questions
          </h2>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <li
              key={faq}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700"
            >
              {faq}
            </li>
          ))}
        </ul>
        <Link
          href={`/${locale}/faq`}
          className="inline-block text-sm font-semibold text-blue-700"
        >
          View full FAQ →
        </Link>
      </section>

      {/* 7. Closing CTA */}
      <section className="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white md:px-12">
        <h2 className="text-3xl font-semibold">Ready to take the next step?</h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-slate-300">
          Complete a short intake form and receive next-step guidance from our
          team.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={`/${locale}/contact`}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Request Consultation
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Start Intake
          </Link>
        </div>
      </section>
    </div>
  );
}
