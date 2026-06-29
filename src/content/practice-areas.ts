// Single source of truth for practice-area content. Each entry becomes its own
// statically-generated page at /[locale]/practice-areas/[slug] and a card on the
// /practice-areas hub. `sitemap.ts` derives its practice URLs from `practiceAreaSlugs`.
//
// `img` is optional: the five areas added beyond the original six do not yet have
// photography, so their pages and cards render a branded fallback. Drop a matching
// file into /public/images/practice/ and set `img` to replace the fallback.

export type PracticeAreaStep = {
  title: string;
  body: string;
};

export type PracticeArea = {
  slug: string;
  title: string;
  img?: string;
  /** Short one-liner used on cards and under the page heading. */
  tagline: string;
  /** 1–2 sentence summary; also feeds the page's meta description. */
  overview: string;
  /** Body paragraphs for the detail page. */
  body: string[];
  /** "Who this is for" bullets. */
  whoItsFor: string[];
  /** How we work the case, shown as numbered steps. */
  process: PracticeAreaStep[];
  /** Common client questions. */
  questions: string[];
  /** Slugs of related areas to cross-link. */
  related: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "appeals-federal-court",
    title: "Appeals & Federal Court",
    tagline: "Challenging adverse decisions before the BIA and federal courts.",
    overview:
      "Appellate and federal-court representation when an immigration decision goes the wrong way — from BIA appeals to petitions for review in the Circuit Courts.",
    body: [
      "A denial is not always the end of the road. Many immigration decisions can be challenged before the Board of Immigration Appeals, reopened or reconsidered before the agency, or taken to a federal Circuit Court through a petition for review.",
      "Appellate work is a distinct discipline: it turns on the administrative record, legal briefing, and preserved arguments rather than new testimony. We assess whether error occurred, whether it is reviewable, and whether the deadlines still allow relief.",
    ],
    whoItsFor: [
      "Individuals whose case was denied by an immigration judge or USCIS",
      "Clients facing a final order of removal who may have grounds for review",
      "Cases where the agency misapplied the law or overlooked key evidence",
    ],
    process: [
      { title: "Record review", body: "We examine the decision, the record, and the issues preserved below." },
      { title: "Deadline triage", body: "Appeal and petition-for-review windows are short and unforgiving — we act fast." },
      { title: "Briefing", body: "We frame the legal error and brief it to the reviewing body." },
      { title: "Argument", body: "We advocate through decision, and advise on next steps if review continues." },
    ],
    questions: [
      "Can my denied case be appealed?",
      "What is the deadline to file an appeal or petition for review?",
      "What is the difference between a motion to reopen and an appeal?",
    ],
    related: ["deportation-defense", "asylum", "waivers"],
  },
  {
    slug: "asylum",
    title: "Asylum",
    img: "/images/practice/asylum.webp",
    tagline: "Protection for those fleeing persecution.",
    overview:
      "Affirmative and defensive asylum representation for individuals fleeing persecution, with careful attention to deadlines, country-condition evidence, and credibility.",
    body: [
      "Asylum protects people who cannot safely return to their home country because of persecution — or a well-founded fear of it — based on race, religion, nationality, political opinion, or membership in a particular social group.",
      "Strong asylum cases are built on detailed, consistent testimony supported by corroborating evidence and current country-condition documentation. We help you tell your story clearly and prepare for the questions that decide these cases.",
    ],
    whoItsFor: [
      "Individuals who fear return to their home country",
      "People who entered recently and are within the one-year filing window",
      "Those placed in removal proceedings seeking defensive asylum",
    ],
    process: [
      { title: "Eligibility", body: "We evaluate your basis for protection and the one-year deadline." },
      { title: "Evidence", body: "We assemble country-condition proof and corroborating documents." },
      { title: "Declaration", body: "We prepare a thorough, consistent personal statement." },
      { title: "Interview or hearing", body: "We prepare you for credibility questions and represent you throughout." },
    ],
    questions: [
      "Do I qualify for asylum?",
      "What is the one-year filing deadline?",
      "Can my family be included in my application?",
    ],
    related: ["deportation-defense", "waivers", "green-cards"],
  },
  {
    slug: "business-investor",
    title: "Business & Investor Immigration",
    tagline: "Visas for entrepreneurs, investors, and the companies that need them.",
    overview:
      "Immigration strategy for investors, entrepreneurs, and businesses — including treaty trader/investor (E-1/E-2), intracompany transfers (L-1), and investment-based green cards (EB-5).",
    body: [
      "Investor and business immigration rewards careful structuring. The right pathway depends on your nationality, the size and nature of your investment, your role in the enterprise, and your long-term goals.",
      "We advise on treaty investor and trader visas, intracompany transfers, and the EB-5 immigrant investor program, coordinating the immigration strategy with the underlying business so the filing tells a coherent story.",
    ],
    whoItsFor: [
      "Entrepreneurs investing in or starting a U.S. business",
      "Executives and managers transferring to a U.S. office",
      "Investors pursuing a green card through qualifying investment",
    ],
    process: [
      { title: "Pathway fit", body: "We match your nationality, capital, and role to the right visa category." },
      { title: "Structuring", body: "We align the business documentation with the immigration requirements." },
      { title: "Filing", body: "We prepare the petition with a clear business and source-of-funds narrative." },
      { title: "Maintenance", body: "We advise on renewals, status changes, and the path to permanent residence." },
    ],
    questions: [
      "Which investor visa fits my situation?",
      "How much investment is required?",
      "Can an investor visa lead to a green card?",
    ],
    related: ["employment-immigration", "green-cards", "student-visitor-visas"],
  },
  {
    slug: "deportation-defense",
    title: "Deportation Defense",
    img: "/images/practice/deportation-defense.webp",
    tagline: "Removal defense when the stakes are highest.",
    overview:
      "Strategic removal defense before the immigration courts — hearing preparation, relief applications, and bond and detention advocacy when time matters most.",
    body: [
      "Being placed in removal proceedings is frightening, but it is not the end of your options. Many people in proceedings are eligible for relief — cancellation of removal, asylum, adjustment of status, or waivers — that allows them to stay.",
      "Removal cases move on the court's timeline, and detention raises the stakes further. We identify every available form of relief, prepare you for the hearing, and advocate for bond where detention is involved.",
    ],
    whoItsFor: [
      "Individuals in removal proceedings before an immigration court",
      "People who have received a Notice to Appear",
      "Detained individuals seeking bond and a path to release",
    ],
    process: [
      { title: "Urgent assessment", body: "We review charges, custody status, and the relief you may qualify for." },
      { title: "Relief strategy", body: "We map cancellation, asylum, adjustment, or waiver options." },
      { title: "Preparation", body: "We assemble evidence and prepare you and your witnesses." },
      { title: "Hearing", body: "We represent you in court through to a decision, and on appeal if needed." },
    ],
    questions: [
      "What relief options exist in my case?",
      "How quickly should I act?",
      "Can I be released from detention on bond?",
    ],
    related: ["asylum", "waivers", "appeals-federal-court"],
  },
  {
    slug: "employment-immigration",
    title: "Employment Immigration",
    tagline: "Work visas and employment-based green cards.",
    overview:
      "Employment-based immigration for professionals and employers — H-1B and specialty occupation visas, PERM labor certification, and EB-1/EB-2/EB-3 green cards.",
    body: [
      "Employment immigration connects U.S. employers with the talent they need and gives workers a path to build a career and a future here. The category that fits depends on the role, the candidate's credentials, and the employer's needs.",
      "We guide both employers and employees through temporary work visas and the multi-step green-card process, including labor certification, keeping the timeline and documentation on track at each stage.",
    ],
    whoItsFor: [
      "Professionals seeking a work visa or employment-based green card",
      "Employers sponsoring foreign talent",
      "Workers with advanced degrees or extraordinary ability",
    ],
    process: [
      { title: "Category fit", body: "We identify the right visa or green-card preference for the role." },
      { title: "Labor certification", body: "Where required, we manage the PERM process end to end." },
      { title: "Petition", body: "We prepare the employer petition and supporting evidence." },
      { title: "Adjustment", body: "We carry the case through to adjustment of status or consular processing." },
    ],
    questions: [
      "Which work visa or green-card category fits me?",
      "Does my employer need to sponsor me?",
      "How long does the employment green-card process take?",
    ],
    related: ["business-investor", "green-cards", "student-visitor-visas"],
  },
  {
    slug: "family-marriage-immigration",
    title: "Family & Marriage Immigration",
    img: "/images/practice/family-immigration.jpg",
    tagline: "Keeping families together.",
    overview:
      "Family- and marriage-based petitions and adjustment planning for spouses, children, parents, and other qualifying relatives.",
    body: [
      "Family is at the heart of immigration. U.S. citizens and lawful permanent residents can petition for certain relatives, but timelines, eligibility, and evidence vary widely by relationship and category.",
      "We help families navigate petitions, adjustment of status, consular processing, and the marriage interview, preparing the documentation that proves a genuine relationship and a clear path to status.",
    ],
    whoItsFor: [
      "Spouses of U.S. citizens or permanent residents",
      "Parents and children of U.S. citizens",
      "Families planning a petition or adjustment of status",
    ],
    process: [
      { title: "Relationship review", body: "We confirm which petition category applies to your family." },
      { title: "Petition", body: "We file the family petition with proof of the qualifying relationship." },
      { title: "Adjustment or consular", body: "We choose the right path based on where you are and your history." },
      { title: "Interview", body: "We prepare you thoroughly for the USCIS or consular interview." },
    ],
    questions: [
      "Which petition applies to my relationship?",
      "How long does family-based processing take?",
      "What should we bring to the marriage interview?",
    ],
    related: ["green-cards", "naturalization-citizenship", "waivers"],
  },
  {
    slug: "green-cards",
    title: "Green Cards",
    img: "/images/practice/green-cards.jpg",
    tagline: "Your path to permanent residence.",
    overview:
      "Permanent-residence guidance across family, employment, and humanitarian pathways — adjustment of status, consular processing, and conditional-residence removal.",
    body: [
      "A green card grants lawful permanent residence — the right to live and work in the United States indefinitely and, in time, a path to citizenship. There are many routes to one, and choosing the right one matters.",
      "We assess your eligibility across family, employment, and humanitarian categories, then manage the filing — whether through adjustment of status inside the U.S. or consular processing abroad — including removing conditions on a two-year green card.",
    ],
    whoItsFor: [
      "Family members of U.S. citizens or permanent residents",
      "Workers with an employer or self-petition basis",
      "Conditional residents needing to remove conditions",
    ],
    process: [
      { title: "Eligibility", body: "We identify every category you may qualify under." },
      { title: "Filing path", body: "We choose adjustment of status or consular processing." },
      { title: "Documentation", body: "We assemble the evidence and prepare your application." },
      { title: "Interview", body: "We prepare you for the green-card interview and follow through to approval." },
    ],
    questions: [
      "How long does a green card usually take?",
      "Should I adjust status or consular process?",
      "How do I remove conditions on my green card?",
    ],
    related: ["family-marriage-immigration", "employment-immigration", "naturalization-citizenship"],
  },
  {
    slug: "naturalization-citizenship",
    title: "Naturalization & Citizenship",
    img: "/images/practice/naturalization.jpg",
    tagline: "The final step: becoming a U.S. citizen.",
    overview:
      "Naturalization guidance — eligibility review, the N-400 application, interview and civics-test preparation, and complex citizenship questions.",
    body: [
      "Naturalization is the final step in many immigration journeys. Most permanent residents become eligible after a set period, but the path can be complicated by travel history, tax issues, or prior records.",
      "We confirm your eligibility, prepare the N-400, and get you ready for the interview and civics test — and we untangle the harder questions, including derived and acquired citizenship through parents.",
    ],
    whoItsFor: [
      "Permanent residents eligible to naturalize",
      "Applicants with travel, tax, or record questions",
      "People who may already be citizens through a parent",
    ],
    process: [
      { title: "Eligibility", body: "We confirm your residence, presence, and good-moral-character timeline." },
      { title: "Application", body: "We prepare and file the N-400 with supporting evidence." },
      { title: "Test prep", body: "We help you prepare for the English and civics components." },
      { title: "Interview", body: "We prepare you for the interview and the oath." },
    ],
    questions: [
      "When am I eligible to apply for citizenship?",
      "Can I apply for citizenship while traveling?",
      "Am I already a citizen through my parents?",
    ],
    related: ["green-cards", "family-marriage-immigration", "waivers"],
  },
  {
    slug: "religious-worker-visas",
    title: "Religious Worker Visas",
    tagline: "Bringing ministers and religious workers to U.S. congregations.",
    overview:
      "Temporary (R-1) and permanent (EB-4 special immigrant) religious-worker visas for ministers and qualifying religious workers and the organizations that sponsor them.",
    body: [
      "Religious organizations can sponsor ministers and qualifying religious workers to serve their congregations in the United States, both temporarily and permanently.",
      "We help congregations and workers document the qualifying religious denomination, the offered position, and the worker's experience, and we prepare for the site visits and scrutiny these cases often draw.",
    ],
    whoItsFor: [
      "Ministers and clergy joining a U.S. congregation",
      "Qualifying religious workers in a vocation or occupation",
      "Religious organizations sponsoring foreign workers",
    ],
    process: [
      { title: "Qualification", body: "We confirm the organization, position, and worker meet the requirements." },
      { title: "R-1 or EB-4", body: "We choose the temporary or permanent path for your goals." },
      { title: "Documentation", body: "We prepare evidence of the denomination, compensation, and experience." },
      { title: "Site-visit readiness", body: "We prepare the organization for USCIS verification." },
    ],
    questions: [
      "Who qualifies as a religious worker?",
      "What is the difference between R-1 and EB-4?",
      "What does USCIS look for in a site visit?",
    ],
    related: ["employment-immigration", "green-cards", "student-visitor-visas"],
  },
  {
    slug: "student-visitor-visas",
    title: "Student & Visitor Visas",
    tagline: "Study, training, and travel in the United States.",
    overview:
      "Nonimmigrant visa guidance for students (F-1/M-1), exchange visitors (J-1), and temporary visitors (B-1/B-2), including status maintenance and changes of status.",
    body: [
      "Student and visitor visas open the door to study, training, and travel in the United States — but each comes with strict conditions on activities, work, and duration of stay.",
      "We advise students, exchange visitors, and temporary visitors on obtaining the right visa, maintaining status, working within program limits, and changing status when plans evolve.",
    ],
    whoItsFor: [
      "Students pursuing academic or vocational study (F-1/M-1)",
      "Exchange visitors and trainees (J-1)",
      "Temporary visitors for business or tourism (B-1/B-2)",
    ],
    process: [
      { title: "Visa fit", body: "We match your purpose and program to the right nonimmigrant category." },
      { title: "Application", body: "We help with the petition or consular application and interview prep." },
      { title: "Status rules", body: "We explain work limits, program dates, and how to stay in status." },
      { title: "Change of status", body: "We advise when goals shift toward work or permanent residence." },
    ],
    questions: [
      "Which student or visitor visa do I need?",
      "Can I work on a student or visitor visa?",
      "Can I change to another status while I'm here?",
    ],
    related: ["employment-immigration", "business-investor", "green-cards"],
  },
  {
    slug: "waivers",
    title: "Waivers",
    img: "/images/practice/waivers.jpg",
    tagline: "Overcoming barriers to status.",
    overview:
      "Inadmissibility and unlawful-presence waiver strategy to clear barriers to a visa or green card — including extreme-hardship documentation and filing sequence.",
    body: [
      "Certain grounds of inadmissibility — unlawful presence, prior misrepresentation, or some criminal issues — can block an otherwise approvable case. A waiver asks the government to forgive that ground.",
      "Most waivers turn on proving extreme hardship to a qualifying U.S. relative. We build that case with thorough documentation and sequence the filing correctly so you are not stranded abroad.",
    ],
    whoItsFor: [
      "Applicants facing a ground of inadmissibility",
      "People with unlawful presence who need a provisional waiver",
      "Cases where a prior misrepresentation blocks approval",
    ],
    process: [
      { title: "Ground analysis", body: "We pinpoint exactly which ground of inadmissibility applies." },
      { title: "Hardship case", body: "We document extreme hardship to your qualifying relative." },
      { title: "Sequencing", body: "We file in the right order to minimize time apart." },
      { title: "Decision", body: "We advocate for approval and advise on next steps." },
    ],
    questions: [
      "Which waiver applies to my situation?",
      "How do I prove extreme hardship?",
      "Will I have to leave the U.S. during the process?",
    ],
    related: ["green-cards", "deportation-defense", "family-marriage-immigration"],
  },
];

export const practiceAreaSlugs = practiceAreas.map((area) => area.slug);

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((area) => area.slug === slug);
}
