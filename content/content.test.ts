import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { profile } from "./profile";
import { experience, education } from "./experience";
import { skillTiers } from "./skills";
import { projects } from "./project";

const allContentText = JSON.stringify({ profile, experience, education, skillTiers, projects });

const excludedTerms = [
  "Al-Rabita",
  "COD Commerce",
  "DecideWise",
  "PhD",
  "Doctorate",
  "Dr. Salim",
  "Quran Branch Manager",
  // the project's license is non-commercial, so "open source" would be inaccurate
  "open source",
  "open-source",
  "Open Source",
  // the phone number stays on the CV PDF only, never on the site
  "+216",
];

// Wording superseded by Master Profile v3 (7 Oct 2026). Release counts are never published.
const staleTerms = [
  "20+",
  "18 days",
  "9 Aug 2025",
  "external calendar providers",
  "Delivered a React Native",
  "Mentored 300+",
  "Electronics and Microelectronics",
  "Applied research programming",
  // the program is run by McKinsey.org (Master Profile v4, 10 Oct 2026)
  "McKinsey & Company",
  // v1.4.0 replaces it as the production release (decided 25 Oct 2026, Master Profile update pending)
  "v1.3.1",
  // the project was built with AI coding agents, so "solo" overstates it (25 Oct 2026)
  "maintained solo",
];

// Home-page components hold a few hard-coded facts (hero stats, project fact table).
const homeComponentText = readdirSync(join(__dirname, "../components/home"))
  .map((file) => readFileSync(join(__dirname, "../components/home", file), "utf8"))
  .join("\n");

describe("content integrity", () => {
  it.each(excludedTerms)("never mentions excluded term: %s", (term) => {
    expect(allContentText).not.toContain(term);
  });

  it.each(staleTerms)("never uses superseded wording: %s", (term) => {
    expect(allContentText).not.toContain(term);
    expect(homeComponentText).not.toContain(term);
  });

  it("counts the years in the summary when it's read, so they never go stale", () => {
    vi.useFakeTimers({ now: new Date("2027-06-02") });
    try {
      expect(profile.summary).toContain("5+ years");
    } finally {
      vi.useRealTimers();
    }
  });

  it("profile has required non-empty fields", () => {
    expect(profile.name).toBeTruthy();
    expect(profile.email).toBeTruthy();
    expect(profile.tagline).toBeTruthy();
    expect(profile.summary).toBeTruthy();
  });

  it("has at least one experience entry and one education entry", () => {
    expect(experience.length).toBeGreaterThan(0);
    expect(education.length).toBeGreaterThan(0);
  });

  it("has exactly the five confirmed skill tiers", () => {
    expect(skillTiers.map((t) => t.label)).toEqual([
      "Core, daily production",
      "Shipped with",
      "Familiar",
      "Ways of working",
      "Earlier / research era",
    ]);
  });

  it("says openly how the featured project was built", () => {
    expect(projects[0].howBuilt).toContain("AI coding agents");
    expect(projects[0].role).toContain("AI coding agents");
  });

  it("dates the project from its first commit", () => {
    const [, month, year] = projects[0].timeline.firstCommit.split(" ");
    expect(projects[0].period).toMatch(new RegExp(`^${month} ${year} `));
  });

  it("has exactly one featured project", () => {
    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe("Quran Association Manager");
  });
});
