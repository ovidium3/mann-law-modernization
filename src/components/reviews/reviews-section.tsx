"use client";

import { useEffect, useState } from "react";

import { fallbackReviews } from "@/lib/reviews/fallback";
import type { ReviewsData } from "@/lib/reviews/types";
import { site } from "@/lib/site";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";
const card = "rounded-sm bg-white p-6 shadow-sm ring-1 ring-slate-100";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="text-amber-500" aria-label={`${rating} out of 5 stars`}>
      <span aria-hidden>{"★".repeat(Math.round(rating)).padEnd(5, "☆")}</span>
    </p>
  );
}

export function ReviewsSection() {
  // First paint (SSR) shows real fallback reviews; live data swaps in on mount.
  const [data, setData] = useState<ReviewsData>(fallbackReviews);

  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((response) => response.json())
      .then((live: ReviewsData) => {
        if (active && Array.isArray(live?.reviews) && live.reviews.length > 0) {
          setData(live);
        }
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className={eyebrow}>Testimonials</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">What clients say</h2>
        </div>
        <a
          href={site.googleReviews.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-[#1a3a52]"
        >
          <span className="text-amber-500">{data.rating}★</span> average · {data.count} Google reviews
          <span aria-hidden>→</span>
        </a>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.reviews.slice(0, 6).map((review, index) => (
          <blockquote key={`${review.author}-${index}`} className={`${card} text-sm text-slate-700`}>
            <Stars rating={review.rating} />
            <p className="mt-3 line-clamp-5">“{review.text}”</p>
            <footer className="mt-3 text-xs font-semibold text-slate-900">
              {review.author}
              {review.relativeTime ? (
                <span className="font-normal text-slate-500"> · {review.relativeTime}</span>
              ) : null}
            </footer>
          </blockquote>
        ))}
      </div>
      <a
        href={site.googleReviews.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]"
      >
        Read all {data.count} reviews on Google
        <span aria-hidden>→</span>
      </a>
    </section>
  );
}
