// Single source of truth for blog posts. Each entry becomes its own statically
// generated page at /[locale]/blog/[slug] and a card on the /blog index;
// `sitemap.ts` derives its blog URLs from `blogSlugs`.
//
// Posts are adapted from the firm's existing articles on mannlawgrp.com. The
// prose here is rewritten (not copied verbatim) to keep the substance while
// avoiding duplicate-content conflicts with the live site. `body` is Markdown,
// rendered by react-markdown on the post page.
//
// future: per-attorney bylines linked to attorney profiles; tags/categories
// index pages; RSS feed; related-posts. Out of scope for v1.

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** ISO date of last update, if any. */
  updated?: string;
  author: string;
  category: string;
  readingTime: string;
  /** Markdown body. */
  body: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "marriage-green-card-timeline-2026",
    title:
      "How Long Does a Marriage Green Card Take in 2026? A Timeline for Michigan Applicants",
    description:
      "A 2026 timeline for marriage-based green cards: adjustment of status vs. consular processing, work and travel permits while you wait, conditional residence, and what drives delays for Michigan applicants.",
    date: "2026-06-27",
    updated: "2026-06-28",
    author: "Mann Law Group",
    category: "Family Immigration",
    readingTime: "6 min read",
    body: `Marriage-based green cards can take anywhere from under a year to two years or more. The biggest factors are whether your spouse is a U.S. citizen or a green card holder, and whether you are already in the United States or applying from abroad.

## Two paths to a marriage green card

There are two routes, and which one applies to you sets the timeline:

- **Adjustment of status** — for a spouse who is already in the U.S. after a lawful entry. The whole process happens here, through USCIS.
- **Consular processing** — for a spouse living abroad, who completes the process at a U.S. embassy or consulate in their home country.

## Married to a U.S. citizen, already in the U.S.

This is usually the fastest path. Spouses of U.S. citizens are "immediate relatives," so there is no annual visa cap to wait behind. You file the family petition (Form I-130) and the green card application (Form I-485) together.

For Metro Detroit applicants, the case is handled by the **USCIS Detroit field office**, and timelines generally run **about 10 to 16 months** — though the specific field office's workload affects the pace.

### What you can do while you wait

Filed alongside your green card application, two benefits typically arrive a few months later:

- **Work permit (Form I-765)** — an Employment Authorization Document that lets you work legally while the case is pending.
- **Travel permission (Form I-131, advance parole)** — lets you travel internationally and return without abandoning your application.

## Spouse living abroad

When the U.S. citizen spouse files the I-130 and USCIS approves it, the case moves to the **National Visa Center**, then on to the appropriate consulate. Consular cases generally take **roughly 12 to 18 months or more**, and the single biggest variable is how quickly the embassy can schedule the interview.

## Married to a green card holder

If your spouse is a permanent resident rather than a citizen, your case falls in the **F2A preference category**, which depends on visa availability published each month in the State Department's Visa Bulletin. If your spouse naturalizes (becomes a U.S. citizen) while the case is pending, you can usually upgrade to the faster immediate-relative path.

## Conditional vs. ten-year green cards

If your marriage is less than two years old when the green card is approved, you receive a **conditional green card** valid for two years. To keep your status, you must file **Form I-751** to remove the conditions during the **90 days before** the card expires, backed by evidence of a genuine marriage.

## What causes delays

- Incomplete or inconsistent forms that trigger a Request for Evidence (RFE)
- Not enough documentation to prove a genuine marriage
- Missing tax or financial records for the Affidavit of Support (Form I-864)
- Field office or embassy scheduling backlogs
- Routine background checks

## How to keep your case moving

The strongest cases tend to do four things well:

- File accurate, complete forms the first time
- Include substantial proof of a real marriage — joint finances, a shared lease or mortgage, photos, insurance documents
- Provide a complete Affidavit of Support with the required income documentation
- Respond promptly to any request from USCIS or the consulate

## Key takeaways

- For a U.S. citizen's spouse already in the country, adjustment of status is the fastest route — about **10 to 16 months**.
- Work permits and travel permission are available while your case is pending.
- A conditional green card requires a separate removal-of-conditions filing.
- Strong documentation of a genuine marriage is the single best way to reduce delays.`,
  },
];

export const blogSlugs = blogPosts.map((post) => post.slug);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
