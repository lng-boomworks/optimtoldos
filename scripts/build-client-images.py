#!/usr/bin/env -S uv run --quiet --with openpyxl --with anthropic --with pillow python
"""
build-client-images.py — vision-match client photos to sitemap image slots,
convert to WebP, write to public/images/.

See docs/superpowers/specs/2026-05-08-client-image-pipeline-design.md for design.

Usage:
    export ANTHROPIC_API_KEY=sk-...
    python3 scripts/build-client-images.py

Inputs (hardcoded paths, edit if Dropbox layout changes):
    CHECKLIST_XLSX  — the per-row target spec
    PHOTOS_ROOT     — root of source photo folders

Outputs:
    public/images/<subfolder>/*.webp — matched + converted files
    scripts/build-client-images.report.csv — audit trail
"""
from __future__ import annotations

import csv
import os
import sys
from dataclasses import dataclass
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
CHECKLIST_XLSX = Path(
    "/Users/lee/Library/CloudStorage/Dropbox/OptimToldos/"
    "optimtoldos_checklist_fotos.xlsx"
)
PHOTOS_ROOT = Path(
    "/Users/lee/Library/CloudStorage/Dropbox/OptimToldos/Photos"
)
OUTPUT_ROOT = REPO_ROOT / "public" / "images"
REPORT_CSV = REPO_ROOT / "scripts" / "build-client-images.report.csv"

CWEBP_QUALITY = 82
CWEBP_MAX_WIDTH = 1600
VISION_MODEL = "claude-sonnet-4-6"
CONFIDENCE_THRESHOLD = 0.5


@dataclass(frozen=True)
class TargetRow:
    subfolder: str       # e.g. "core", "productos"
    filename: str        # e.g. "home-toldos-pergolas-costa-blanca.webp"
    description: str     # "what should the photo show"
    area: str            # area / GPS hint, may be empty


def parse_checklist(xlsx_path: Path) -> list[TargetRow]:
    """Parse the CHECKLIST sheet of optimtoldos_checklist_fotos.xlsx.

    The sheet layout is:
        row 1: title
        row 2: subtitle
        row 3: blank
        row 4: header row (SUBFOLDER, FILE NAME, WHAT SHOULD..., AREA / GPS, DONE, NOTES)
        row 5: blank
        rows 6+: data, with section-divider rows (col B is None) interspersed

    A data row is identified by col B (filename) ending in '.webp'.
    """
    import openpyxl

    wb = openpyxl.load_workbook(xlsx_path, data_only=True)
    ws = wb["CHECKLIST"]

    rows: list[TargetRow] = []
    for raw in ws.iter_rows(min_row=6, values_only=True):
        subfolder_cell = raw[0] or ""
        filename = raw[1]
        description = raw[2] or ""
        area = raw[3] or ""

        if not isinstance(filename, str) or not filename.endswith(".webp"):
            continue  # skip section dividers and blanks

        # Subfolder cell looks like "📁 core" — strip the emoji + whitespace
        subfolder = str(subfolder_cell).replace("📁", "").strip()
        if not subfolder:
            continue

        rows.append(TargetRow(
            subfolder=subfolder,
            filename=filename.strip(),
            description=description.strip(),
            area=str(area).strip(),
        ))

    return rows


# Description keyword fragments that indicate a subject we have NO source photo of.
# Matched case-insensitively against the description. Bilingual (ES + EN) — the
# checklist xlsx mixes Spanish and English descriptions, so each subject needs both.
NO_SOURCE_KEYWORDS = (
    # team photo / installer team
    "team", "equipo",
    "uniform", "uniforme",
    # office facade / building
    "office", "oficina",
    "facade", "fachada",
    # person on phone
    "phone", "teléfono", "telefono",  # accent-stripped fallback
    # client + installer with quote (e.g. "client signing", "cliente firmando")
    "client", "cliente",
    # explainer / sales scenes
    "instalador explicando",
    # aerial / landscape views we don't have
    "aerial", "aérea", "aerea",        # accent-stripped fallback
    "vista aérea",
    "landscape of the costa blanca",
    "paisaje de la costa blanca",
    # municipal / official documents
    "town hall", "ayuntamiento",
    "official document", "documento oficial",
)


def classify_target(row: TargetRow) -> str:
    """Return one of: 'matchable', 'unmatched-no-geo', 'unmatched-no-source'."""
    if row.subfolder in {"zonas-es", "zonas-en", "prod-zona"}:
        return "unmatched-no-geo"

    desc_lower = row.description.lower()
    for keyword in NO_SOURCE_KEYWORDS:
        if keyword in desc_lower:
            return "unmatched-no-source"

    return "matchable"


def main() -> int:
    print("build-client-images: not yet implemented", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
