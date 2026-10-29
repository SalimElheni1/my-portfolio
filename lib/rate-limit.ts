type Window = { count: number; resetAt: number };
type Options = { limit: number; windowMs: number; maxKeys?: number };

/**
 * Fixed-window counter kept in this server process's memory. That suits one
 * long-running server such as the Docker image; on serverless hosts each
 * instance counts on its own, so there it only slows bursts down.
 *
 * The returned function records one attempt for `key` and returns how many
 * milliseconds to wait before the next one, or 0 when this one is allowed.
 */
export function createRateLimiter({ limit, windowMs, maxKeys = 10_000 }: Options) {
  const windows = new Map<string, Window>();

  return function hit(key: string, now: number = Date.now()): number {
    const current = windows.get(key);
    if (current && now < current.resetAt) {
      if (current.count >= limit) return current.resetAt - now;
      current.count += 1;
      return 0;
    }
    if (!current && windows.size >= maxKeys) {
      for (const [k, w] of windows) if (now >= w.resetAt) windows.delete(k);
      // Still full of live windows (say, a flood of made-up addresses): forget
      // the earliest-added key rather than grow without bound.
      if (windows.size >= maxKeys) windows.delete(windows.keys().next().value!);
    }
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return 0;
  };
}

/**
 * The visitor's address as reported by whatever sits in front of the app:
 * the hosting platform, a reverse proxy, or Next.js itself, which fills in
 * the connection's address when nothing else did. A visitor can fake it
 * wherever nothing in front overwrites the header, so never rely on it alone.
 */
export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0].trim() || headers.get("x-real-ip") || "unknown";
}
