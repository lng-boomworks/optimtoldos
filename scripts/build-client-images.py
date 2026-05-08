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


def main() -> int:
    print("build-client-images: not yet implemented", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
