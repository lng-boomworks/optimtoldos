import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, "") ?? "https://optimtoldos.com";
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}${base}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
