import { describe, expect, it } from "vitest";
import { clientIp, createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit, then says how long to wait", () => {
    const { hit } = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(hit("a", 0)).toBe(0);
    expect(hit("a", 100)).toBe(0);
    expect(hit("a", 400)).toBe(600);
  });

  it("does not extend the window for blocked attempts", () => {
    const { hit } = createRateLimiter({ limit: 1, windowMs: 1000 });
    hit("a", 0);
    expect(hit("a", 500)).toBe(500);
    expect(hit("a", 900)).toBe(100);
  });

  it("counts each key separately", () => {
    const { hit } = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(hit("a", 0)).toBe(0);
    expect(hit("b", 0)).toBe(0);
    expect(hit("a", 0)).toBe(1000);
  });

  it("starts a fresh window once the old one ends", () => {
    const { hit } = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(hit("a", 0)).toBe(0);
    expect(hit("a", 999)).toBe(1);
    expect(hit("a", 1000)).toBe(0);
  });

  it("drops expired keys before forgetting live ones", () => {
    const { hit } = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 2 });
    hit("old", 0);
    hit("live", 1500);
    expect(hit("new", 1600)).toBe(0);
    expect(hit("live", 1600)).toBe(900);
  });

  it("never tracks more than maxKeys keys", () => {
    const { hit } = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 2 });
    hit("a", 0);
    hit("b", 0);
    expect(hit("c", 0)).toBe(0);
    // "a" was the earliest key, so it was forgotten and starts over
    expect(hit("a", 0)).toBe(0);
    expect(hit("c", 0)).toBe(1000);
  });

  it("gives back a released attempt", () => {
    const { hit, release } = createRateLimiter({ limit: 1, windowMs: 1000 });
    hit("a", 0);
    release("a", 100);
    expect(hit("a", 200)).toBe(0);
    expect(hit("a", 300)).toBe(700);
  });

  it("never gives back more than was taken", () => {
    const { hit, release } = createRateLimiter({ limit: 1, windowMs: 1000 });
    release("a", 0); // nothing counted yet
    hit("a", 0);
    release("a", 100);
    release("a", 100);
    expect(hit("a", 200)).toBe(0);
    expect(hit("a", 300)).toBe(700);
  });
});

describe("clientIp", () => {
  it("takes the address the nearest proxy added, not ones the visitor sent", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "198.51.100.1, 203.0.113.7" }))).toBe("203.0.113.7");
    expect(clientIp(new Headers({ "x-forwarded-for": "203.0.113.7" }))).toBe("203.0.113.7");
  });

  it("falls back to x-real-ip, then to one shared key", () => {
    expect(clientIp(new Headers({ "x-real-ip": "203.0.113.8" }))).toBe("203.0.113.8");
    expect(clientIp(new Headers())).toBe("unknown");
  });
});
