import { describe, expect, it } from "vitest";
import { getYearsSince, formatYearsExperience } from "./date";

describe("getYearsSince", () => {
  it("returns 0 before the first anniversary", () => {
    expect(getYearsSince("2022-06-01", new Date("2023-05-31"))).toBe(0);
  });

  it("returns 1 exactly on the first anniversary", () => {
    expect(getYearsSince("2022-06-01", new Date("2023-06-01"))).toBe(1);
  });

  it("floors — does not round up to the next year early", () => {
    expect(getYearsSince("2022-06-01", new Date("2026-09-12"))).toBe(4);
  });

  it("advances once the anniversary passes", () => {
    expect(getYearsSince("2022-06-01", new Date("2027-06-01"))).toBe(5);
  });
});

describe("formatYearsExperience", () => {
  it("formats as '<n>+ years'", () => {
    expect(formatYearsExperience("2022-06-01", new Date("2026-09-12"))).toBe("4+ years");
  });
});
