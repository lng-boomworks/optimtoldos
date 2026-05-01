import type { PageId } from "../i18n/slugs";
import type { Locale } from "../i18n/index";
import { url } from "./paths";
import {
  ES_PERGOLAS_ZONES,
  ES_GLASS_CURTAINS_ZONES,
  ES_SHADE_SAILS_ZONES,
  ES_PVC_WINDOWS_ZONES,
  EN_PERGOLAS_LOCATIONS,
  EN_GLASS_CURTAINS_LOCATIONS,
  EN_SHADE_SAILS_LOCATIONS,
  EN_PVC_WINDOWS_LOCATIONS,
} from "../data/seoLocations";

/** Slugs that have an /en/awnings-{slug}/ page (PDF §4 — 14 of 20). */
export const EN_AREA_SLUGS = new Set<string>([
  "torrevieja","orihuela-costa","ciudad-quesada","guardamar","la-marina","elche",
  "alicante","santa-pola","gran-alacant","benidorm","cabo-roig","la-zenia",
  "punta-prima","villamartin",
]);

const ES_PERGOLAS = new Set<string>(ES_PERGOLAS_ZONES);
const ES_GLASS_CURTAINS = new Set<string>(ES_GLASS_CURTAINS_ZONES);
const ES_SHADE_SAILS = new Set<string>(ES_SHADE_SAILS_ZONES);
const ES_PVC_WINDOWS = new Set<string>(ES_PVC_WINDOWS_ZONES);
const EN_PERGOLAS = new Set<string>(EN_PERGOLAS_LOCATIONS);
const EN_GLASS_CURTAINS = new Set<string>(EN_GLASS_CURTAINS_LOCATIONS);
const EN_SHADE_SAILS = new Set<string>(EN_SHADE_SAILS_LOCATIONS);
const EN_PVC_WINDOWS = new Set<string>(EN_PVC_WINDOWS_LOCATIONS);

/** URL of the area landing page for a slug — `/toldos-X/` (ES) or
 *  `/en/awnings-X/` (EN, where translated; falls back to the ES URL otherwise).
 *  Use this for chips/captions that surface a location without a product. */
export function areaLandingUrl(slug: string, locale: Locale): string {
  if (locale === "en" && EN_AREA_SLUGS.has(slug)) {
    return url(`/en/awnings-${slug}/`);
  }
  return url(`/toldos-${slug}/`);
}

/** True if a dedicated (product, area) page exists for this combination.
 *  When false, `productAreaUrl` falls back to the area landing page — but
 *  that landing page is *awnings-themed*, so consumers showing per-product
 *  chips should filter by this predicate to avoid misleading users with
 *  chips that lead to the wrong product's page. */
export function hasProductAreaPage(
  product: PageId,
  slug: string,
  locale: Locale,
): boolean {
  if (locale === "es") {
    if (product === "awnings") return true; // /toldos-{slug}/ is the awnings+area page; exists for all 20
    if (product === "pergolas") return ES_PERGOLAS.has(slug);
    if (product === "glass-curtains") return ES_GLASS_CURTAINS.has(slug);
    if (product === "shade-sails") return ES_SHADE_SAILS.has(slug);
    if (product === "pvc-windows") return ES_PVC_WINDOWS.has(slug);
    return false;
  }
  if (product === "awnings") return EN_AREA_SLUGS.has(slug);
  if (product === "pergolas") return EN_PERGOLAS.has(slug);
  if (product === "glass-curtains") return EN_GLASS_CURTAINS.has(slug);
  if (product === "shade-sails") return EN_SHADE_SAILS.has(slug);
  if (product === "pvc-windows") return EN_PVC_WINDOWS.has(slug);
  return false;
}

/** URL of the most specific (product, area) page that exists. Falls back to
 *  the area landing page when no dedicated combo route is available — never
 *  routes through the generic product hub (`/toldos/`, `/pergolas/` etc.). */
export function productAreaUrl(
  product: PageId,
  slug: string,
  locale: Locale,
): string {
  if (locale === "es") {
    if (product === "awnings") return url(`/toldos-${slug}/`);
    if (product === "pergolas" && ES_PERGOLAS.has(slug)) return url(`/pergolas-${slug}/`);
    if (product === "glass-curtains" && ES_GLASS_CURTAINS.has(slug)) return url(`/cortinas-de-cristal-${slug}/`);
    if (product === "shade-sails" && ES_SHADE_SAILS.has(slug)) return url(`/velas-sombra-${slug}/`);
    if (product === "pvc-windows" && ES_PVC_WINDOWS.has(slug)) return url(`/ventanas-pvc-${slug}/`);
    return areaLandingUrl(slug, locale);
  }

  if (product === "awnings" && EN_AREA_SLUGS.has(slug)) return url(`/en/awnings-${slug}/`);
  if (product === "pergolas" && EN_PERGOLAS.has(slug)) return url(`/en/pergolas-${slug}/`);
  if (product === "glass-curtains" && EN_GLASS_CURTAINS.has(slug)) return url(`/en/glass-curtains-${slug}/`);
  if (product === "shade-sails" && EN_SHADE_SAILS.has(slug)) return url(`/en/shade-sails-${slug}/`);
  if (product === "pvc-windows" && EN_PVC_WINDOWS.has(slug)) return url(`/en/pvc-windows-${slug}/`);
  return areaLandingUrl(slug, locale);
}
