import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";
import { url, localizedUrl } from "../../utils/paths";
import { submitForm } from "../../utils/submitForm";

type FormStatus = "idle" | "sending" | "success" | "error";

const productOptionCount = 6;

// Map product page slugs (both locales) to the 1-based product-option index.
const PRODUCT_SLUG_TO_OPTION: Record<string, number> = {
  toldos: 1, awnings: 1,
  pergolas: 2,
  "cortinas-de-cristal": 3, "glass-curtains": 3,
  "velas-de-sombra": 4, "shade-sails": 4,
  "ventanas-pvc": 5, "pvc-windows": 5,
};

// Display name for each Service Areas anchor slug. Keeps the form human-readable
// when the quote CTA is "/presupuesto?location=orihuela-costa".
const LOCATION_SLUG_TO_NAME: Record<string, string> = {
  torrevieja: "Torrevieja",
  "orihuela-costa": "Orihuela Costa",
  "la-zenia": "La Zenia",
  "punta-prima": "Punta Prima",
  "ciudad-quesada": "Ciudad Quesada",
  "guardamar-del-segura": "Guardamar del Segura",
  "la-marina": "La Marina",
  elche: "Elche",
  "santa-pola": "Santa Pola",
  "gran-alacant": "Gran Alacant",
  "cabo-roig": "Cabo Roig",
  villamartin: "Villamartín",
  "playa-flamenca": "Playa Flamenca",
  campoamor: "Campoamor",
  "los-balcones": "Los Balcones",
  rojales: "Rojales",
  benidorm: "Benidorm",
  alicante: "Alicante",
  "san-miguel-de-salinas": "San Miguel de Salinas",
  dolores: "Dolores",
};

const inputClasses =
  "w-full bg-sand border border-border rounded-xl px-4 py-3 text-text-body focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta outline-none transition-colors";

export function PresupuestoPage({ locale = 'es' }: { locale?: Locale }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [defaultProduct, setDefaultProduct] = useState<string>("");
  const [defaultLocation, setDefaultLocation] = useState<string>("");

  const productOptions = Array.from({ length: productOptionCount }, (_, i) =>
    t(locale, `quote.form.product_option.${i + 1}` as any)
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const productSlug = params.get('product');
    const locationSlug = params.get('location');
    if (productSlug) {
      const idx = PRODUCT_SLUG_TO_OPTION[productSlug];
      if (idx) setDefaultProduct(productOptions[idx - 1]);
    }
    if (locationSlug) {
      setDefaultLocation(
        LOCATION_SLUG_TO_NAME[locationSlug] ?? locationSlug.replace(/-/g, ' ')
      );
    }
    // productOptions only needs to be read once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const ok = await submitForm(form, { formName: "quote" });
    if (ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/gallery/toldo-brazo-extensible-1280.webp")}
              srcSet={`${url("/images/gallery/toldo-brazo-extensible-480.webp")} 480w, ${url("/images/gallery/toldo-brazo-extensible-768.webp")} 768w, ${url("/images/gallery/toldo-brazo-extensible-1280.webp")} 1280w, ${url("/images/gallery/toldo-brazo-extensible.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={locale === 'en' ? 'Extending arm awning' : 'Toldo de brazo extensible'}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, 'quote.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                  {t(locale, 'quote.hero.description')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Form */}
          <section className="bg-white py-16 md:py-24">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
              <FadeIn>
                <form
                  className="space-y-5"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="hidden"
                    name="subject"
                    value={locale === 'en' ? 'New quote request from optimtoldos.com' : 'Nueva solicitud de presupuesto desde optimtoldos.com'}
                  />
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                  />
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      {t(locale, 'quote.form.name_label')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={t(locale, 'quote.form.name_placeholder')}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      {t(locale, 'quote.form.email_label')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={t(locale, 'quote.form.email_placeholder')}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      {t(locale, 'quote.form.phone_label')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t(locale, 'quote.form.phone_placeholder')}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      {t(locale, 'quote.form.product_label')}
                    </label>
                    <select
                      name="product"
                      className={inputClasses}
                      key={defaultProduct || 'empty'}
                      defaultValue={defaultProduct}
                    >
                      <option value="">{t(locale, 'quote.form.product_placeholder')}</option>
                      {productOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      {t(locale, 'quote.form.location_label')}
                    </label>
                    <input
                      type="text"
                      name="location"
                      key={defaultLocation || 'empty-loc'}
                      defaultValue={defaultLocation}
                      placeholder={t(locale, 'quote.form.location_placeholder')}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      {t(locale, 'quote.form.measurements_label')}
                    </label>
                    <input
                      type="text"
                      name="measurements"
                      placeholder={t(locale, 'quote.form.measurements_placeholder')}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      {t(locale, 'quote.form.description_label')}
                    </label>
                    <textarea
                      rows={5}
                      name="description"
                      placeholder={t(locale, 'quote.form.description_placeholder')}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      {t(locale, 'quote.form.photos_label')}
                    </label>
                    <p className="text-sm text-text-muted bg-sand-light/60 rounded-xl px-4 py-3 border border-border">
                      {t(locale, 'quote.form.photos_email_note')}
                    </p>
                  </div>
                  <label className="flex items-start gap-2 text-sm text-text-muted cursor-pointer pt-2">
                    <input type="checkbox" name="privacy_consent" required className="mt-1 accent-terracotta shrink-0" />
                    <span>
                      {t(locale, 'forms.privacy_consent').replace(t(locale, 'forms.privacy_consent_link'), '').trim()}{' '}
                      <a
                        href={localizedUrl(`/${slugMap['privacy-policy'][locale]}`, locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terracotta underline hover:text-terracotta-dark"
                      >
                        {t(locale, 'forms.privacy_consent_link')}
                      </a>
                      <span className="text-red-500 ml-1">*</span>
                    </span>
                  </label>
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-medium rounded-xl px-8 py-4 text-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? t(locale, 'forms.status.sending') : t(locale, 'quote.form.submit')}
                    </button>
                  </div>
                  {status === 'success' && (
                    <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                      {t(locale, 'forms.status.success')}
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      {t(locale, 'forms.status.error')}
                    </p>
                  )}
                  <p className="text-center text-text-muted text-sm pt-2">
                    {t(locale, 'quote.form.call_prefix')}{" "}
                    <a
                      href="tel:+34603572348"
                      className="text-terracotta font-medium hover:underline"
                    >
                      +34 603 572 348
                    </a>
                  </p>
                </form>
              </FadeIn>
            </div>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
