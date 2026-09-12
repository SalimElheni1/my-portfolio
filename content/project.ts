export type Project = {
  slug: string;
  name: string;
  status: string;
  repoUrl: string;
  stack: string[];
  timeline: {
    firstCommit: string;
    firstRelease: string;
    currentRelease: string;
    note: string;
  };
  description: string;
  problem: string;
  solution: string;
  modules: string[];
  architecture: string[];
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "quran-association-manager",
    name: "Quran Association Manager",
    status: "Open Source · In Production",
    repoUrl: "https://github.com/SalimElheni1/quran-association-manager",
    stack: ["Electron", "React", "SQLite"],
    timeline: {
      firstCommit: "9 Aug 2025",
      firstRelease: "v1.0.0 — 27 Aug 2025",
      currentRelease: "v1.3.1 — 29 Aug 2026",
      note: "Actively maintained, 20+ releases in the first year, in daily production use at one association branch.",
    },
    description:
      "Offline-first desktop application that replaced paper-based administration for a Quranic association branch.",
    problem:
      "A Quranic association branch was running student records, attendance, and finances entirely on paper, with no reliable internet connection at the site to depend on a hosted solution.",
    solution:
      "An offline-first desktop application built with Electron, React, and SQLite — administering students, teachers, classes, attendance, finances, and cross-module reporting from a single local system.",
    modules: ["Students", "Teachers", "Classes", "Attendance", "Finances", "Cross-module reporting"],
    architecture: [
      "Local SQLite storage with no dependency on network connectivity",
      "Authentication and role-based access control",
      "Full Arabic right-to-left interface support",
      "PDF and Excel export for records and reports",
      "Backup workflows for local data safety",
    ],
    outcome:
      "Shipped from first commit to first production release in 18 days, then maintained across 20+ releases over the following year in response to real user feedback — now in daily use at the association.",
  },
];
