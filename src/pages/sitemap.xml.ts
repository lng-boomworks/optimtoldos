import type { APIRoute } from "astro";
import { SITE, lastmodForPath, escapeXml } from "../utils/sitemapData";

const SEGMENTS = [
  "/sitemap-core.xml",
  "/sitemap-productos.xml",
  "/sitemap-zonas-es.xml",
  "/sitemap-zonas-en.xml",
  "/sitemap-producto-zona.xml",
  "/sitemap-guias.xml",
  "/sitemap-blog.xml",
  "/sitemap-images.xml",
];

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().slice(0, 10);
  const entries = SEGMENTS.map(
    (s) => `  <sitemap>
    <loc>${escapeXml(`${SITE}${s}`)}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};

// Avoids unused-import warning when build-time graph runs
void lastmodForPath;
