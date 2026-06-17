import type { Locale } from "@/lib/i18n";

export const site = {
  name: "Mann Law Group",
  domain: "https://mannlawgrp.com",
  title: "Mann Law Group | Immigration Law Services",
  description:
    "Modern immigration law services for families, professionals, and employers. Schedule a consultation with Mann Law Group.",
  phone: "(248) 555-0142",
  email: "intake@mannlawgrp.com",
  address: "123 Main Street, Suite 400, Bloomfield Hills, MI 48302",
  hours: [
    "Monday–Friday: 8:30 AM – 6:00 PM",
    "Saturday: By Appointment",
    "Sunday: Closed",
  ],
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
