export type ExperienceItem = {
  role: string;
  organization: string;
  location: string;
  period: string;
  summary?: string;
  highlights: string[];
  subEntries?: {
    name: string;
    url?: string;
    description: string;
    highlights: string[];
  }[];
  optional?: boolean;
};

export type EducationItem = {
  credential: string;
  institution: string;
  period: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack JavaScript Developer",
    organization: "PerfectSoft",
    location: "Sfax, Tunisia",
    period: "Jun 2022 – Present",
    summary:
      "Small product team serving two client products. Ownership spans backend logic, integrations, front end, and automated testing.",
    highlights: [],
    subEntries: [
      {
        name: "Commit Action",
        url: "https://app.commitaction.com",
        description:
          "Business accountability coaching platform for entrepreneurs and executives.",
        highlights: [
          "Designed and implemented a calendar integration system connecting external calendar providers with backend scheduling logic.",
          "Built Stripe payment and Chargebee subscription workflows supporting billing and product monetization.",
          "Built and maintain a Cypress end-to-end test suite covering critical checkout and onboarding flows, reducing regressions before releases.",
          "Developed client-facing features including onboarding flows, interactive UI components, file uploads, and D3.js data visualizations.",
          "Improved application responsiveness and offline reliability through IndexedDB-based local data handling.",
          "Delivered a React Native Android MVP supporting internal product validation, from prototype through to working build.",
        ],
      },
      {
        name: "Bell Family Company",
        url: "https://bellfamilycompany.com",
        description: "Family services network, legacy platform modernization across two properties.",
        highlights: [
          "Contributing to an ongoing migration from a legacy PHP platform to a modern stack (MeteorJS/React application plus Next.js website), progressively modernizing UI and key workflows in production.",
          "Built the Stripe and Chargebee billing and subscription integration from scratch for the new platform.",
        ],
      },
    ],
  },
  {
    role: "Scientific Researcher",
    organization: "Metrology and Energy Systems Laboratory",
    location: "Monastir, Tunisia",
    period: "Sep 2014 – Dec 2021",
    highlights: [
      "Developed computer-vision and image-processing algorithms in C++ / OpenCV and C# / EmguCV, including heuristic pattern analysis across a 1,250-image dataset and 3D reconstruction work.",
      "Applied research programming in a laboratory environment, building the analytical and problem-solving foundation later carried into software development.",
    ],
  },
  {
    role: "University Teacher",
    organization: "National Engineering School of Monastir",
    location: "Monastir, Tunisia",
    period: "Sep 2016 – Jun 2020",
    highlights: ["Taught electronics, image processing, peripheral interfacing, and VHDL to engineering students. Mentored 300+ students."],
  },
  {
    role: "Volunteer Member",
    organization: 'Association "Quran and Sunna"',
    location: "Monastir, Tunisia",
    period: "Sep 2016 – Jun 2022",
    highlights: ["Provided IT support and graphic design for community initiatives, and taught Arabic."],
    optional: true,
  },
];

export const education: EducationItem[] = [
  {
    credential: "Full Stack JS Web Developer Bootcamp",
    institution: "CrocoCoder & CORP, remote",
    period: "Aug – Dec 2021",
  },
  {
    credential: "Master's in Electronics and Microelectronics",
    institution: "Faculty of Science, Monastir",
    period: "2011 – 2013",
  },
  {
    credential: "Bachelor's (Licence) in Physics–Electronics",
    institution: "Faculty of Science, Monastir",
    period: "2008 – 2011",
  },
];

export type PathItem = {
  period: string;
  title: string;
  description: string;
  /** current roles get the accent colour on the date */
  current?: boolean;
};

/** Home-page "Path" section, newest first; dates follow the Master Profile §3. */
export const path: PathItem[] = [
  {
    period: "Jun 2022 – Present",
    title: "Full-Stack JavaScript Developer · PerfectSoft, Sfax",
    description:
      "Small product team serving two client products. Ownership spans backend logic, integrations, front end, and automated testing.",
    current: true,
  },
  {
    period: "Aug 2025 – Present",
    title: "Creator and maintainer · Quran Association Manager",
    description:
      "Personal project, source available on GitHub. Architecture, packaging, and continuous release of a desktop system in daily use.",
    current: true,
  },
  {
    period: "Aug – Dec 2021",
    title: "Full Stack JS Web Developer Bootcamp · CrocoCoder & CORP, remote",
    description:
      "Deliberate move out of academia and into software development.",
  },
  {
    period: "Sep 2014 – Dec 2021",
    title: "Scientific Researcher · Metrology and Energy Systems Laboratory, Monastir",
    description:
      "Computer-vision and image-processing algorithms in C++ / OpenCV and C# / EmguCV. Heuristic pattern analysis across a 1,250-image dataset, and tooling for 3D reconstruction.",
  },
  {
    period: "Sep 2016 – Jun 2020",
    title: "University Teacher · National Engineering School of Monastir",
    description:
      "Taught electronics, image processing, peripheral interfacing, and VHDL to engineering students. Mentored 300+ students.",
  },
];
