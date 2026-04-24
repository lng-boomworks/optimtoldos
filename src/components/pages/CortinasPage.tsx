import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { FAQSection } from "../FAQSection";
import { ServiceAreaSection } from "../ServiceAreaSection";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

const featureImages = [
  "/images/cortinas/cortina-cristal-1.webp",
  "/images/cortinas/cortina-cristal-abatible.webp",
  "/images/cortinas/cortina-cristalera.webp",
  "/images/cortinas/cortina-cristal-panoramica.webp",
];

const featureCount = 4;
const stepCount = 3;
const faqCount = 8;

export function CortinasPage({ locale = 'es' }: { locale?: Locale }) {
  const quoteWithProduct = `${localizedUrl(`/${slugMap.quote[locale]}`, locale)}?product=glass-curtains`;
  const licencePath = localizedUrl(`/${slugMap["licence-guide"][locale]}`, locale);
  const curtainsGuidePath = localizedUrl(`/${slugMap["glass-curtains-guide"][locale]}`, locale);
  const pergolasPath = localizedUrl(`/${slugMap.pergolas[locale]}`, locale);
  const contactPath = localizedUrl(`/${slugMap.contact[locale]}`, locale);

  const features = Array.from({ length: featureCount }, (_, i) => ({
    title: t(locale, `curtains.features.${i + 1}.title` as any),
    desc: t(locale, `curtains.features.${i + 1}.description` as any),
    image: featureImages[i],
  }));

  const steps = Array.from({ length: stepCount }, (_, i) => ({
    num: t(locale, `curtains.howItWorks.${i + 1}.num` as any),
    title: t(locale, `curtains.howItWorks.${i + 1}.title` as any),
    desc: t(locale, `curtains.howItWorks.${i + 1}.description` as any),
  }));

  const faqs = Array.from({ length: faqCount }, (_, i) => ({
    question: t(locale, `curtains.faq.${i + 1}.q` as any),
    answer: t(locale, `curtains.faq.${i + 1}.a` as any),
  }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/cortinas/hero-cortinas-1280.webp")}
              srcSet={`${url("/images/cortinas/hero-cortinas-480.webp")} 480w, ${url("/images/cortinas/hero-cortinas-768.webp")} 768w, ${url("/images/cortinas/hero-cortinas-1280.webp")} 1280w, ${url("/images/cortinas/hero-cortinas.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="854"
              fetchPriority="high"
              alt="Cortinas de cristal en terraza moderna"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <FadeIn>
                <span className="inline-block font-mono tracking-[0.2em] text-gold text-sm mb-6">
                  {t(locale, 'curtains.hero.tagline')}
                </span>
              </FadeIn>
              <AnimatedHeading
                text={t(locale, 'curtains.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                  {t(locale, 'curtains.hero.description')}
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Button variant="primary" href={quoteWithProduct}>
                  {t(locale, 'curtains.hero.cta')}
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Features */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'curtains.features.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                  <FadeIn key={feature.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      <img src={url(feature.image)} alt={feature.title} width="1600" height="1000" loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
                      <div className="p-8">
                        <h3 className="font-serif text-xl text-navy mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-text-muted leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'curtains.howItWorks.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid md:grid-cols-3 gap-10">
                {steps.map((step, i) => (
                  <FadeIn key={step.num} delay={i * 0.15}>
                    <div className="relative text-center">
                      <span className="block font-mono text-6xl md:text-7xl text-terracotta/15 font-bold leading-none mb-4">
                        {step.num}
                      </span>
                      <h3 className="font-serif text-xl text-navy mb-3">
                        {step.title}
                      </h3>
                      <p className="text-text-muted">{step.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Thermal + wind performance */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading
                  text={t(locale, 'curtains.thermal.heading')}
                  tag="h2"
                  className="text-navy mb-5"
                />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'curtains.thermal.body')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Comunidad */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading
                  text={t(locale, 'curtains.comunidad.heading')}
                  tag="h2"
                  className="text-navy mb-5"
                />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'curtains.comunidad.body')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Maintenance */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading
                  text={t(locale, 'curtains.maintenance.heading')}
                  tag="h2"
                  className="text-navy mb-5"
                />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'curtains.maintenance.body')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Licence banner */}
          <section className="bg-white py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="rounded-2xl border-l-4 border-terracotta bg-sand-light p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-navy mb-1">
                      {t(locale, 'curtains.licence_banner.title')}
                    </h3>
                    <p className="text-text-body text-sm leading-relaxed">
                      {t(locale, 'curtains.licence_banner.body')}
                    </p>
                  </div>
                  <a
                    href={licencePath}
                    className="shrink-0 text-terracotta hover:underline font-medium text-sm"
                  >
                    {t(locale, 'curtains.licence_banner.cta')} →
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={faqs} locale={locale} />

          {/* Related */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-8">
                <AnimatedHeading
                  text={t(locale, 'curtains.related.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <a
                    href={curtainsGuidePath}
                    className="block bg-sand-light rounded-2xl p-6 h-full hover:bg-sand transition-colors"
                  >
                    <h3 className="font-serif text-lg text-navy mb-2">
                      {t(locale, 'curtains.related.guide.title')} →
                    </h3>
                    <p className="text-text-body leading-relaxed text-sm">
                      {t(locale, 'curtains.related.guide.body')}
                    </p>
                  </a>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <a
                    href={pergolasPath}
                    className="block bg-sand-light rounded-2xl p-6 h-full hover:bg-sand transition-colors"
                  >
                    <h3 className="font-serif text-lg text-navy mb-2">
                      {t(locale, 'curtains.related.pergolas.title')} →
                    </h3>
                    <p className="text-text-body leading-relaxed text-sm">
                      {t(locale, 'curtains.related.pergolas.body')}
                    </p>
                  </a>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Service Area */}
          <ServiceAreaSection
            serviceName={t(locale, 'curtains.serviceArea')}
            locale={locale}
            teaserLocations={['cabo-roig', 'orihuela-costa', 'benidorm', 'alicante', 'torrevieja', 'elche']}
          />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'curtains.cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'curtains.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="gold" href={quoteWithProduct}>
                  {t(locale, 'curtains.cta.quote')}
                </Button>
                <Button variant="outline-white" href={contactPath}>
                  {t(locale, 'curtains.cta.contact')}
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
