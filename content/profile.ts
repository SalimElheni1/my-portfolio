export type Profile = {
  name: string;
  title: string;
  location: string;
  availability: string;
  tagline: string;
  /** hero stack line, from the Master Profile's first headline option; daily tools get the accent pill */
  headlineStack: { daily: string[]; shipped: string[] };
  supportingText: string;
  summary: string;
  email: string;
  github: { label: string; url: string };
  linkedin: { label: string; url: string };
  languages: { name: string; level: string }[];
  experienceStartDateISO: string;
  /** shows the "Available for roles" badge in the header */
  showAvailability: boolean;
};

export const profile: Profile = {
  name: "Salim Elhani",
  title: "Full-Stack JavaScript Developer",
  location: "Tunisia",
  availability: "Open to remote, hybrid, or relocation",
  tagline: "Production JavaScript since 2022, backend first.",
  headlineStack: { daily: ["Node.js", "MongoDB", "MeteorJS"], shipped: ["React", "Electron"] },
  supportingText:
    "Full-Stack JavaScript Developer focused on building practical products, improving systems, and turning ideas into working software.",
  summary:
    "Full-stack JavaScript developer with 4+ years of production experience building and maintaining client-facing web applications in a small, fast-moving product team. Backend-oriented, with day-to-day work across MeteorJS, Node.js, MongoDB, and REST APIs. Delivered a Google, Outlook, and iCloud calendar integration system, Stripe and Chargebee billing workflows, D3.js data visualizations, IndexedDB-based offline handling, and a Cypress end-to-end test suite protecting critical checkout and onboarding flows. Outside of employment, designed, shipped, and maintains a source-available Electron desktop application now in daily production use at a real organization. Earlier career in computer-vision research and university teaching.",
  email: "elheni.selim@gmail.com",
  github: {
    label: "github.com/SalimElheni1",
    url: "https://github.com/SalimElheni1",
  },
  linkedin: {
    label: "linkedin.com/in/salimelheni1",
    url: "https://linkedin.com/in/salimelheni1",
  },
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Professional working proficiency" },
    { name: "English", level: "Professional working proficiency" },
  ],
  experienceStartDateISO: "2022-06-01",
  showAvailability: false,
};
