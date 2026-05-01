import type { Locale } from "./index";

export type PageId =
  // Core
  | "home"
  | "awnings"
  | "pergolas"
  | "glass-curtains"
  | "shade-sails"
  | "pvc-windows"
  | "gallery"
  | "blog"
  | "contact"
  | "about-us"
  | "quote"
  | "legal-notice"
  | "privacy-policy"
  | "cookie-policy"
  | "service-areas"
  // Authority guides
  | "licence-guide"
  | "bioclimatic-vs-aluminium"
  | "awning-guide"
  | "glass-curtains-guide"
  | "awning-prices-2026"
  | "awning-maintenance"
  | "communities-guide"
  | "wind-sensor-guide"
  // Product sub-pages (awnings)
  | "awnings-cassette"
  | "awnings-arm"
  | "awnings-zip-screen"
  | "awnings-straight-drop"
  | "awnings-motorisation"
  // Product sub-pages (pergolas)
  | "pergolas-bioclimatic"
  | "pergolas-aluminium"
  | "pergolas-sliding-awning";

export const slugMap: Record<PageId, Record<Locale, string>> = {
  // Core
  home: { es: "", en: "" },
  awnings: { es: "toldos", en: "awnings" },
  pergolas: { es: "pergolas", en: "pergolas" },
  "glass-curtains": { es: "cortinas-de-cristal", en: "glass-curtains" },
  "shade-sails": { es: "velas-de-sombra", en: "shade-sails" },
  "pvc-windows": { es: "ventanas-pvc", en: "pvc-windows" },
  gallery: { es: "galeria", en: "gallery" },
  blog: { es: "blog", en: "blog" },
  contact: { es: "contacto", en: "contact" },
  "about-us": { es: "sobre-nosotros", en: "about-us" },
  quote: { es: "presupuesto", en: "free-quote" },
  "legal-notice": { es: "aviso-legal", en: "legal-notice" },
  "privacy-policy": { es: "politica-privacidad", en: "privacy-policy" },
  "cookie-policy": { es: "politica-cookies", en: "cookie-policy" },
  "service-areas": { es: "zonas-de-servicio", en: "service-areas" },
  // Authority guides
  "licence-guide": { es: "guia-licencias-pergolas-toldos-alicante", en: "planning-permission-pergola-awning-alicante" },
  "bioclimatic-vs-aluminium": { es: "pergola-bioclimatica-vs-aluminio", en: "bioclimatic-vs-aluminium-pergola" },
  "awning-guide": { es: "guia-elegir-toldo-costa-blanca", en: "choosing-the-right-awning-costa-blanca" },
  "glass-curtains-guide": { es: "guia-cortinas-cristal-terraza", en: "glass-curtains-guide" },
  "awning-prices-2026": { es: "precio-toldos-alicante-2026", en: "awning-prices-alicante-2026" },
  "awning-maintenance": { es: "mantenimiento-toldos-costa-blanca", en: "awning-maintenance-costa-blanca" },
  "communities-guide": { es: "toldos-comunidades-propietarios-alicante", en: "awnings-residents-communities-alicante" },
  "wind-sensor-guide": { es: "sensor-viento-toldos-motorizados", en: "wind-sensor-motorised-awnings" },
  // Product sub-pages (awnings)
  "awnings-cassette": { es: "toldos-cofre", en: "cassette-awnings" },
  "awnings-arm": { es: "toldos-brazo-extensible", en: "retractable-arm-awnings" },
  "awnings-zip-screen": { es: "toldos-verticales-zip", en: "zip-screen-awnings" },
  "awnings-straight-drop": { es: "toldos-punto-recto", en: "straight-drop-awnings" },
  "awnings-motorisation": { es: "toldos-motorizacion", en: "awning-motorisation" },
  // Product sub-pages (pergolas)
  "pergolas-bioclimatic": { es: "pergolas-bioclimaticas", en: "bioclimatic-pergolas" },
  "pergolas-aluminium": { es: "pergolas-aluminio", en: "aluminium-pergolas" },
  "pergolas-sliding-awning": { es: "pergola-toldo-deslizante", en: "sliding-awning-pergolas" },
};

/** Get the localized path for a page (without base prefix) */
export function getLocalizedSlug(pageId: PageId, locale: Locale): string {
  const slug = slugMap[pageId][locale];
  const prefix = locale === "es" ? "" : `/${locale}`;
  return slug ? `${prefix}/${slug}` : `${prefix}/`;
}
