import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { blogPosts } from "@/content/blog";
import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale: Locale = isLocale(locale) ? locale : "en";

  return makeMetadata({
    title: "Immigration Insights",
    description:
      "Plain-language guides and immigration-law updates from Mann Law Group — timelines, process explainers, and news for families, professionals, and employers.",
    locale: activeLocale,
    path: "/blog",
  });
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  // Newest first.
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} — Immigration Insights`,
    url: `${site.domain}/${locale}/blog`,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      url: `${site.domain}/${locale}/blog/${post.slug}`,
    })),
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-4">
        <p className={eyebrow}>Immigration Insights</p>
        <h1 className="font-serif text-4xl font-bold text-slate-900">
          Guides &amp; updates
        </h1>
        <p className="text-base text-slate-600">
          Plain-language explainers and immigration-law news — written to help you
          understand the process, not just the paperwork.
        </p>
      </header>

      <section className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group block rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wide text-[#1a3a52]">
                {post.category}
              </span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-3 font-serif text-2xl font-bold text-slate-900 group-hover:text-[#1a3a52]">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {post.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]">
              Read article
              <span aria-hidden className="text-base leading-none">→</span>
            </span>
          </Link>
        ))}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
    </div>
  );
}
