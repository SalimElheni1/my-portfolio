import { describe, expect, it } from "vitest";
import { clientIp, createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit, then says how long to wait", () => {
    const hit = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(hit("a", 0)).toBe(0);
    expect(hit("a", 100)).toBe(0);
    expect(hit("a", 400)).toBe(600);
  });

  it("does not extend the window for blocked attempts", () => {
    const hit = createRateLimiter({ limit: 1, windowMs: 1000 });
    hit("a", 0);
    expect(hit("a", 500)).toBe(500);
    expect(hit("a", 900)).toBe(100);
  });

  it("counts each key separately", () => {
    const hit = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(hit("a", 0)).toBe(0);
    expect(hit("b", 0)).toBe(0);
    expect(hit("a", 0)).toBe(1000);
  });

  it("starts a fresh window once the old one ends", () => {
    const hit = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(hit("a", 0)).toBe(0);
    expect(hit("a", 999)).toBe(1);
    expect(hit("a", 1000)).toBe(0);
  });

  it("drops expired keys before forgetting live ones", () => {
    const hit = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 2 });
    hit("old", 0);
    hit("live", 1500);
    expect(hit("new", 1600)).toBe(0);
    expect(hit("live", 1600)).toBe(900);
  });

  it("never tracks more than maxKeys keys", () => {
    const hit = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 2 });
    hit("a", 0);
    hit("b", 0);
    expect(hit("c", 0)).toBe(0);
    // "a" was the earliest key, so it was forgotten and starts over
    expect(hit("a", 0)).toBe(0);
    expect(hit("c", 0)).toBe(1000);
  });
});

describe("clientIp", () => {
  it("takes the first address in x-forwarded-for", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.2" }))).toBe("203.0.113.7");
  });

  it("falls back to x-real-ip, then to one shared key", () => {
    expect(clientIp(new Headers({ "x-real-ip": "203.0.113.8" }))).toBe("203.0.113.8");
    expect(clientIp(new Headers())).toBe("unknown");
  });
});
