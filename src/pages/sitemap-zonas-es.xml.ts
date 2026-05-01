import type { APIRoute } from "astro";
import { buildUrlsetFromPaths, ZONAS_ES_PATHS } from "../utils/sitemapData";

export const GET: APIRoute = async () => {
  const xml = await buildUrlsetFromPaths(ZONAS_ES_PATHS, {
    changefreq: "weekly",
    priority: 0.8,
  });
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
