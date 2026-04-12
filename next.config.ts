/**
 * next.config.ts
 *
 * Performance & compatibility config for Drishti.
 *
 * KEY DECISION — transpilePackages:
 * @splinetool/react-spline ships as ESM. Without transpiling it here
 * Next.js 15 will throw "SyntaxError: Cannot use import statement"
 * during the server build.  Adding it to transpilePackages fixes that
 * while the `ssr: false` dynamic import keeps it off the server path
 * at runtime.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@splinetool/react-spline",
    "@splinetool/runtime",
  ],

  experimental: {
    /**
     * optimizePackageImports reduces the JS bundle by tree-shaking
     * framer-motion so only the features you use are included.
     */
    optimizePackageImports: ["framer-motion"],
  },

  /**
   * Security headers — good baseline for a government portal.
   * Adjust CSP as needed for your Solana RPC endpoint origin.
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",          value: "DENY" },
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
