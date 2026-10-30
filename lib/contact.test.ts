import { describe, expect, it } from "vitest";
import { EMAIL_PATTERN, contactSubjectLabel, isValidEmail } from "./contact";

describe("isValidEmail", () => {
  it("accepts ordinary addresses", () => {
    for (const email of ["a@b.co", "first.last+tag@sub.example.tn"]) {
      expect(isValidEmail(email)).toBe(true);
    }
  });

  it("rejects malformed addresses", () => {
    for (const email of ["", "a@b", "a@b.", "a@.b", "a@b..c", "a b@c.d", "a@b@c.d"]) {
      expect(isValidEmail(email)).toBe(false);
    }
  });

  it("rejects addresses over the length limit", () => {
    expect(isValidEmail(`${"a".repeat(200)}@b.co`)).toBe(false);
  });

  // Regression: the old pattern took ~10 s on 128 KB of dots and blocked the server.
  it("pattern stays fast on long adversarial input, even without the length guard", () => {
    const start = performance.now();
    expect(EMAIL_PATTERN.test(`a@${".".repeat(1_000_000)}@`)).toBe(false);
    expect(EMAIL_PATTERN.test(`a@${"b.".repeat(500_000)}@`)).toBe(false);
    expect(performance.now() - start).toBeLessThan(500);
  });
});

describe("contactSubjectLabel", () => {
  it("maps known subjects and falls back for anything else", () => {
    expect(contactSubjectLabel("contract")).toBe("Contract or freelance");
    expect(contactSubjectLabel("constructor")).toBe("Something else");
    expect(contactSubjectLabel(undefined)).toBe("Something else");
  });
});
