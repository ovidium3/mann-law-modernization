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
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
        placeholder="Type visa, green card, interview, timeline..."
      />
      <div className="space-y-3">
        {filtered.map((item) => (
          <details key={item.question} className="rounded-lg border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">
              <span className="mr-2 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                {item.category}
              </span>
              {item.question}
            </summary>
            <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
