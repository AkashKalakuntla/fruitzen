import type { MetadataRoute } from "next";
import { getAllResources } from "@/lib/resources";

const SITE = "https://fruitzen.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    // Only published resources are included (drafts are excluded in production).
    ...getAllResources(false).map((r) => ({
      url: `${SITE}${r.canonical_url}`,
      lastModified: new Date(r.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
