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


def test_classify_spanish_office_description_is_unmatched_no_source():
    row = bci.TargetRow(
        subfolder="core",
        filename="contacto-optimtoldos-torrevieja.webp",
        description="Fachada de la oficina o persona hablando por teléfono",
        area="Torrevieja",
    )
    assert bci.classify_target(row) == "unmatched-no-source"


def test_classify_spanish_aerial_description_is_unmatched_no_source():
    row = bci.TargetRow(
        subfolder="core",
        filename="zonas-servicio-costa-blanca-alicante.webp",
        description="Vista aérea o paisaje de la Costa Blanca",
        area="Costa Blanca",
    )
    assert bci.classify_target(row) == "unmatched-no-source"


def test_classify_spanish_team_description_is_unmatched_no_source():
    row = bci.TargetRow(
        subfolder="core",
        filename="about-us-optimtoldos-team.webp",
        description="Foto equipo — versión EN (puede ser la misma que ES)",
        area="Torrevieja",
    )
    assert bci.classify_target(row) == "unmatched-no-source"


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
    assert set(bci.source_folders_for_target(row)) == {"velas", "lonas piscina"}


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
    assert any(f.startswith("toldo") or f.startswith("Toldo") for f in folders)


def test_route_toldo_with_ventana_in_description_routes_to_toldo_folders():
    """Awning descriptions often mention windows. The ventana keyword must
    not hijack the toldo-context routing."""
    row = bci.TargetRow(
        subfolder="prod-zona",
        filename="toldo-brazo-extensible-fachada.webp",
        description="Toldo de brazo extensible sobre ventana o balcón",
        area="Costa Blanca",
    )
    folders = bci.source_folders_for_target(row)
    assert "Ventanas pvc" not in folders
    assert "toldo brazos extensible" in folders


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
