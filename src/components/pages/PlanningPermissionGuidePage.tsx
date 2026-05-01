import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { FAQSection } from "../FAQSection";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

// `slug` matches SEO_LOCATIONS — used to build the per-area URL
// (/toldos-{slug}/ in ES, /en/awnings-{slug}/ in EN where available).
const MUNICIPALITIES = [
  { i: 1, slug: "torrevieja" },
  { i: 2, slug: "orihuela-costa" },
  { i: 3, slug: "guardamar" },
  { i: 4, slug: "elche" },
  { i: 5, slug: "santa-pola" },
  { i: 6, slug: "benidorm" },
  { i: 7, slug: "alicante" },
];

const EN_AREA_SLUGS = new Set([
  "torrevieja","orihuela-costa","ciudad-quesada","guardamar","la-marina","elche",
  "alicante","santa-pola","gran-alacant","benidorm","cabo-roig","la-zenia",
  "punta-prima","villamartin",
]);

function areaHref(slug: string, locale: Locale): string {
  if (locale === "en" && EN_AREA_SLUGS.has(slug)) {
    return `/en/awnings-${slug}/`;
  }
  return `/toldos-${slug}/`;
}

const FAQ_COUNT = 8;

export function PlanningPermissionGuidePage({ locale = 'es' }: { locale?: Locale }) {
  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);
  const contactPath = localizedUrl(`/${slugMap.contact[locale]}`, locale);
  const pergolasPath = localizedUrl(`/${slugMap.pergolas[locale]}`, locale);
  const awningsPath = localizedUrl(`/${slugMap.awnings[locale]}`, locale);
  const curtainsPath = localizedUrl(`/${slugMap["glass-curtains"][locale]}`, locale);
  const serviceAreasPath = localizedUrl(`/${slugMap["service-areas"][locale]}`, locale);

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(locale, `licenceGuide.faq.${i + 1}.q` as any),
    answer: t(locale, `licenceGuide.faq.${i + 1}.a` as any),
  }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/pergolas/pergola-lamas-1280.webp")}
              srcSet={`${url("/images/pergolas/pergola-lamas-480.webp")} 480w, ${url("/images/pergolas/pergola-lamas-768.webp")} 768w, ${url("/images/pergolas/pergola-lamas-1280.webp")} 1280w, ${url("/images/pergolas/pergola-lamas.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={t(locale, 'licenceGuide.hero.heading')}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, 'licenceGuide.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                  {t(locale, 'licenceGuide.hero.description')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Intro + decision box */}
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <FadeIn>
                <p className="text-lg text-text-body leading-relaxed">
                  {t(locale, 'licenceGuide.intro')}
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-2xl border-l-4 border-terracotta bg-sand-light p-6 md:p-7">
                  <h2 className="font-serif text-xl text-navy mb-3">
                    {t(locale, 'licenceGuide.decisionBox.title')}
                  </h2>
                  <p className="text-text-body leading-relaxed">
                    {t(locale, 'licenceGuide.decisionBox.body')}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Basics */}
          <section className="bg-sand-light py-16 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="mb-10">
                <AnimatedHeading
                  text={t(locale, 'licenceGuide.basics.heading')}
                  tag="h2"
                  className="text-navy"
                />
                <p className="mt-4 text-text-body leading-relaxed">
                  {t(locale, 'licenceGuide.basics.para1')}
                </p>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'licenceGuide.basics.comunicacion.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'licenceGuide.basics.comunicacion.body')}
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'licenceGuide.basics.obraMenor.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'licenceGuide.basics.obraMenor.body')}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Municipalities */}
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading
                  text={t(locale, 'licenceGuide.municipalities.heading')}
                  tag="h2"
                  className="text-navy"
                />
                <p className="mt-4 text-text-muted max-w-2xl mx-auto">
                  {t(locale, 'licenceGuide.municipalities.intro')}{' '}
                  <a href={serviceAreasPath} className="text-terracotta hover:underline font-medium">
                    {locale === 'es' ? 'Ver todas las zonas' : 'See all service areas'}
                  </a>
                </p>
              </FadeIn>
              <div className="space-y-6">
                {MUNICIPALITIES.map((m) => {
                  const name = t(locale, `licenceGuide.municipality.${m.i}.name` as any);
                  const body = t(locale, `licenceGuide.municipality.${m.i}.body` as any);
                  const serviceAreaLink = url(areaHref(m.slug, locale));
                  return (
                    <FadeIn key={m.slug}>
                      <article className="bg-sand-light rounded-2xl p-6 md:p-7">
                        <h3 className="font-serif text-xl text-navy mb-2">{name}</h3>
                        <p className="text-text-body leading-relaxed mb-3">{body}</p>
                        <a
                          href={serviceAreaLink}
                          className="text-terracotta hover:underline text-sm font-medium"
                        >
                          → {locale === 'es' ? 'Ver servicios en' : 'See our services in'} {name.split(' (')[0]}
                        </a>
                      </article>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Comunidad de propietarios */}
          <section className="bg-sand-light py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading
                  text={t(locale, 'licenceGuide.comunidad.heading')}
                  tag="h2"
                  className="text-navy mb-5"
                />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'licenceGuide.comunidad.body')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Regularisation */}
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading
                  text={t(locale, 'licenceGuide.regularisation.heading')}
                  tag="h2"
                  className="text-navy mb-5"
                />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'licenceGuide.regularisation.body')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Our service */}
          <section className="bg-sand-light py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading
                  text={t(locale, 'licenceGuide.ourService.heading')}
                  tag="h2"
                  className="text-navy mb-5"
                />
                <p className="text-text-body leading-relaxed mb-6">
                  {t(locale, 'licenceGuide.ourService.body')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={pergolasPath} className="text-terracotta hover:underline text-sm font-medium">
                    {t(locale, 'nav.pergolas')} →
                  </a>
                  <a href={awningsPath} className="text-terracotta hover:underline text-sm font-medium">
                    {t(locale, 'nav.awnings')} →
                  </a>
                  <a href={curtainsPath} className="text-terracotta hover:underline text-sm font-medium">
                    {t(locale, 'nav.curtains')} →
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="bg-white py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs text-text-muted italic text-center">
                {t(locale, 'licenceGuide.disclaimer')}
              </p>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={faqs} heading={t(locale, 'licenceGuide.faq.heading')} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'licenceGuide.cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'licenceGuide.cta.body')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={quotePath}>
                  {t(locale, 'licenceGuide.cta.button')}
                </Button>
                <Button variant="outline-white" href={contactPath}>
                  {t(locale, 'licenceGuide.cta.secondary')}
                </Button>
              </div>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
