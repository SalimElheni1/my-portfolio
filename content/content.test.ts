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

describe("content integrity", () => {
  it.each(excludedTerms)("never mentions excluded term: %s", (term) => {
    expect(allContentText).not.toContain(term);
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
