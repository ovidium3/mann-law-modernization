import { getCloudflareContext } from "@opennextjs/cloudflare";

import { fallbackReviews } from "@/lib/reviews/fallback";
import { fetchGoogleReviews } from "@/lib/reviews/google-places";
import { site } from "@/lib/site";

export async function GET() {
  try {
    const { env } = getCloudflareContext();
    const apiKey = env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      return Response.json({ ...fallbackReviews, source: "fallback" });
    }

    const data = await fetchGoogleReviews(apiKey, site.googleReviews.placeId);
    if (data.reviews.length === 0) {
      return Response.json({ ...fallbackReviews, source: "fallback" });
    }

    return Response.json({ ...data, source: "google" });
  } catch (error) {
    console.error("[/api/reviews] error:", error);
    return Response.json({ ...fallbackReviews, source: "fallback" });
  }
}
