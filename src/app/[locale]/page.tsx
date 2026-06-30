import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { ReviewsSection } from "@/components/reviews/reviews-section";
import { getPracticeArea, type PracticeArea } from "@/content/practice-areas";

// Featured practice areas for the homepage — a curated subset of the full set
// on /practice-areas. Content is single-sourced from the practice-areas module
// so titles, images, and links never drift; each card deep-links to its page.
const featuredAreas = [
  "asylum",
  "deportation-defense",
  "family-marriage-immigration",
  "green-cards",
  "naturalization-citizenship",
  "waivers",
]
  .map((slug) => getPracticeArea(slug))
  .filter((area): area is PracticeArea => Boolean(area));

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
  { title: "Schedule", body: "Book a consultation and tell us about your situation." },
  { title: "Strategy", body: "We review your case and map the strongest path forward." },
  { title: "Filing", body: "We prepare and submit your documentation with care." },
  { title: "Resolution", body: "We advocate for you through to a decision." },
];

const faqs = [
  "How long does a green card process usually take?",
  "What documents should I prepare before a consultation?",
  "Can I apply for citizenship while traveling?",
];

// Brand design tokens, modeled on the reference site: navy primary, gold accent,
// rounded-rectangle buttons, soft shadow cards (no heavy borders).
const NAVY = "#1a3a52";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";
const card = "rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-100";
const btnPrimaryOnDark =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#1a3a52] transition hover:bg-slate-100";
const btnOutlineOnDark =
  "inline-flex items-center justify-center gap-2 rounded-sm border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10";

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

  // schema.org LegalService — the firm's canonical business entity (NAP, hours,
  // rating, social profiles). Other pages reference this via worksFor/provider;
  // the stable @id lets search engines treat them as the same organization.
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${site.domain}/#organization`,
    name: site.name,
    url: `${site.domain}/${locale}`,
    telephone: site.phone,
    faxNumber: site.fax,
    email: site.email,
    image: `${site.domain}/images/team.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.addressParts.street,
      addressLocality: site.addressParts.city,
      addressRegion: site.addressParts.region,
      postalCode: site.addressParts.postalCode,
      addressCountry: site.addressParts.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: "United States",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.googleReviews.rating,
      reviewCount: site.googleReviews.count,
    },
    sameAs: [
      site.social.facebook,
      site.social.instagram,
      site.social.linkedin,
      site.social.youtube,
      site.googleReviews.url,
    ],
  };

  return (
    <>
      {/* 1. Hero — full-bleed background photo with navy overlay */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        {/* Legibility overlay. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${NAVY}f2 0%, ${NAVY}d9 45%, ${NAVY}73 100%)`,
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-white sm:px-6 md:py-28 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            Immigration · Nationality · Legacy
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-bold leading-tight md:text-5xl">
            Your American Dream, Defended.
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-200 md:text-lg">
            We support families, professionals, and businesses with clear legal
            guidance, strategic filings, and responsive communication — from
            intake through resolution.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}/contact`} className={btnPrimaryOnDark}>
              Request Consultation
              <Arrow />
            </Link>
            <Link href={`/${locale}/practice-areas`} className={btnOutlineOnDark}>
              Explore Practice Areas
            </Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-white/15 pt-6">
            <div>
              <dt className="text-2xl font-bold">45+</dt>
              <dd className="text-xs text-slate-300">Years of experience</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold">8</dt>
              <dd className="text-xs text-slate-300">Languages supported</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-amber-400">{site.googleReviews.rating}★</dt>
              <dd className="text-xs text-slate-300">From {site.googleReviews.count} reviews</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
      {/* 2. Who We Are */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <p className={eyebrow}>Who We Are</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
            45+ years serving immigrant communities
          </h2>
          <p className="mt-4 text-base text-slate-600">
            An immigration-focused practice built on clarity, strategy, and a
            client-first approach at every stage of your case.
          </p>
        </div>
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm">
          <Image
            src="/images/team.jpg"
            alt="The Mann Law Group attorneys"
            fill
            unoptimized
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {differentiators.map((item) => (
            <article key={item.title} className={card}>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. What We Do */}
      <section className="space-y-6">
        <div>
          <p className={eyebrow}>What We Do</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">Practice areas</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/${locale}/practice-areas/${area.slug}`}
              className="group flex flex-col overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1a3a52]">
                {area.img ? (
                  <Image
                    src={area.img}
                    alt={area.title}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-6 text-center">
                    <span className="font-serif text-xl font-bold text-white/90">
                      {area.title}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-slate-900">{area.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{area.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]">
                  Learn more
                  <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. How It Works — navy feature band with large muted numerals */}
      <section className="rounded-sm bg-[#1a3a52] p-8 text-white md:p-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            How It Works
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-white">
            A clear path, four steps
          </h2>
        </div>
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="md:border-l md:border-white/15 md:pl-5">
              <span className="text-4xl font-bold text-white/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. Testimonials — live Google reviews (client component, cached) */}
      <ReviewsSection />

      {/* 6. FAQ Preview — light-gray panel */}
      <section className="rounded-sm bg-slate-50 p-8 md:p-12">
        <div>
          <p className={eyebrow}>FAQ</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
            Common questions
          </h2>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <li key={faq} className={`${card} text-sm text-slate-700`}>
              {faq}
            </li>
          ))}
        </ul>
        <Link
          href={`/${locale}/faq`}
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]"
        >
          View full FAQ
          <Arrow />
        </Link>
      </section>

      {/* 7. Closing CTA */}
      <section
        className="rounded-sm px-8 py-14 text-center text-white md:px-12"
        style={{ backgroundColor: NAVY }}
      >
        <h2 className="font-serif text-3xl font-bold">Ready to take the next step?</h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-slate-300">
          Complete a short intake form and receive next-step guidance from our team.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/${locale}/contact`} className={btnPrimaryOnDark}>
            Request Consultation
            <Arrow />
          </Link>
          <Link href={`/${locale}/contact`} className={btnOutlineOnDark}>
            Start Intake
          </Link>
        </div>
      </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
    </>
  );
}
