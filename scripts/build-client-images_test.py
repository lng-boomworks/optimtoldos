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
