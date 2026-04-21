// Submits a form to Web3Forms and returns whether it succeeded.
// The access_key below is public by design (it ships in every browser POST)
// and is tied to the info@optimtoldos.com inbox. Rotate or revoke it from
// https://web3forms.com if compromised.
//
// When the form has selected files, we POST multipart/form-data (Web3Forms
// supports attachments up to 5 MB total on the free tier). Otherwise we POST
// JSON, which is cleaner for text-only forms.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "7a9ba262-0d06-4e93-88ab-cf53934a8169";

export async function submitForm(form: HTMLFormElement): Promise<boolean> {
  const honeypot = (form.elements.namedItem("botcheck") as HTMLInputElement | null)?.value;
  if (honeypot) return true; // silently accept so spam bots don't retry

  const hasFiles = Array.from(form.elements).some(
    (el): el is HTMLInputElement =>
      el instanceof HTMLInputElement &&
      el.type === "file" &&
      el.files !== null &&
      el.files.length > 0,
  );

  let body: BodyInit;
  let headers: Record<string, string>;

  if (hasFiles) {
    const fd = new FormData(form);
    fd.append("access_key", WEB3FORMS_ACCESS_KEY);
    body = fd;
    headers = { Accept: "application/json" };
  } else {
    const fd = new FormData(form);
    const payload: Record<string, string> = { access_key: WEB3FORMS_ACCESS_KEY };
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
    return data.success === true || data.success === "true";
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[submitForm] fetch failed", err);
    return false;
  }
}
