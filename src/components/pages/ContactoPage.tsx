import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";
import { url, localizedUrl } from "../../utils/paths";
import { hasConsent } from "../../utils/consent";

const inputClasses =
  "w-full bg-sand border border-border rounded-xl px-4 py-3 text-text-body focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta outline-none transition-colors";

export function ContactoPage({ locale = 'es' }: { locale?: Locale }) {
  const [mapAllowed, setMapAllowed] = useState(false);

  useEffect(() => {
    if (hasConsent()) setMapAllowed(true);
  }, []);

  const productOptions = [
    t(locale, 'quote.form.product_option.1'),
    t(locale, 'quote.form.product_option.2'),
    t(locale, 'quote.form.product_option.3'),
    t(locale, 'quote.form.product_option.4'),
    t(locale, 'quote.form.product_option.5'),
    t(locale, 'quote.form.product_option.6'),
  ];

  const contactInfo = [
    {
      label: t(locale, 'contact.info.address_label'),
      value: t(locale, 'contact.info.address_value'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
        </svg>
      ),
    },
    {
      label: t(locale, 'contact.info.email_label'),
      value: t(locale, 'contact.info.email_value'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: t(locale, 'contact.info.phone_label'),
      value: t(locale, 'contact.info.phone_value'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      label: t(locale, 'contact.info.hours_label'),
      value: t(locale, 'contact.info.hours_value'),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/gallery/toldo-monobloc-1280.webp")}
              srcSet={`${url("/images/gallery/toldo-monobloc-480.webp")} 480w, ${url("/images/gallery/toldo-monobloc-768.webp")} 768w, ${url("/images/gallery/toldo-monobloc-1280.webp")} 1280w, ${url("/images/gallery/toldo-monobloc.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={locale === 'en' ? 'Monobloc awning installation' : 'Instalación de toldo monobloc'}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, 'contact.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                  {t(locale, 'contact.hero.description')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Form */}
                <FadeIn>
                  <form
                    className="space-y-5"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div>
                      <label className="block text-sm font-medium text-text-body mb-2">
                        {t(locale, 'contact.form.name_label')}
                      </label>
                      <input
                        type="text"
                        placeholder={t(locale, 'contact.form.name_placeholder')}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-body mb-2">
                        {t(locale, 'contact.form.email_label')}
                      </label>
                      <input
                        type="email"
                        placeholder={t(locale, 'contact.form.email_placeholder')}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-body mb-2">
                        {t(locale, 'contact.form.phone_label')}
                      </label>
                      <input
                        type="tel"
                        placeholder={t(locale, 'contact.form.phone_placeholder')}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-body mb-2">
                        {t(locale, 'contact.form.product_label')}
                      </label>
                      <select className={inputClasses}>
                        <option value="">{t(locale, 'contact.form.product_placeholder')}</option>
                        {productOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-body mb-2">
                        {t(locale, 'contact.form.message_label')}
                      </label>
                      <textarea
                        rows={4}
                        placeholder={t(locale, 'contact.form.message_placeholder')}
                        className={inputClasses}
                      />
                    </div>
                    <label className="flex items-start gap-2 text-sm text-text-muted cursor-pointer">
                      <input type="checkbox" required className="mt-1 accent-terracotta shrink-0" />
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
                    <Button variant="primary" href="#">
                      {t(locale, 'contact.form.submit')}
                    </Button>
                  </form>
                </FadeIn>

                {/* Info */}
                <FadeIn delay={0.2}>
                  <div className="space-y-6">
                    {contactInfo.map((item) => (
                      <div
                        key={item.label}
                        className="flex gap-4 p-5 rounded-xl bg-sand-light/50"
                      >
                        <div className="text-terracotta shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-serif text-lg text-navy mb-1">
                            {item.label}
                          </h3>
                          <p className="text-text-muted whitespace-pre-line">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Map (consent-gated) */}
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mt-6">
                      {mapAllowed ? (
                        <iframe
                          src="https://maps.google.com/maps?q=Elche,+Alicante,+Spain&t=&z=12&ie=UTF8&iwloc=&output=embed"
                          title={t(locale, 'contact.info.map_placeholder')}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full border-0"
                        />
                      ) : (
                        <div className="w-full h-full bg-sand flex flex-col items-center justify-center gap-4 p-6 text-center">
                          <p className="text-text-muted text-sm max-w-xs">
                            {t(locale, 'contact.info.map_consent_notice')}
                          </p>
                          <button
                            type="button"
                            onClick={() => setMapAllowed(true)}
                            className="bg-terracotta hover:bg-terracotta-dark text-white font-medium rounded-xl px-5 py-2 text-sm transition-colors"
                          >
                            {t(locale, 'contact.info.map_load_button')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
