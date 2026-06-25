"use client";

import { useMemo, useState } from "react";

type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

type FaqSearchProps = {
  items: FaqItem[];
};

export function FaqSearch({ items }: FaqSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    const normalized = query.toLowerCase();

    return items.filter((item) => {
      return (
        item.category.toLowerCase().includes(normalized) ||
        item.question.toLowerCase().includes(normalized) ||
        item.answer.toLowerCase().includes(normalized)
      );
    });
  }, [items, query]);

  return (
    <section className="space-y-4">
      <label htmlFor="faq-search" className="block text-sm font-medium text-slate-700">
        Search questions
      </label>
      <input
        id="faq-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="w-full rounded-sm border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1a3a52] focus:outline-none focus:ring-1 focus:ring-[#1a3a52]"
        placeholder="Type visa, green card, interview, timeline..."
      />
      <div className="space-y-3">
        {filtered.map((item) => (
          <details
            key={item.question}
            className="group rounded-sm bg-white p-4 shadow-sm ring-1 ring-slate-100"
          >
            <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-900 marker:content-['']">
              <span className="rounded-sm bg-[#1a3a52]/10 px-2 py-1 text-xs font-medium text-[#1a3a52]">
                {item.category}
              </span>
              <span className="flex-1">{item.question}</span>
              <span
                aria-hidden
                className="text-slate-400 transition group-open:rotate-180"
              >
                ⌄
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
          </details>
        ))}
        {filtered.length === 0 ? (
          <p className="rounded-sm bg-slate-50 p-4 text-sm text-slate-500">
            No questions match your search. Try a different term, or{" "}
            <span className="font-medium text-slate-700">contact us</span> directly.
          </p>
        ) : null}
      </div>
    </section>
  );
}
