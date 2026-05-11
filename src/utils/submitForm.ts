// Submits a form to Web3Forms and returns whether it succeeded.
// The access_key below is public by design (it ships in every browser POST)
// and is tied to the info@optimtoldos.com inbox. Rotate or revoke it from
// https://web3forms.com if compromised.
//
// Mail-header policy (deliverability + reply safety):
//   - From:      Web3Forms relay address on their own SPF/DKIM-authenticated
//                domain. The visitor's email is NEVER placed in From — that
//                would forge the header and trigger outbound spam-filter
//                blocks at the recipient's mail server when replying.
//   - Reply-To:  set explicitly to the visitor's `email` field so hitting
//                "Reply" in the inbox routes to the visitor (not Web3Forms).
//   - from_name: a static identifier ("Optim Toldos Web — <form>") so the
//                inbox shows the originating form, not the visitor name.
//   - Sender / Return-Path: handled by Web3Forms on their authenticated
//                domain. Bounces go back to them, not to optimtoldos.com.
//
// When the form has selected files, we POST multipart/form-data (Web3Forms
// supports attachments up to 5 MB total on the free tier). Otherwise we POST
// JSON, which is cleaner for text-only forms.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "7a9ba262-0d06-4e93-88ab-cf53934a8169";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export interface SubmitFormOptions {
  /** Identifies the form for analytics + email subject. e.g. "contact", "quote". */
  formName: string;
}

export async function submitForm(
  form: HTMLFormElement,
  options: SubmitFormOptions,
): Promise<boolean> {
  const honeypot = (form.elements.namedItem("botcheck") as HTMLInputElement | null)?.value;
  if (honeypot) return true; // silently accept so spam bots don't retry

  const visitorEmail =
    (form.elements.namedItem("email") as HTMLInputElement | null)?.value?.trim() || "";

  const hasFiles = Array.from(form.elements).some(
    (el): el is HTMLInputElement =>
      el instanceof HTMLInputElement &&
      el.type === "file" &&
      el.files !== null &&
      el.files.length > 0,
  );

  const fromName = `Optim Toldos Web — ${options.formName}`;

  let body: BodyInit;
  let headers: Record<string, string>;

  if (hasFiles) {
    const fd = new FormData(form);
    fd.set("access_key", WEB3FORMS_ACCESS_KEY);
    fd.set("from_name", fromName);
    if (visitorEmail) fd.set("replyto", visitorEmail);
    body = fd;
    headers = { Accept: "application/json" };
  } else {
    const fd = new FormData(form);
    const payload: Record<string, string> = {
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: fromName,
    };
    if (visitorEmail) payload.replyto = visitorEmail;
    fd.forEach((value, key) => {
      if (typeof value === "string") payload[key] = value;
    });
    body = JSON.stringify(payload);
    headers = { "Content-Type": "application/json", Accept: "application/json" };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", headers, body });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean | string; message?: string };
    // eslint-disable-next-line no-console
    console.log("[submitForm] Web3Forms response", { status: res.status, ok: res.ok, body: data });
    if (!res.ok) return false;
    const ok = data.success === true || data.success === "true";

    // Single canonical conversion event for GTM. Bind ONE Custom Event trigger
    // (event name "form_success") to your Google Ads conversion tag in GTM —
    // do not also bind a Page View / click trigger to the same conversion.
    if (ok && typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "form_success", form: options.formName });
    }

    return ok;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[submitForm] fetch failed", err);
    return false;
  }
}
