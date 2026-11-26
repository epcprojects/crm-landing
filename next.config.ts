import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // Option 2 is now the home page and Option 3 is gone: old links land on the
  // matching page. Only these exact paths redirect, so the images still served
  // from /option-2/... keep working.
  async redirects() {
    const legal = "privacy-policy|policy-for-automation|user-data-deletion-request";
    return [
      { source: "/option-2", destination: "/", permanent: true },
      { source: "/option-3", destination: "/", permanent: true },
      { source: `/option-2/:page(${legal})`, destination: "/:page", permanent: true },
      { source: `/option-3/:page(${legal})`, destination: "/:page", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
