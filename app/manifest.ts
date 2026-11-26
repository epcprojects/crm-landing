import type { MetadataRoute } from "next";

// The web app manifest, so the site can be installed to a phone's home screen
// or as a desktop app (Android, iPhone, Windows, Mac). Icons are made from the
// Endpoint Leads mark on teal; the "maskable" ones keep the mark inside the safe
// area for Android's round and squircle icon shapes.
export default function manifest(): MetadataRoute.Manifest {
  const sizes = [72, 128, 144, 152, 192, 256, 384, 512];
  return {
    id: "/",
    name: "Endpoint Leads | Real Estate CRM",
    short_name: "Endpoint Leads",
    description:
      "Manage your real estate clients and agents from one workspace. See who spoke to each client, what was discussed, and what needs attention next.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#ffffff",
    theme_color: "#0891b3",
    categories: ["business", "productivity"],
    icons: [
      ...sizes.map((s) => ({ src: `/icons/icon-${s}x${s}.png`, sizes: `${s}x${s}`, type: "image/png", purpose: "any" as const })),
      { src: "/icons/maskable-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
