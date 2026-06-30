import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "markdown-to-jsx";

import { blogSlugs, getBlogPost } from "@/content/blog";
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

// Tailwind classes for the Markdown body, so posts match the site without the
// typography plugin. markdown-to-jsx merges these onto the default elements.
const markdownOverrides = {
  h2: { props: { className: "mt-10 font-serif text-2xl font-bold text-slate-900" } },
  h3: { props: { className: "mt-6 font-serif text-xl font-bold text-slate-900" } },
  p: { props: { className: "mt-4 text-base leading-relaxed text-slate-700" } },
  ul: { props: { className: "mt-4 list-disc space-y-2 pl-6 text-base text-slate-700" } },
  ol: { props: { className: "mt-4 list-decimal space-y-2 pl-6 text-base text-slate-700" } },
  li: { props: { className: "leading-relaxed" } },
  strong: { props: { className: "font-semibold text-slate-900" } },
  a: { props: { className: "font-medium text-[#1a3a52] underline underline-offset-2 hover:text-[#13283c]" } },
};

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const activeLocale: Locale = isLocale(locale) ? locale : "en";
  const post = getBlogPost(slug);

  if (!post) {
    return makeMetadata({
      title: "Immigration Insights",
      description: "Immigration-law guides and updates from Mann Law Group.",
      locale: activeLocale,
      path: "/blog",
    });
  }

  return makeMetadata({
    title: post.title,
    description: post.description,
    locale: activeLocale,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const post = getBlogPost(slug);
  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: post.author, "@id": `${site.domain}/#organization` },
    publisher: { "@type": "Organization", name: site.name, "@id": `${site.domain}/#organization` },
    mainEntityOfPage: `${site.domain}/${locale}/blog/${post.slug}`,
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Immigration Insights", item: `${site.domain}/${locale}/blog` },
      { "@type": "ListItem", position: 2, name: post.title, item: `${site.domain}/${locale}/blog/${post.slug}` },
    ],
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-4">
        <Link href={`/${locale}/blog`} className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]">
          <span aria-hidden className="text-base leading-none">←</span>
          Immigration Insights
        </Link>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="font-semibold uppercase tracking-wide text-[#1a3a52]">{post.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="font-serif text-4xl font-bold leading-tight text-slate-900">{post.title}</h1>
        <p className="text-base text-slate-600">By {post.author}</p>
      </header>

      <div className="mt-8">
        <Markdown options={{ forceBlock: true, overrides: markdownOverrides }}>
          {post.body}
        </Markdown>
      </div>

      <p className="mt-12 rounded-sm border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
        This article is general information about immigration law and is not legal
        advice. Immigration cases turn on individual facts and the law changes
        often. For advice about your situation, please{" "}
        <Link href={`/${locale}/contact`} className="font-semibold text-[#1a3a52] hover:underline">
          contact our office
        </Link>
        .
      </p>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <Link href={`/${locale}/contact`} className={`${eyebrow} inline-flex items-center gap-1`}>
          Talk to an immigration attorney
          <span aria-hidden className="text-base leading-none">→</span>
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </article>
  );
}
