import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import {
  SEO_LOCATIONS,
  EN_PERGOLAS_LOCATIONS,
  EN_BIOCLIMATIC_LOCATIONS,
  EN_GLASS_CURTAINS_LOCATIONS,
  EN_SHADE_SAILS_LOCATIONS,
  EN_PVC_WINDOWS_LOCATIONS,
  ES_PERGOLAS_ZONES,
  ES_BIOCLIMATIC_ZONES,
  ES_GLASS_CURTAINS_ZONES,
  ES_PERGOLA_INSTALL_ZONES,
  ES_SHADE_SAILS_ZONES,
  ES_PVC_WINDOWS_ZONES,
  ES_HOSPITALITY_AWNINGS_ZONES,
} from "../data/seoLocations";

export const SITE = "https://optimtoldos.com";

/**
 * Deterministic lastmod for a path.
 * Same hash → same date across rebuilds; spread evenly across a 14-day window.
 * Blog posts with `updated:` frontmatter override this via BLOG_LASTMOD_OVERRIDES.
 */
export function lastmodForPath(p: string): string {
  let hash = 0;
  for (let i = 0; i < p.length; i++) {
    hash = ((hash << 5) - hash + p.charCodeAt(i)) | 0;
  }
  const offsetDays = Math.abs(hash) % 14;
  const start = Date.UTC(2026, 3, 10); // 2026-04-10
  return new Date(start + offsetDays * 86_400_000).toISOString().slice(0, 10);
}

/** Cached map; populated on first call so endpoints can sync-read it */
let blogOverrides: Map<string, string> | null = null;

export async function getBlogLastmodOverrides(): Promise<Map<string, string>> {
  if (blogOverrides) return blogOverrides;
  const map = new Map<string, string>();
  for (const locale of ["es", "en"] as const) {
    const dir = `./src/content/blog/${locale}`;
    let files: string[];
    try {
      files = await readdir(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const content = await readFile(path.join(dir, file), "utf-8");
      const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!fmMatch) continue;
      const updatedMatch = fmMatch[1].match(/^updated:\s*"?([^"\r\n]+?)"?\s*$/m);
      if (!updatedMatch) continue;
      const lastmod = updatedMatch[1].trim();
      const slug = file.replace(/\.md$/, "");
      const urlPath =
        locale === "es" ? `/blog/${slug}/` : `/en/blog/${slug}/`;
      map.set(urlPath, lastmod);
    }
  }
  blogOverrides = map;
  return map;
}

/* ------------------------------------------------------------------ */
/* URL registries (per PDF §7 segmented sitemaps)                     */
/* ------------------------------------------------------------------ */

export const CORE_PATHS = [
  "/",
  "/sobre-nosotros/",
  "/galeria/",
  "/contacto/",
  "/presupuesto/",
  "/zonas-de-servicio/",
  "/blog/",
  // Legal (LSSICE-required pages — included in core for crawl visibility).
  "/aviso-legal/",
  "/politica-privacidad/",
  "/politica-cookies/",
  // EN core (matched pairs)
  "/en/",
  "/en/about-us/",
  "/en/gallery/",
  "/en/contact/",
  "/en/free-quote/",
  "/en/service-areas/",
  "/en/blog/",
  "/en/legal-notice/",
  "/en/privacy-policy/",
  "/en/cookie-policy/",
];

/** Read blog post slugs from the content directory. Used by
 *  sitemap-blog.xml.ts to register every individual post. */
export async function getBlogPaths(): Promise<string[]> {
  const paths: string[] = [];
  for (const locale of ["es", "en"] as const) {
    const dir = `./src/content/blog/${locale}`;
    let files: string[];
    try {
      files = await readdir(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const slug = file.replace(/\.md$/, "");
      paths.push(
        locale === "es" ? `/blog/${slug}/` : `/en/blog/${slug}/`,
      );
    }
  }
  return paths.sort();
}

/** Product pages — 5 hubs + 8 sub-products = 13 ES + 13 EN */
export const PRODUCT_PATHS = [
  // Hubs ES
  "/toldos/",
  "/pergolas/",
  "/cortinas-de-cristal/",
  "/velas-de-sombra/",
  "/ventanas-pvc/",
  // Hubs EN
  "/en/awnings/",
  "/en/pergolas/",
  "/en/glass-curtains/",
  "/en/shade-sails/",
  "/en/pvc-windows/",
  // Awning sub-products ES
  "/toldos-cofre/",
  "/toldos-brazo-extensible/",
  "/toldos-verticales-zip/",
  "/toldos-punto-recto/",
  "/toldos-motorizacion/",
  // Awning sub-products EN
  "/en/cassette-awnings/",
  "/en/retractable-arm-awnings/",
  "/en/zip-screen-awnings/",
  "/en/straight-drop-awnings/",
  "/en/awning-motorisation/",
  // Pergola sub-products ES
  "/pergolas-bioclimaticas/",
  "/pergolas-aluminio/",
  "/pergola-toldo-deslizante/",
  // Pergola sub-products EN
  "/en/bioclimatic-pergolas/",
  "/en/aluminium-pergolas/",
  "/en/sliding-awning-pergolas/",
];

/** 20 ES area pages */
export const ZONAS_ES_PATHS = SEO_LOCATIONS.map(
  (l) => `/toldos-${l.slug}/`,
);

/** 20 EN area-equivalent pages: 14 awnings + 2 pergolas + 2 bioclimatic + 2 glass-curtains */
const EN_AWNINGS_ZONES = [
  "torrevieja","orihuela-costa","ciudad-quesada","guardamar","la-marina","elche",
  "alicante","santa-pola","gran-alacant","benidorm","cabo-roig","la-zenia",
  "punta-prima","villamartin",
];
export const ZONAS_EN_PATHS = [
  ...EN_AWNINGS_ZONES.map((s) => `/en/awnings-${s}/`),
  ...EN_PERGOLAS_LOCATIONS.map((s) => `/en/pergolas-${s}/`),
  ...EN_BIOCLIMATIC_LOCATIONS.map((s) => `/en/bioclimatic-pergola-${s}/`),
  ...EN_GLASS_CURTAINS_LOCATIONS.map((s) => `/en/glass-curtains-${s}/`),
  ...EN_SHADE_SAILS_LOCATIONS.map((s) => `/en/shade-sails-${s}/`),
  ...EN_PVC_WINDOWS_LOCATIONS.map((s) => `/en/pvc-windows-${s}/`),
];

/** ES product+zone combinations */
export const PRODUCTO_ZONA_PATHS = [
  ...ES_PERGOLAS_ZONES.map((s) => `/pergolas-${s}/`),
  ...ES_BIOCLIMATIC_ZONES.map((s) => `/pergola-bioclimatica-${s}/`),
  ...ES_GLASS_CURTAINS_ZONES.map((s) => `/cortinas-de-cristal-${s}/`),
  ...ES_PERGOLA_INSTALL_ZONES.map((s) => `/instalacion-pergola-${s}/`),
  ...ES_SHADE_SAILS_ZONES.map((s) => `/velas-sombra-${s}/`),
  ...ES_PVC_WINDOWS_ZONES.map((s) => `/ventanas-pvc-${s}/`),
  ...ES_HOSPITALITY_AWNINGS_ZONES.map((s) => `/toldos-hosteleria-${s}/`),
  "/pergolas-hosteleria-costa-blanca/",
];

/** 8 authority guides (4 existing + 4 new) × 2 locales = 16 URLs */
export const GUIAS_PATHS = [
  // Existing
  "/guia-licencias-pergolas-toldos-alicante/",
  "/pergola-bioclimatica-vs-aluminio/",
  "/guia-elegir-toldo-costa-blanca/",
  "/guia-cortinas-cristal-terraza/",
  "/en/planning-permission-pergola-awning-alicante/",
  "/en/bioclimatic-vs-aluminium-pergola/",
  "/en/choosing-the-right-awning-costa-blanca/",
  "/en/glass-curtains-guide/",
  // New (PDF §6)
  "/precio-toldos-alicante-2026/",
  "/mantenimiento-toldos-costa-blanca/",
  "/toldos-comunidades-propietarios-alicante/",
  "/sensor-viento-toldos-motorizados/",
  "/en/awning-prices-alicante-2026/",
  "/en/awning-maintenance-costa-blanca/",
  "/en/awnings-residents-communities-alicante/",
  "/en/wind-sensor-motorised-awnings/",
];

/* ------------------------------------------------------------------ */
/* Hreflang lookup — segmented sitemaps need to emit xhtml:link too   */
/* ------------------------------------------------------------------ */

/**
 * Reciprocal ES↔EN URL pairs. Mirrored from astro.config.mjs HREFLANG_PAIRS.
 * Kept in sync manually — a unit-test could be added later to assert parity.
 */
export const HREFLANG_PAIRS: Array<{ es: string; en: string }> = [
  // Home + product hubs
  { es: "/", en: "/en/" },
  { es: "/toldos/", en: "/en/awnings/" },
  { es: "/pergolas/", en: "/en/pergolas/" },
  { es: "/cortinas-de-cristal/", en: "/en/glass-curtains/" },
  { es: "/velas-de-sombra/", en: "/en/shade-sails/" },
  { es: "/ventanas-pvc/", en: "/en/pvc-windows/" },
  // Discovery / conversion
  { es: "/galeria/", en: "/en/gallery/" },
  { es: "/zonas-de-servicio/", en: "/en/service-areas/" },
  { es: "/sobre-nosotros/", en: "/en/about-us/" },
  { es: "/blog/", en: "/en/blog/" },
  { es: "/contacto/", en: "/en/contact/" },
  { es: "/presupuesto/", en: "/en/free-quote/" },
  // Guides (existing)
  { es: "/guia-licencias-pergolas-toldos-alicante/", en: "/en/planning-permission-pergola-awning-alicante/" },
  { es: "/pergola-bioclimatica-vs-aluminio/", en: "/en/bioclimatic-vs-aluminium-pergola/" },
  { es: "/guia-elegir-toldo-costa-blanca/", en: "/en/choosing-the-right-awning-costa-blanca/" },
  { es: "/guia-cortinas-cristal-terraza/", en: "/en/glass-curtains-guide/" },
  // Guides (new)
  { es: "/precio-toldos-alicante-2026/", en: "/en/awning-prices-alicante-2026/" },
  { es: "/mantenimiento-toldos-costa-blanca/", en: "/en/awning-maintenance-costa-blanca/" },
  { es: "/toldos-comunidades-propietarios-alicante/", en: "/en/awnings-residents-communities-alicante/" },
  { es: "/sensor-viento-toldos-motorizados/", en: "/en/wind-sensor-motorised-awnings/" },
  // Sub-product pairs
  { es: "/toldos-cofre/", en: "/en/cassette-awnings/" },
  { es: "/toldos-brazo-extensible/", en: "/en/retractable-arm-awnings/" },
  { es: "/toldos-verticales-zip/", en: "/en/zip-screen-awnings/" },
  { es: "/toldos-punto-recto/", en: "/en/straight-drop-awnings/" },
  { es: "/toldos-motorizacion/", en: "/en/awning-motorisation/" },
  { es: "/pergolas-bioclimaticas/", en: "/en/bioclimatic-pergolas/" },
  { es: "/pergolas-aluminio/", en: "/en/aluminium-pergolas/" },
  { es: "/pergola-toldo-deslizante/", en: "/en/sliding-awning-pergolas/" },
  // Area pairs (14)
  ...EN_AWNINGS_ZONES.map((slug) => ({
    es: `/toldos-${slug}/`,
    en: `/en/awnings-${slug}/`,
  })),
  // Product+zone bilingual pairs — derived from the EN allowed-sets so the
  // list stays in sync when new EN combo pages are unlocked.
  ...EN_PERGOLAS_LOCATIONS.map((slug) => ({
    es: `/pergolas-${slug}/`,
    en: `/en/pergolas-${slug}/`,
  })),
  ...EN_BIOCLIMATIC_LOCATIONS.map((slug) => ({
    es: `/pergola-bioclimatica-${slug}/`,
    en: `/en/bioclimatic-pergola-${slug}/`,
  })),
  ...EN_GLASS_CURTAINS_LOCATIONS.map((slug) => ({
    es: `/cortinas-de-cristal-${slug}/`,
    en: `/en/glass-curtains-${slug}/`,
  })),
  ...EN_SHADE_SAILS_LOCATIONS.map((slug) => ({
    es: `/velas-sombra-${slug}/`,
    en: `/en/shade-sails-${slug}/`,
  })),
  ...EN_PVC_WINDOWS_LOCATIONS.map((slug) => ({
    es: `/ventanas-pvc-${slug}/`,
    en: `/en/pvc-windows-${slug}/`,
  })),
  // Legal
  { es: "/aviso-legal/", en: "/en/legal-notice/" },
  { es: "/politica-privacidad/", en: "/en/privacy-policy/" },
  { es: "/politica-cookies/", en: "/en/cookie-policy/" },
];

const PATH_TO_PAIR = new Map<string, { es: string; en: string }>();
for (const pair of HREFLANG_PAIRS) {
  PATH_TO_PAIR.set(pair.es, pair);
  PATH_TO_PAIR.set(pair.en, pair);
}

/**
 * Render a single <url> entry with optional hreflang xhtml:link blocks.
 * `pathOnly` is the path including leading + trailing slash.
 */
export async function renderUrlEntry(
  pathOnly: string,
  changefreq?: string,
  priority?: number,
): Promise<string> {
  const overrides = await getBlogLastmodOverrides();
  const lastmod = overrides.get(pathOnly) ?? lastmodForPath(pathOnly);
  const fullUrl = `${SITE}${pathOnly}`;
  const pair = PATH_TO_PAIR.get(pathOnly);

  const links = pair
    ? [
        `    <xhtml:link rel="alternate" hreflang="es" href="${SITE}${pair.es}" />`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${pair.en}" />`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${pair.es}" />`,
      ].join("\n") + "\n"
    : "";

  const cf = changefreq ? `    <changefreq>${changefreq}</changefreq>\n` : "";
  const pr = priority !== undefined ? `    <priority>${priority.toFixed(1)}</priority>\n` : "";

  return `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
${cf}${pr}${links}  </url>\n`;
}

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Wrap a list of <url> entries in a urlset envelope */
export function urlsetEnvelope(body: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}</urlset>
`;
}

export async function buildUrlsetFromPaths(
  paths: string[],
  opts: { changefreq?: string; priority?: number } = {},
): Promise<string> {
  const entries: string[] = [];
  for (const p of paths) {
    entries.push(await renderUrlEntry(p, opts.changefreq, opts.priority));
  }
  return urlsetEnvelope(entries.join(""));
}
