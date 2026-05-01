import type { APIRoute } from "astro";
import { buildUrlsetFromPaths, PRODUCT_PATHS } from "../utils/sitemapData";

export const GET: APIRoute = async () => {
  const xml = await buildUrlsetFromPaths(PRODUCT_PATHS, {
    changefreq: "monthly",
    priority: 0.8,
  });
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
