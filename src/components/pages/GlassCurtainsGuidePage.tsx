import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { FAQSection } from "../FAQSection";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

const COST_ROW_COUNT = 4;
const FAQ_COUNT = 6;

export function GlassCurtainsGuidePage({ locale = 'es' }: { locale?: Locale }) {
  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);
  const curtainsPath = localizedUrl(`/${slugMap["glass-curtains"][locale]}`, locale);
  const pergolasPath = localizedUrl(`/${slugMap.pergolas[locale]}`, locale);
  const licencePath = localizedUrl(`/${slugMap["licence-guide"][locale]}`, locale);

  const costRows = Array.from({ length: COST_ROW_COUNT }, (_, i) => ({
    label: t(locale, `curtainsGuide.cost.${i + 1}.label` as any),
    price: t(locale, `curtainsGuide.cost.${i + 1}.price` as any),
  }));

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(locale, `curtainsGuide.faq.${i + 1}.q` as any),
    answer: t(locale, `curtainsGuide.faq.${i + 1}.a` as any),
  }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/cortinas/hero-cortinas-1280.webp")}
              srcSet={`${url("/images/cortinas/hero-cortinas-480.webp")} 480w, ${url("/images/cortinas/hero-cortinas-768.webp")} 768w, ${url("/images/cortinas/hero-cortinas-1280.webp")} 1280w, ${url("/images/cortinas/hero-cortinas.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={t(locale, 'curtainsGuide.hero.heading')}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, 'curtainsGuide.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                  {t(locale, 'curtainsGuide.hero.description')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <p className="text-lg text-text-body leading-relaxed">
                  {t(locale, 'curtainsGuide.intro')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* How — folding vs sliding */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading text={t(locale, 'curtainsGuide.how.heading')} tag="h2" className="text-navy" />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'curtainsGuide.how.folding.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'curtainsGuide.how.folding.body')}
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'curtainsGuide.how.sliding.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'curtainsGuide.how.sliding.body')}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Frameless + year-round */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <FadeIn>
                <AnimatedHeading text={t(locale, 'curtainsGuide.frameless.heading')} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{t(locale, 'curtainsGuide.frameless.body')}</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <AnimatedHeading text={t(locale, 'curtainsGuide.yearRound.heading')} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'curtainsGuide.yearRound.body')}
                </p>
                <p className="mt-5">
                  <a href={pergolasPath} className="text-terracotta hover:underline font-medium">
                    {locale === 'es' ? 'Combínalas con una pérgola bioclimática' : 'Combine with a bioclimatic pergola'} →
                  </a>
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Licence */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <FadeIn>
                <AnimatedHeading text={t(locale, 'curtainsGuide.licence.heading')} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{t(locale, 'curtainsGuide.licence.body')}</p>
                <p className="mt-5">
                  <a href={licencePath} className="text-terracotta hover:underline font-medium">
                    {locale === 'es' ? 'Guía detallada de licencias por municipio' : 'Detailed municipality-by-municipality guide'} →
                  </a>
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <AnimatedHeading text={t(locale, 'curtainsGuide.comunidad.heading')} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{t(locale, 'curtainsGuide.comunidad.body')}</p>
              </FadeIn>
            </div>
          </section>

          {/* Maintenance */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={t(locale, 'curtainsGuide.maintenance.heading')} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{t(locale, 'curtainsGuide.maintenance.body')}</p>
              </FadeIn>
            </div>
          </section>

          {/* Cost table */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="mb-6">
                <AnimatedHeading text={t(locale, 'curtainsGuide.cost.heading')} tag="h2" className="text-navy mb-3" />
                <p className="text-text-muted">{t(locale, 'curtainsGuide.cost.intro')}</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left">
                    <tbody>
                      {costRows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-sand-light/50"}>
                          <td className="p-4 text-text-body">{row.label}</td>
                          <td className="p-4 font-medium text-navy whitespace-nowrap text-right">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={faqs} heading={t(locale, 'curtainsGuide.faq.heading')} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'curtainsGuide.cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'curtainsGuide.cta.body')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={quotePath}>
                  {t(locale, 'curtainsGuide.cta.button')}
                </Button>
                <Button variant="outline-white" href={curtainsPath}>
                  {t(locale, 'curtainsGuide.cta.secondary')}
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
