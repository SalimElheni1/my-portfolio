type Window = { count: number; resetAt: number };
type Options = { limit: number; windowMs: number; maxKeys?: number };

/**
 * Fixed-window counter kept in this server process's memory. That suits one
 * long-running server process. Under PM2 cluster mode or on serverless hosts
 * each process counts on its own, so the limits multiply: run a single fork
 * (deploy/ecosystem.config.cjs).
 *
 * `hit` records one attempt for `key` and returns how many milliseconds to
 * wait before the next one, or 0 when this one is allowed. `release` takes
 * back an allowed attempt that didn't go through, so it doesn't count.
 */
export function createRateLimiter({ limit, windowMs, maxKeys = 10_000 }: Options) {
  const windows = new Map<string, Window>();

  function hit(key: string, now: number = Date.now()): number {
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
  }

  function release(key: string, now: number = Date.now()): void {
    const current = windows.get(key);
    if (current && now < current.resetAt && current.count > 0) current.count -= 1;
  }

  return { hit, release };
}

/**
 * The visitor's address as the nearest proxy in front of the app saw it.
 * Reverse proxies such as nginx and Caddy put the address they got the
 * request from at the end of x-forwarded-for; anything before it came from
 * the visitor and can be made up. Next.js only fills the header in when it's
 * missing, so with no proxy in front a visitor can still fake it: keep the
 * app on 127.0.0.1 behind one. If a CDN sits in front of that proxy, tell
 * the proxy to trust it, or every visitor ends up sharing the CDN's address
 * (deploy/update-cloudflare-ips.sh sets nginx up to trust Cloudflare).
 */
export function clientIp(headers: Headers): string {
  const nearest = headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  return nearest || headers.get("x-real-ip") || "unknown";
}
