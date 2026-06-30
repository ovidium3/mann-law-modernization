import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { governmentResources } from "@/content/resources";
import { isLocale, type Locale } from "@/lib/i18n";
import { makeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";
const card = "rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-100";

// What to do when a government notice arrives, adapted from mannlawgrp.com/clients.
const noticeSteps = [
  "Keep the complete notice — every page, including the envelope and any inserts.",
  "Photograph or scan all pages clearly before doing anything else.",
  "Do not upload documents to unfamiliar or unsecured websites.",
  "Contact us right away so we can review deadlines and respond on time.",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale: Locale = isLocale(locale) ? locale : "en";

  return makeMetadata({
    title: "Client Resources",
    description:
      "Resources for Mann Law Group clients — case portal access, invoice payment, official USCIS and immigration-court status tools, and what to do when a government notice arrives.",
    locale: activeLocale,
    path: "/clients",
  });
}

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const telHref = `tel:+1${site.phone.replace(/\D/g, "")}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.domain}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Client Resources", item: `${site.domain}/${locale}/clients` },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-4">
        <p className={eyebrow}>For Clients</p>
        <h1 className="font-serif text-4xl font-bold text-slate-900">
          Client Resources
        </h1>
        <p className="text-base text-slate-600">
          Access your case, pay an invoice, check official government status
          tools, and find out what to do if a notice arrives in the mail — all in
          one place.
        </p>
      </header>

      {/* Portal + invoice. These route through the firm's third-party systems
          (Docketwise / QuickBooks); replace the contact fallbacks below with the
          firm's real portal sign-in and invoice URLs when available. */}
      <section className="grid gap-5 md:grid-cols-2">
        <div className={card}>
          <p className={eyebrow}>Case Portal</p>
          <h2 className="mt-2 font-serif text-xl font-bold text-slate-900">
            Sign in to your secure portal
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Active clients access documents and case updates through our secure
            portal. Use the sign-in link from your invitation email. If you need
            it resent, call us at{" "}
            <a href={telHref} className="font-semibold text-[#1a3a52] hover:underline">
              {site.phone}
            </a>
            .
          </p>
        </div>
        <div className={card}>
          <p className={eyebrow}>Billing</p>
          <h2 className="mt-2 font-serif text-xl font-bold text-slate-900">
            Pay an invoice
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Invoices are sent by our billing team with a secure payment link. For
            your security, we never collect payments directly through this
            website. Need an invoice resent? Call{" "}
            <a href={telHref} className="font-semibold text-[#1a3a52] hover:underline">
              {site.phone}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="max-w-2xl">
          <p className={eyebrow}>Official Status Tools</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
            Check your case with the government directly
          </h2>
          <p className="mt-3 text-base text-slate-600">
            These are official U.S. government resources. They open in a new tab —
            we link to them for convenience and don&rsquo;t control their content.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {governmentResources.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${card} group transition hover:shadow-md`}
            >
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#1a3a52]">
                {resource.label}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-sm bg-slate-50 p-8 md:p-12">
        <p className={eyebrow}>If You Receive a Government Notice</p>
        <h2 className="mt-3 font-serif text-2xl font-bold text-slate-900">
          Notices from USCIS, EOIR, ICE, the NVC, or a consulate are time-sensitive.
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          Deadlines on these notices are often short and unforgiving. If one
          arrives, take these steps and reach out to us as soon as you can:
        </p>
        <ol className="mt-6 space-y-3">
          {noticeSteps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm text-slate-700">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#1a3a52] text-xs font-bold text-white">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#1a3a52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#13283c]"
        >
          Contact us about a notice
          <span aria-hidden className="text-base leading-none">→</span>
        </Link>
      </section>

      <section className="grid gap-6 rounded-sm bg-[#1a3a52] p-8 text-white md:grid-cols-2 md:p-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            Our Office
          </p>
          <p className="mt-3 text-sm text-slate-200">{site.address}</p>
          <ul className="mt-3 space-y-1 text-xs text-slate-300">
            {site.hours.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="md:text-right">
          <p className="text-sm">
            <a href={telHref} className="font-semibold text-white hover:underline">
              {site.phone}
            </a>
          </p>
          <p className="mt-1 text-xs text-slate-300">Fax: {site.fax}</p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${site.email}`} className="text-slate-200 hover:text-white">
              {site.email}
            </a>
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
