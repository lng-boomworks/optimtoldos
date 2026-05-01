import type { APIRoute } from "astro";
import { buildUrlsetFromPaths, getBlogPaths } from "../utils/sitemapData";

export const GET: APIRoute = async () => {
  const paths = await getBlogPaths();
  const xml = await buildUrlsetFromPaths(paths, {
    changefreq: "monthly",
    priority: 0.6,
  });
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
