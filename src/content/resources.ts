// Official government resources useful to immigration clients. Single-sourced
// here so the footer and the /clients resource hub never drift. All links are
// public, first-party government URLs (USCIS, EOIR, U.S. Dept. of State).

export type ResourceLink = {
  label: string;
  href: string;
  /** Shown on the /clients hub; the footer renders label-only. */
  description: string;
};

export const governmentResources: ResourceLink[] = [
  {
    label: "USCIS Case Status",
    href: "https://egov.uscis.gov/casestatus/landing.do",
    description: "Track a pending USCIS case using your 13-character receipt number.",
  },
  {
    label: "USCIS Processing Times",
    href: "https://egov.uscis.gov/processing-times/",
    description: "Estimated processing times by form type and field office.",
  },
  {
    label: "USCIS Office Locator",
    href: "https://www.uscis.gov/about-us/find-a-uscis-office/field-offices",
    description: "Find the USCIS field office that serves your area.",
  },
  {
    label: "EOIR Automated Case Information",
    href: "https://acis.eoir.justice.gov/en/",
    description: "Check immigration court case information from the EOIR system.",
  },
  {
    label: "DOS Visa Bulletin",
    href: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html",
    description: "Monthly priority-date cut-offs for family- and employment-based immigrant visas.",
  },
  {
    label: "National Visa Center",
    href: "https://travel.state.gov/content/travel/en/us-visas/immigrate/national-visa-center.html",
    description: "NVC processing for immigrant visa applicants moving toward a consular interview.",
  },
  {
    label: "Visa Wait Times",
    href: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html",
    description: "Consular appointment and interview wait times by location.",
  },
];
