import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Traces the minimal set of files/dependencies needed to run the app
  // and emits them (plus a runnable server.js) to .next/standalone.
  // This is what lets the Docker image skip shipping node_modules.
  output: "standalone",
  // The dev server only serves its client JS/HMR to localhost by default.
  // Allow opening it from other devices on the LAN (e.g. phone testing),
  // otherwise the page renders but never hydrates.
  allowedDevOrigins: ["192.168.100.145"],
};

export default nextConfig;
