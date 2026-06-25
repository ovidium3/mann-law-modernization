import type { Locale } from "@/lib/i18n";

export const site = {
  name: "Mann Law Group",
  domain: "https://mannlawgrp.com",
  title: "Mann Law Group | Immigration Law Services",
  description:
    "Modern immigration law services for families, professionals, and employers. Schedule a consultation with Mann Law Group.",
  phone: "(248) 932-0990",
  fax: "(248) 932-4971",
  email: "info@mannlawgrp.com",
  address: "33505 W. 14 Mile Rd., Suite 20, Farmington Hills, MI 48331",
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
    { label: "FAQ", href: `/${locale}/faq` },
    { label: "Contact", href: `/${locale}/contact` },
  ];
}
