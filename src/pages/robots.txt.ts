import type { APIRoute } from "astro";

const PROD_HOST = "optimtoldos.com";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, "") ?? `https://${PROD_HOST}`;
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const isPreviewBuild = site ? site.host !== PROD_HOST : false;

  // Dev preview / staging builds: block all crawlers entirely. We never want
  // a non-production host indexed - it would compete with the real production
  // site for the same content.
  if (isPreviewBuild) {
    const body = `# Non-production preview build (${siteUrl}). Blocked from all crawlers.
User-agent: *
Disallow: /
`;
    return new Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const body = `User-agent: *
Allow: /

# AI / LLM crawlers - explicitly allowed for discovery in ChatGPT, Claude,
# Perplexity, Gemini and similar assistants. Flip Allow→Disallow per bot to opt out.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${siteUrl}${base}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
