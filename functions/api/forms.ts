/// <reference types="@cloudflare/workers-types" />
//
// Cloudflare Pages Function: form submissions for optimtoldos.com.
// Receives POST /api/forms from ContactoPage + PresupuestoPage React forms,
// verifies the Turnstile token, then forwards the message to Resend.
//
// Env vars (set in Cloudflare Pages dashboard → Settings → Environment variables):
//   TURNSTILE_SECRET  — Cloudflare Turnstile secret key (server-only)
//   RESEND_API_KEY    — Resend API key (server-only)
//   RESEND_FROM       — verified sending address, e.g. "Optim Toldos <forms@optimtoldos.com>"
//   RESEND_TO         — destination inbox, e.g. "info@optimtoldos.com"
//
// Test keys for local dev (always-pass) live in .dev.vars.example.

interface Env {
  TURNSTILE_SECRET: string;
  RESEND_API_KEY: string;
  RESEND_FROM: string;
  RESEND_TO: string;
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_API_URL = 'https://api.resend.com/emails';
// 5 MB total cap on attachments. Resend itself allows up to 40 MB but this
// keeps us in line with the previous Web3Forms limit and avoids surprise costs.
const MAX_TOTAL_ATTACHMENT_BYTES = 5 * 1024 * 1024;

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  hostname?: string;
}

interface ResendAttachment {
  filename: string;
  content: string;
  content_type?: string;
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Chunked base64 — String.fromCharCode(...arr) blows the call stack on
// multi-MB payloads. Spec-compliant `btoa` requires a binary string input.
function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  const chunkSize = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunkSize)),
    );
  }
  return btoa(binary);
}

async function verifyTurnstile(
  token: string,
  secret: string,
  remoteIp: string,
): Promise<{ success: boolean; errors: string[] }> {
  if (!token) return { success: false, errors: ['missing-token'] };
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (remoteIp) body.append('remoteip', remoteIp);
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body });
    const data = (await res.json()) as TurnstileVerifyResponse;
    return {
      success: data.success === true,
      errors: data['error-codes'] || [],
    };
  } catch (err) {
    return { success: false, errors: ['fetch-failed', String(err)] };
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const missing = (['TURNSTILE_SECRET', 'RESEND_API_KEY', 'RESEND_FROM', 'RESEND_TO'] as const).filter(
    (k) => !env[k],
  );
  if (missing.length > 0) {
    console.error('[forms] misconfigured — missing env vars:', missing.join(', '));
    return jsonResponse(500, { ok: false, error: 'misconfigured', missing });
  }

  const contentType = request.headers.get('content-type') || '';
  const fields: Record<string, string> = {};
  const attachments: ResendAttachment[] = [];
  let totalAttachmentBytes = 0;

  try {
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      for (const [key, value] of form.entries()) {
        if (value instanceof File) {
          if (value.size === 0) continue;
          totalAttachmentBytes += value.size;
          if (totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
            return jsonResponse(413, { ok: false, error: 'too_large' });
          }
          const buf = await value.arrayBuffer();
          attachments.push({
            filename: value.name,
            content: arrayBufferToBase64(buf),
            content_type: value.type || undefined,
          });
        } else {
          fields[key] = String(value);
        }
      }
    } else if (contentType.includes('application/json')) {
      const json = (await request.json()) as Record<string, string>;
      for (const [k, v] of Object.entries(json)) fields[k] = String(v);
    } else {
      return jsonResponse(400, { ok: false, error: 'unsupported_content_type' });
    }
  } catch (err) {
    console.error('[forms] body parse failed', err);
    return jsonResponse(400, { ok: false, error: 'invalid_body' });
  }

  // Honeypot — silent accept to deny bots feedback they can retrain against.
  if (fields.botcheck) {
    return jsonResponse(200, { ok: true });
  }

  const token = fields['cf-turnstile-response'] || '';
  const remoteIp = request.headers.get('cf-connecting-ip') || '';
  const verified = await verifyTurnstile(token, env.TURNSTILE_SECRET, remoteIp);
  if (!verified.success) {
    // Server log surfaces Cloudflare's specific reject codes (e.g.
    // `invalid-input-secret`, `timeout-or-duplicate`). Visible via
    // `wrangler pages deployment tail`. The client response stays opaque
    // so we don't leak hints to attackers probing the endpoint.
    console.error('[forms] turnstile verify failed', verified.errors);
    return jsonResponse(403, { ok: false, error: 'turnstile_failed' });
  }

  const formName = fields.formName || 'unknown';
  const visitorEmail = (fields.email || '').trim();
  const subject = fields.subject || `Optim Toldos Web — ${formName}`;

  // Hide control fields from the human-readable email body.
  const display: Record<string, string> = { ...fields };
  delete display['cf-turnstile-response'];
  delete display.botcheck;
  delete display.formName;
  delete display.subject;
  delete display.privacy_consent;

  const rows = Object.entries(display)
    .filter(([, v]) => v && v.length > 0)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;vertical-align:top;"><strong>${escapeHtml(k)}</strong></td><td style="padding:4px 0;">${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('');

  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#222;">
    <h2 style="margin:0 0 12px 0;font-weight:600;">${escapeHtml(subject)}</h2>
    <table style="border-collapse:collapse;">${rows}</table>
    <p style="margin-top:24px;color:#777;font-size:12px;">Enviado desde optimtoldos.com · IP ${escapeHtml(remoteIp)}</p>
  </body></html>`;

  const text = Object.entries(display)
    .filter(([, v]) => v && v.length > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  const resendBody: Record<string, unknown> = {
    from: env.RESEND_FROM,
    to: [env.RESEND_TO],
    subject,
    html,
    text,
  };
  if (visitorEmail) resendBody.reply_to = visitorEmail;
  if (attachments.length > 0) resendBody.attachments = attachments;

  const resendRes = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resendBody),
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text().catch(() => '');
    console.error('[forms] resend failed', resendRes.status, errText);
    return jsonResponse(502, { ok: false, error: 'send_failed' });
  }

  return jsonResponse(200, { ok: true });
};

// Pre-flight + same-origin check for any non-POST.
export const onRequest: PagesFunction = async (context) => {
  return jsonResponse(405, { ok: false, error: 'method_not_allowed' });
};
