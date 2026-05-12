#!/usr/bin/env -S uv run --quiet --with beautifulsoup4 python
"""
build-image-matrix.py — walk dist/, build a per-URL image matrix CSV for
client walkthroughs and image-replacement planning.

For each built page, emits one row per image surface (hero, content blocks,
OG meta, schema imageObject) with:
  - canonical URL
  - locale + page_type derived from the URL
  - container label (heuristic from surrounding HTML)
  - current image path
  - suggested_replacement (from the 42 auto-matched WebPs the client supplied)
  - notes column for the client/Lee to fill during walkthrough

Output: docs/image-matrix.csv

Re-run after any rebuild. The audit table from build-client-images.py is
expected at scripts/build-client-images.report.csv but is not consulted
directly — the page->WebP mapping below was derived from the checklist
xlsx + filename inference and is the single source of truth here.
"""
from __future__ import annotations

import csv
import re
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse, urljoin

from bs4 import BeautifulSoup

REPO_ROOT = Path(__file__).resolve().parent.parent
DIST = REPO_ROOT / "dist"
OUT_CSV = REPO_ROOT / "docs" / "image-matrix.csv"
SITE_ORIGIN = "https://optimtoldos.com"

# Map: built-but-unused WebP -> intended page path (relative). Derived from
# the client's checklist xlsx + filename inference. The pages exist; the
# template just doesn't reference these paths yet.
NEW_WEBPS_TO_PAGE: dict[str, str] = {
    # core/
    "/images/core/home-toldos-pergolas-costa-blanca.webp": "/",
    "/images/core/home-awnings-pergolas-costa-blanca-en.webp": "/en/",
    "/images/core/galeria-proyectos-toldos-pergolas.webp": "/galeria/",
    "/images/core/gallery-awnings-pergolas-projects.webp": "/en/gallery/",
    "/images/core/blog-consejos-toldos-pergolas-alicante.webp": "/blog/",
    "/images/core/blog-awnings-pergolas-tips-alicante.webp": "/en/blog/",
    # productos/ — hubs
    "/images/productos/toldos-categoria-costa-blanca.webp": "/toldos/",
    "/images/productos/awnings-category-costa-blanca.webp": "/en/awnings/",
    "/images/productos/pergolas-categoria-alicante.webp": "/pergolas/",
    "/images/productos/pergolas-category-alicante-en.webp": "/en/pergolas/",
    "/images/productos/cortinas-cristal-terraza-alicante.webp": "/cortinas-de-cristal/",
    "/images/productos/glass-curtains-terrace-alicante.webp": "/en/glass-curtains/",
    "/images/productos/velas-sombra-jardin-alicante.webp": "/velas-de-sombra/",
    "/images/productos/shade-sails-garden-alicante.webp": "/en/shade-sails/",
    "/images/productos/ventanas-pvc-alicante-instalacion.webp": "/ventanas-pvc/",
    "/images/productos/pvc-windows-alicante-installation.webp": "/en/pvc-windows/",
    # productos/ — sub-pages (toldo subtypes)
    "/images/productos/toldo-cofre-terraza-alicante.webp": "/toldos-cofre/",
    "/images/productos/cassette-awning-terrace-alicante.webp": "/en/cassette-awnings/",
    "/images/productos/toldo-brazo-extensible-fachada.webp": "/toldos-brazo-extensible/",
    "/images/productos/retractable-arm-awning-facade.webp": "/en/retractable-arm-awnings/",
    "/images/productos/toldo-vertical-zip-terraza-exterior.webp": "/toldos-verticales-zip/",
    "/images/productos/zip-screen-awning-terrace.webp": "/en/zip-screen-awnings/",
    "/images/productos/toldo-punto-recto-terraza.webp": "/toldos-punto-recto/",
    "/images/productos/straight-drop-awning-terrace.webp": "/en/straight-drop-awnings/",
    "/images/productos/toldos-motorizacion-somfy-alicante.webp": "/toldos-motorizacion/",
    "/images/productos/motorised-awning-somfy-alicante.webp": "/en/motorised-awnings/",
    # productos/ — pergola subtypes
    "/images/productos/pergola-bioclimatica-laminas-alicante.webp": "/pergolas-bioclimaticas/",
    "/images/productos/bioclimatic-pergola-alicante.webp": "/en/bioclimatic-pergolas/",
    "/images/productos/pergola-aluminio-jardin-costa-blanca.webp": "/pergolas-aluminio/",
    "/images/productos/aluminium-pergola-garden-costa-blanca.webp": "/en/aluminium-pergolas/",
    "/images/productos/pergola-toldo-deslizante-terraza.webp": "/pergola-toldo-deslizante/",
    "/images/productos/sliding-awning-pergola-terrace.webp": "/en/sliding-awning-pergolas/",
    # guias/
    "/images/guias/elegir-toldo-costa-blanca-guia.webp": "/guia-elegir-toldo-costa-blanca/",
    "/images/guias/choosing-right-awning-costa-blanca.webp": "/en/choosing-the-right-awning-costa-blanca/",
    "/images/guias/guia-cortinas-cristal-terraza-cerramiento.webp": "/guia-cortinas-cristal-terraza/",
    "/images/guias/glass-curtains-guide-terrace-enclosure.webp": "/en/glass-curtains-guide/",
    "/images/guias/mantenimiento-toldos-costa-blanca-limpieza.webp": "/mantenimiento-toldos-costa-blanca/",
    "/images/guias/awning-maintenance-costa-blanca-cleaning.webp": "/en/awning-maintenance-costa-blanca/",
    "/images/guias/toldos-comunidades-propietarios-alicante.webp": "/toldos-comunidades-propietarios-alicante/",
    "/images/guias/awnings-residents-communities-alicante.webp": "/en/awnings-residents-communities-alicante/",
    "/images/guias/sensor-viento-toldos-motorizados-instalacion.webp": "/sensor-viento-toldos-motorizados/",
    "/images/guias/wind-sensor-motorised-awnings-installation.webp": "/en/wind-sensor-motorised-awnings/",
}
# Build the reverse index: page_path -> proposed WebP
PAGE_TO_REPLACEMENT: dict[str, str] = {v: k for k, v in NEW_WEBPS_TO_PAGE.items()}


def page_url_from_dist_path(html_path: Path) -> str:
    """`dist/toldos/index.html` -> `/toldos/`. `dist/index.html` -> `/`."""
    rel = html_path.relative_to(DIST)
    parts = rel.parts
    if parts == ("index.html",):
        return "/"
    # strip trailing 'index.html'
    if parts[-1] == "index.html":
        parts = parts[:-1]
    return "/" + "/".join(parts) + "/"


def classify_page(url: str) -> tuple[str, str]:
    """Return (locale, page_type)."""
    locale = "en" if url.startswith("/en/") else "es"
    # strip leading '/en/' (4 chars) or just '/' so we can pattern-match on the
    # slug portion alone.
    p = url[4:] if url.startswith("/en/") else url[1:]
    p = p.rstrip("/")

    if p == "":
        return locale, "homepage"
    if p == "blog" or p.startswith("blog/"):
        return locale, "blog-index" if p == "blog" else "blog-post"
    if p in ("aviso-legal", "legal-notice"):
        return locale, "legal"
    if p in ("politica-privacidad", "privacy-policy", "politica-cookies", "cookie-policy"):
        return locale, "legal"
    if p in ("galeria", "gallery"):
        return locale, "gallery"
    if p in ("contacto", "contact"):
        return locale, "contact"
    if p in ("presupuesto", "free-quote"):
        return locale, "quote"
    if p in ("sobre-nosotros", "about-us"):
        return locale, "about"
    if p in ("zonas-de-servicio", "service-areas"):
        return locale, "service-areas"
    if p.startswith("guia-") or p.startswith("choosing-") or p.startswith("planning-") or "-vs-" in p or p.endswith("-guide"):
        return locale, "guide"
    # area pages: toldos-<slug>, en/awnings-<slug>
    if re.match(r"^(toldos|awnings|pergolas|glass-curtains|cortinas-de-cristal|shade-sails|velas-sombra|pvc-windows|ventanas-pvc)-[a-z-]+$", p):
        return locale, "area-or-combo"
    # product hubs
    if p in ("toldos", "awnings", "pergolas", "glass-curtains", "cortinas-de-cristal",
             "velas-de-sombra", "shade-sails", "ventanas-pvc", "pvc-windows"):
        return locale, "product-hub"
    # product sub-pages (cassette, bioclimatic, etc.)
    return locale, "product-sub-or-other"


def container_label(img_tag, index_in_page: int, page_type: str) -> str:
    """Heuristic container name. Walks up to nearest section/heading."""
    classes = " ".join(img_tag.get("class", []))

    # First image on a page is usually the hero (we'll verify by checking
    # if it sits under a section near the top with hero-ish styling).
    if index_in_page == 0:
        return "Hero"

    # Walk up to nearest section / h2 / aside
    parent = img_tag.parent
    nearest_heading = ""
    depth = 0
    while parent is not None and depth < 6:
        if parent.name in ("section", "article", "aside"):
            # look for a sibling heading
            heading = parent.find(["h2", "h3"])
            if heading and heading.get_text(strip=True):
                nearest_heading = heading.get_text(strip=True)[:60]
                break
        parent = parent.parent
        depth += 1

    if nearest_heading:
        return f"Section: {nearest_heading}"

    # Fallbacks based on class hints
    if "gallery" in classes or "galeria" in classes:
        return "Gallery card"
    if "card" in classes:
        return "Card"
    if "related" in classes:
        return "Related products"

    return f"Inline image #{index_in_page}"


def extract_page_title(html: str) -> str:
    """Best-effort page title from <title>. Strips ' | Optim Toldos' suffix."""
    soup = BeautifulSoup(html, "html.parser")
    t = soup.find("title")
    if not t:
        return ""
    title = t.get_text(strip=True)
    # strip the brand suffix for compactness
    for suffix in (" | Optim Toldos - Costa Blanca", " | Optim Toldos"):
        if title.endswith(suffix):
            title = title[: -len(suffix)]
            break
    return title


def extract_images_from_html(html: str, url: str) -> list[dict]:
    """Return a list of image-row dicts for one page."""
    soup = BeautifulSoup(html, "html.parser")
    rows: list[dict] = []

    # 1. OG image (meta property=og:image)
    og = soup.find("meta", attrs={"property": "og:image"})
    if og and og.get("content"):
        rows.append({
            "container": "OG image (social share)",
            "current_image": _strip_origin(og["content"]),
            "role": "og",
        })

    # 2. Twitter image
    tw = soup.find("meta", attrs={"name": "twitter:image"})
    if tw and tw.get("content"):
        rows.append({
            "container": "Twitter image",
            "current_image": _strip_origin(tw["content"]),
            "role": "twitter",
        })

    # 3. <img> tags inside main content
    main = soup.find("main") or soup.body or soup
    imgs = main.find_all("img") if main else []
    for i, img in enumerate(imgs):
        src = img.get("src", "")
        if not src or src.startswith("data:"):
            continue
        rows.append({
            "container": container_label(img, i, ""),
            "current_image": _strip_origin(src),
            "role": "hero" if i == 0 else "inline",
        })

    return rows


def _strip_origin(src: str) -> str:
    """Normalise absolute URLs to repo-relative paths when possible."""
    if src.startswith(SITE_ORIGIN):
        return src[len(SITE_ORIGIN):]
    if src.startswith("https://dev.optimtoldos.com"):
        return src[len("https://dev.optimtoldos.com"):]
    return src


def suggest_replacement(url: str, current_image: str, role: str) -> tuple[str, str]:
    """Return (suggested_replacement_path, replacement_notes). Empty strings if no suggestion.

    We only suggest on hero rows — the auto-matched WebP from the client pool
    is intended as a single representative photo for the page, not a stand-in
    for every inline thumbnail. Inline images stay empty; the client decides
    per-row whether to swap them during walkthrough.
    """
    if role != "hero":
        return "", ""
    proposed = PAGE_TO_REPLACEMENT.get(url, "")
    if not proposed:
        return "", ""
    if proposed == current_image:
        return "", "(already using auto-matched WebP)"
    return proposed, "Auto-matched WebP from client pool — review fit"


def main() -> int:
    if not DIST.is_dir():
        print(f"ERROR: dist/ not found at {DIST}. Run `npm run build` first.", file=sys.stderr)
        return 2

    rows_out: list[dict] = []
    for html_path in sorted(DIST.rglob("index.html")):
        url = page_url_from_dist_path(html_path)
        locale, page_type = classify_page(url)

        html = html_path.read_text(encoding="utf-8")
        page_title = extract_page_title(html)
        for img_row in extract_images_from_html(html, url):
            suggested, notes = suggest_replacement(url, img_row["current_image"], img_row["role"])
            rows_out.append({
                "page_url": url,
                "page_title": page_title,
                "locale": locale,
                "page_type": page_type,
                "container": img_row["container"],
                "current_image": img_row["current_image"],
                "image_role": img_row["role"],
                "suggested_replacement": suggested,
                "replacement_notes": notes,
                "client_decision": "",  # for client walkthrough
                "lee_notes": "",
            })

    # Also: rows for the 42 auto-matched WebPs whose target page didn't yet
    # reference them (i.e. dangling on disk). One row per page_path that has
    # a new WebP slot but where the current page doesn't show it.
    referenced_images = {r["current_image"] for r in rows_out}
    # Build title lookup so pending rows carry the page title too
    title_by_url: dict[str, str] = {r["page_url"]: r["page_title"] for r in rows_out}
    for new_webp, target_page in NEW_WEBPS_TO_PAGE.items():
        if new_webp in referenced_images:
            continue
        rows_out.append({
            "page_url": target_page,
            "page_title": title_by_url.get(target_page, ""),
            "locale": "en" if target_page.startswith("/en/") else "es",
            "page_type": classify_page(target_page)[1],
            "container": "(not yet referenced — auto-matched slot)",
            "current_image": "(no current usage)",
            "image_role": "pending",
            "suggested_replacement": new_webp,
            "replacement_notes": "New WebP at intended path. Page template needs wiring up.",
            "client_decision": "",
            "lee_notes": "",
        })

    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "page_url", "page_title", "locale", "page_type", "container",
        "current_image", "image_role",
        "suggested_replacement", "replacement_notes",
        "client_decision", "lee_notes",
    ]
    with OUT_CSV.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in rows_out:
            w.writerow(r)

    # Summary
    by_type: dict[str, int] = defaultdict(int)
    for r in rows_out:
        by_type[r["page_type"]] += 1
    pages_seen = len({r["page_url"] for r in rows_out})

    print(f"Wrote {len(rows_out)} rows across {pages_seen} unique pages -> {OUT_CSV.relative_to(REPO_ROOT)}")
    print("Rows by page_type:")
    for pt, n in sorted(by_type.items(), key=lambda x: -x[1]):
        print(f"  {pt:30s} {n:4d}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
