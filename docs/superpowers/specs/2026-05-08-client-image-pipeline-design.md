# Client Image Pipeline — Design Spec

**Date:** 2026-05-08
**Status:** Approved (pending review of this written spec)
**Owner:** Lee Nicholson

## Goal

Take ~152 client-supplied JPEGs from Dropbox, vision-match the matchable subset to ~50 of the 120 target slots defined in `optimtoldos_checklist_fotos.xlsx`, convert to WebP, and write to the repo at the target paths the website already expects. The remaining ~70 location-specific slots are flagged as UNMATCHED and left for a later run when geo-labelled photos are available.

## Why this design

The website's new SEO-segmented sitemap defines 120 image slots across six subfolders (`core`, `productos`, `zonas-es`, `zonas-en`, `prod-zona`, `guias`). The client supplied product-type-organised photos but no geo metadata, which makes 64 location-specific rows + ~6 missing-subject core rows non-matchable today. Manual matching for the matchable subset would still be hours of work. This pipeline automates the matchable subset using vision and produces an audit trail so the unmatched rows can be filled later without rework.

## Inputs

- **Mapping spreadsheet:** `/Users/lee/Library/CloudStorage/Dropbox/OptimToldos/optimtoldos_checklist_fotos.xlsx`, sheet `CHECKLIST` (Spanish) or `CHECKLIST ENG`. Columns: SUBFOLDER, FILE NAME (target .webp), WHAT SHOULD THE PHOTO SHOW, AREA / GPS, ✓ DONE, NOTES. Use this rather than the COMPLETO sitemap xlsx — the per-row description is cleaner.
- **Source photos:** `/Users/lee/Library/CloudStorage/Dropbox/OptimToldos/Photos/` — 13 product-type subfolders, ~152 JPEGs total.

## Outputs

- New WebP files at `public/images/{core,productos,zonas-es,zonas-en,prod-zona,guias}/<filename>.webp`. Target filenames match the names the website code references (or will reference, for pages still being wired up as part of the in-flight SEO overhaul).
- Audit report: `scripts/build-client-images.report.csv` (gitignored; regenerated each run) with columns `target_subfolder, target_filename, source_path, confidence, reasoning, status` where `status ∈ {matched, unmatched-no-geo, unmatched-no-source, unmatched-low-confidence, unmatched-vision-error}`.
- Existing `public/images/` subfolders (blog, gallery, logos, cortinas, pergolas, velas, ventanas) and Dropbox sources are not modified.

## Architecture

A single Python script: `scripts/build-client-images.py`. Three stages run in one invocation:

### Stage 1 — Plan
Parse the checklist xlsx into a list of target rows. Group rows by target subfolder. Classify each row as:
- **Matchable**: target is in `core`, `productos`, or `guias`, AND the description matches a product type that has source photos.
- **Unmatched-no-geo**: target is in `zonas-es`, `zonas-en`, or `prod-zona`. These need town-specific photos we don't have.
- **Unmatched-no-source**: target description names a subject not in the source pool (team photo, office facade, aerial, etc.).

### Stage 2 — Vision match
For each matchable bucket (e.g. all Product Pages rows whose description references "awning", paired with the `toldos *` source folders), call Claude Vision once per bucket with: the candidate source images, the target slot descriptions, and an instruction to assign the best source per target with a 0–1 confidence and short reasoning. Allow no-match. **Disallow source reuse** across targets (each source photo is consumed by at most one target). Estimated ~10–15 vision calls total.

Rows with confidence < 0.5 → status `unmatched-low-confidence`, no file written.

### Stage 3 — Convert + write
For each `matched` row, run `cwebp -q 82 -resize 1600 0` on the source JPEG → write to `public/images/<subfolder>/<filename>.webp`. The `-resize 1600 0` clamps max width to 1600px, preserves aspect ratio. Existing files at the target path are overwritten.

Always write the audit CSV at the end, regardless of how many rows matched.

## Sizing decision

One canonical WebP per slot at max-width 1600px, quality 82. WebP at this quality lands around 150–300 KB. Browsers downscale for mobile via standard `<img>` rendering. Responsive hero variants (480/768/1280w) are out of scope here — the existing `scripts/generate-hero-variants.sh` can produce them post-hoc for any slot that proves to be a full-bleed hero where mobile bytes matter.

## Vision matching contract

Per call, the prompt template is:

> Below are N candidate photos from the `<folder name>` source folder. Below that are M target slots. Each target has: filename, "what the photo should show" description, and area context. For each target, pick the best candidate photo OR return `null` if none fit. Score each pick 0–1. Each candidate may be assigned to at most one target. Return a JSON array of `{target_filename, source_index, confidence, reasoning}`.

Implementation uses the Anthropic SDK with `claude-sonnet-4-6` (vision-capable, cost-appropriate for this volume).

## Idempotence and re-runnability

The script is idempotent: re-running overwrites existing WebP files and rewrites the audit CSV. When more client photos arrive (e.g. a batch of Torrevieja-specific shots), the user adds them to Dropbox and re-runs — previously UNMATCHED rows can become matched.

## Error handling

- Missing xlsx or Photos folder: hard fail with clear message.
- `cwebp` not on PATH: hard fail with install hint (`brew install webp`).
- Vision API failure on a bucket: log error, mark all rows in that bucket as `unmatched-vision-error`, continue to next bucket. Don't crash the whole run.
- Source file unreadable: skip that source candidate, continue.

## Out of scope

- Responsive hero variants (480/768/1280w).
- Updating Astro/HTML/template references — target filenames already match what the site expects.
- Stock-photo fallback for unmatched slots.
- The 64 location-specific rows — left for a future run when geo-labelled photos exist.
- Sibling spreadsheets (`optimtoldos_sitemap_images_COMPLETO.xlsx`, `Website image management.xlsx`) — informational only; the checklist xlsx is the source of truth.

## Open questions

None blocking. Decision points already made by the user:
- Pipeline shape: one-shot (not two-phase with review gate).
- Unmatchable handling: fill only what's matchable; flag the rest.
- Output sizing: single 1600px-max WebP per slot.

## Next step after spec approval

Hand off to the `writing-plans` skill to produce a detailed implementation plan for `scripts/build-client-images.py` (stage decomposition, prompt template, file I/O, error paths, audit CSV schema, smoke-test approach).
