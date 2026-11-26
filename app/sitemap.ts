import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/policy-for-automation`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/user-data-deletion-request`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
