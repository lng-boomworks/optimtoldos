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

const typeImages = [
  "/images/ventanas/ventanas-cortizo.webp",
  "/images/ventanas/ventanas-aluplast.webp",
  "/images/ventanas/ventanas-cortizo2.webp",
];

const typeCount = 3;
const benefitCount = 5;
const faqCount = 8;
const installStepCount = 4;

export function VentanasPage({ locale = 'es' }: { locale?: Locale }) {
  const quoteWithProduct = `${localizedUrl(`/${slugMap.quote[locale]}`, locale)}?product=pvc-windows`;
  const contactPath = localizedUrl(`/${slugMap.contact[locale]}`, locale);
  const curtainsPath = localizedUrl(`/${slugMap["glass-curtains"][locale]}`, locale);
  const pergolasPath = localizedUrl(`/${slugMap.pergolas[locale]}`, locale);

  const apertureTypes = Array.from({ length: typeCount }, (_, i) => ({
    title: t(locale, `windows.types.${i + 1}.title` as any),
    desc: t(locale, `windows.types.${i + 1}.description` as any),
    image: typeImages[i],
  }));

  const benefits = Array.from({ length: benefitCount }, (_, i) =>
    t(locale, `windows.efficiency.${i + 1}` as any)
  );

  const faqs = Array.from({ length: faqCount }, (_, i) => ({
    question: t(locale, `windows.faq.${i + 1}.q` as any),
    answer: t(locale, `windows.faq.${i + 1}.a` as any),
  }));

  const installSteps = Array.from({ length: installStepCount }, (_, i) => ({
    title: t(locale, `windows.install.${i + 1}.title` as any),
    body: t(locale, `windows.install.${i + 1}.body` as any),
  }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/gallery/hero-ventanas-1280.webp")}
              srcSet={`${url("/images/gallery/hero-ventanas-480.webp")} 480w, ${url("/images/gallery/hero-ventanas-768.webp")} 768w, ${url("/images/gallery/hero-ventanas-1280.webp")} 1280w, ${url("/images/gallery/hero-ventanas.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1280"
              fetchPriority="high"
              alt="Ventanas de PVC de alta eficiencia"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <FadeIn>
                <span className="inline-block font-mono tracking-[0.2em] text-gold text-sm mb-6">
                  {t(locale, 'windows.hero.tagline')}
                </span>
              </FadeIn>
              <AnimatedHeading
                text={t(locale, 'windows.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                  {t(locale, 'windows.hero.description')}
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Button variant="primary" href={quoteWithProduct}>
                  {t(locale, 'windows.hero.cta')}
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Types Grid */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'windows.types.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {apertureTypes.map((type, i) => (
                  <FadeIn key={type.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl overflow-hidden h-full border-t-[3px] border-terracotta shadow-sm hover:shadow-md transition-shadow duration-300">
                      <img src={url(type.image)} alt={type.title} width="1600" height="1000" loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
                      <div className="p-8">
                        <h3 className="font-serif text-xl text-navy mb-3">
                          {type.title}
                        </h3>
                        <p className="text-text-muted leading-relaxed">
                          {type.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Energy Efficiency */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'windows.efficiency.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="max-w-2xl mx-auto space-y-5">
                {benefits.map((benefit, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-sand-light/50">
                      <svg
                        className="w-6 h-6 text-terracotta shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-text-body leading-relaxed">
                        {benefit}
                      </span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* U-values and glazing */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="mb-8">
                <AnimatedHeading
                  text={t(locale, 'windows.uValue.heading')}
                  tag="h2"
                  className="text-navy mb-4"
                />
                <p className="text-text-body leading-relaxed max-w-3xl">
                  {t(locale, 'windows.uValue.body')}
                </p>
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'windows.uValue.double.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'windows.uValue.double.body')}
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'windows.uValue.triple.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'windows.uValue.triple.body')}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Acoustic */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={t(locale, 'windows.acoustic.heading')} tag="h2" className="text-navy mb-5" />
                <p className="text-text-body leading-relaxed">{t(locale, 'windows.acoustic.body')}</p>
              </FadeIn>
            </div>
          </section>

          {/* Cortizo callout */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="rounded-2xl bg-white p-7 md:p-8 border-l-4 border-gold">
                  <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
                    {t(locale, 'windows.cortizo.heading')}
                  </h2>
                  <p className="text-text-body leading-relaxed">
                    {t(locale, 'windows.cortizo.body')}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Installation process */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading text={t(locale, 'windows.install.heading')} tag="h2" className="text-navy" />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {installSteps.map((s, i) => (
                  <FadeIn key={s.title} delay={i * 0.08}>
                    <div className="bg-sand-light rounded-2xl p-6 h-full">
                      <h3 className="font-serif text-lg text-navy mb-2">{s.title}</h3>
                      <p className="text-text-body leading-relaxed text-sm">{s.body}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Disruption */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={t(locale, 'windows.disruption.heading')} tag="h2" className="text-navy mb-5" />
                <p className="text-text-body leading-relaxed">{t(locale, 'windows.disruption.body')}</p>
              </FadeIn>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={faqs} locale={locale} />

          {/* Related */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-8">
                <AnimatedHeading text={t(locale, 'windows.related.heading')} tag="h2" className="text-navy" />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <a
                    href={curtainsPath}
                    className="block bg-sand-light rounded-2xl p-6 h-full hover:bg-sand transition-colors"
                  >
                    <h3 className="font-serif text-lg text-navy mb-2">
                      {t(locale, 'windows.related.curtains.title')} →
                    </h3>
                    <p className="text-text-body leading-relaxed text-sm">
                      {t(locale, 'windows.related.curtains.body')}
                    </p>
                  </a>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <a
                    href={pergolasPath}
                    className="block bg-sand-light rounded-2xl p-6 h-full hover:bg-sand transition-colors"
                  >
                    <h3 className="font-serif text-lg text-navy mb-2">
                      {t(locale, 'windows.related.curtainsPergolas.title')} →
                    </h3>
                    <p className="text-text-body leading-relaxed text-sm">
                      {t(locale, 'windows.related.curtainsPergolas.body')}
                    </p>
                  </a>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Service Area */}
          <ServiceAreaSection
            serviceName={t(locale, 'windows.serviceArea')}
            locale={locale}
            teaserLocations={['elche', 'alicante', 'torrevieja', 'benidorm', 'orihuela-costa', 'santa-pola']}
          />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'windows.cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'windows.cta.description')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={quoteWithProduct}>
                  {t(locale, 'windows.cta.quote')}
                </Button>
                <Button variant="outline-white" href={contactPath}>
                  {t(locale, 'windows.cta.contact')}
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
