#!/usr/bin/env bash
# Generate downscaled WebP variants for hero images so we can serve responsive
# srcset tags. Each hero already exists at 1920w in public/images/; this script
# produces -480, -768, and -1280 variants alongside it.
#
# Usage: bash scripts/generate-hero-variants.sh
# Idempotent: safe to re-run after replacing a source hero.

set -euo pipefail

if ! command -v cwebp >/dev/null 2>&1; then
  echo "ERROR: cwebp not found. Install with: brew install webp" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGES="$ROOT/public/images"

HEROES=(
  "gallery/hero-home"
  "gallery/hero-toldos"
  "gallery/hero-ventanas"
  "pergolas/hero-pergolas"
  "cortinas/hero-cortinas"
  "velas/hero-velas"
)

WIDTHS=(480 768 1280)
QUALITY=80

for hero in "${HEROES[@]}"; do
  src="$IMAGES/$hero.webp"
  if [ ! -f "$src" ]; then
    echo "SKIP: $src not found" >&2
    continue
  fi
  for w in "${WIDTHS[@]}"; do
    out="$IMAGES/${hero}-${w}.webp"
    cwebp -quiet -q "$QUALITY" -resize "$w" 0 "$src" -o "$out"
    echo "  -> ${hero}-${w}.webp"
  done
done

echo "Done."
