export type SkillTier = {
  label: string;
  items: string[];
};

export const skillTiers: SkillTier[] = [
  {
    label: "Core, daily production",
    items: ["JavaScript", "MeteorJS", "BlazeJS", "Node.js", "MongoDB", "REST APIs", "Cypress", "Git/GitHub"],
  },
  {
    label: "Shipped with",
    items: ["React.js", "Electron.js", "SQLite", "D3.js", "IndexedDB", "Stripe API", "Chargebee API", "Arabic RTL interfaces"],
  },
  {
    label: "Familiar",
    items: ["React Native", "TypeScript", "Next.js", "Express.js", "PostgreSQL/SQL", "HTML5", "CSS3", "Linux"],
  },
  {
    label: "Ways of working",
    items: [
      "AI-assisted development (Claude Code), with personal code review and debugging at PerfectSoft",
      "End-to-end testing",
      "Code review",
      "Release stability",
      "Legacy modernization",
    ],
  },
  {
    label: "Earlier / research era",
    items: ["C++ with OpenCV", "C# with EmguCV", "VHDL", "CUDA/GPGPU", "LabVIEW", "MATLAB", "Arduino"],
  },
];
