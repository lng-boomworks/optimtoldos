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

import base64
import csv
import io
import json
import os
import subprocess
import sys
import time
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
# Anthropic's ITPM cap is per rolling minute. The big "fallback" bucket can use most
# of the budget in a single call, so we wait one full window before the next bucket.
BUCKET_DELAY_SEC = 65


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


# Source folder names exactly as they appear under PHOTOS_ROOT.
TOLDO_FOLDERS = [
    "toldos cofre",
    "toldo brazos extensible",
    "toldos punto recto",
    "toldos stor balcon",
    "Toldos Screen ZIP",
]
PERGOLA_FOLDERS = ["pergolas", "pergolas bioclimaticas"]
CORTINAS_FOLDERS = ["cortinas de cristal"]
VELAS_FOLDERS = ["velas", "lonas piscina"]
VENTANAS_FOLDERS = ["Ventanas pvc"]


def source_folders_for_target(row: TargetRow) -> list[str]:
    """Return the source folder names whose photos are candidates for this target.

    Routing is by keyword on filename + description. A target may map to multiple
    folders (e.g. 'toldos category' covers all five toldo subtypes).

    Priority order matters: 'ventana' must be checked AFTER 'toldo'/'pergola'
    because awning descriptions often mention windows ("toldo sobre ventana").
    """
    haystack = (row.filename + " " + row.description).lower()

    # Cortinas first — 'cristal'/'cortina' are specific enough to win
    if "cortina" in haystack or "cristal" in haystack or "glass curtain" in haystack:
        return list(CORTINAS_FOLDERS)

    # Pergola / toldo BEFORE ventana — awning descriptions often mention windows
    has_pergola = "pergola" in haystack or "pérgola" in haystack
    has_toldo = "toldo" in haystack or "awning" in haystack

    if has_pergola and has_toldo:
        return PERGOLA_FOLDERS + TOLDO_FOLDERS
    if has_pergola:
        return list(PERGOLA_FOLDERS)
    if has_toldo:
        return list(TOLDO_FOLDERS)

    # Ventana only reaches here when no toldo/pergola signal is present
    if "ventana" in haystack or "pvc window" in haystack:
        return list(VENTANAS_FOLDERS)

    # Vela / lona — no toldo signal at this point, so 'lona' is safe to route to velas
    if "vela" in haystack or "shade sail" in haystack or "lona" in haystack:
        return list(VELAS_FOLDERS)

    # Generic home/gallery/blog covers — every outdoor folder is a candidate
    return PERGOLA_FOLDERS + TOLDO_FOLDERS + CORTINAS_FOLDERS + VELAS_FOLDERS


def build_cwebp_command(src: Path, dst: Path) -> list[str]:
    """Return the cwebp argv for converting src JPEG/PNG to a max-1600px WebP at q82."""
    return [
        "cwebp",
        "-q", str(CWEBP_QUALITY),
        "-resize", str(CWEBP_MAX_WIDTH), "0",  # height 0 = preserve aspect ratio
        "-mt",                                  # multi-threaded encoding
        str(src),
        "-o", str(dst),
    ]


def convert_to_webp(src: Path, dst: Path) -> None:
    """Convert src to dst via cwebp. Creates parent dirs.

    Raises RuntimeError if cwebp exits non-zero; OSError if dst.parent
    cannot be created.
    """
    dst.parent.mkdir(parents=True, exist_ok=True)
    cmd = build_cwebp_command(src, dst)
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        detail = result.stderr.strip() or result.stdout.strip() or "(no output)"
        raise RuntimeError(f"cwebp failed for {src} (exit {result.returncode}): {detail}")


@dataclass
class MatchResult:
    target_subfolder: str
    target_filename: str
    source_path: str        # empty string if unmatched
    confidence: float       # 0.0 if unmatched
    reasoning: str
    status: str             # 'matched' | 'unmatched-no-geo' | 'unmatched-no-source'
                            # | 'unmatched-low-confidence' | 'unmatched-vision-error'
                            # | 'unmatched-cwebp-error'


AUDIT_COLUMNS = [
    "target_subfolder", "target_filename", "source_path",
    "confidence", "reasoning", "status",
]


def write_audit_csv(out_path: Path, results: list[MatchResult]) -> None:
    """Write all results to a CSV with a stable column order."""
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with out_path.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=AUDIT_COLUMNS)
        writer.writeheader()
        for r in results:
            writer.writerow({
                "target_subfolder": r.target_subfolder,
                "target_filename": r.target_filename,
                "source_path": r.source_path,
                "confidence": f"{r.confidence:.2f}",
                "reasoning": r.reasoning,
                "status": r.status,
            })


def _encode_image_for_vision(src: Path, max_dim: int = 512, quality: int = 65) -> tuple[str, str]:
    """Resize + JPEG-encode + base64 an image for the Anthropic API. Returns (b64, media_type).

    max_dim is kept small (512px) so a bucket of ~60-100 source photos stays
    under Anthropic's 30K input-tokens-per-minute cap in a single request.
    Scene-level matching (awning vs pergola, color, layout) survives the downscale.
    """
    from PIL import Image
    with Image.open(src) as img:
        img = img.convert("RGB")
        img.thumbnail((max_dim, max_dim))
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=quality)
    return base64.standard_b64encode(buf.getvalue()).decode("ascii"), "image/jpeg"


def _build_vision_prompt(targets: list[TargetRow], n_sources: int) -> str:
    """Construct the user-text portion of the vision prompt."""
    target_lines = "\n".join(
        f"  {i}: filename={t.filename!r}, needs={t.description!r}, area={t.area!r}"
        for i, t in enumerate(targets)
    )
    return (
        f"You are matching client photos to website image slots.\n\n"
        f"Above are {n_sources} candidate photos (indexed 0..{n_sources - 1}).\n\n"
        f"There are {len(targets)} target slots to fill:\n{target_lines}\n\n"
        f"For EACH target slot, pick the best candidate photo OR null if none fit. "
        f"Score 0.0–1.0. Each candidate may be assigned to AT MOST ONE target. "
        f"Score < 0.5 means weak match; prefer null in that case.\n\n"
        f"Reply with ONLY a JSON array (no prose, no markdown fences). Each element:\n"
        f'  {{"target_filename": "<exact filename>", "source_index": <int or null>, '
        f'"confidence": <float>, "reasoning": "<one short sentence>"}}'
    )


def match_bucket_with_vision(
    client,
    sources: list[Path],
    targets: list[TargetRow],
) -> list[dict]:
    """Send one bucket of (sources, targets) to Claude vision. Return list of dicts:
    {target_filename, source_path (str|None), confidence (float), reasoning (str)}.
    """
    if not sources:
        return [{"target_filename": t.filename, "source_path": None,
                 "confidence": 0.0, "reasoning": "no sources in bucket"}
                for t in targets]
    if not targets:
        return []

    content_blocks: list[dict] = []
    for src in sources:
        b64, media_type = _encode_image_for_vision(src)
        content_blocks.append({
            "type": "image",
            "source": {"type": "base64", "media_type": media_type, "data": b64},
        })
    content_blocks.append({"type": "text", "text": _build_vision_prompt(targets, len(sources))})

    response = client.messages.create(
        model=VISION_MODEL,
        max_tokens=2048,
        messages=[{"role": "user", "content": content_blocks}],
    )
    raw = response.content[0].text.strip()
    # Strip any accidental markdown fences
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1].rsplit("```", 1)[0].strip()
    parsed = json.loads(raw)
    if not isinstance(parsed, list):
        raise ValueError(f"Expected JSON array from vision API, got {type(parsed).__name__}: {raw[:200]}")

    used_indices: set[int] = set()
    results: list[dict] = []
    for item in parsed:
        idx = item.get("source_index")
        # bool is a subclass of int in Python — exclude it explicitly.
        is_valid_int = isinstance(idx, int) and not isinstance(idx, bool)
        if is_valid_int and 0 <= idx < len(sources) and idx not in used_indices:
            source_path = str(sources[idx])
            used_indices.add(idx)
        else:
            source_path = None
        results.append({
            "target_filename": item["target_filename"],
            "source_path": source_path,
            "confidence": float(item.get("confidence", 0.0)),
            "reasoning": item.get("reasoning", ""),
        })
    return results


def _list_source_jpegs(folder: Path) -> list[Path]:
    """Return sorted JPEG/PNG paths directly under the folder (no recursion)."""
    if not folder.is_dir():
        return []
    exts = {".jpg", ".jpeg", ".png"}
    return sorted(p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in exts)


def _bucket_matchable_targets(
    targets: list[TargetRow],
) -> dict[tuple[str, ...], list[TargetRow]]:
    """Group matchable targets by the tuple of source folders they route to."""
    buckets: dict[tuple[str, ...], list[TargetRow]] = {}
    for t in targets:
        key = tuple(source_folders_for_target(t))
        buckets.setdefault(key, []).append(t)
    return buckets


def main() -> int:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY not set in environment.", file=sys.stderr)
        return 2

    if not CHECKLIST_XLSX.exists():
        print(f"ERROR: checklist xlsx not found at {CHECKLIST_XLSX}", file=sys.stderr)
        return 2
    if not PHOTOS_ROOT.is_dir():
        print(f"ERROR: photos root not found at {PHOTOS_ROOT}", file=sys.stderr)
        return 2

    from anthropic import Anthropic
    client = Anthropic(api_key=api_key, max_retries=8)

    print(f"Parsing {CHECKLIST_XLSX.name}...")
    all_targets = parse_checklist(CHECKLIST_XLSX)
    print(f"  {len(all_targets)} target rows parsed.")

    matchable: list[TargetRow] = []
    results: list[MatchResult] = []
    for t in all_targets:
        cls = classify_target(t)
        if cls == "matchable":
            matchable.append(t)
        else:
            results.append(MatchResult(
                target_subfolder=t.subfolder, target_filename=t.filename,
                source_path="", confidence=0.0,
                reasoning="Pre-filtered by classifier", status=cls,
            ))
    print(f"  {len(matchable)} matchable, {len(results)} pre-filtered as unmatched.")

    buckets = _bucket_matchable_targets(matchable)
    print(f"Matching {len(matchable)} targets across {len(buckets)} vision call(s)...")

    used_sources: set[str] = set()
    for bucket_idx, (folder_tuple, bucket_targets) in enumerate(buckets.items()):
        if bucket_idx > 0:
            print(f"  sleeping {BUCKET_DELAY_SEC}s before next bucket to respect ITPM cap...")
            time.sleep(BUCKET_DELAY_SEC)
        sources: list[Path] = []
        for folder in folder_tuple:
            for p in _list_source_jpegs(PHOTOS_ROOT / folder):
                if str(p) not in used_sources:
                    sources.append(p)
        print(f"  bucket {folder_tuple}: {len(sources)} sources, {len(bucket_targets)} targets")

        try:
            assignments = match_bucket_with_vision(client, sources, bucket_targets)
        except Exception as e:
            print(f"  VISION ERROR for bucket {folder_tuple}: {e}", file=sys.stderr)
            for t in bucket_targets:
                results.append(MatchResult(
                    target_subfolder=t.subfolder, target_filename=t.filename,
                    source_path="", confidence=0.0, reasoning=str(e),
                    status="unmatched-vision-error",
                ))
            continue

        by_filename = {a["target_filename"]: a for a in assignments}
        for t in bucket_targets:
            a = by_filename.get(t.filename)
            if not a or a["source_path"] is None:
                results.append(MatchResult(
                    target_subfolder=t.subfolder, target_filename=t.filename,
                    source_path="", confidence=a["confidence"] if a else 0.0,
                    reasoning=a["reasoning"] if a else "Not returned by vision",
                    status="unmatched-low-confidence",
                ))
                continue

            if a["confidence"] < CONFIDENCE_THRESHOLD:
                results.append(MatchResult(
                    target_subfolder=t.subfolder, target_filename=t.filename,
                    source_path=a["source_path"], confidence=a["confidence"],
                    reasoning=a["reasoning"], status="unmatched-low-confidence",
                ))
                continue

            # Convert + write
            src = Path(a["source_path"])
            dst = OUTPUT_ROOT / t.subfolder / t.filename
            try:
                convert_to_webp(src, dst)
                used_sources.add(a["source_path"])
                results.append(MatchResult(
                    target_subfolder=t.subfolder, target_filename=t.filename,
                    source_path=a["source_path"], confidence=a["confidence"],
                    reasoning=a["reasoning"], status="matched",
                ))
                print(f"    WROTE {dst.relative_to(REPO_ROOT)}")
            except (RuntimeError, OSError) as e:
                results.append(MatchResult(
                    target_subfolder=t.subfolder, target_filename=t.filename,
                    source_path=a["source_path"], confidence=a["confidence"],
                    reasoning=f"cwebp failed: {e}", status="unmatched-cwebp-error",
                ))

    write_audit_csv(REPORT_CSV, results)
    matched_count = sum(1 for r in results if r.status == "matched")
    print(f"\nDone. {matched_count}/{len(all_targets)} matched. Audit: {REPORT_CSV.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
