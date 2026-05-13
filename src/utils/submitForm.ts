// Submits a form to the Cloudflare Pages Function at /api/forms (same-origin
// once we're hosted on Cloudflare Pages). The Function verifies the Turnstile
// token, then delivers the message via Resend.
//
// Contract with the Pages Function (functions/api/forms.ts):
//   - POST /api/forms
//   - multipart/form-data when the form has files, JSON otherwise
//   - Required body fields:
//       cf-turnstile-response — Turnstile token (populated by the widget)
//       formName              — "contact", "quote", etc., used for the subject
//       email                 — visitor email; relayed into Reply-To
//   - Server returns { ok: true } on success, { ok: false, error: "..." } on failure.

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export interface SubmitFormOptions {
  /** Identifies the form for analytics + email subject. e.g. "contact", "quote". */
  formName: string;
}

const FORMS_ENDPOINT = '/api/forms';

export async function submitForm(
  form: HTMLFormElement,
  options: SubmitFormOptions,
): Promise<boolean> {
  const honeypot = (form.elements.namedItem('botcheck') as HTMLInputElement | null)?.value;
  if (honeypot) return true; // silently accept so spam bots don't retry

  // Turnstile populates this hidden input inside the widget host element.
  // If the challenge hasn't completed (or expired) the value is empty and the
  // server-side verify will refuse the message. Components disable submit
  // until the widget reports a token via Turnstile's `callback`.
  const tokenInput = form.elements.namedItem(
    'cf-turnstile-response',
  ) as HTMLInputElement | null;
  if (!tokenInput || !tokenInput.value) {
    // eslint-disable-next-line no-console
    console.warn('[submitForm] no Turnstile token; aborting');
    return false;
  }

  const hasFiles = Array.from(form.elements).some(
    (el): el is HTMLInputElement =>
      el instanceof HTMLInputElement &&
      el.type === 'file' &&
      el.files !== null &&
      el.files.length > 0,
  );

  let body: BodyInit;
  const headers: Record<string, string> = { Accept: 'application/json' };

  if (hasFiles) {
    const fd = new FormData(form);
    fd.set('formName', options.formName);
    body = fd;
  } else {
    const payload: Record<string, string> = { formName: options.formName };
    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') payload[key] = value;
    });
    body = JSON.stringify(payload);
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(FORMS_ENDPOINT, { method: 'POST', headers, body });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      // eslint-disable-next-line no-console
      console.warn('[submitForm] failed', { status: res.status, error: data.error });
      return false;
    }

    // Bind ONE Custom Event trigger ("form_success") to the Google Ads
    // conversion tag in GTM — do not also bind a Page View or click trigger
    // to the same conversion or it'll double-count.
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'form_success', form: options.formName });
    }
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[submitForm] fetch failed', err);
    return false;
  }
}
