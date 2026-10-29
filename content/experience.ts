import { projects } from "./project";

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
      "Small product team serving two client products. Ownership spans backend logic, integrations, front end, and automated testing. Fully remote for the first two years, onsite in Sfax since.",
    highlights: [],
    subEntries: [
      {
        name: "Commit Action",
        url: "https://app.commitaction.com",
        description:
          "Business accountability coaching platform for entrepreneurs and executives. The company reports that its team has helped over 10,000 of them.",
        highlights: [
          "Designed and implemented a calendar integration system connecting Google Calendar, Outlook, and iCloud with backend scheduling logic.",
          "Built Stripe payment and Chargebee subscription workflows supporting billing and product monetization.",
          "Built and maintain a Cypress end-to-end test suite covering critical checkout and onboarding flows, reducing regressions before releases.",
          "Developed client-facing features including onboarding flows (including an interactive onboarding tour), interactive UI components, file uploads with DropzoneJS, and D3.js data visualizations such as a client performance spider chart.",
          "Improved application responsiveness and offline reliability through IndexedDB-based local data handling.",
          "Building a React Native Android MVP (in progress) for internal product validation.",
          "Contributed to debugging, code review, technical discussions, and ongoing improvement of development practices.",
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
      "Developed computer-vision and image-processing algorithms in C++ / OpenCV and C# / EmguCV for image-based metrology: spatio-temporal monitoring of Kelvin–Helmholtz instabilities in a free round jet.",
      "Performed heuristic pattern analysis across a 1,250-image dataset.",
      "Developed an algorithm reconstructing the 3D axis of a free round jet from 2D image slices, and contributed to a geometric model of the jet.",
    ],
  },
  {
    role: "University Teacher",
    organization: "National Engineering School of Monastir",
    location: "Monastir, Tunisia",
    period: "Sep 2016 – Jun 2020",
    highlights: ["Taught electronics, image processing, peripheral interfacing, and VHDL to 300+ engineering students."],
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
    credential: "McKinsey.org Forward Program",
    institution: "McKinsey.org, online",
    period: "Jun 2026",
  },
  {
    credential: "Full Stack JS Web Developer Bootcamp",
    institution: "CrocoCoder & CORP, remote",
    period: "Aug – Dec 2021",
  },
  {
    credential: "Master's in Micro and Nanoelectronics",
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
    period: projects[0].period,
    title: "Creator and maintainer · Quran Association Manager",
    description:
      "Personal project, source available on GitHub. Product owner and technical lead of a desktop system in daily use, built with AI coding agents.",
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
      "Computer-vision and image-processing research in C++ / OpenCV and C# / EmguCV.",
  },
  {
    period: "Sep 2016 – Jun 2020",
    title: "University Teacher · National Engineering School of Monastir",
    description:
      "Taught electronics, image processing, peripheral interfacing, and VHDL to 300+ engineering students.",
  },
];
