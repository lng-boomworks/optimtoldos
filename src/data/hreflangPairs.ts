import {
  EN_PERGOLAS_LOCATIONS,
  EN_BIOCLIMATIC_LOCATIONS,
  EN_GLASS_CURTAINS_LOCATIONS,
  EN_SHADE_SAILS_LOCATIONS,
  EN_PVC_WINDOWS_LOCATIONS,
} from "./seoLocations";

/** EN area-page slugs (the 14 SEO_LOCATIONS that have an /en/awnings-X/ page).
 *  Source-of-truth for which EN combo URLs exist. */
export const EN_AWNINGS_ZONES = [
  "torrevieja","orihuela-costa","ciudad-quesada","guardamar","la-marina","elche",
  "alicante","santa-pola","gran-alacant","benidorm","cabo-roig","la-zenia",
  "punta-prima","villamartin",
] as const;

export interface HreflangPair {
  es: string;
  en: string;
}

/** Reciprocal ES↔EN URL pairs. Pure data — safe to import in both server
 *  contexts (sitemap-*.xml.ts) and client contexts (LanguageSwitcher.tsx). */
export const HREFLANG_PAIRS: HreflangPair[] = [
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
  // Pillar guides (existing)
  { es: "/guia-licencias-pergolas-toldos-alicante/", en: "/en/planning-permission-pergola-awning-alicante/" },
  { es: "/pergola-bioclimatica-vs-aluminio/", en: "/en/bioclimatic-vs-aluminium-pergola/" },
  { es: "/guia-elegir-toldo-costa-blanca/", en: "/en/choosing-the-right-awning-costa-blanca/" },
  { es: "/guia-cortinas-cristal-terraza/", en: "/en/glass-curtains-guide/" },
  // Pillar guides (new)
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
  // Area pairs (14 — derived from EN_AWNINGS_ZONES)
  ...EN_AWNINGS_ZONES.map((slug) => ({
    es: `/toldos-${slug}/`,
    en: `/en/awnings-${slug}/`,
  })),
  // Product+zone bilingual pairs — auto-derived from each EN_*_LOCATIONS set
  // so a new combo page added by widening that set automatically registers
  // its hreflang pair on both sides.
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
  // Translated blog post pairs (mirrored from astro.config.mjs HREFLANG_PAIRS).
  // The 3 ES-only blog posts are intentionally absent — see open-items #11b.
  { es: "/blog/guia-toldos-alicante/", en: "/en/blog/guide-awnings-alicante/" },
  { es: "/blog/pergola-bioclimatica-vs-toldo/", en: "/en/blog/pergola-vs-awning/" },
  { es: "/blog/ventanas-pvc-ahorro-energetico/", en: "/en/blog/pvc-windows-energy-savings/" },
  { es: "/blog/velas-sombra-piscina/", en: "/en/blog/pool-shade-sails-alicante/" },
  { es: "/blog/cerrar-terraza-cortinas-cristal/", en: "/en/blog/glass-curtain-terrace-enclosure-alicante/" },
  { es: "/blog/pergolas-costa-blanca-norte/", en: "/en/blog/pergolas-costa-blanca-north/" },
  { es: "/blog/normativa-toldos-comunidad-propietarios/", en: "/en/blog/awning-community-rules-alicante/" },
];

/** Map from either side of a pair → the full pair. Used to look up an
 *  alternate URL given the current path. Both leading and trailing slashes
 *  must match exactly when querying. */
export const PATH_TO_PAIR: Map<string, HreflangPair> = (() => {
  const m = new Map<string, HreflangPair>();
  for (const pair of HREFLANG_PAIRS) {
    m.set(pair.es, pair);
    m.set(pair.en, pair);
  }
  return m;
})();

/** Product hub fallbacks — used when the current page is a combo URL whose
 *  other-locale partner doesn't exist (e.g. an ES-only zone page). Routing
 *  the user to the matching product hub is a better UX than to the homepage. */
const PRODUCT_HUB_FALLBACKS: Array<{
  esPrefix: string;
  enPrefix: string;
  esHub: string;
  enHub: string;
}> = [
  { esPrefix: "/toldos-",                enPrefix: "/en/awnings-",             esHub: "/toldos/",              enHub: "/en/awnings/" },
  { esPrefix: "/pergolas-",              enPrefix: "/en/pergolas-",            esHub: "/pergolas/",            enHub: "/en/pergolas/" },
  { esPrefix: "/pergola-bioclimatica-",  enPrefix: "/en/bioclimatic-pergola-", esHub: "/pergolas/",            enHub: "/en/pergolas/" },
  { esPrefix: "/cortinas-de-cristal-",   enPrefix: "/en/glass-curtains-",      esHub: "/cortinas-de-cristal/", enHub: "/en/glass-curtains/" },
  { esPrefix: "/velas-sombra-",          enPrefix: "/en/shade-sails-",         esHub: "/velas-de-sombra/",     enHub: "/en/shade-sails/" },
  { esPrefix: "/ventanas-pvc-",          enPrefix: "/en/pvc-windows-",         esHub: "/ventanas-pvc/",        enHub: "/en/pvc-windows/" },
];

/** Resolve the alternate-locale URL for a given path. Pure function — usable
 *  from Astro server context AND from React client code. */
export function alternateLocaleUrl(
  currentPath: string,
  currentLocale: "es" | "en",
): string {
  // 1) Exact pair lookup (covers all canonical product+area combos).
  const exact =
    PATH_TO_PAIR.get(currentPath) ??
    PATH_TO_PAIR.get(currentPath.replace(/\/$/, "")) ??
    PATH_TO_PAIR.get(currentPath + "/");
  if (exact) return currentLocale === "es" ? exact.en : exact.es;

  // 2) Blog post fallback — slugs differ; route untranslated posts to the
  //    other locale's blog index.
  if (currentLocale === "es" && currentPath.startsWith("/blog/")) return "/en/blog/";
  if (currentLocale === "en" && currentPath.startsWith("/en/blog/")) return "/blog/";

  // 3) Combo URL with no partner → product hub fallback.
  for (const { esPrefix, enPrefix, esHub, enHub } of PRODUCT_HUB_FALLBACKS) {
    if (currentLocale === "es" && currentPath.startsWith(esPrefix)) return enHub;
    if (currentLocale === "en" && currentPath.startsWith(enPrefix)) return esHub;
  }

  // 4) Last-resort fallback — other locale's homepage.
  return currentLocale === "es" ? "/en/" : "/";
}
