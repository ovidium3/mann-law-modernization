import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

// The firm's canonical schema.org LegalService node, single-sourced from site.ts.
// Every page that references the organization (homepage, /about) emits this same
// complete entity under the shared @id (#organization) — Google validates
// structured data per-page and does not dereference @id across URLs, so a
// complete node must appear wherever the org is referenced. Returned without
// @context so it can be embedded as a nested node; add @context at the graph root.
export function legalServiceNode(locale: Locale) {
  return {
    "@type": "LegalService",
    "@id": `${site.domain}/#organization`,
    name: site.name,
    url: `${site.domain}/${locale}`,
    telephone: site.phone,
    faxNumber: site.fax,
    email: site.email,
    image: `${site.domain}/images/team.jpg`,
    foundingDate: "1980",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.addressParts.street,
      addressLocality: site.addressParts.city,
      addressRegion: site.addressParts.region,
      postalCode: site.addressParts.postalCode,
      addressCountry: site.addressParts.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: "United States",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.googleReviews.rating,
      reviewCount: site.googleReviews.count,
    },
    sameAs: [
      site.social.facebook,
      site.social.instagram,
      site.social.linkedin,
      site.social.youtube,
      site.googleReviews.url,
    ],
  };
}
