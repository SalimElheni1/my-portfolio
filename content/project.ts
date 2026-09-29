export type Project = {
  slug: string;
  name: string;
  status: string;
  repoUrl: string;
  stack: string[];
  /** one-line architecture summary for the featured-project fact table */
  architectureSummary: string;
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
  hardest: string;
  outcome: string;
  screenshots: { src: string; alt: string; width: number; height: number }[];
};

export const projects: Project[] = [
  {
    slug: "quran-association-manager",
    name: "Quran Association Manager",
    status: "Source Available · In Production",
    repoUrl: "https://github.com/SalimElheni1/quran-association-manager",
    stack: ["Electron.js", "React", "SQLite"],
    architectureSummary: "Local-first, offline SQLite storage",
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
    hardest:
      "The financial module. Student fees are charged automatically each month and each academic year. Every receipt and payment voucher gets its own sequential number, and cash payments above 500 TND are refused, since Tunisian law requires a cheque or bank transfer above that amount. The hardest part is reporting: the association needs its financial reports in fixed formats and layouts, such as a cash ledger with a running balance, exported to Excel and Word. This module is still being extended as new report formats are requested.",
    outcome:
      "Shipped from first commit to first production release in 18 days, then maintained across 20+ releases over the following year in response to real user feedback — now in daily use at the association.",
    screenshots: [
      {
        src: "/work/quran-association-manager/dashboard.webp",
        alt: "Dashboard showing active classes, teachers, and students at a glance",
        width: 1600,
        height: 827,
      },
      {
        src: "/work/quran-association-manager/login.webp",
        alt: "Arabic right-to-left login screen",
        width: 1600,
        height: 1295,
      },
      {
        src: "/work/quran-association-manager/students.webp",
        alt: "Student records list with search and filtering",
        width: 1600,
        height: 1295,
      },
      {
        src: "/work/quran-association-manager/classes.webp",
        alt: "Class management with teacher assignment",
        width: 1600,
        height: 827,
      },
      {
        src: "/work/quran-association-manager/finance.webp",
        alt: "Financial dashboard with income and expense breakdown by category",
        width: 1600,
        height: 827,
      },
    ],
  },
];
