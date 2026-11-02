// Reads the aeo-starter content/ folder (copy it to the Next.js project root as /content).
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content");
const TYPES = ["landing-pages", "blog-posts", "guides", "faqs", "comparisons"];

export type Faq = { question: string; answer: string };
export type Resource = {
  slug: string; type: string; title: string; status: string;
  meta_title: string; meta_description: string; schema_type: "Service" | "Article" | "FAQPage";
  canonical_url: string; created: string; updated: string; faqs: Faq[]; body: string;
};

export function getAllResources(includeDrafts = process.env.NODE_ENV !== "production"): Resource[] {
  const out: Resource[] = [];
  for (const t of TYPES) {
    const dir = path.join(ROOT, t);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md"))) {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      if (!includeDrafts && data.status !== "published") continue;
      out.push({ ...(data as Omit<Resource, "body">), body: content });
    }
  }
  return out.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getResource(slug: string) {
  return getAllResources().find((r) => r.slug === slug) ?? null;
}
