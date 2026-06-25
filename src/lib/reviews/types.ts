export interface Review {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
  profileUrl?: string;
}

export interface ReviewsData {
  rating: number;
  count: number;
  reviews: Review[];
}
