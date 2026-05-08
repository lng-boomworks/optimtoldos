"""Tests for build-client-images.py — pytest, no fixtures, real xlsx."""
import importlib.util
from pathlib import Path

# Load the script as a module despite the hyphen in its name.
# Register in sys.modules BEFORE exec_module so @dataclass can resolve the
# module dict (required when the module name contains a hyphen and thus is not
# a normal importable package name).
import sys

SCRIPT = Path(__file__).parent / "build-client-images.py"
spec = importlib.util.spec_from_file_location("bci", SCRIPT)
bci = importlib.util.module_from_spec(spec)
sys.modules["bci"] = bci
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
