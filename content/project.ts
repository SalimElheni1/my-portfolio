export type Project = {
  slug: string;
  name: string;
  status: string;
  repoUrl: string;
  downloadUrl: string;
  /** recorded tour of the app, narrated in Arabic */
  videoUrl: string;
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
  /** one-line outcome shown under the case-study title */
  summary: string;
  platform: string;
  role: string;
  usage: string;
  /** how the project was built; disclosed openly (decision of 25 Oct 2026) */
  howBuilt: string;
  problem: string;
  /** kept at the "why" level: only what Salim can explain in an interview */
  decisions: { decision: string; why: string; tradeoff: string }[];
  solution: string;
  modules: string[];
  architecture: string[];
  hardest: string;
  mistake: string;
  release: string;
  outcome: string;
  screenshots: { src: string; alt: string; width: number; height: number }[];
};

/** Stand-in until v1.4.0 ships to the association; a production build refuses to run while it is present. */
export const RELEASE_DATE_PENDING = "date TBD";

export const projects: Project[] = [
  {
    slug: "quran-association-manager",
    name: "Quran Association Manager",
    status: "Source Available · In Production",
    repoUrl: "https://github.com/SalimElheni1/quran-association-manager",
    downloadUrl: "https://github.com/SalimElheni1/quran-association-manager/releases/latest",
    videoUrl: "https://drive.google.com/file/d/1CAr6MUztE0QUjr6J46tSPYfbMRLDHYio/view?usp=sharing",
    stack: ["Electron.js", "React", "SQLite"],
    architectureSummary: "Local-first, offline SQLite storage",
    timeline: {
      firstCommit: "10 Aug 2025",
      firstRelease: "v1.0.0 — 27 Aug 2025",
      currentRelease: `v1.4.0 — ${RELEASE_DATE_PENDING}`,
      note: "Actively maintained, in daily production use at one association branch since August 2025.",
    },
    description:
      "Offline-first desktop application that replaced paper-based administration for a Quranic association branch.",
    summary:
      "Replaced a Quranic association branch's paper records with an offline desktop system. In production 17 days after the first commit, and in daily use since.",
    platform: "Windows desktop",
    role: "Product owner and technical lead, built with AI coding agents",
    usage: "About 300 students and 15 teachers",
    howBuilt:
      "I built this with AI coding agents, working as product owner and technical lead: I defined the requirements and domain rules, reviewed every plan, made the technical decisions, and tested each release before it went to the association.",
    problem:
      "The branch kept student records, attendance, and finances on paper. The office had no reliable internet, and the system would run on one shared computer used by volunteer staff in Arabic. It holds personal data and the branch's money, so it had to be secure and work without a server.",
    decisions: [
      {
        decision: "A desktop app, not a web app",
        why: "There is no reliable internet at the branch, and the data stays in the office.",
        tradeoff: "It is installed on each computer and updated by hand.",
      },
      {
        decision: "An encrypted database",
        why: "Personal data sits on a shared computer, so a copied database file must be unreadable.",
        tradeoff: "Backups need the association's key to be restored on another computer.",
      },
      {
        decision: "Permissions checked behind the interface, not only by hiding buttons",
        why: "Each of the four staff roles can only do its own part of the work.",
        tradeoff: "Every new feature needs its own role rules.",
      },
      {
        decision: "Money is cancelled, never deleted",
        why: "The accounts can always be checked, and every correction leaves a trace.",
        tradeoff: "Reports must leave out cancelled entries.",
      },
      {
        decision: "Backups protected by the association's key",
        why: "A backup can be restored on another computer of the branch.",
        tradeoff: "Staff must keep that key safe.",
      },
    ],
    solution:
      "An offline-first desktop application built with Electron, React, and SQLite — administering students, teachers, classes, attendance, finances, and cross-module reporting from a single local system.",
    modules: ["Students", "Teachers", "Classes", "Attendance", "Finances", "Cross-module reporting"],
    architecture: [
      "Local SQLite storage with no dependency on network connectivity",
      "Authentication and role-based access control",
      "Full Arabic right-to-left interface support",
      "PDF, Word, and Excel export for records and reports",
      "Backup workflows for local data safety",
    ],
    hardest:
      "The financial module. Student fees are charged automatically each month and each academic year. Every receipt and payment voucher gets its own sequential number, and cash payments above 500 TND are refused, since Tunisian law requires a cheque or bank transfer above that amount. The hardest part is reporting: the association needs its financial reports in fixed formats and layouts, such as a cash ledger with a running balance, exported to Excel and Word. Fees also follow academic years: unpaid fees from earlier years are kept apart, and each age group can have its own fee and billing system. This module is still being extended as new report formats are requested.",
    mistake:
      "A tester reported that the first month of a new academic year was billed twice. I reproduced it myself to confirm the bug. The fix removed the unpaid duplicate charges and changed the billing so that a month is only charged once it has started. The lesson: rules based on dates need testing across a change of year, not just within one month.",
    release:
      "Each version goes to testers first, then to the association. Before sharing a version, I run the automated test suite against the packaged app.",
    outcome:
      "Shipped from first commit to first production release in 17 days, then actively maintained in response to real user feedback. Now in daily use at the association, managing about 300 students and 15 teachers.",
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

if (process.env.NODE_ENV === "production" && JSON.stringify(projects).includes(RELEASE_DATE_PENDING)) {
  throw new Error(`content/project.ts still says "${RELEASE_DATE_PENDING}" — set the real v1.4.0 release date before deploying.`);
}
