import type { APIRoute } from "astro";
import {
  SITE,
  ZONAS_ES_PATHS,
  ZONAS_EN_PATHS,
  PRODUCT_PATHS,
  GUIAS_PATHS,
  PRODUCTO_ZONA_PATHS,
  escapeXml,
} from "../utils/sitemapData";
import { SEO_LOCATIONS } from "../data/seoLocations";

/**
 * Image sitemap (PDF §7 — flagged as "key competitive differentiator").
 *
 * Each <url> entry can list up to 1000 images. We pair each indexable page
 * with 1-3 representative public/ images and emit captions that embed the
 * page's location/topic, so even when the underlying image filenames are
 * generic (pre-rename) the caption carries the geo signal.
 *
 * Once client supplies geolocated photos, swap the IMAGE_BANK entries below
 * to point at the renamed files (e.g. `cassette-awning-pool-torrevieja.jpg`).
 */

interface ImageEntry {
  loc: string;
  caption: string;
  title?: string;
}

interface PageImages {
  pagePath: string;
  images: ImageEntry[];
}

// Library of currently-available production images. Until client supplies
// geolocated photos, these placeholders are reused — caption carries the geo.
const HERO_HOME = `${SITE}/images/gallery/hero-home.webp`;
const HERO_TOLDOS = `${SITE}/images/gallery/hero-toldos.webp`;
const HERO_PERGOLAS = `${SITE}/images/pergolas/hero-pergolas.webp`;
const HERO_VENTANAS = `${SITE}/images/gallery/hero-ventanas.webp`;
const TOLDO_COFRE = `${SITE}/images/gallery/toldo-cofre.webp`;
const TOLDO_BRAZO = `${SITE}/images/gallery/toldo-brazo-extensible.webp`;
const PERGOLA_BIO = `${SITE}/images/pergolas/pergola-bioclimatica.webp`;
const PERGOLA_LAMAS = `${SITE}/images/pergolas/pergola-lamas.webp`;
const VENTANAS_CORTIZO = `${SITE}/images/ventanas/ventanas-cortizo.webp`;

function imagesForArea(slug: string, name: string, locale: "es" | "en"): ImageEntry[] {
  const inLocation = locale === "es" ? "en" : "in";
  return [
    {
      loc: HERO_TOLDOS,
      caption: `Toldo cofre ${inLocation} ${name} - Optim Toldos`,
      title: `${locale === "es" ? "Toldos en" : "Awnings in"} ${name}`,
    },
    {
      loc: PERGOLA_BIO,
      caption: `${locale === "es" ? "Pérgola bioclimática" : "Bioclimatic pergola"} ${inLocation} ${name}`,
      title: `${locale === "es" ? "Pérgolas" : "Pergolas"} ${name}`,
    },
    {
      loc: TOLDO_BRAZO,
      caption: `${locale === "es" ? "Toldo brazo extensible" : "Retractable arm awning"} ${inLocation} ${name}`,
    },
  ];
}

function imagesForProduct(path: string): ImageEntry[] {
  const isEn = path.startsWith("/en/");
  if (path.includes("toldos") || path.includes("awnings") || path.includes("cassette") || path.includes("arm-awn")) {
    return [
      { loc: HERO_TOLDOS, caption: isEn ? "Custom awning installation Costa Blanca" : "Toldo a medida Costa Blanca" },
      { loc: TOLDO_COFRE, caption: isEn ? "Cassette awning Alicante" : "Toldo cofre Alicante" },
    ];
  }
  if (path.includes("pergolas") || path.includes("bioclimatic") || path.includes("aluminium") || path.includes("aluminio") || path.includes("deslizante") || path.includes("sliding")) {
    return [
      { loc: HERO_PERGOLAS, caption: isEn ? "Bioclimatic pergola Costa Blanca" : "Pérgola bioclimática Costa Blanca" },
      { loc: PERGOLA_BIO, caption: isEn ? "Motorised louvre pergola Alicante" : "Pérgola de lamas motorizada Alicante" },
      { loc: PERGOLA_LAMAS, caption: isEn ? "Adjustable louvre pergola roof" : "Cubierta de lamas orientables" },
    ];
  }
  if (path.includes("cortinas") || path.includes("glass-curt")) {
    return [
      { loc: HERO_TOLDOS, caption: isEn ? "Frameless glass curtains terrace" : "Cortinas de cristal sin perfiles" },
    ];
  }
  if (path.includes("velas") || path.includes("shade-sails")) {
    return [
      { loc: HERO_HOME, caption: isEn ? "Shade sails pool Costa Blanca" : "Velas de sombra piscina Costa Blanca" },
    ];
  }
  if (path.includes("ventanas") || path.includes("pvc-windows")) {
    return [
      { loc: HERO_VENTANAS, caption: isEn ? "PVC windows Cortizo Alicante" : "Ventanas PVC Cortizo Alicante" },
      { loc: VENTANAS_CORTIZO, caption: isEn ? "Tilt-and-turn PVC window Cortizo" : "Ventana oscilobatiente PVC Cortizo" },
    ];
  }
  return [{ loc: HERO_HOME, caption: isEn ? "Optim Toldos installations" : "Instalaciones de Optim Toldos" }];
}

function imagesForProductZone(path: string): ImageEntry[] {
  // Extract the trailing "-{slug}" piece for caption colour. Match against any
  // canonical SEO_LOCATIONS slug so newly-added combos get location-tagged
  // captions automatically.
  const slugMatch = SEO_LOCATIONS.find((l) =>
    path.endsWith(`-${l.slug}/`),
  );
  const name = slugMatch?.name ?? "Costa Blanca";
  return imagesForProduct(path).map((img) => ({
    ...img,
    caption: `${img.caption} - ${name}`,
  }));
}

function imagesForGuide(path: string): ImageEntry[] {
  const isEn = path.startsWith("/en/");
  if (path.includes("precio") || path.includes("prices")) {
    return [{ loc: HERO_TOLDOS, caption: isEn ? "Awning prices Alicante 2026" : "Precios toldos Alicante 2026" }];
  }
  if (path.includes("mantenimiento") || path.includes("maintenance")) {
    return [{ loc: HERO_TOLDOS, caption: isEn ? "Awning maintenance Costa Blanca" : "Mantenimiento toldos Costa Blanca" }];
  }
  if (path.includes("comunidades") || path.includes("communities")) {
    return [{ loc: HERO_TOLDOS, caption: isEn ? "Awning approval residents community" : "Aprobación toldo comunidad de propietarios" }];
  }
  if (path.includes("sensor")) {
    return [{ loc: HERO_TOLDOS, caption: isEn ? "Wind sensor motorised awning" : "Sensor de viento toldo motorizado" }];
  }
  if (path.includes("licencias") || path.includes("planning")) {
    return [{ loc: HERO_PERGOLAS, caption: isEn ? "Pergola planning permission Alicante" : "Licencia obra pérgola Alicante" }];
  }
  if (path.includes("bioclimatica-vs") || path.includes("bioclimatic-vs")) {
    return [{ loc: PERGOLA_BIO, caption: isEn ? "Bioclimatic vs aluminium pergola" : "Pérgola bioclimática vs aluminio" }];
  }
  if (path.includes("cortinas") || path.includes("glass-curt")) {
    return [{ loc: HERO_TOLDOS, caption: isEn ? "Glass curtain enclosure guide" : "Guía cortinas de cristal" }];
  }
  return [{ loc: HERO_TOLDOS, caption: isEn ? "Costa Blanca awning guide" : "Guía toldos Costa Blanca" }];
}

function buildPageImages(): PageImages[] {
  const result: PageImages[] = [];

  // Area pages (ES + EN) — caption embeds location name → geo signal
  for (const path of ZONAS_ES_PATHS) {
    const slug = path.replace(/^\/toldos-|\/$/g, "");
    const loc = SEO_LOCATIONS.find((l) => l.slug === slug);
    if (!loc) continue;
    result.push({ pagePath: path, images: imagesForArea(slug, loc.name, "es") });
  }
  for (const path of ZONAS_EN_PATHS) {
    const slug = path.replace(
      /^\/en\/(?:awnings|pergolas|bioclimatic-pergola|glass-curtains|shade-sails|pvc-windows)-|\/$/g,
      "",
    );
    const loc = SEO_LOCATIONS.find((l) => l.slug === slug);
    if (!loc) continue;
    // Awnings pages get the 3-image awnings-themed set; non-awnings focuses
    // (pergolas, glass curtains, shade sails, PVC windows) route through the
    // product-keyword matcher so the captions reflect the actual product.
    const images = path.startsWith("/en/awnings-")
      ? imagesForArea(slug, loc.name, "en")
      : imagesForProductZone(path);
    result.push({ pagePath: path, images });
  }

  // Product hubs + sub-products
  for (const path of PRODUCT_PATHS) {
    result.push({ pagePath: path, images: imagesForProduct(path) });
  }

  // Product+zone (ES)
  for (const path of PRODUCTO_ZONA_PATHS) {
    result.push({ pagePath: path, images: imagesForProductZone(path) });
  }

  // Guides
  for (const path of GUIAS_PATHS) {
    result.push({ pagePath: path, images: imagesForGuide(path) });
  }

  return result;
}

export const GET: APIRoute = async () => {
  const pages = buildPageImages();
  const entries = pages
    .map(({ pagePath, images }) => {
      const imgBlocks = images
        .map(
          (img) => `      <image:image>
        <image:loc>${escapeXml(img.loc)}</image:loc>
        <image:caption>${escapeXml(img.caption)}</image:caption>${img.title ? `\n        <image:title>${escapeXml(img.title)}</image:title>` : ""}
      </image:image>`,
        )
        .join("\n");
      return `  <url>
    <loc>${escapeXml(`${SITE}${pagePath}`)}</loc>
${imgBlocks}
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
