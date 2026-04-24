import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { FAQSection } from "../FAQSection";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

const COMPARISON_ROW_COUNT = 6;
const EXAMPLE_COUNT = 3;
const FAQ_COUNT = 6;

export function BioclimaticVsAluminiumPage({ locale = 'es' }: { locale?: Locale }) {
  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);
  const pergolasPath = localizedUrl(`/${slugMap.pergolas[locale]}`, locale);
  const licencePath = localizedUrl(`/${slugMap["licence-guide"][locale]}`, locale);

  const comparisonRows = Array.from({ length: COMPARISON_ROW_COUNT }, (_, i) => ({
    feature: t(locale, `bioVsAlu.comparison.row.${i + 1}.feature` as any),
    bio: t(locale, `bioVsAlu.comparison.row.${i + 1}.bio` as any),
    alu: t(locale, `bioVsAlu.comparison.row.${i + 1}.alu` as any),
  }));

  const examples = Array.from({ length: EXAMPLE_COUNT }, (_, i) => ({
    title: t(locale, `bioVsAlu.examples.${i + 1}.title` as any),
    body: t(locale, `bioVsAlu.examples.${i + 1}.body` as any),
  }));

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(locale, `bioVsAlu.faq.${i + 1}.q` as any),
    answer: t(locale, `bioVsAlu.faq.${i + 1}.a` as any),
  }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/pergolas/pergola-bioclimatica-adosada-1280.webp")}
              srcSet={`${url("/images/pergolas/pergola-bioclimatica-adosada-480.webp")} 480w, ${url("/images/pergolas/pergola-bioclimatica-adosada-768.webp")} 768w, ${url("/images/pergolas/pergola-bioclimatica-adosada-1280.webp")} 1280w, ${url("/images/pergolas/pergola-bioclimatica-adosada.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={t(locale, 'bioVsAlu.hero.heading')}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, 'bioVsAlu.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                  {t(locale, 'bioVsAlu.hero.description')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <p className="text-lg text-text-body leading-relaxed">
                  {t(locale, 'bioVsAlu.intro')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* How each works */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading text={t(locale, 'bioVsAlu.how.heading')} tag="h2" className="text-navy" />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'bioVsAlu.how.bio.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'bioVsAlu.how.bio.body')}
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'bioVsAlu.how.alu.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'bioVsAlu.how.alu.body')}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Climate + year-round */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <FadeIn>
                <AnimatedHeading text={t(locale, 'bioVsAlu.climate.heading')} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'bioVsAlu.climate.body')}
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <AnimatedHeading text={t(locale, 'bioVsAlu.yearRound.heading')} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'bioVsAlu.yearRound.body')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Comparison table */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading text={t(locale, 'bioVsAlu.comparison.heading')} tag="h2" className="text-navy" />
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-navy text-white">
                        <th className="p-4 font-medium">
                          {t(locale, 'bioVsAlu.comparison.feature.label')}
                        </th>
                        <th className="p-4 font-medium">
                          {t(locale, 'bioVsAlu.comparison.bio.label')}
                        </th>
                        <th className="p-4 font-medium">
                          {t(locale, 'bioVsAlu.comparison.alu.label')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-sand-light/50"}>
                          <td className="p-4 font-medium text-navy align-top">{row.feature}</td>
                          <td className="p-4 text-text-body align-top">{row.bio}</td>
                          <td className="p-4 text-text-body align-top">{row.alu}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Cost, maintenance, motorisation */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <FadeIn>
                <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
                  {t(locale, 'bioVsAlu.cost.heading')}
                </h2>
                <p className="text-text-body leading-relaxed">{t(locale, 'bioVsAlu.cost.body')}</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
                  {t(locale, 'bioVsAlu.maintenance.heading')}
                </h2>
                <p className="text-text-body leading-relaxed">{t(locale, 'bioVsAlu.maintenance.body')}</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
                  {t(locale, 'bioVsAlu.motor.heading')}
                </h2>
                <p className="text-text-body leading-relaxed">{t(locale, 'bioVsAlu.motor.body')}</p>
              </FadeIn>
            </div>
          </section>

          {/* Decision matrix */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading text={t(locale, 'bioVsAlu.decision.heading')} tag="h2" className="text-navy" />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <div className="bg-white rounded-2xl p-7 h-full border-t-4 border-terracotta">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'bioVsAlu.decision.1.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'bioVsAlu.decision.1.body')}
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="bg-white rounded-2xl p-7 h-full border-t-4 border-gold">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'bioVsAlu.decision.2.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'bioVsAlu.decision.2.body')}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Examples */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="mb-8">
                <AnimatedHeading text={t(locale, 'bioVsAlu.examples.heading')} tag="h2" className="text-navy mb-3" />
                <p className="text-text-muted">
                  {t(locale, 'bioVsAlu.examples.intro')}
                </p>
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {examples.map((ex, i) => (
                  <FadeIn key={ex.title} delay={i * 0.1}>
                    <article className="bg-sand-light rounded-2xl p-6 h-full">
                      <h3 className="font-serif text-lg text-navy mb-2">{ex.title}</h3>
                      <p className="text-text-body leading-relaxed text-sm">{ex.body}</p>
                    </article>
                  </FadeIn>
                ))}
              </div>
              <FadeIn className="mt-8 text-center" delay={0.4}>
                <a href={licencePath} className="text-terracotta hover:underline font-medium text-sm">
                  {locale === 'es' ? '¿Y la licencia? — consulta nuestra guía por municipios' : 'Planning permission? — see our municipality guide'} →
                </a>
              </FadeIn>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={faqs} heading={t(locale, 'bioVsAlu.faq.heading')} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'bioVsAlu.cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'bioVsAlu.cta.body')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={quotePath}>
                  {t(locale, 'bioVsAlu.cta.button')}
                </Button>
                <Button variant="outline-white" href={pergolasPath}>
                  {t(locale, 'bioVsAlu.cta.secondary')}
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
