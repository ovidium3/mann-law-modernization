import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

      <section className="grid gap-6 md:grid-cols-2">
        <form className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Contact Form</h2>
          <input type="text" required placeholder="Full name" className="w-full rounded-md border border-slate-300 p-2 text-sm" />
          <input type="email" required placeholder="Email" className="w-full rounded-md border border-slate-300 p-2 text-sm" />
          <input type="tel" required placeholder="Phone" className="w-full rounded-md border border-slate-300 p-2 text-sm" />
          <textarea
            required
            placeholder="How can we help?"
            className="h-28 w-full rounded-md border border-slate-300 p-2 text-sm"
          />
          <button type="submit" className="rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white">
            Send Message
          </button>
        </form>

        <form className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Consultation Request</h2>
          <input type="text" required placeholder="Name" className="w-full rounded-md border border-slate-300 p-2 text-sm" />
          <input type="email" required placeholder="Email" className="w-full rounded-md border border-slate-300 p-2 text-sm" />
          <input type="tel" required placeholder="Phone" className="w-full rounded-md border border-slate-300 p-2 text-sm" />
          <select required className="w-full rounded-md border border-slate-300 p-2 text-sm">
            <option value="">Select practice area</option>
            <option>Family-based immigration</option>
            <option>Employment-based immigration</option>
            <option>Green cards</option>
            <option>Citizenship and naturalization</option>
            <option>Visa services</option>
            <option>Deportation defense</option>
          </select>
          <textarea
            required
            placeholder="Brief case summary"
            className="h-28 w-full rounded-md border border-slate-300 p-2 text-sm"
          />
          <button type="submit" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white">
            Request Consultation
          </button>
        </form>
      </section>

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
          <h2 className="text-lg font-semibold text-slate-900">Map Placeholder</h2>
          <div className="mt-2 flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
            Interactive map integration placeholder
          </div>
        </div>
      </section>
    </div>
  );
}
