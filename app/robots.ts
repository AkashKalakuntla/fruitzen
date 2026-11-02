import type { MetadataRoute } from "next";
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "anthropic-ai", "PerplexityBot",
  "Perplexity-User", "Google-Extended", "Applebot-Extended", "Amazonbot", "Bingbot", "CCBot"];
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: "/" }))],
    sitemap: "https://fruitzen.in/sitemap.xml",
    host: "https://fruitzen.in",
  };
}
