import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
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

  it("tags education as degrees and training, so the home panel can show degrees only", () => {
    const kinds = education.map((item) => item.kind);
    expect(kinds).toContain("degree");
    expect(kinds).toContain("training");
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

  it("has exactly one featured project", () => {
    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe("Quran Association Manager");
  });
});
