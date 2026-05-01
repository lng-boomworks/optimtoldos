import type { APIRoute } from "astro";
import { buildUrlsetFromPaths, GUIAS_PATHS } from "../utils/sitemapData";

export const GET: APIRoute = async () => {
  const xml = await buildUrlsetFromPaths(GUIAS_PATHS, {
    changefreq: "monthly",
    priority: 0.7,
  });
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
