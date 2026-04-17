import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { FAQSection } from "../FAQSection";
import { ServiceAreaSection } from "../ServiceAreaSection";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";

const typeImages = [
  "/images/ventanas/ventanas-cortizo.jpg",
  "/images/ventanas/ventanas-aluplast.jpg",
  "/images/ventanas/ventanas-cortizo2.jpg",
];

const typeCount = 3;
const benefitCount = 5;
const faqCount = 6;

export function VentanasPage({ locale = 'es' }: { locale?: Locale }) {
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

  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <img src={url("/images/gallery/ventanas-pvc-hero.jpg")} alt="Ventanas de PVC de alta eficiencia" className="absolute inset-0 w-full h-full object-cover" />
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
                <Button variant="primary" href={localizedUrl("/presupuesto", locale)}>
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
                      <img src={url(type.image)} alt={type.title} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
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

          {/* FAQ */}
          <FAQSection faqs={faqs} locale={locale} />

          {/* Service Area */}
          <ServiceAreaSection serviceName={t(locale, 'windows.serviceArea')} locale={locale} />

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
                <Button variant="gold" href={localizedUrl("/presupuesto", locale)}>
                  {t(locale, 'windows.cta.quote')}
                </Button>
                <Button variant="outline-white" href={localizedUrl("/contacto", locale)}>
                  {t(locale, 'windows.cta.contact')}
                </Button>
              </div>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
