import type { MetadataRoute } from "next";

const SITE = "https://fruitzen.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    // Step 2 (T5–T6): /resources and each published /resources/<slug> are added here
    // once lib/resources.ts and /content exist.
  ];
}
