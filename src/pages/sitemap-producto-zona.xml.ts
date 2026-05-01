import type { APIRoute } from "astro";
import { buildUrlsetFromPaths, PRODUCTO_ZONA_PATHS } from "../utils/sitemapData";

export const GET: APIRoute = async () => {
  const xml = await buildUrlsetFromPaths(PRODUCTO_ZONA_PATHS, {
    changefreq: "monthly",
    priority: 0.9, // PDF: highest converting layer
  });
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
