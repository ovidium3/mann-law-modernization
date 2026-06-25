import { site } from "@/lib/site";

import type { ReviewsData } from "./types";

// Shown only if the Google Places API is unconfigured or unavailable. These are
// real (verbatim, trimmed to one sentence) Google reviews so the section is
// never empty or fabricated.
export const fallbackReviews: ReviewsData = {
  rating: Number(site.googleReviews.rating),
  count: site.googleReviews.count,
  reviews: [
    {
      author: "Yareli Linares",
      rating: 5,
      text: "I had a great experience with this law firm for my K-1 visa process. Attorney Nadine was extremely knowledgeable and made everything clear and stress-free.",
    },
    {
      author: "maria sokor",
      rating: 5,
      text: "An excellent team of professional attorneys who dedicate themselves 100% to your case and see it through to a successful outcome.",
    },
    {
      author: "Amir Amin",
      rating: 5,
      text: "I cannot recommend Oana Marina and Rubina highly enough for their exceptional service and unwavering support throughout my immigration journey.",
    },
  ],
};
