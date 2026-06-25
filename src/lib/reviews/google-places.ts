import type { Review, ReviewsData } from "./types";

type GooglePlace = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    rating?: number;
    text?: { text?: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName?: string; uri?: string };
  }[];
};

// Fetch up to 5 reviews + aggregate rating from the Google Places API (New).
// Cached for 24h to keep cost negligible — the page never needs live-to-the-minute reviews.
export async function fetchGoogleReviews(apiKey: string, placeId: string): Promise<ReviewsData> {
  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,reviews`;
  const response = await fetch(url, {
    headers: { "X-Goog-Api-Key": apiKey },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`Places API responded ${response.status}`);
  }

  const data = (await response.json()) as GooglePlace;

  const reviews: Review[] = (data.reviews ?? [])
    .filter((review) => review.text?.text && review.authorAttribution?.displayName)
    .map((review) => ({
      author: review.authorAttribution!.displayName!,
      rating: review.rating ?? 5,
      text: review.text!.text!,
      relativeTime: review.relativePublishTimeDescription,
      profileUrl: review.authorAttribution?.uri,
    }));

  return {
    rating: data.rating ?? 0,
    count: data.userRatingCount ?? 0,
    reviews,
  };
}
