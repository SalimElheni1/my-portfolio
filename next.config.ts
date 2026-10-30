import type { NextConfig } from "next";

const securityHeaders = [
  // Browsers only take this over HTTPS, so it's harmless in local dev.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // next-themes runs a small inline script before paint, and a nonce-based
  // script policy would make every page render per request instead of
  // prerendered. So this locks down everything except scripts.
  {
    key: "Content-Security-Policy",
    value: "base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'",
  },
];

const nextConfig: NextConfig = {
  // Traces the minimal set of files/dependencies needed to run the app
  // and emits them (plus a runnable server.js) to .next/standalone, so the
  // server doesn't need node_modules. deploy/deploy.sh copies in the static
  // assets it leaves out and PM2 runs server.js (see deploy/README.md).
  output: "standalone",
  poweredByHeader: false,
  // The dev server only serves its client JS/HMR to localhost by default.
  // To open it from other devices on the LAN (e.g. phone testing), list
  // their addresses in ALLOWED_DEV_ORIGINS, comma-separated; otherwise the
  // page renders but never hydrates.
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",").map((origin) => origin.trim()),
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
