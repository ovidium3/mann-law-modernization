import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { practiceAreas } from "@/content/practice-areas";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";

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
      "Immigration legal services including asylum, deportation defense, family and employment immigration, green cards, naturalization, investor visas, and waivers.",
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
          business goals — from first consultation through resolution. Explore each
          area for an overview, how we work the case, and common questions.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {practiceAreas.map((area) => (
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
              <h2 className="text-lg font-semibold text-slate-900">{area.title}</h2>
              <p className="mt-2 flex-1 text-sm text-slate-600">{area.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]">
                Learn more
                <Arrow />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
