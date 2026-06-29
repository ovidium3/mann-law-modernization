// Single source of truth for attorney profiles. Each entry becomes its own
// statically-generated page at /[locale]/attorney/[slug] and a card on the
// /attorney directory. `sitemap.ts` derives its attorney URLs from `attorneySlugs`.
//
// Biographical facts (education, admissions, awards, languages, focus) are drawn
// from the firm's public profiles on mannlawgrp.com. Keep them factual — these are
// real attorneys; do not embellish credentials. `practiceSlugs` cross-links each
// attorney to the matching pages in src/content/practice-areas.ts.

export type Attorney = {
  slug: string;
  name: string;
  role: string;
  img: string;
  /** Short one-liner for cards and the profile header. */
  tagline: string;
  /** Bio paragraphs. */
  bio: string[];
  education: string[];
  admissions: string[];
  awards: string[];
  languages: string[];
  focus: string[];
  /** Practice-area slugs to cross-link to. */
  practiceSlugs: string[];
};

export const attorneys: Attorney[] = [
  {
    slug: "george-p-mann",
    name: "George P. Mann",
    role: "Founder & Managing Partner",
    img: "/images/attorneys/George-P.-Mann.png",
    tagline: "Founder of the firm and a refugee himself — five decades in immigration law.",
    bio: [
      "George immigrated to the United States as a refugee from communist Romania, where his family faced persecution. That experience has shaped a career devoted to helping thousands of immigrants, families, employers, and sponsors achieve lawful status.",
      "He focuses on the firm's most complex matters — federal court litigation and appeals — and has been a Michigan Super Lawyers honoree every year since 2006.",
    ],
    education: [
      "B.S., Wayne State University (1970)",
      "J.D., Detroit College of Law (1975)",
    ],
    admissions: [
      "State Bar of Michigan",
      "U.S. Supreme Court",
      "U.S. Court of Appeals for the Sixth Circuit",
      "U.S. District Courts for the Eastern and Western Districts of Michigan",
    ],
    awards: [
      "Michigan Super Lawyers, every year since 2006",
      "AILA Michigan Outstanding Litigator Award",
    ],
    languages: ["English", "Spanish", "Romanian", "Hungarian", "Italian", "French"],
    focus: ["Complex immigration matters", "Federal court litigation", "Appeals", "Family & employment immigration"],
    practiceSlugs: ["appeals-federal-court", "family-marriage-immigration", "employment-immigration"],
  },
  {
    slug: "oana-marina",
    name: "Oana C. Marina",
    role: "Partner",
    img: "/images/attorneys/Oana-C.-Marina.png",
    tagline: "A Romanian immigrant who brings civil-law experience to U.S. immigration practice.",
    bio: [
      "Oana's passion for immigration law comes from her own experience as a Romanian immigrant. A lawyer in Bucharest before coming to the United States — where she practiced as a civil-law notary public handling corporate, estate, and real-estate matters — she earned her J.D. cum laude from Case Western Reserve University School of Law and joined the firm in 2011.",
      "She represents clients at USCIS interviews, in Immigration Court, and in ICE proceedings, with a focus on humanitarian and waiver cases.",
    ],
    education: ["J.D. cum laude, Case Western Reserve University School of Law"],
    admissions: ["State Bar of Michigan"],
    awards: ["Michigan Super Lawyers Rising Star, three years running"],
    languages: ["English", "Romanian", "French"],
    focus: ["U visas & VAWA", "Religious worker cases", "Medical waivers", "I-601 & I-601A waivers", "Employment-based immigration"],
    practiceSlugs: ["waivers", "religious-worker-visas", "employment-immigration"],
  },
  {
    slug: "aleksandra-dragovic",
    name: "Aleksandra Dragovic",
    role: "Partner",
    img: "/images/attorneys/Aleksandra-Dragovic.png",
    tagline: "Two decades of high-volume removal-defense and family immigration litigation.",
    bio: [
      "Aleksandra immigrated to the United States as a child from the former Yugoslavia, by way of Canada — a path that drew her to immigration law. She has practiced for over two decades, focusing on removal defense and family-based matters, and has helped several hundred people obtain and preserve legal status.",
      "She brings more than twenty years of high-volume immigration litigation experience from the New York and New Jersey Immigration Courts.",
    ],
    education: ["J.D., Wayne State University Law School (2001)"],
    admissions: [
      "New York State Bar (2002)",
      "U.S. District Courts for the Southern and Eastern Districts of New York",
    ],
    awards: [],
    languages: ["English", "Serbo-Croatian", "Spanish (limited)", "French (limited)"],
    focus: ["Removal defense", "Family immigration", "Immigration court", "Appeals"],
    practiceSlugs: ["deportation-defense", "family-marriage-immigration", "appeals-federal-court"],
  },
  {
    slug: "moses-el-sayed",
    name: "Moses A. El-Sayed",
    role: "Partner",
    img: "/images/attorneys/Moses-A.-El-Sayed.png",
    tagline: "Removal defense and family immigration, with depth in criminal-immigration issues.",
    bio: [
      "Born to immigrant parents from Lebanon, Moses earned his undergraduate degree from the University of Michigan and his law degree from Michigan State University College of Law. He centers his practice on removal defense and family-based immigration, with particular expertise where criminal and immigration law intersect.",
      "He has been recognized as a Super Lawyers Rising Star every year since 2020 and serves the firm's Arabic-speaking clients.",
    ],
    education: [
      "B.A., University of Michigan",
      "J.D., Michigan State University College of Law",
    ],
    admissions: [
      "State Bar of Michigan",
      "U.S. District Court for the Eastern District of Michigan",
    ],
    awards: ["Super Lawyers Rising Star, every year since 2020"],
    languages: ["English", "Arabic"],
    focus: ["Removal defense & cancellation of removal", "Family-based immigration", "Special Immigrant Juvenile Status", "Asylum", "Criminal-immigration overlap"],
    practiceSlugs: ["deportation-defense", "family-marriage-immigration", "asylum"],
  },
  {
    slug: "nadine-kassem",
    name: "Nadine Kassem",
    role: "Partner",
    img: "/images/attorneys/Nadine-Kassem.png",
    tagline: "Family, employment, and naturalization matters before USCIS and Immigration Court.",
    bio: [
      "The daughter of immigrants from a small village in Lebanon, Nadine watched her parents persevere in building a life in the United States. She completed her undergraduate degree at Wayne State University and earned her J.D. cum laude from Michigan State University College of Law, where she represented vulnerable populations in immigration matters.",
      "Her practice spans family-based petitions, naturalization, and employment-based immigration before USCIS and the Immigration Court.",
    ],
    education: [
      "B.A., Wayne State University",
      "J.D. cum laude, Michigan State University College of Law",
    ],
    admissions: ["State Bar of Michigan"],
    awards: [],
    languages: ["English", "Arabic"],
    focus: ["Family immigration", "Employment immigration", "Waivers", "Naturalization"],
    practiceSlugs: ["family-marriage-immigration", "employment-immigration", "naturalization-citizenship", "waivers"],
  },
  {
    slug: "rachel-lehr",
    name: "Rachel Lehr",
    role: "Senior Associate",
    img: "/images/attorneys/Rachel-Lehr.png",
    tagline: "Family, employment, and removal-defense practice rooted in human-rights work.",
    bio: [
      "A Metro Detroit native, Rachel traces her interest in immigration law to her Polish heritage and a background in the social sciences. She has practiced immigration law exclusively, handling family-based, employment-based, and removal-defense matters.",
      "She trained with the Legal Aid Society of Cleveland and the Kramer Law Clinic's immigration and human-rights division, and is a member of the American Immigration Lawyers Association.",
    ],
    education: [
      "B.A. in Anthropology and Ethnic Studies, Albion College",
      "J.D., Case Western Reserve University School of Law",
    ],
    admissions: ["State Bar of Michigan", "State Bar of Ohio"],
    awards: [],
    languages: ["English"],
    focus: ["Family immigration", "Employment immigration", "Removal defense", "Human rights matters"],
    practiceSlugs: ["family-marriage-immigration", "employment-immigration", "deportation-defense"],
  },
  {
    slug: "rebecca-rook",
    name: "Rebecca Rook",
    role: "Senior Associate",
    img: "/images/attorneys/Rebecca-Rook.png",
    tagline: "Asylum and cancellation-of-removal advocate with a decade of high-volume practice.",
    bio: [
      "Rebecca discovered immigration law through volunteer work at a Tibetan refugee center. She brings ten years of high-volume immigration practice from New York, representing clients across multiple immigration venues, and pairs her legal work with a background in social work and international human rights.",
      "Her track record includes BIA remands, asylum wins, and grants of cancellation of removal.",
    ],
    education: [
      "B.A., Saint Louis University",
      "M.A., Trinity College Dublin",
      "J.D. with honors, Seattle University School of Law",
    ],
    admissions: ["State Bar of New York"],
    awards: [],
    languages: ["English"],
    focus: ["Asylum", "Cancellation of removal", "BIA remands", "USCIS applications"],
    practiceSlugs: ["asylum", "deportation-defense", "appeals-federal-court"],
  },
];

export const attorneySlugs = attorneys.map((attorney) => attorney.slug);

export function getAttorney(slug: string): Attorney | undefined {
  return attorneys.find((attorney) => attorney.slug === slug);
}
