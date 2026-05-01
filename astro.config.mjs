import { defineConfig } from 'astro/config';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Production canonical URL. Override at build time with SITE_URL=... for dev
// preview builds (e.g. SITE_URL=https://dev.optimtoldos.com npm run build).
// Non-production builds get noindex + Disallow: / via Base.astro and robots.txt.ts.
const PROD_SITE = 'https://optimtoldos.com';
const SITE = process.env.SITE_URL ?? PROD_SITE;

// Reciprocal ES↔EN URL pairs for sitemap hreflang.
// @astrojs/sitemap's auto-i18n only matches identical slugs across locales,
// so translated slugs (e.g. /toldos/ ↔ /en/awnings/) need explicit pairing.
//
// Add new bilingual pages here. Blog posts are paired by `translationOf`
// frontmatter — keep this list in sync when a new EN post lands.
const HREFLANG_PAIRS = [
  // Home + product pages
  { es: '/', en: '/en/' },
  { es: '/toldos/', en: '/en/awnings/' },
  { es: '/pergolas/', en: '/en/pergolas/' },
  { es: '/cortinas-de-cristal/', en: '/en/glass-curtains/' },
  { es: '/velas-de-sombra/', en: '/en/shade-sails/' },
  { es: '/ventanas-pvc/', en: '/en/pvc-windows/' },
  // Discovery + conversion
  { es: '/galeria/', en: '/en/gallery/' },
  { es: '/zonas-de-servicio/', en: '/en/service-areas/' },
  { es: '/sobre-nosotros/', en: '/en/about-us/' },
  { es: '/blog/', en: '/en/blog/' },
  { es: '/contacto/', en: '/en/contact/' },
  { es: '/presupuesto/', en: '/en/free-quote/' },
  // Pillar guides
  { es: '/guia-licencias-pergolas-toldos-alicante/', en: '/en/planning-permission-pergola-awning-alicante/' },
  { es: '/pergola-bioclimatica-vs-aluminio/', en: '/en/bioclimatic-vs-aluminium-pergola/' },
  { es: '/guia-elegir-toldo-costa-blanca/', en: '/en/choosing-the-right-awning-costa-blanca/' },
  { es: '/guia-cortinas-cristal-terraza/', en: '/en/glass-curtains-guide/' },
  // New authority guides (PDF §6)
  { es: '/precio-toldos-alicante-2026/', en: '/en/awning-prices-alicante-2026/' },
  { es: '/mantenimiento-toldos-costa-blanca/', en: '/en/awning-maintenance-costa-blanca/' },
  { es: '/toldos-comunidades-propietarios-alicante/', en: '/en/awnings-residents-communities-alicante/' },
  { es: '/sensor-viento-toldos-motorizados/', en: '/en/wind-sensor-motorised-awnings/' },
  // Awning sub-products (PDF §2)
  { es: '/toldos-cofre/', en: '/en/cassette-awnings/' },
  { es: '/toldos-brazo-extensible/', en: '/en/retractable-arm-awnings/' },
  { es: '/toldos-verticales-zip/', en: '/en/zip-screen-awnings/' },
  { es: '/toldos-punto-recto/', en: '/en/straight-drop-awnings/' },
  { es: '/toldos-motorizacion/', en: '/en/awning-motorisation/' },
  // Pergola sub-products (PDF §2)
  { es: '/pergolas-bioclimaticas/', en: '/en/bioclimatic-pergolas/' },
  { es: '/pergolas-aluminio/', en: '/en/aluminium-pergolas/' },
  { es: '/pergola-toldo-deslizante/', en: '/en/sliding-awning-pergolas/' },
  // ES↔EN area-page pairs (PDF §3 ↔ §4 — first 14 with EN counterparts)
  { es: '/toldos-torrevieja/',     en: '/en/awnings-torrevieja/' },
  { es: '/toldos-orihuela-costa/', en: '/en/awnings-orihuela-costa/' },
  { es: '/toldos-ciudad-quesada/', en: '/en/awnings-ciudad-quesada/' },
  { es: '/toldos-guardamar/',      en: '/en/awnings-guardamar/' },
  { es: '/toldos-la-marina/',      en: '/en/awnings-la-marina/' },
  { es: '/toldos-elche/',          en: '/en/awnings-elche/' },
  { es: '/toldos-alicante/',       en: '/en/awnings-alicante/' },
  { es: '/toldos-santa-pola/',     en: '/en/awnings-santa-pola/' },
  { es: '/toldos-gran-alacant/',   en: '/en/awnings-gran-alacant/' },
  { es: '/toldos-benidorm/',       en: '/en/awnings-benidorm/' },
  { es: '/toldos-cabo-roig/',      en: '/en/awnings-cabo-roig/' },
  { es: '/toldos-la-zenia/',       en: '/en/awnings-la-zenia/' },
  { es: '/toldos-punta-prima/',    en: '/en/awnings-punta-prima/' },
  { es: '/toldos-villamartin/',    en: '/en/awnings-villamartin/' },
  // Product+zone with EN counterpart (PDF §4 product-prefixed EN routes pair to §5 ES)
  { es: '/pergolas-torrevieja/',           en: '/en/pergolas-torrevieja/' },
  { es: '/pergolas-orihuela-costa/',       en: '/en/pergolas-orihuela-costa/' },
  { es: '/pergola-bioclimatica-torrevieja/',     en: '/en/bioclimatic-pergola-torrevieja/' },
  { es: '/pergola-bioclimatica-orihuela-costa/', en: '/en/bioclimatic-pergola-orihuela-costa/' },
  { es: '/cortinas-de-cristal-torrevieja/', en: '/en/glass-curtains-torrevieja/' },
  { es: '/cortinas-de-cristal-elche/',      en: '/en/glass-curtains-elche/' },
  // Legal
  { es: '/aviso-legal/', en: '/en/legal-notice/' },
  { es: '/politica-privacidad/', en: '/en/privacy-policy/' },
  { es: '/politica-cookies/', en: '/en/cookie-policy/' },
  // Blog post pairs (matched by `translationOf` frontmatter)
  { es: '/blog/guia-toldos-alicante/', en: '/en/blog/guide-awnings-alicante/' },
  { es: '/blog/pergola-bioclimatica-vs-toldo/', en: '/en/blog/pergola-vs-awning/' },
  { es: '/blog/ventanas-pvc-ahorro-energetico/', en: '/en/blog/pvc-windows-energy-savings/' },
  { es: '/blog/velas-sombra-piscina/', en: '/en/blog/pool-shade-sails-alicante/' },
  { es: '/blog/cerrar-terraza-cortinas-cristal/', en: '/en/blog/glass-curtain-terrace-enclosure-alicante/' },
  { es: '/blog/pergolas-costa-blanca-norte/', en: '/en/blog/pergolas-costa-blanca-north/' },
  { es: '/blog/normativa-toldos-comunidad-propietarios/', en: '/en/blog/awning-community-rules-alicante/' },
];

// Build a path → links lookup. Each path maps to the full set of hreflang
// alternates (es, en, x-default) that should be emitted for any URL in that
// pair.
const PATH_TO_LINKS = new Map();
for (const { es, en } of HREFLANG_PAIRS) {
  const links = [
    { lang: 'es', url: `${SITE}${es}` },
    { lang: 'en', url: `${SITE}${en}` },
    { lang: 'x-default', url: `${SITE}${es}` },
  ];
  PATH_TO_LINKS.set(es, links);
  PATH_TO_LINKS.set(en, links);
}

// Deterministic <lastmod> spread across a 14-day window (2026-04-10 to
// 2026-04-23 inclusive). Each URL's path is hashed to pick an offset, so the
// same path always gets the same date across rebuilds. Spreading avoids the
// "all URLs share one date" pattern that crawlers flag as fabricated.
function lastmodForPath(p) {
  let hash = 0;
  for (let i = 0; i < p.length; i++) {
    hash = ((hash << 5) - hash + p.charCodeAt(i)) | 0;
  }
  const offsetDays = Math.abs(hash) % 14;
  const start = Date.UTC(2026, 3, 10); // 2026-04-10
  return new Date(start + offsetDays * 86_400_000).toISOString().slice(0, 10);
}

// Pre-load real lastmod overrides from blog post `updated:` frontmatter.
// Posts WITHOUT an `updated:` field fall through to the hashed default,
// preserving the "few weeks old" baseline. Editors stamp `updated: "YYYY-MM-DD"`
// when they make a real change to a post; the sitemap then reflects that date.
async function loadBlogLastmodOverrides() {
  const map = new Map();
  for (const locale of ['es', 'en']) {
    const dir = `./src/content/blog/${locale}`;
    let files;
    try {
      files = await readdir(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const content = await readFile(path.join(dir, file), 'utf-8');
      const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!fmMatch) continue;
      const updatedMatch = fmMatch[1].match(/^updated:\s*"?([^"\r\n]+?)"?\s*$/m);
      if (!updatedMatch) continue;
      const lastmod = updatedMatch[1].trim();
      const slug = file.replace(/\.md$/, '');
      const urlPath = locale === 'es' ? `/blog/${slug}/` : `/en/blog/${slug}/`;
      map.set(urlPath, lastmod);
    }
  }
  return map;
}

const BLOG_LASTMOD_OVERRIDES = await loadBlogLastmodOverrides();

export default defineConfig({
  site: SITE,
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    // @astrojs/sitemap removed in favour of custom segmented endpoints
    // (src/pages/sitemap-*.xml.ts) per PDF §7. The PATH_TO_LINKS,
    // lastmodForPath and BLOG_LASTMOD_OVERRIDES helpers above are kept for
    // reference / potential future reuse by the custom endpoints.
  ],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
