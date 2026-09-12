import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Traces the minimal set of files/dependencies needed to run the app
  // and emits them (plus a runnable server.js) to .next/standalone.
  // This is what lets the Docker image skip shipping node_modules.
  output: "standalone",
};

export default nextConfig;
