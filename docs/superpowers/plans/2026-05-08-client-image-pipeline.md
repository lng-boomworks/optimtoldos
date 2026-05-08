# Client Image Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `scripts/build-client-images.py` — a one-shot Python script that vision-matches Dropbox client photos to the matchable subset of the 120 sitemap image slots, converts to 1600px-max WebP at q82, writes to `public/images/`, and produces an audit CSV.

**Architecture:** Single Python script invoked via `uv run`. Three stages run in one invocation: (1) parse `optimtoldos_checklist_fotos.xlsx` and classify each row as matchable / unmatched-no-geo / unmatched-no-source via deterministic rules; (2) for each matchable bucket, route to source folders by keyword and call Claude Sonnet 4.6 vision once per bucket to assign source photos to target slots; (3) shell out to `cwebp` to convert and write each matched file. An audit CSV is always written.

**Tech Stack:** Python 3 (system `python3`), `uv` for ephemeral dependencies (`openpyxl`, `anthropic`, `pillow`), `cwebp` 1.6+ on PATH, Claude Sonnet 4.6 vision API.

**Spec:** [`docs/superpowers/specs/2026-05-08-client-image-pipeline-design.md`](../specs/2026-05-08-client-image-pipeline-design.md)

---

## File structure

- Create: `scripts/build-client-images.py` — the main script (single file; ~400 LOC).
- Create: `scripts/build-client-images_test.py` — pytest tests covering the deterministic functions and one mocked vision call.
- Modify: `.gitignore` — add `scripts/build-client-images.report.csv` and `scripts/__pycache__/`.

The script is structured as pure functions (parser, classifier, router, command builder, CSV writer) that each do one thing, plus a `main()` that orchestrates them. The vision call is the only impure unit and is testable via dependency injection of an Anthropic-client-like object.

---

## Task 1: Set up script skeleton, dependencies, and gitignore

**Files:**
- Create: `scripts/build-client-images.py`
- Modify: `.gitignore`

- [ ] **Step 1: Verify required tools on PATH**

Run: `which uv python3 cwebp && python3 --version`
Expected: Three paths printed; Python 3.10 or higher.

If any are missing: `brew install uv webp` (Python 3 ships with macOS).

- [ ] **Step 2: Create the script skeleton**

Create `scripts/build-client-images.py` with this content:

```python
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
```

Make it executable:

```bash
chmod +x scripts/build-client-images.py
```

- [ ] **Step 3: Add gitignore entries**

Append to `.gitignore`:

```
scripts/build-client-images.report.csv
scripts/__pycache__/
```

- [ ] **Step 4: Verify the shebang works and script runs**

Run: `python3 scripts/build-client-images.py; echo "exit=$?"`
Expected: prints `build-client-images: not yet implemented` to stderr, `exit=1`.

(We will run via `python3 ...` rather than the shebang from now on; the shebang is there for convenience if the engineer chooses to invoke directly.)

- [ ] **Step 5: Commit**

```bash
git add scripts/build-client-images.py .gitignore
git commit -m "feat(images): add skeleton for client image pipeline script"
```

---

## Task 2: Parse the checklist xlsx into TargetRow objects

**Files:**
- Modify: `scripts/build-client-images.py` (add `TargetRow`, `parse_checklist`)
- Create: `scripts/build-client-images_test.py`

- [ ] **Step 1: Write the failing test**

Create `scripts/build-client-images_test.py` with:

```python
"""Tests for build-client-images.py — pytest, no fixtures, real xlsx."""
import importlib.util
from pathlib import Path

# Load the script as a module despite the hyphen in its name
SCRIPT = Path(__file__).parent / "build-client-images.py"
spec = importlib.util.spec_from_file_location("bci", SCRIPT)
bci = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bci)


def test_parse_checklist_returns_120_target_rows():
    rows = bci.parse_checklist(bci.CHECKLIST_XLSX)
    assert len(rows) == 120, f"expected 120 target rows, got {len(rows)}"


def test_parse_checklist_target_row_shape():
    rows = bci.parse_checklist(bci.CHECKLIST_XLSX)
    first = rows[0]
    assert first.subfolder  # e.g. "core"
    assert first.filename.endswith(".webp")
    assert first.description  # non-empty
    # area can be empty for some rows; just check the attribute exists
    assert hasattr(first, "area")


def test_parse_checklist_subfolders_match_spec():
    rows = bci.parse_checklist(bci.CHECKLIST_XLSX)
    subfolders = {r.subfolder for r in rows}
    assert subfolders == {"core", "productos", "zonas-es", "zonas-en", "prod-zona", "guias"}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `uv run --with openpyxl --with pytest pytest scripts/build-client-images_test.py -v`
Expected: FAIL with `AttributeError: module 'bci' has no attribute 'parse_checklist'`.

- [ ] **Step 3: Implement TargetRow and parse_checklist**

In `scripts/build-client-images.py`, add (after the constants block, before `main`):

```python
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `uv run --with openpyxl --with pytest pytest scripts/build-client-images_test.py -v`
Expected: 3 tests PASS.

If `test_parse_checklist_returns_120_target_rows` fails with a count other than 120: inspect the xlsx via `uv run --with openpyxl python -c "import openpyxl; wb=openpyxl.load_workbook('<path>'); ws=wb['CHECKLIST']; [print(i, r) for i, r in enumerate(ws.iter_rows(values_only=True))]"` and adjust the row-skipping logic.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-client-images.py scripts/build-client-images_test.py
git commit -m "feat(images): parse checklist xlsx into TargetRow list"
```

---

## Task 3: Classify each TargetRow as matchable or unmatched

**Files:**
- Modify: `scripts/build-client-images.py` (add `classify_target`)
- Modify: `scripts/build-client-images_test.py`

- [ ] **Step 1: Write the failing tests**

Append to `scripts/build-client-images_test.py`:

```python
def test_classify_zonas_es_is_unmatched_no_geo():
    row = bci.TargetRow(subfolder="zonas-es", filename="toldos-torrevieja-instalacion.webp",
                        description="Terrace with awning in Torrevieja", area="Torrevieja")
    assert bci.classify_target(row) == "unmatched-no-geo"


def test_classify_zonas_en_is_unmatched_no_geo():
    row = bci.TargetRow(subfolder="zonas-en", filename="awnings-elche-terrace-commercial.webp",
                        description="Bar or shop with awning in Elche", area="Elche")
    assert bci.classify_target(row) == "unmatched-no-geo"


def test_classify_prod_zona_is_unmatched_no_geo():
    row = bci.TargetRow(subfolder="prod-zona", filename="pergolas-benidorm-hotel-hosteleria.webp",
                        description="Hotel terrace with pergola in Benidorm", area="Benidorm")
    assert bci.classify_target(row) == "unmatched-no-geo"


def test_classify_team_photo_is_unmatched_no_source():
    row = bci.TargetRow(subfolder="core", filename="sobre-nosotros-equipo-optimtoldos.webp",
                        description="Photo of the installation team in company uniform",
                        area="Torrevieja")
    assert bci.classify_target(row) == "unmatched-no-source"


def test_classify_office_photo_is_unmatched_no_source():
    row = bci.TargetRow(subfolder="core", filename="contacto-optimtoldos-torrevieja.webp",
                        description="Office facade or person on the phone", area="Torrevieja")
    assert bci.classify_target(row) == "unmatched-no-source"


def test_classify_product_page_pergola_is_matchable():
    row = bci.TargetRow(subfolder="productos", filename="pergolas-categoria-alicante.webp",
                        description="Pergolas category page hero", area="Alicante")
    assert bci.classify_target(row) == "matchable"


def test_classify_authority_guide_is_matchable():
    row = bci.TargetRow(subfolder="guias", filename="elegir-toldo-costa-blanca-guia.webp",
                        description="Awning fabric and structure samples", area="Costa Blanca")
    assert bci.classify_target(row) == "matchable"
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `uv run --with openpyxl --with pytest pytest scripts/build-client-images_test.py -v -k classify`
Expected: 7 tests FAIL with `AttributeError: 'classify_target'`.

- [ ] **Step 3: Implement classify_target**

Add to `scripts/build-client-images.py` after `parse_checklist`:

```python
# Description keyword fragments that indicate a subject we have NO source photo of.
# These are matched case-insensitively against the description.
NO_SOURCE_KEYWORDS = (
    "team",          # team photo / installer team
    "uniform",
    "office",        # office facade
    "facade",
    "phone",         # person on phone
    "client",        # client + installer with quote
    "installer explaining",
    "aerial",
    "landscape of the costa blanca",
    "town hall",
    "ayuntamiento",
    "official document",
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `uv run --with openpyxl --with pytest pytest scripts/build-client-images_test.py -v -k classify`
Expected: 7 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-client-images.py scripts/build-client-images_test.py
git commit -m "feat(images): classify target rows by matchability"
```

---

## Task 4: Route matchable targets to source folders by keyword

**Files:**
- Modify: `scripts/build-client-images.py` (add `source_folders_for_target`)
- Modify: `scripts/build-client-images_test.py`

- [ ] **Step 1: Write the failing tests**

Append to `scripts/build-client-images_test.py`:

```python
def test_route_pergola_target_to_pergola_folders():
    row = bci.TargetRow(subfolder="productos", filename="pergolas-categoria-alicante.webp",
                        description="Pergolas category page hero", area="Alicante")
    assert set(bci.source_folders_for_target(row)) == {"pergolas", "pergolas bioclimaticas"}


def test_route_cortinas_target_to_cortinas_folder():
    row = bci.TargetRow(subfolder="productos", filename="cortinas-cristal-terraza-alicante.webp",
                        description="Glass curtains category page hero", area="Alicante")
    assert bci.source_folders_for_target(row) == ["cortinas de cristal"]


def test_route_velas_target_to_velas_folder():
    row = bci.TargetRow(subfolder="productos", filename="velas-sombra-jardin-alicante.webp",
                        description="Tensioned shade sail in a garden", area="Alicante")
    assert bci.source_folders_for_target(row) == ["velas"]


def test_route_ventanas_target_to_ventanas_folder():
    row = bci.TargetRow(subfolder="productos", filename="ventanas-pvc-alicante-instalacion.webp",
                        description="PVC window installation", area="Alicante")
    assert bci.source_folders_for_target(row) == ["Ventanas pvc"]


def test_route_toldos_target_to_all_toldo_folders():
    row = bci.TargetRow(subfolder="productos", filename="toldos-categoria-costa-blanca.webp",
                        description="Awnings category page hero", area="Costa Blanca")
    expected = {"toldos cofre", "toldo brazos extensible", "toldos punto recto",
                "toldos stor balcon", "Toldos Screen ZIP"}
    assert set(bci.source_folders_for_target(row)) == expected


def test_route_generic_home_target_to_all_folders():
    """Generic home/gallery/blog covers can pull from any folder — return them all."""
    row = bci.TargetRow(subfolder="core", filename="home-toldos-pergolas-costa-blanca.webp",
                        description="Awning or pergola installed — main website image",
                        area="Costa Blanca")
    folders = bci.source_folders_for_target(row)
    # Should include both pergola and toldo folders
    assert "pergolas" in folders or "pergolas bioclimaticas" in folders
    assert any(f.startswith("toldo") for f in folders)
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `uv run --with openpyxl --with pytest pytest scripts/build-client-images_test.py -v -k route`
Expected: 6 tests FAIL with `AttributeError: 'source_folders_for_target'`.

- [ ] **Step 3: Implement source_folders_for_target**

Add to `scripts/build-client-images.py` after `classify_target`:

```python
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
    """
    haystack = (row.filename + " " + row.description).lower()

    # Specific product mentions take priority
    if "cortina" in haystack or "cristal" in haystack or "glass curtain" in haystack:
        return list(CORTINAS_FOLDERS)
    if "ventana" in haystack or "pvc window" in haystack:
        return list(VENTANAS_FOLDERS)
    if "vela" in haystack or "shade sail" in haystack or "lona" in haystack:
        return list(VELAS_FOLDERS)

    # Pergola vs awning — these can co-occur (e.g. "pergola vs toldo")
    has_pergola = "pergola" in haystack or "pérgola" in haystack
    has_toldo = "toldo" in haystack or "awning" in haystack

    if has_pergola and has_toldo:
        return PERGOLA_FOLDERS + TOLDO_FOLDERS
    if has_pergola:
        return list(PERGOLA_FOLDERS)
    if has_toldo:
        return list(TOLDO_FOLDERS)

    # Generic home/gallery/blog covers — every folder is a candidate
    return PERGOLA_FOLDERS + TOLDO_FOLDERS + CORTINAS_FOLDERS + VELAS_FOLDERS
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `uv run --with openpyxl --with pytest pytest scripts/build-client-images_test.py -v -k route`
Expected: 6 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-client-images.py scripts/build-client-images_test.py
git commit -m "feat(images): route matchable targets to source folders"
```

---

## Task 5: Build the cwebp conversion command

**Files:**
- Modify: `scripts/build-client-images.py` (add `build_cwebp_command`, `convert_to_webp`)
- Modify: `scripts/build-client-images_test.py`

- [ ] **Step 1: Write the failing test**

Append to `scripts/build-client-images_test.py`:

```python
def test_build_cwebp_command_uses_q82_and_max_width_1600():
    src = Path("/tmp/source.jpg")
    dst = Path("/tmp/output.webp")
    cmd = bci.build_cwebp_command(src, dst)
    assert cmd[0] == "cwebp"
    assert "-q" in cmd and "82" in cmd
    assert "-resize" in cmd
    # cwebp -resize <width> <height>; height 0 means preserve aspect
    resize_idx = cmd.index("-resize")
    assert cmd[resize_idx + 1] == "1600"
    assert cmd[resize_idx + 2] == "0"
    assert str(src) in cmd
    assert "-o" in cmd
    assert str(dst) in cmd
```

- [ ] **Step 2: Run test to verify it fails**

Run: `uv run --with openpyxl --with pytest pytest scripts/build-client-images_test.py -v -k cwebp`
Expected: 1 test FAIL with `AttributeError: 'build_cwebp_command'`.

- [ ] **Step 3: Implement build_cwebp_command and convert_to_webp**

Add to `scripts/build-client-images.py` after `source_folders_for_target`:

```python
import subprocess


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
    """Convert src to dst via cwebp. Creates parent dirs. Raises on non-zero exit."""
    dst.parent.mkdir(parents=True, exist_ok=True)
    cmd = build_cwebp_command(src, dst)
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"cwebp failed for {src}: {result.stderr}")
```

- [ ] **Step 4: Run test to verify it passes**

Run: `uv run --with openpyxl --with pytest pytest scripts/build-client-images_test.py -v -k cwebp`
Expected: 1 test PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-client-images.py scripts/build-client-images_test.py
git commit -m "feat(images): add cwebp conversion wrapper"
```

---

## Task 6: Build the audit CSV writer

**Files:**
- Modify: `scripts/build-client-images.py` (add `MatchResult`, `write_audit_csv`)
- Modify: `scripts/build-client-images_test.py`

- [ ] **Step 1: Write the failing test**

Append to `scripts/build-client-images_test.py`:

```python
def test_write_audit_csv_round_trip(tmp_path):
    results = [
        bci.MatchResult(
            target_subfolder="productos",
            target_filename="pergolas-categoria-alicante.webp",
            source_path="/dropbox/Photos/pergolas/IMG_001.jpg",
            confidence=0.92,
            reasoning="Bioclimatic pergola in landscape format",
            status="matched",
        ),
        bci.MatchResult(
            target_subfolder="zonas-es",
            target_filename="toldos-torrevieja-instalacion.webp",
            source_path="",
            confidence=0.0,
            reasoning="Location-specific row; no geo-labelled photos available",
            status="unmatched-no-geo",
        ),
    ]
    out = tmp_path / "report.csv"
    bci.write_audit_csv(out, results)

    import csv
    with out.open() as f:
        rows = list(csv.DictReader(f))
    assert len(rows) == 2
    assert rows[0]["target_filename"] == "pergolas-categoria-alicante.webp"
    assert rows[0]["status"] == "matched"
    assert rows[0]["confidence"] == "0.92"
    assert rows[1]["status"] == "unmatched-no-geo"
    assert rows[1]["source_path"] == ""
```

- [ ] **Step 2: Run test to verify it fails**

Run: `uv run --with openpyxl --with pytest pytest scripts/build-client-images_test.py -v -k audit_csv`
Expected: 1 test FAIL with `AttributeError: 'MatchResult'`.

- [ ] **Step 3: Implement MatchResult and write_audit_csv**

Add to `scripts/build-client-images.py` after `convert_to_webp`:

```python
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `uv run --with openpyxl --with pytest pytest scripts/build-client-images_test.py -v -k audit_csv`
Expected: 1 test PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-client-images.py scripts/build-client-images_test.py
git commit -m "feat(images): add audit CSV writer"
```

---

## Task 7: Build the vision matcher (mocked test, then real implementation)

**Files:**
- Modify: `scripts/build-client-images.py` (add `match_bucket_with_vision`)
- Modify: `scripts/build-client-images_test.py`

This task has the most subtlety. The function takes a list of source image paths and a list of TargetRow objects, sends them to Claude Sonnet 4.6 in one API call, and returns a list of `(target_filename, source_path_or_None, confidence, reasoning)` tuples.

- [ ] **Step 1: Write the failing test with a fake Anthropic client**

Append to `scripts/build-client-images_test.py`:

```python
def test_match_bucket_with_vision_assigns_by_index(tmp_path):
    # Create two tiny dummy JPEGs so the function can read them
    from PIL import Image
    src1 = tmp_path / "a.jpg"
    src2 = tmp_path / "b.jpg"
    Image.new("RGB", (100, 100), color="red").save(src1, "JPEG")
    Image.new("RGB", (100, 100), color="blue").save(src2, "JPEG")

    targets = [
        bci.TargetRow("productos", "x.webp", "red thing", ""),
        bci.TargetRow("productos", "y.webp", "blue thing", ""),
    ]

    # Fake response: source 0 -> x.webp, source 1 -> y.webp
    fake_response_text = (
        '[{"target_filename":"x.webp","source_index":0,"confidence":0.9,"reasoning":"red"},'
        '{"target_filename":"y.webp","source_index":1,"confidence":0.85,"reasoning":"blue"}]'
    )

    class FakeContent:
        def __init__(self, text): self.text = text
    class FakeMessage:
        def __init__(self, text): self.content = [FakeContent(text)]
    class FakeMessagesAPI:
        def create(self, **kwargs): return FakeMessage(fake_response_text)
    class FakeClient:
        def __init__(self): self.messages = FakeMessagesAPI()

    results = bci.match_bucket_with_vision(
        client=FakeClient(),
        sources=[src1, src2],
        targets=targets,
    )

    assert len(results) == 2
    by_target = {r["target_filename"]: r for r in results}
    assert by_target["x.webp"]["source_path"] == str(src1)
    assert by_target["x.webp"]["confidence"] == 0.9
    assert by_target["y.webp"]["source_path"] == str(src2)


def test_match_bucket_with_vision_handles_null_source(tmp_path):
    from PIL import Image
    src = tmp_path / "a.jpg"
    Image.new("RGB", (100, 100), color="red").save(src, "JPEG")

    targets = [bci.TargetRow("productos", "x.webp", "purple thing", "")]
    fake_response_text = '[{"target_filename":"x.webp","source_index":null,"confidence":0.0,"reasoning":"no match"}]'

    class FakeContent:
        def __init__(self, text): self.text = text
    class FakeMessage:
        def __init__(self, text): self.content = [FakeContent(text)]
    class FakeMessagesAPI:
        def create(self, **kwargs): return FakeMessage(fake_response_text)
    class FakeClient:
        def __init__(self): self.messages = FakeMessagesAPI()

    results = bci.match_bucket_with_vision(
        client=FakeClient(), sources=[src], targets=targets,
    )
    assert results[0]["source_path"] is None
    assert results[0]["confidence"] == 0.0
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `uv run --with openpyxl --with pillow --with pytest pytest scripts/build-client-images_test.py -v -k vision`
Expected: 2 tests FAIL with `AttributeError: 'match_bucket_with_vision'`.

- [ ] **Step 3: Implement match_bucket_with_vision**

Add to `scripts/build-client-images.py` after `write_audit_csv`:

```python
import base64
import io
import json


def _encode_image_for_vision(src: Path, max_dim: int = 1024, quality: int = 70) -> tuple[str, str]:
    """Resize + JPEG-encode + base64 an image for the Anthropic API. Returns (b64, media_type)."""
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
    if not sources or not targets:
        return [{"target_filename": t.filename, "source_path": None,
                 "confidence": 0.0, "reasoning": "no sources or targets in bucket"}
                for t in targets]

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

    results: list[dict] = []
    for item in parsed:
        idx = item.get("source_index")
        source_path = str(sources[idx]) if isinstance(idx, int) and 0 <= idx < len(sources) else None
        results.append({
            "target_filename": item["target_filename"],
            "source_path": source_path,
            "confidence": float(item.get("confidence", 0.0)),
            "reasoning": item.get("reasoning", ""),
        })
    return results
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `uv run --with openpyxl --with pillow --with pytest pytest scripts/build-client-images_test.py -v -k vision`
Expected: 2 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-client-images.py scripts/build-client-images_test.py
git commit -m "feat(images): add Claude vision matcher for source->target assignment"
```

---

## Task 8: Wire up the orchestration in main()

**Files:**
- Modify: `scripts/build-client-images.py` (replace stub `main`)

This task ties the pieces together. There are no new pure functions to TDD — the test for this is the smoke test in Task 9.

- [ ] **Step 1: Replace main() with the full orchestration**

Replace the existing `def main()` in `scripts/build-client-images.py` with:

```python
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
    client = Anthropic(api_key=api_key)

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
    for folder_tuple, bucket_targets in buckets.items():
        sources: list[Path] = []
        for folder in folder_tuple:
            for p in _list_source_jpegs(PHOTOS_ROOT / folder):
                if str(p) not in used_sources:
                    sources.append(p)
        print(f"  bucket {folder_tuple}: {len(sources)} sources, {len(bucket_targets)} targets")

        try:
            assignments = match_bucket_with_vision(client, sources, bucket_targets)
        except Exception as e:
            print(f"  VISION ERROR: {e}", file=sys.stderr)
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
            except RuntimeError as e:
                results.append(MatchResult(
                    target_subfolder=t.subfolder, target_filename=t.filename,
                    source_path=a["source_path"], confidence=a["confidence"],
                    reasoning=f"cwebp failed: {e}", status="unmatched-cwebp-error",
                ))

    write_audit_csv(REPORT_CSV, results)
    matched_count = sum(1 for r in results if r.status == "matched")
    print(f"\nDone. {matched_count}/{len(results)} matched. Audit: {REPORT_CSV.relative_to(REPO_ROOT)}")
    return 0
```

- [ ] **Step 2: Run existing test suite to confirm no regression**

Run: `uv run --with openpyxl --with pillow --with pytest pytest scripts/build-client-images_test.py -v`
Expected: All previous tests still PASS (we only edited `main`).

- [ ] **Step 3: Commit**

```bash
git add scripts/build-client-images.py
git commit -m "feat(images): wire up orchestration in main()"
```

---

## Task 9: Smoke test on real data

**Files:** None modified — runtime verification only.

- [ ] **Step 1: Set the API key**

```bash
export ANTHROPIC_API_KEY=<your-key>
```

If you do not have a key on hand, see Anthropic Console → API Keys.

- [ ] **Step 2: Run the script end-to-end**

Run: `python3 scripts/build-client-images.py`

Expected console output (approximate, exact counts may vary slightly):
```
Parsing optimtoldos_checklist_fotos.xlsx...
  120 target rows parsed.
  ~50 matchable, ~70 pre-filtered as unmatched.
Matching ~50 targets across ~6 vision call(s)...
  bucket ('cortinas de cristal',): 9 sources, N targets
    WROTE public/images/productos/cortinas-cristal-terraza-alicante.webp
  ...
Done. ~40-50/120 matched. Audit: scripts/build-client-images.report.csv
```

- [ ] **Step 3: Inspect the audit CSV**

Run: `column -ts',' scripts/build-client-images.report.csv | less -S`

Verify:
- All 120 target filenames are present.
- Status values are one of: `matched`, `unmatched-no-geo`, `unmatched-no-source`, `unmatched-low-confidence`, `unmatched-vision-error`, `unmatched-cwebp-error`.
- All `zonas-es`, `zonas-en`, `prod-zona` rows are status `unmatched-no-geo`.
- Most `productos` and `guias` rows are status `matched` with confidence ≥ 0.5.

- [ ] **Step 4: Inspect the WebP outputs**

Run: `ls -la public/images/productos/ public/images/core/ public/images/guias/`

Verify:
- New `.webp` files appear in each subfolder.
- File sizes are roughly 100–400KB (sanity check on the 1600px / q82 setting).
- Open one in Preview/Finder and confirm it visually matches the description in the audit CSV.

- [ ] **Step 5: Spot-check 3 random matches**

Pick 3 rows from the CSV with status `matched` at random. For each:
- Open the source JPEG in Dropbox.
- Open the destination WebP in `public/images/<subfolder>/`.
- Confirm they are the same image and the WebP looks correct (not over-compressed, not wrongly cropped).

- [ ] **Step 6: Decide on staging**

If all spot-checks look right, stage the new WebP files (the audit CSV is gitignored):

```bash
git add public/images/core/ public/images/productos/ public/images/guias/
git status   # eyeball the file list
git commit -m "feat(images): add client photos for matchable sitemap slots"
```

If any spot-check looks wrong: do NOT commit. Edit `NO_SOURCE_KEYWORDS`, `source_folders_for_target`, or the vision prompt in `_build_vision_prompt`, and re-run from Task 9 Step 2. The script is idempotent; re-running overwrites prior outputs.

- [ ] **Step 7: Final commit (script + tests)**

If you have not already:

```bash
git status   # confirm scripts/ files are committed
```

The script and tests should already be committed from Tasks 1–8. This step is just a final sanity check.

---

## Self-review notes (filled by writer)

- **Spec coverage:** Every spec section is covered:
  - "Plan stage" → Tasks 2 (parse) + 3 (classify)
  - "Vision match" → Tasks 4 (route) + 7 (vision call)
  - "Convert + write" → Tasks 5 (cwebp) + 8 (orchestration)
  - "Audit artifact" → Task 6 (CSV)
  - "Idempotence" → Task 9 (re-run guidance)
  - "Error handling" → Task 8 (try/except around vision + cwebp)
  - "Disallow source reuse" → Task 8 (`used_sources` set)
- **Type consistency:** `TargetRow` (Task 2), `MatchResult` (Task 6), and `match_bucket_with_vision` return-dict shape (Task 7) are stable across tasks. Status string values are consistent everywhere.
- **No placeholders:** Every code step shows full code. No "similar to X". Real commands with expected output.
- **Open assumption flagged:** The `_list_source_jpegs` helper in Task 8 doesn't recurse — that matches the current Dropbox layout (photos sit directly in each subfolder) but would break if the client adds a sub-sub-folder. If that happens, change `iterdir()` to `rglob("*")`.
