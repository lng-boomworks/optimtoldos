#!/bin/bash
# Run this from the optimtoldos project root after downloading images via the browser
# Usage: bash move-images.sh

DOWNLOADS="$HOME/Downloads"
IMAGES="public/images"

# Create directories
mkdir -p "$IMAGES"/{logos,toldos,pergolas,velas,cortinas,ventanas,hero}

echo "Moving images from $DOWNLOADS to $IMAGES..."

# Logos
mv "$DOWNLOADS/logo-2x.png"       "$IMAGES/logos/" 2>/dev/null
mv "$DOWNLOADS/logo-sticky.png"   "$IMAGES/logos/" 2>/dev/null
mv "$DOWNLOADS/logo-footer.png"   "$IMAGES/logos/" 2>/dev/null

# Toldos (Awnings)
mv "$DOWNLOADS/toldo-ventana.jpg"           "$IMAGES/toldos/" 2>/dev/null
mv "$DOWNLOADS/toldo-punto-recto.jpg"       "$IMAGES/toldos/" 2>/dev/null
mv "$DOWNLOADS/toldo-cofre-extensible.jpg"  "$IMAGES/toldos/" 2>/dev/null
mv "$DOWNLOADS/toldo-palilleria.jpg"        "$IMAGES/toldos/" 2>/dev/null
mv "$DOWNLOADS/toldo-monobloc.jpg"          "$IMAGES/toldos/" 2>/dev/null
mv "$DOWNLOADS/toldo-cofre.png"             "$IMAGES/toldos/" 2>/dev/null
mv "$DOWNLOADS/toldo-awning-hero.jpg"       "$IMAGES/toldos/" 2>/dev/null
mv "$DOWNLOADS/toldo-brazos-invisibles.jpg" "$IMAGES/toldos/" 2>/dev/null

# Pergolas
mv "$DOWNLOADS/pergola-bioclimatica.jpg"      "$IMAGES/pergolas/" 2>/dev/null
mv "$DOWNLOADS/pergola-costablanca.jpg"       "$IMAGES/pergolas/" 2>/dev/null
mv "$DOWNLOADS/pergola-restaurante.png"       "$IMAGES/pergolas/" 2>/dev/null
mv "$DOWNLOADS/pergola-bioclimatica-2024.jpg" "$IMAGES/pergolas/" 2>/dev/null
mv "$DOWNLOADS/pergola-design-1.png"          "$IMAGES/pergolas/" 2>/dev/null
mv "$DOWNLOADS/pergola-design-2.png"          "$IMAGES/pergolas/" 2>/dev/null

# Velas de Sombra (Shade Sails)
mv "$DOWNLOADS/vela-tensada.jpg"    "$IMAGES/velas/" 2>/dev/null
mv "$DOWNLOADS/vela-rectangular.jpg" "$IMAGES/velas/" 2>/dev/null
mv "$DOWNLOADS/vela-freeform.jpg"   "$IMAGES/velas/" 2>/dev/null
mv "$DOWNLOADS/vela-1.jpg"          "$IMAGES/velas/" 2>/dev/null

# Cortinas de Cristal (Glass Curtains)
mv "$DOWNLOADS/cortina-cristal-abatible.jpg" "$IMAGES/cortinas/" 2>/dev/null
mv "$DOWNLOADS/cortina-cristalera.jpg"       "$IMAGES/cortinas/" 2>/dev/null
mv "$DOWNLOADS/cortina-abatible-2x.png"     "$IMAGES/cortinas/" 2>/dev/null
mv "$DOWNLOADS/cortina-cristal-2x.png"      "$IMAGES/cortinas/" 2>/dev/null
mv "$DOWNLOADS/cortina-cristal-1.jpg"        "$IMAGES/cortinas/" 2>/dev/null
mv "$DOWNLOADS/cortina-cristal-2024.jpg"     "$IMAGES/cortinas/" 2>/dev/null

# Ventanas PVC (Windows)
mv "$DOWNLOADS/ventanas-aluplast.jpg"  "$IMAGES/ventanas/" 2>/dev/null
mv "$DOWNLOADS/ventanas-aluplast2.jpg" "$IMAGES/ventanas/" 2>/dev/null
mv "$DOWNLOADS/ventanas-cortizo2.jpg"  "$IMAGES/ventanas/" 2>/dev/null
mv "$DOWNLOADS/ventanas-cortizo.jpg"   "$IMAGES/ventanas/" 2>/dev/null
mv "$DOWNLOADS/ventanas-pvc-hero.jpg"  "$IMAGES/ventanas/" 2>/dev/null

# Hero images
mv "$DOWNLOADS/hero-toldos-2025.jpg"   "$IMAGES/hero/" 2>/dev/null

echo ""
echo "Done! Image inventory:"
echo "======================"
for dir in logos toldos pergolas velas cortinas ventanas hero; do
  count=$(ls -1 "$IMAGES/$dir" 2>/dev/null | wc -l)
  echo "  $dir: $count files"
done
echo ""
total=$(find "$IMAGES" -type f | wc -l)
echo "Total: $total images moved"
