import type { APIRoute } from "astro";
import { buildUrlsetFromPaths, CORE_PATHS } from "../utils/sitemapData";

export const GET: APIRoute = async () => {
  const xml = await buildUrlsetFromPaths(CORE_PATHS, {
    changefreq: "weekly",
    priority: 0.9,
  });
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
