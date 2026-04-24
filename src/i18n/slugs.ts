import type { Locale } from "./index";

export type PageId =
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
  | "licence-guide"
  | "bioclimatic-vs-aluminium"
  | "awning-guide"
  | "glass-curtains-guide";

export const slugMap: Record<PageId, Record<Locale, string>> = {
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
  "licence-guide": { es: "guia-licencias-pergolas-toldos-alicante", en: "planning-permission-pergola-awning-alicante" },
  "bioclimatic-vs-aluminium": { es: "pergola-bioclimatica-vs-aluminio", en: "bioclimatic-vs-aluminium-pergola" },
  "awning-guide": { es: "guia-elegir-toldo-costa-blanca", en: "choosing-the-right-awning-costa-blanca" },
  "glass-curtains-guide": { es: "guia-cortinas-cristal-terraza", en: "glass-curtains-guide" },
};

/** Get the localized path for a page (without base prefix) */
export function getLocalizedSlug(pageId: PageId, locale: Locale): string {
  const slug = slugMap[pageId][locale];
  const prefix = locale === "es" ? "" : `/${locale}`;
  return slug ? `${prefix}/${slug}` : `${prefix}/`;
}
