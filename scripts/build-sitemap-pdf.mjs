#!/usr/bin/env node
/**
 * Build a printable HTML view of the complete sitemap and convert to PDF
 * via headless Chrome. One-shot script: read dist/sitemap-*.xml, render an
 * organised single-page document, then call Chrome.
 *
 * Usage:  node scripts/build-sitemap-pdf.mjs
 * Output: optimtoldos-sitemap.pdf in repo root
 */
import { readFile, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";

const SEGMENTS = [
  { file: "sitemap-core.xml",          label: "Core pages",                priority: "core",     freq: "Weekly" },
  { file: "sitemap-productos.xml",     label: "Product pages",             priority: "products", freq: "Monthly" },
  { file: "sitemap-zonas-es.xml",      label: "Service area pages (ES)",   priority: "zonas",    freq: "Weekly" },
  { file: "sitemap-zonas-en.xml",      label: "Service area pages (EN)",   priority: "zonas",    freq: "Weekly" },
  { file: "sitemap-producto-zona.xml", label: "Product + zone (highest converter)", priority: "pz", freq: "Monthly" },
  { file: "sitemap-guias.xml",         label: "Authority guides",          priority: "guides",   freq: "Monthly" },
  { file: "sitemap-images.xml",        label: "Image sitemap (geo captions)", priority: "images", freq: "Weekly" },
];

function escape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function parseUrlSitemap(p) {
  const xml = await readFile(p, "utf8");
  const urls = [];
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  for (const block of blocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "";
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? "";
    const changefreq = block.match(/<changefreq>([^<]+)<\/changefreq>/)?.[1] ?? "";
    const priority = block.match(/<priority>([^<]+)<\/priority>/)?.[1] ?? "";
    const altLinks = [...block.matchAll(/<xhtml:link[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"[^>]*\/>/g)]
      .map((m) => ({ lang: m[1], href: m[2] }));
    const images = [...block.matchAll(/<image:image>([\s\S]*?)<\/image:image>/g)].map((m) => {
      const inner = m[1];
      return {
        loc: inner.match(/<image:loc>([^<]+)<\/image:loc>/)?.[1] ?? "",
        caption: inner.match(/<image:caption>([^<]+)<\/image:caption>/)?.[1] ?? "",
        title: inner.match(/<image:title>([^<]+)<\/image:title>/)?.[1] ?? "",
      };
    });
    urls.push({ loc, lastmod, changefreq, priority, altLinks, images });
  }
  return urls;
}

async function parseIndex(p) {
  const xml = await readFile(p, "utf8");
  return [...xml.matchAll(/<sitemap>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<lastmod>([^<]+)<\/lastmod>/g)]
    .map((m) => ({ loc: m[1], lastmod: m[2] }));
}

function pathOnly(url) {
  try { return new URL(url).pathname; } catch { return url; }
}

const distDir = path.resolve("dist");
const indexEntries = await parseIndex(path.join(distDir, "sitemap.xml"));
const segmentsData = [];
for (const seg of SEGMENTS) {
  const urls = await parseUrlSitemap(path.join(distDir, seg.file));
  segmentsData.push({ ...seg, urls });
}

const totalUrls = segmentsData
  .filter((s) => s.priority !== "images")
  .reduce((acc, s) => acc + s.urls.length, 0);

const totalImages = segmentsData
  .find((s) => s.priority === "images")
  ?.urls.reduce((acc, u) => acc + u.images.length, 0) ?? 0;

function renderSegment(seg) {
  const isImages = seg.priority === "images";
  const rows = seg.urls
    .map((u) => {
      if (isImages) {
        const imgList = u.images
          .map(
            (im) =>
              `<li><span class="img-caption">${escape(im.caption)}</span> <span class="img-file">${escape(pathOnly(im.loc))}</span></li>`,
          )
          .join("");
        return `<tr><td class="path">${escape(pathOnly(u.loc))}</td><td><ul class="imgs">${imgList}</ul></td></tr>`;
      }
      const altCol = u.altLinks.length
        ? u.altLinks
            .filter((a) => a.lang !== "x-default")
            .map((a) => `<span class="hreflang">${a.lang}</span>`)
            .join(" ")
        : `<span class="muted">-</span>`;
      return `<tr>
  <td class="path">${escape(pathOnly(u.loc))}</td>
  <td class="lastmod">${escape(u.lastmod)}</td>
  <td class="cf">${escape(u.changefreq)}</td>
  <td class="pr">${escape(u.priority)}</td>
  <td>${altCol}</td>
</tr>`;
    })
    .join("\n");

  const headers = isImages
    ? `<tr><th>Page URL</th><th>Images (caption · path)</th></tr>`
    : `<tr><th>URL</th><th>lastmod</th><th>changefreq</th><th>priority</th><th>hreflang</th></tr>`;

  return `<section class="segment">
  <h2>${escape(seg.label)}</h2>
  <p class="seg-meta">/${seg.file} · ${seg.urls.length} URLs · ${seg.freq}</p>
  <table>
    <thead>${headers}</thead>
    <tbody>${rows}</tbody>
  </table>
</section>`;
}

const generatedAt = new Date().toISOString().slice(0, 10);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>OptimToldos Sitemap</title>
<style>
  @page { size: A4; margin: 18mm 14mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { font-family: -apple-system, "SF Pro Text", system-ui, sans-serif; font-size: 9.5pt; color: #1a2733; line-height: 1.4; }
  header { padding: 8mm 0 6mm; border-bottom: 2px solid #c97a4a; margin-bottom: 6mm; }
  header h1 { margin: 0 0 2mm; font-family: "SF Pro Display", system-ui, sans-serif; font-size: 18pt; color: #1a2733; }
  header .sub { color: #5a6976; font-size: 10pt; }
  .stats { display: flex; gap: 12mm; margin: 4mm 0 0; padding: 0; list-style: none; }
  .stats li { display: flex; flex-direction: column; }
  .stats .num { font-size: 14pt; font-weight: 600; color: #c97a4a; line-height: 1; }
  .stats .lbl { font-size: 8pt; color: #5a6976; text-transform: uppercase; letter-spacing: .03em; margin-top: 1mm; }
  .index { background: #f7f3ed; border: 1px solid #e3dccc; border-radius: 3mm; padding: 4mm 5mm; margin-bottom: 6mm; page-break-inside: avoid; }
  .index h2 { margin: 0 0 2mm; font-size: 11pt; }
  .index .file { font-family: "SF Mono", Menlo, monospace; font-size: 9pt; color: #1a2733; }
  .index ul { margin: 1mm 0 0; padding: 0 0 0 4mm; }
  .index li { margin: 0.6mm 0; }
  .index .lastmod { color: #5a6976; font-size: 8pt; }
  .segment { page-break-inside: avoid; margin: 5mm 0 8mm; }
  .segment h2 { margin: 0; font-size: 12pt; color: #1a2733; padding-bottom: 1mm; border-bottom: 1px solid #c97a4a; }
  .seg-meta { margin: 1mm 0 3mm; font-family: "SF Mono", Menlo, monospace; font-size: 8.5pt; color: #5a6976; }
  table { width: 100%; border-collapse: collapse; }
  thead th { text-align: left; font-size: 7.5pt; text-transform: uppercase; letter-spacing: .04em; color: #5a6976; padding: 1.5mm 2mm; border-bottom: 1px solid #d6cdb6; background: #fbf8f1; }
  tbody td { padding: 1.5mm 2mm; vertical-align: top; border-bottom: 1px solid #f0eadd; font-size: 9pt; }
  td.path { font-family: "SF Mono", Menlo, monospace; font-size: 8.5pt; color: #1a2733; word-break: break-all; }
  td.lastmod, td.cf, td.pr { font-family: "SF Mono", Menlo, monospace; font-size: 8.5pt; color: #5a6976; white-space: nowrap; }
  td.pr { color: #1a2733; font-weight: 600; }
  .hreflang { display: inline-block; padding: 0.2mm 1.5mm; background: #d4a76a; color: #fff; font-size: 7pt; font-weight: 600; border-radius: 1mm; text-transform: uppercase; letter-spacing: .05em; }
  .muted { color: #b0b6bd; }
  .imgs { margin: 0; padding: 0 0 0 4mm; font-size: 8pt; }
  .imgs li { margin: 0.4mm 0; }
  .img-caption { color: #1a2733; }
  .img-file { display: inline-block; font-family: "SF Mono", Menlo, monospace; font-size: 7.5pt; color: #5a6976; margin-left: 1mm; }
  footer { margin-top: 8mm; padding-top: 3mm; border-top: 1px solid #e3dccc; color: #5a6976; font-size: 8pt; text-align: center; }
</style>
</head>
<body>

<header>
  <h1>OptimToldos · Complete Sitemap</h1>
  <div class="sub">Generated from <code>dist/sitemap-*.xml</code> · ${generatedAt}</div>
  <ul class="stats">
    <li><span class="num">${totalUrls}</span><span class="lbl">Indexable URLs</span></li>
    <li><span class="num">${totalImages}</span><span class="lbl">Image entries</span></li>
    <li><span class="num">${segmentsData.length}</span><span class="lbl">Segments</span></li>
    <li><span class="num">2</span><span class="lbl">Locales (ES · EN)</span></li>
  </ul>
</header>

<section class="index">
  <h2>Master sitemap index · /sitemap.xml</h2>
  <ul>
    ${indexEntries
      .map(
        (e) =>
          `<li><span class="file">${escape(pathOnly(e.loc))}</span> <span class="lastmod">· ${escape(e.lastmod)}</span></li>`,
      )
      .join("\n    ")}
  </ul>
</section>

${segmentsData.map(renderSegment).join("\n\n")}

<footer>OptimToldos · optimtoldos.com · Generated ${generatedAt}</footer>

</body>
</html>`;

const htmlPath = path.resolve("scripts/.sitemap-tmp.html");
const pdfPath = path.resolve("optimtoldos-sitemap.pdf");

await writeFile(htmlPath, html, "utf8");

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const cmd = `"${chromePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdfPath}" "file://${htmlPath}"`;
execSync(cmd, { stdio: "inherit" });

console.log(`\n✓ Wrote ${pdfPath}`);
