import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { FAQSection } from "../FAQSection";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

const FACTOR_COUNT = 4;
const MODEL_COUNT = 5;
const BUDGET_ROW_COUNT = 5;
const FAQ_COUNT = 6;

export function AwningBuyingGuidePage({ locale = 'es' }: { locale?: Locale }) {
  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);
  const awningsPath = localizedUrl(`/${slugMap.awnings[locale]}`, locale);
  const licencePath = localizedUrl(`/${slugMap["licence-guide"][locale]}`, locale);
  const serviceAreasPath = localizedUrl(`/${slugMap["service-areas"][locale]}`, locale);

  const factors = Array.from({ length: FACTOR_COUNT }, (_, i) => ({
    title: t(locale, `awningGuide.factors.${i + 1}.title` as any),
    body: t(locale, `awningGuide.factors.${i + 1}.body` as any),
  }));

  const models = Array.from({ length: MODEL_COUNT }, (_, i) => ({
    title: t(locale, `awningGuide.models.${i + 1}.title` as any),
    body: t(locale, `awningGuide.models.${i + 1}.body` as any),
  }));

  const budget = Array.from({ length: BUDGET_ROW_COUNT }, (_, i) => ({
    label: t(locale, `awningGuide.budget.${i + 1}.label` as any),
    price: t(locale, `awningGuide.budget.${i + 1}.price` as any),
  }));

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(locale, `awningGuide.faq.${i + 1}.q` as any),
    answer: t(locale, `awningGuide.faq.${i + 1}.a` as any),
  }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/gallery/toldo-brazo-extensible-1280.webp")}
              srcSet={`${url("/images/gallery/toldo-brazo-extensible-480.webp")} 480w, ${url("/images/gallery/toldo-brazo-extensible-768.webp")} 768w, ${url("/images/gallery/toldo-brazo-extensible-1280.webp")} 1280w, ${url("/images/gallery/toldo-brazo-extensible.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={t(locale, 'awningGuide.hero.heading')}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, 'awningGuide.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                  {t(locale, 'awningGuide.hero.description')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <p className="text-lg text-text-body leading-relaxed">
                  {t(locale, 'awningGuide.intro')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* 4 factors */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading text={t(locale, 'awningGuide.factors.heading')} tag="h2" className="text-navy" />
              </FadeIn>
              <div className="grid sm:grid-cols-2 gap-6">
                {factors.map((f, i) => (
                  <FadeIn key={f.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl p-6 h-full">
                      <h3 className="font-serif text-lg text-navy mb-2">{f.title}</h3>
                      <p className="text-text-body leading-relaxed text-sm">{f.body}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Climate */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={t(locale, 'awningGuide.climate.heading')} tag="h2" className="text-navy mb-5" />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'awningGuide.climate.body')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Models */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading text={t(locale, 'awningGuide.models.heading')} tag="h2" className="text-navy" />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {models.map((m, i) => (
                  <FadeIn key={m.title} delay={i * 0.07}>
                    <article className="bg-white rounded-2xl p-6 h-full">
                      <h3 className="font-serif text-lg text-navy mb-2">{m.title}</h3>
                      <p className="text-text-body leading-relaxed text-sm">{m.body}</p>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Motorisation + comunidad */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <FadeIn>
                <AnimatedHeading text={t(locale, 'awningGuide.motor.heading')} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{t(locale, 'awningGuide.motor.body')}</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <AnimatedHeading text={t(locale, 'awningGuide.comunidad.heading')} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{t(locale, 'awningGuide.comunidad.body')}</p>
                <p className="mt-5">
                  <a href={licencePath} className="text-terracotta hover:underline font-medium">
                    {locale === 'es' ? '¿Y la licencia? — consulta nuestra guía por municipios' : 'Planning permission? — see our municipality guide'} →
                  </a>
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Budget table */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="mb-6">
                <AnimatedHeading text={t(locale, 'awningGuide.budget.heading')} tag="h2" className="text-navy mb-3" />
                <p className="text-text-muted">{t(locale, 'awningGuide.budget.intro')}</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left">
                    <tbody>
                      {budget.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-sand-light/50"}>
                          <td className="p-4 text-text-body">{row.label}</td>
                          <td className="p-4 font-medium text-navy whitespace-nowrap text-right">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeIn>
              <FadeIn className="mt-8 text-center" delay={0.2}>
                <a href={serviceAreasPath} className="text-terracotta hover:underline font-medium text-sm">
                  {locale === 'es' ? 'Ver todas nuestras zonas de servicio' : 'See all our service areas'} →
                </a>
              </FadeIn>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={faqs} heading={t(locale, 'awningGuide.faq.heading')} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'awningGuide.cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'awningGuide.cta.body')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={quotePath}>
                  {t(locale, 'awningGuide.cta.button')}
                </Button>
                <Button variant="outline-white" href={awningsPath}>
                  {t(locale, 'awningGuide.cta.secondary')}
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
