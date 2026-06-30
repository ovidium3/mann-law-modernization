import type { Locale } from "@/lib/i18n";

// Structured address parts are the source of truth: the display string below is
// derived from them, and schema.org PostalAddress (homepage JSON-LD) reads them
// directly — so the firm's address never drifts between the two representations.
const addressParts = {
  street: "33505 W. 14 Mile Rd., Suite 20",
  city: "Farmington Hills",
  region: "MI",
  postalCode: "48331",
  country: "US",
} as const;

export const site = {
  name: "Mann Law Group",
  domain: "https://mannlawgrp.com",
  title: "Mann Law Group | Immigration Law Services",
  description:
    "Modern immigration law services for families, professionals, and employers. Schedule a consultation with Mann Law Group.",
  phone: "(248) 932-0990",
  fax: "(248) 932-4971",
  email: "info@mannlawgrp.com",
  addressParts,
  address: `${addressParts.street}, ${addressParts.city}, ${addressParts.region} ${addressParts.postalCode}`,
  // Office coordinates (rooftop geocode of the street address). Feeds the
  // schema.org GeoCoordinates in the homepage LegalService JSON-LD, which
  // strengthens the local/map signal for the firm's location.
  geo: { latitude: 42.527670, longitude: -83.380581 },
  hours: [
    "Monday–Friday: 9:00 AM – 5:00 PM",
    "Saturday–Sunday: Closed",
  ],
  social: {
    facebook: "https://www.facebook.com/immigrationlawyers/",
    instagram: "https://www.instagram.com/mannlawgrp/",
    linkedin: "https://www.linkedin.com/company/george-p.-mann-&-associates-pc/",
    youtube: "https://www.youtube.com/channel/UComc16KSrNsPk2Z5d3Kh70Q",
  },
  // Google Business Profile (George P. Mann & Associates). `url` opens the
  // listing + reviews. rating/count are shown statically — update by hand
  // (or switch to the Google Places API later to auto-update).
  googleReviews: {
    url: "https://www.google.com/maps?cid=5903689903870040568",
    placeId: "ChIJ3ThJb4i6JIgR-Nk7QLAe7lE",
    rating: "4.7",
    count: 304,
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export function getNavigation(locale: Locale): NavItem[] {
  return [
    { label: "Home", href: `/${locale}` },
    { label: "Practice Areas", href: `/${locale}/practice-areas` },
    { label: "Attorney", href: `/${locale}/attorney` },
    { label: "About", href: `/${locale}/about` },
    { label: "Clients", href: `/${locale}/clients` },
    { label: "Blog", href: `/${locale}/blog` },
    { label: "FAQ", href: `/${locale}/faq` },
    { label: "Contact", href: `/${locale}/contact` },
  ];
}
