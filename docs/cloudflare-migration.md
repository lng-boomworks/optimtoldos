# Cloudflare Pages migration — runbook

Migration of optimtoldos.com from GitHub Pages + Web3Forms → Cloudflare
Pages + Pages Functions + Turnstile + Resend.

## What's in the repo

- `functions/api/forms.ts` — Pages Function: verifies Turnstile, sends via Resend.
- `src/components/Turnstile.tsx` — explicit-render React widget.
- `src/utils/submitForm.ts` — client-side POST `/api/forms`.
- `wrangler.toml` — local dev config.
- `.env.example` — `PUBLIC_TURNSTILE_SITE_KEY` (client bundle).
- `.dev.vars.example` — server-side secrets for `wrangler pages dev` (gitignored copy is `.dev.vars`).

Production secrets are NOT in the repo — they live in the Cloudflare
Pages dashboard.

## Phase 1 — Cloudflare account + zone

1. Sign up at <https://dash.cloudflare.com> (free).
2. **Add a Site** → enter `optimtoldos.com` → choose Free plan.
3. Cloudflare scans existing DNS at the current authoritative server. **Review the imported records** — make sure A/AAAA, MX, TXT (SPF), and any DKIM/DMARC TXT records are all present. Anything missing here will break mail when nameservers swap.
4. Cloudflare gives you two nameservers (e.g. `xyz.ns.cloudflare.com`). **Don't change them at your registrar yet** — that's Phase 5.

## Phase 2 — Resend setup (using a sending subdomain)

We send from `send.optimtoldos.com` rather than the apex so that automated
mail can't tarnish the reputation of `info@optimtoldos.com` if anything ever
goes wrong with deliverability.

1. Sign up at <https://resend.com>.
2. **Domains** → Add Domain → **`send.optimtoldos.com`** (not the apex).
3. Resend gives you 2 TXT records to add (and optional DMARC). All are scoped to the subdomain:
   - SPF: `send.optimtoldos.com` TXT → `v=spf1 include:_spf.resend.com ~all`
   - DKIM: `resend._domainkey.send.optimtoldos.com` TXT → (long key value Resend gives you)
   - DMARC (recommended): `_dmarc.send.optimtoldos.com` TXT → `v=DMARC1; p=quarantine; rua=mailto:info@optimtoldos.com`
4. Add those records inside the Cloudflare DNS panel for `optimtoldos.com` (the zone you set up in Phase 1). Cloudflare's UI lets you add records on `send` as subdomain — just type `send` (or `_dmarc.send`) in the Name field, not the full FQDN.
5. Click **Verify** in Resend. Takes ~5 minutes once DNS propagates.
6. **API Keys** → create a new key, scope to **Sending access** on `send.optimtoldos.com`. Copy the key (starts `re_…`) — only shown once.
7. Decide sender + recipient:
   - `RESEND_FROM`: `"Optim Toldos <forms@send.optimtoldos.com>"` — must be on the verified subdomain.
   - `RESEND_TO`: `info@optimtoldos.com` (or wherever enquiries should land — note the destination is on the apex, no need to change Optim's existing email setup).

## Phase 3 — Turnstile setup

1. In the Cloudflare dashboard sidebar → **Turnstile** → Add site.
2. Site name: `optimtoldos`. Hostnames: `optimtoldos.com`, `*.pages.dev` (so previews work).
3. Widget Mode: **Managed** (Cloudflare decides invisible vs interactive).
4. Save → you get a **Site Key** (starts `0x4…`, public) and a **Secret Key** (server-only).

## Phase 4 — Pages project

1. In the Cloudflare dashboard → **Workers & Pages** → Create application → **Pages** → Connect to Git.
2. Authorise the `lng-boomworks` GitHub org and select the `optimtoldos` repo.
3. Production branch: **whichever you'll merge to** — typically `main`.
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** *(leave blank)*
5. Environment variables (Production):

   | Variable | Where | Value |
   | --- | --- | --- |
   | `PUBLIC_TURNSTILE_SITE_KEY` | Production → Variables | Turnstile site key (from Phase 3) |
   | `TURNSTILE_SECRET` | Production → Secrets | Turnstile secret key (from Phase 3) |
   | `RESEND_API_KEY` | Production → Secrets | Resend API key (from Phase 2) |
   | `RESEND_FROM` | Production → Variables | e.g. `Optim Toldos <forms@send.optimtoldos.com>` |
   | `RESEND_TO` | Production → Variables | e.g. `info@optimtoldos.com` |

   Repeat the same five vars under **Preview** if you want previews from non-main branches to also send mail.
6. Trigger the first deploy: push a commit or click **Retry deployment**.
7. Once green, the project gets a preview URL like `optimtoldos.pages.dev`. **Test the form there** — submit one contact form. The email should arrive at `RESEND_TO` within seconds.

## Phase 5 — DNS cutover (the only step with real risk)

1. In the Pages project → **Custom domains** → Add `optimtoldos.com` (apex) and `www.optimtoldos.com`. Cloudflare will tell you it needs to be the authoritative DNS — that's the next step.
2. Go to your **domain registrar** (whoever you bought `optimtoldos.com` from — Namecheap, GoDaddy, etc.) and change the nameservers to the two Cloudflare nameservers you got in Phase 1.
3. Wait for propagation — usually 5–30 minutes, sometimes longer.
4. Once Cloudflare confirms the domain is **active**, the Pages custom domain auto-provisions a free TLS certificate (~1 minute).
5. Visit `https://optimtoldos.com` — should be served from Cloudflare Pages now. Test the form one more time on the real domain.
6. Decommission GitHub Pages: in the repo settings → Pages → set source to None. Delete or disable the `gh-pages` deploy workflow.

## Local dev

Astro dev (`npm run dev`) does NOT serve Pages Functions — `/api/forms` will 404. Two options:

### Option A — only test the form on a deploy preview

Push a branch, Cloudflare Pages builds a preview, test there. Simplest.

### Option B — `wrangler pages dev` locally

```bash
cp .dev.vars.example .dev.vars
# Edit .dev.vars and paste your real RESEND_API_KEY if you want emails to
# actually send. Turnstile test key already passes, no need to change.
npm run pages:dev
```

This builds the site, then serves `dist/` + `functions/` on `http://localhost:8788`. The form will hit `/api/forms` and the Function will run with the secrets from `.dev.vars`.

## Rollback

If anything goes wrong post-cutover:

1. In the domain registrar, switch nameservers back to the previous authoritative DNS (Cloudflare records can be re-exported from the dashboard if needed).
2. Re-enable the GitHub Pages workflow.
3. Forms revert to the prior behaviour — but only if you also revert the `submitForm.ts` change. Easiest: `git revert` the migration commits.

## Verification checklist post-cutover

- [ ] `https://optimtoldos.com` loads from Cloudflare Pages (check `cf-ray` header).
- [ ] `https://www.optimtoldos.com` redirects to apex or vice versa (whichever you prefer — set in Pages → Custom domains).
- [ ] TLS certificate valid + auto-renewing.
- [ ] Contact form: submits, email arrives at `info@optimtoldos.com` within 30s.
- [ ] Quote form: submits, email arrives.
- [ ] Submitting without completing Turnstile is blocked client-side (button disabled).
- [ ] Submitting with a tampered Turnstile token returns 403 from `/api/forms`.
- [ ] GTM `form_success` event fires (check the GA4 DebugView with `?gtm_debug=1`).
- [ ] Cookie banner still renders, all four Consent Mode v2 signals fire.
- [ ] Sitemaps + canonical URLs unchanged (still `https://optimtoldos.com/...`).
- [ ] Google Search Console + Bing Webmaster: confirm crawl still works (no DNS-related fetch errors).

## Notes for the privacy policy

The privacy policies (ES + EN) have been updated to list **Cloudflare** and **Resend** in §6 as processors, replacing the old Web3Forms entry. The DPF + SCC wording is included. No further policy change is needed for this migration.
