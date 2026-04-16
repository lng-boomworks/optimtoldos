---
name: boomworks-prospect-pipeline
description: "Builds a bespoke Astro website demo for a UK small business prospect and sends them a personalised cold email with the live link."
---

# boomworks Prospect Pipeline

## Trigger

When Lee says **"new website"**, **"run pipeline"**, or **names a prospect**,
activate this pipeline.

## What this pipeline does

Builds a bespoke Astro website demo for a UK small business prospect
and sends them a personalised cold email with the live link.

## Folder structure

| Path | Purpose |
|------|---------|
| `~/Development/websites/astro-starter-template` | The master Astro template (never modify directly) |
| `~/Development/websites/{slug}` | Where each prospect site gets built (e.g. `~/Development/websites/jodies-groom-room`) |
| `pipeline/agents/` | System prompts for each specialist agent |

## Airtable

- **Base:** `appNiCjjXs3Xtd8M0` (Website Prospects)
- **Table:** `tblEvoykesFXh2aBW` (UK Prospect List)

### Key fields
| Field | Type | Notes |
|-------|------|-------|
| Business Name | Text | Primary identifier |
| Contact Name | Text | |
| Sector | Single select | Dog Grooming, Hair / Beauty / Nails, Fitness / Yoga, Tradespeople / Mechanics |
| Address / Area | Text | |
| Phone | Text | Backfill during research if found |
| Email | Text | Backfill during research if found |
| Status | Single select | `New`, `Building`, `Built`, `Built not sent`, `Sent`, `Failed`, `Review timed out` |
| Pipeline Status | Text | Free text — update at each stage (e.g. "Stage 2 complete — Research") |
| Live URL | URL | Set after deploy |
| Deployed At | DateTime | Set after deploy |
| Sent At | DateTime | Set after email sent |
| Failure Reason | Text | Set if pipeline fails |

### GitHub Pages deployment
- **Account:** `lng-boomworks`
- **URL pattern:** `https://lng-boomworks.github.io/{slug}`
- **Deploy method:** GitHub Actions workflow (`.github/workflows/deploy.yml`) — pushes to `main` trigger auto-build and deploy

## Steps — Run in order, show progress after each

### Stage 1 — Identify the Prospect

**Agent:** Scout (`pipeline/agents/scout/system.md`)

1. If Lee names a specific prospect, use that. Otherwise pull the next unprocessed row from the Airtable UK Prospect List (base `appNiCjjXs3Xtd8M0`, table `tblEvoykesFXh2aBW`).
2. Extract the core prospect data: business name, industry, location, website URL, contact name, contact email, any notes.
3. If the prospect has no website URL, flag it and ask Lee whether to skip or proceed with social-media-only research.
4. Update the Airtable record status to `Building`.

**Output:** A prospect brief saved to `~/Development/websites/{slug}/00_prospect_brief.md`.

---

### Stage 2 — Research the Business

**Agent:** Scout (`pipeline/agents/scout/system.md`)

1. Visit the prospect's existing website (if any) and extract: business description, services/products offered, unique selling points, brand voice/tone, team/founder info, testimonials, imagery style.
2. Check Google Maps / Google Business Profile for reviews, opening hours, photos, and location details.
3. Search for the business on social media (Instagram, Facebook, LinkedIn) — note follower counts, posting frequency, content themes, and visual style.
4. Search for competitors in the same local area and industry — note what they do well and where the prospect could differentiate.
5. Compile a research dossier.

**Output:** `~/Development/websites/{slug}/01_research_dossier.md`

---

### Stage 3 — Define the Brand

**Agent:** Brand Analyst (`pipeline/agents/brand-analyst/system.md`)

1. Analyse the research dossier and existing website/social presence.
2. Extract or infer: primary/secondary/accent colours (as HSL values matching the template's CSS variable system), typography recommendations (Google Fonts that pair well), brand personality traits, photography style.
3. If the prospect has clear existing branding, respect it. If their branding is weak or inconsistent, propose an elevated version with rationale.
4. Generate the CSS custom properties block that will replace the starter template's `global.css` `:root` section.
5. Recommend 2-3 hero images from Unsplash (provide URLs) that match the brand.

**Output:** `~/Development/websites/{slug}/02_brand_guide.md` containing the colour palette, font stack, CSS variables block, and image recommendations.

---

### Stage 4 — Write the Content

**Agent:** Content Writer (`pipeline/agents/content/system.md`)

1. Using the research dossier and brand guide, write all four content markdown files that the Astro template consumes:
   - `home.md` — SEO title, description, hero heading/subheading/CTA, welcome section, founder section, final CTA
   - `about.md` — the business story, values, team
   - `services.md` — services/products with descriptions
   - `contact.md` — email, phone, address, opening hours
2. All copy must be written in the prospect's authentic voice (not generic marketing speak). Use specifics from the research: real service names, real location details, real USPs.
3. SEO titles and descriptions must include the business name, location, and primary service.
4. Every CTA should have a clear action (book, call, visit, enquire) with appropriate URL type.

**Output:** The four `.md` files saved to `~/Development/websites/{slug}/src/content/pages/`.

---

### Stage 5 — Customise the Design

**Agent:** Design (`pipeline/agents/design/system.md`)

1. Copy the entire `astro-starter-template` to `~/Development/websites/{slug}/`.
2. Replace `src/styles/global.css` with the brand-customised version from Stage 3.
3. Drop the Stage 4 content files into `src/content/pages/`.
4. Update `astro.config.mjs` with the GitHub Pages config (`site: 'https://lng-boomworks.github.io'`, `base: '/{slug}'`).
5. Update component files where the business name, phone number, or navigation items appear:
   - `Navbar.tsx` — business name, phone CTA, nav links
   - `Footer.tsx` — business name, contact details, copyright year
6. Download the recommended Unsplash images and place them in `public/images/`.
7. Run `npm install` to ensure dependencies are in place.

**Output:** A complete, customised Astro project at `~/Development/websites/{slug}/` ready to build.

---

### Stage 6 — Build & Preview

**Agent:** Design (`pipeline/agents/design/system.md`)

1. Run `npm run build` in the prospect directory.
2. If the build fails, diagnose and fix the issue (most common: missing image references, malformed frontmatter, TypeScript errors in components).
3. Run `npm run preview` and take screenshots of key pages (home, about, services, contact) for review.
4. Check for: broken images, colour contrast issues, missing content sections, responsive layout problems.

**Output:** A successful `dist/` folder and a `06_build_report.md` with screenshots and any issues found.

---

### Stage 7 — Deploy to GitHub Pages

**Agent:** Design (`pipeline/agents/design/system.md`)

**GitHub account:** `lng-boomworks`
**Repo naming:** repo name = `{slug}` (matching the website folder name)
**Live URL pattern:** `https://lng-boomworks.github.io/{slug}`

1. Ensure `astro.config.mjs` has the correct GitHub Pages config:
   ```js
   site: 'https://lng-boomworks.github.io',
   base: '/{slug}',
   ```
2. Rebuild the site (`npm run build`) after setting the base path.
3. Add the GitHub Actions deploy workflow (`.github/workflows/deploy.yml`) — this builds and deploys on every push to `main`. Use the same workflow as `jodies-groom-room`.
4. Initialise a git repo (`git init -b main`), create the GitHub repo under `lng-boomworks`, commit, and push to `main`.
5. Enable GitHub Pages via Actions: **Settings → Pages → Source → "GitHub Actions"**.
6. The workflow auto-deploys. Wait 1-2 minutes then verify: `https://lng-boomworks.github.io/{slug}`.
7. Run a quick smoke test: visit each page, check CSS loads, check images load, check navigation works.
8. Update the Airtable record with the live URL and set status to `Built`.

**CRITICAL:** The `base` path in `astro.config.mjs` is required for GitHub Pages project sites. Without it, CSS and JS assets will 404.

**Output:** A live URL like `https://lng-boomworks.github.io/{slug}` and an updated Airtable record.

---

### Stage 8 — Outreach Email

**Agent:** Outreach (`pipeline/agents/outreach/system.md`)

1. Using the research dossier, brand guide, and live demo URL, draft a personalised cold email.
2. The email must:
   - Open with something specific about their business (not generic flattery)
   - Reference a concrete observation from the research (e.g., "I noticed your Google reviews mention X but your website doesn't showcase that")
   - Include the live demo link with a one-line description of what they'll see
   - Have a clear, low-friction CTA (e.g., "If you like what you see, I'd love 15 minutes to walk you through it")
   - Be concise — under 150 words
   - Sound human, not salesy
3. Also draft a follow-up email (to be sent 3-5 days later if no response).

**Output:** `~/Development/websites/{slug}/08_outreach_email.md` with the initial email and follow-up.

---

## After all stages complete

1. Present Lee with a summary: prospect name, live URL, email draft preview.
2. Ask Lee to review and approve before sending.
3. Update Airtable status to `Sent` once Lee confirms.
