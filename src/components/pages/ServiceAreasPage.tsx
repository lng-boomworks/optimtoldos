import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { hasConsent } from "../../utils/consent";
import { t, type Locale } from "../../i18n/index";
import { slugMap, type PageId } from "../../i18n/slugs";

// Static per-location metadata. Slugs match the anchor ids so other pages can
// deep-link as /service-areas/#<slug>. Product keys drive the "popular products
// here" chip row and point to the right product page per locale.
interface LocationMeta {
  i: number;
  slug: string;
  products: PageId[];
}

const LOCATIONS: LocationMeta[] = [
  { i: 1,  slug: "torrevieja",           products: ["awnings", "pergolas"] },
  { i: 2,  slug: "orihuela-costa",       products: ["pergolas", "awnings"] },
  { i: 3,  slug: "la-zenia",             products: ["pergolas", "glass-curtains"] },
  { i: 4,  slug: "punta-prima",          products: ["awnings", "pergolas"] },
  { i: 5,  slug: "ciudad-quesada",       products: ["pergolas", "shade-sails"] },
  { i: 6,  slug: "guardamar-del-segura", products: ["awnings", "pergolas"] },
  { i: 7,  slug: "la-marina",            products: ["awnings", "shade-sails"] },
  { i: 8,  slug: "elche",                products: ["awnings", "pergolas", "glass-curtains", "pvc-windows"] },
  { i: 9,  slug: "santa-pola",           products: ["awnings", "glass-curtains"] },
  { i: 10, slug: "gran-alacant",         products: ["pergolas", "glass-curtains"] },
  { i: 11, slug: "cabo-roig",            products: ["pergolas", "glass-curtains"] },
  { i: 12, slug: "villamartin",          products: ["pergolas", "awnings"] },
  { i: 13, slug: "playa-flamenca",       products: ["awnings", "glass-curtains"] },
  { i: 14, slug: "campoamor",            products: ["pergolas", "shade-sails"] },
  { i: 15, slug: "los-balcones",         products: ["awnings", "pergolas"] },
  { i: 16, slug: "rojales",              products: ["awnings", "glass-curtains"] },
  { i: 17, slug: "benidorm",             products: ["awnings", "shade-sails"] },
  { i: 18, slug: "alicante",             products: ["awnings", "pergolas", "glass-curtains", "pvc-windows"] },
  { i: 19, slug: "san-miguel-de-salinas", products: ["awnings", "pergolas"] },
  { i: 20, slug: "dolores",              products: ["awnings", "shade-sails"] },
];

function productLabel(key: PageId, locale: Locale): string {
  const map: Record<PageId, string> = {
    awnings: t(locale, 'nav.awnings'),
    pergolas: t(locale, 'nav.pergolas'),
    "glass-curtains": t(locale, 'nav.curtains'),
    "shade-sails": t(locale, 'nav.sails'),
    "pvc-windows": t(locale, 'nav.windows'),
    home: "",
    gallery: "",
    blog: "",
    contact: "",
    "about-us": "",
    quote: "",
    "legal-notice": "",
    "privacy-policy": "",
    "cookie-policy": "",
    "service-areas": "",
    "licence-guide": "",
    "bioclimatic-vs-aluminium": "",
    "awning-guide": "",
    "glass-curtains-guide": "",
  };
  return map[key];
}

function productPath(key: PageId, locale: Locale): string {
  return localizedUrl(`/${slugMap[key][locale]}`, locale);
}

export function ServiceAreasPage({ locale = 'es' }: { locale?: Locale }) {
  const [mapAllowed, setMapAllowed] = useState(false);
  useEffect(() => {
    if (hasConsent()) setMapAllowed(true);
  }, []);

  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);
  const licencePath = localizedUrl(`/${slugMap["licence-guide"][locale]}`, locale);

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/gallery/hero-home-1280.webp")}
              srcSet={`${url("/images/gallery/hero-home-480.webp")} 480w, ${url("/images/gallery/hero-home-768.webp")} 768w, ${url("/images/gallery/hero-home-1280.webp")} 1280w, ${url("/images/gallery/hero-home.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={t(locale, 'serviceAreas.map.title')}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, 'serviceAreas.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                  {t(locale, 'serviceAreas.hero.description')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Intro + Map */}
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <FadeIn>
                  <p className="text-lg text-text-body leading-relaxed">
                    {t(locale, 'serviceAreas.intro')}
                  </p>
                  <p className="mt-6 text-text-muted">
                    <a href={licencePath} className="text-terracotta hover:underline font-medium">
                      {t(locale, 'serviceAreas.licence_link')}
                    </a>
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-sand">
                    {mapAllowed ? (
                      <iframe
                        src="https://maps.google.com/maps?q=Alicante+province,+Spain&t=&z=9&ie=UTF8&iwloc=&output=embed"
                        title={t(locale, 'serviceAreas.map.title')}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full border-0"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6 text-center">
                        <p className="text-text-muted text-sm max-w-xs">
                          {t(locale, 'serviceAreas.map.consent_notice')}
                        </p>
                        <button
                          type="button"
                          onClick={() => setMapAllowed(true)}
                          className="bg-terracotta hover:bg-terracotta-dark text-white font-medium rounded-xl px-5 py-2 text-sm transition-colors"
                        >
                          {t(locale, 'serviceAreas.map.load_button')}
                        </button>
                      </div>
                    )}
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Locations */}
          <section className="bg-sand-light py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {LOCATIONS.map((loc) => {
                const name = t(locale, `serviceAreas.location.${loc.i}.name` as any);
                const body = t(locale, `serviceAreas.location.${loc.i}.body` as any);
                const ctaText = t(locale, 'serviceAreas.location_cta').replace('{location}', name);
                const locationQuotePath = `${quotePath}?location=${loc.slug}`;
                return (
                  <FadeIn key={loc.slug}>
                    <article
                      id={loc.slug}
                      className="bg-white rounded-2xl p-7 md:p-9 shadow-sm border border-border scroll-mt-24"
                    >
                      <h2 className="font-serif text-2xl md:text-3xl text-navy mb-3">
                        {name}
                      </h2>
                      <p className="text-text-body leading-relaxed mb-5">
                        {body}
                      </p>
                      <div className="mb-5">
                        <p className="text-sm text-text-muted mb-2 font-medium">
                          {t(locale, 'serviceAreas.popular_products')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {loc.products.map((p) => (
                            <a
                              key={p}
                              href={productPath(p, locale)}
                              className="inline-block bg-sand border border-border rounded-full px-4 py-1.5 text-sm text-navy hover:bg-terracotta hover:text-white hover:border-terracotta transition-colors"
                            >
                              {productLabel(p, locale)} — {name}
                            </a>
                          ))}
                        </div>
                      </div>
                      <a
                        href={locationQuotePath}
                        className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-medium text-sm"
                      >
                        {ctaText}
                        <span aria-hidden="true">→</span>
                      </a>
                    </article>
                  </FadeIn>
                );
              })}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'serviceAreas.bottom_cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'serviceAreas.bottom_cta.description')}
              </p>
              <Button variant="gold" href={localizedUrl(`/${slugMap.contact[locale]}`, locale)}>
                {t(locale, 'serviceAreas.bottom_cta.button')}
              </Button>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
