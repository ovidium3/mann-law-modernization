"use client";

import { useEffect, useRef, useState } from "react";

import { fallbackReviews } from "@/lib/reviews/fallback";
import type { ReviewsData } from "@/lib/reviews/types";
import { site } from "@/lib/site";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.2em] text-[#1a3a52]";

const AUTOPLAY_MS = 7000;

// Live Google reviews vary wildly in length; cap each quote at a word boundary
// so every slide is roughly the same size. Full text lives behind the
// "Read all reviews on Google" link.
const MAX_CHARS = 220;

function truncate(text: string) {
  if (text.length <= MAX_CHARS) return text;
  const slice = text.slice(0, MAX_CHARS);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : MAX_CHARS).trimEnd()}…`;
}

function Stars({ rating }: { rating: number }) {
  return (
    <p className="text-lg text-amber-500" aria-label={`${rating} out of 5 stars`}>
      <span aria-hidden>{"★".repeat(Math.round(rating)).padEnd(5, "☆")}</span>
    </p>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-[#1a3a52] hover:text-[#1a3a52]"
    >
      <span aria-hidden>{direction === "prev" ? "‹" : "›"}</span>
    </button>
  );
}

export function ReviewsSection() {
  // First paint (SSR) shows real fallback reviews; live data swaps in on mount.
  const [data, setData] = useState<ReviewsData>(fallbackReviews);
  const [index, setIndex] = useState(0);
  const reviews = data.reviews.slice(0, 6);
  const count = reviews.length;

  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((response) => response.json())
      .then((live: ReviewsData) => {
        if (active && Array.isArray(live?.reviews) && live.reviews.length > 0) {
          setData(live);
          setIndex(0);
        }
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => {
      active = false;
    };
  }, []);

  // Auto-rotate, unless the viewer prefers reduced motion or there's nothing to
  // rotate. `tick` re-arms the timer whenever the user advances manually.
  const [tick, setTick] = useState(0);
  const paused = useRef(false);
  useEffect(() => {
    if (count <= 1) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [count, tick]);

  const go = (next: number) => {
    setIndex(((next % count) + count) % count);
    setTick((t) => t + 1); // restart the autoplay countdown after manual nav
  };

  const review = reviews[index % count];

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

      <div
        className="flex items-center gap-4"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocusCapture={() => (paused.current = true)}
        onBlurCapture={() => (paused.current = false)}
      >
        {count > 1 ? <ArrowButton direction="prev" onClick={() => go(index - 1)} /> : null}
        <blockquote
          aria-live="polite"
          className="flex min-h-[12rem] flex-1 flex-col justify-center rounded-sm bg-white p-8 text-center shadow-sm ring-1 ring-slate-100 sm:px-12"
        >
          <Stars rating={review.rating} />
          <p className="mx-auto mt-4 max-w-2xl font-serif text-lg leading-relaxed text-slate-700">
            “{truncate(review.text)}”
          </p>
          <footer className="mt-5 text-sm font-semibold text-slate-900">
            {review.author}
            {review.relativeTime ? (
              <span className="font-normal text-slate-500"> · {review.relativeTime}</span>
            ) : null}
          </footer>
        </blockquote>
        {count > 1 ? <ArrowButton direction="next" onClick={() => go(index + 1)} /> : null}
      </div>

      {count > 1 ? (
        <div className="flex justify-center gap-2" role="tablist" aria-label="Choose a testimonial">
          {reviews.map((item, i) => (
            <button
              key={`${item.author}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1} of ${count}`}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-[#1a3a52]" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      ) : null}

      <div className="text-center">
        <a
          href={site.googleReviews.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a3a52]"
        >
          Read all {data.count} reviews on Google
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
