import type { PageId } from "../i18n/slugs";

/**
 * The 20 SEO-targeted areas defined by the OptimToldos sitemap-seo brief.
 *
 * `slug` is the URL fragment used after the prefix:
 *   ES area page  → /toldos-{slug}/
 *   EN awnings    → /en/awnings-{slug}/
 *   EN pergolas   → /en/pergolas-{slug}/   (subset only)
 *   EN biocl.     → /en/bioclimatic-pergola-{slug}/   (subset only)
 *   EN curtains   → /en/glass-curtains-{slug}/   (subset only)
 *   ES product+zone → /pergolas-{slug}/, /pergola-bioclimatica-{slug}/, etc.
 *
 * `i` matches the existing i18n key `serviceAreas.location.{i}.name|body`
 * so location copy already translated for the hub page is reused on the
 * dedicated per-area pages.
 *
 * `area` and `priority` come from the brief (page 4): used to drive
 * sitemap priority and the in-page "region" label.
 */
export type SeoArea =
  | "south-cb"
  | "central"
  | "north-cb"
  | "orihuela-sub"
  | "vega-baja";

export interface SeoLocation {
  /** i18n index — points at serviceAreas.location.{i}.{name|body} */
  i: number;
  /** URL slug (PDF-compliant) */
  slug: string;
  /** Display name in ES (matches existing i18n) */
  name: string;
  /** Region grouping per PDF section 3 */
  area: SeoArea;
  /** Brief priority dot (orange = high, blue = medium, grey = low) */
  priority: "high" | "medium" | "low";
  /** Products that lead the local market — drives chip rows */
  products: PageId[];
}

export const SEO_LOCATIONS: SeoLocation[] = [
  { i: 1,  slug: "torrevieja",          name: "Torrevieja",            area: "south-cb",     priority: "high",   products: ["awnings", "pergolas"] },
  { i: 2,  slug: "orihuela-costa",      name: "Orihuela Costa",        area: "south-cb",     priority: "high",   products: ["pergolas", "awnings"] },
  { i: 5,  slug: "ciudad-quesada",      name: "Ciudad Quesada",        area: "south-cb",     priority: "high",   products: ["pergolas", "shade-sails"] },
  { i: 6,  slug: "guardamar",           name: "Guardamar del Segura",  area: "south-cb",     priority: "high",   products: ["awnings", "pergolas"] },
  { i: 7,  slug: "la-marina",           name: "La Marina (S. Fulgencio)", area: "south-cb",  priority: "high",   products: ["awnings", "shade-sails"] },
  { i: 8,  slug: "elche",               name: "Elche",                 area: "central",      priority: "high",   products: ["awnings", "pergolas", "glass-curtains", "pvc-windows"] },
  { i: 18, slug: "alicante",            name: "Alicante",              area: "central",      priority: "high",   products: ["awnings", "pergolas", "glass-curtains", "pvc-windows"] },
  { i: 9,  slug: "santa-pola",          name: "Santa Pola",            area: "central",      priority: "high",   products: ["awnings", "glass-curtains"] },
  { i: 10, slug: "gran-alacant",        name: "Gran Alacant",          area: "central",      priority: "medium", products: ["pergolas", "glass-curtains"] },
  { i: 17, slug: "benidorm",            name: "Benidorm",              area: "north-cb",     priority: "high",   products: ["awnings", "shade-sails"] },
  { i: 11, slug: "cabo-roig",           name: "Cabo Roig",             area: "orihuela-sub", priority: "medium", products: ["pergolas", "glass-curtains"] },
  { i: 3,  slug: "la-zenia",            name: "La Zenia",              area: "orihuela-sub", priority: "medium", products: ["pergolas", "glass-curtains"] },
  { i: 4,  slug: "punta-prima",         name: "Punta Prima",           area: "orihuela-sub", priority: "medium", products: ["awnings", "pergolas"] },
  { i: 12, slug: "villamartin",         name: "Villamartín",           area: "orihuela-sub", priority: "medium", products: ["pergolas", "awnings"] },
  { i: 13, slug: "playa-flamenca",      name: "Playa Flamenca",        area: "orihuela-sub", priority: "medium", products: ["awnings", "glass-curtains"] },
  { i: 14, slug: "campoamor",           name: "Campoamor / Dehesa",    area: "orihuela-sub", priority: "medium", products: ["pergolas", "shade-sails"] },
  { i: 15, slug: "los-balcones",        name: "Los Balcones",          area: "vega-baja",    priority: "low",    products: ["awnings", "pergolas"] },
  { i: 16, slug: "rojales",             name: "Rojales",               area: "vega-baja",    priority: "low",    products: ["awnings", "glass-curtains"] },
  { i: 19, slug: "san-miguel-salinas",  name: "San Miguel de Salinas", area: "vega-baja",    priority: "low",    products: ["awnings", "pergolas"] },
  { i: 20, slug: "dolores",             name: "Dolores",               area: "vega-baja",    priority: "low",    products: ["awnings", "shade-sails"] },
];

export const SEO_LOCATIONS_BY_SLUG: Record<string, SeoLocation> = Object.fromEntries(
  SEO_LOCATIONS.map((l) => [l.slug, l]),
);

/** Subset of locations that get an EN /pergolas-X/ page. Must match the
 *  allowed-set in [src/pages/en/pergolas-[slug].astro] getStaticPaths. */
export const EN_PERGOLAS_LOCATIONS = [
  "torrevieja", "orihuela-costa", "ciudad-quesada", "elche", "alicante", "benidorm",
] as const;

/** Subset that get /en/bioclimatic-pergola-X/ pages (PDF §4) */
export const EN_BIOCLIMATIC_LOCATIONS = ["torrevieja", "orihuela-costa"] as const;

/** Subset that get /en/glass-curtains-X/ pages. Must match the allowed-set
 *  in [src/pages/en/glass-curtains-[slug].astro] getStaticPaths. */
export const EN_GLASS_CURTAINS_LOCATIONS = [
  "torrevieja", "elche", "alicante", "benidorm", "orihuela-costa",
] as const;

/** Subset that get /en/shade-sails-X/ pages. Mirrors ES_SHADE_SAILS_ZONES so
 *  the chip roster on /en/shade-sails/ matches the ES hub (2026-05-01). */
export const EN_SHADE_SAILS_LOCATIONS = [
  "torrevieja", "ciudad-quesada", "la-marina", "benidorm", "campoamor", "dolores",
] as const;

/** Subset that get /en/pvc-windows-X/ pages. Mirrors ES_PVC_WINDOWS_ZONES
 *  for chip-roster parity (2026-05-01). */
export const EN_PVC_WINDOWS_LOCATIONS = [
  "elche", "alicante", "torrevieja", "benidorm", "orihuela-costa", "santa-pola",
] as const;

/** ES product+zone combinations (PDF §5). Each maps to a unique page. */
export const ES_PERGOLAS_ZONES = [
  "torrevieja", "orihuela-costa", "ciudad-quesada", "elche", "alicante", "benidorm",
] as const;

export const ES_BIOCLIMATIC_ZONES = [
  "torrevieja", "orihuela-costa", "elche", "alicante", "ciudad-quesada",
] as const;

export const ES_GLASS_CURTAINS_ZONES = [
  "torrevieja", "elche", "alicante", "orihuela-costa", "benidorm",
] as const;

export const ES_PERGOLA_INSTALL_ZONES = [
  "ciudad-quesada", "la-marina",
] as const;

export const ES_SHADE_SAILS_ZONES = [
  "torrevieja", "ciudad-quesada", "la-marina", "benidorm", "campoamor", "dolores",
] as const;

export const ES_HOSPITALITY_AWNINGS_ZONES = [
  "benidorm", "torrevieja", "alicante",
] as const;

/** ES PVC windows + zone pages (added 2026-04-30). */
export const ES_PVC_WINDOWS_ZONES = [
  "elche", "alicante", "torrevieja", "benidorm", "orihuela-costa", "santa-pola",
] as const;
