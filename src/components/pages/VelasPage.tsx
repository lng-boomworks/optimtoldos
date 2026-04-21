import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { FAQSection } from "../FAQSection";
import { ServiceAreaSection } from "../ServiceAreaSection";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";

const shapeImages = [
  "/images/velas/vela-1.webp",
  "/images/velas/vela-rectangular.webp",
  "/images/velas/vela-freeform.webp",
];

const shapeTypes = ["triangle", "square", "custom"] as const;
const shapeCount = 3;
const statCount = 3;
const faqCount = 5;

export function VelasPage({ locale = 'es' }: { locale?: Locale }) {
  const shapes = Array.from({ length: shapeCount }, (_, i) => ({
    title: t(locale, `sails.shapes.${i + 1}.title` as any),
    desc: t(locale, `sails.shapes.${i + 1}.description` as any),
    shape: shapeTypes[i],
    image: shapeImages[i],
  }));

  const stats = Array.from({ length: statCount }, (_, i) => ({
    value: t(locale, `sails.uv.${i + 1}.value` as any),
    label: t(locale, `sails.uv.${i + 1}.label` as any),
  }));

  const faqs = Array.from({ length: faqCount }, (_, i) => ({
    question: t(locale, `sails.faq.${i + 1}.q` as any),
    answer: t(locale, `sails.faq.${i + 1}.a` as any),
  }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/velas/hero-velas-1280.webp")}
              srcSet={`${url("/images/velas/hero-velas-480.webp")} 480w, ${url("/images/velas/hero-velas-768.webp")} 768w, ${url("/images/velas/hero-velas-1280.webp")} 1280w, ${url("/images/velas/hero-velas.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1488"
              fetchPriority="high"
              alt="Vela de sombra tensada en jardín"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <FadeIn>
                <span className="inline-block font-mono tracking-[0.2em] text-gold text-sm mb-6">
                  {t(locale, 'sails.hero.tagline')}
                </span>
              </FadeIn>
              <AnimatedHeading
                text={t(locale, 'sails.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                  {t(locale, 'sails.hero.description')}
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Button variant="primary" href={localizedUrl("/presupuesto", locale)}>
                  {t(locale, 'sails.hero.cta')}
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Shapes / Options */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'sails.shapes.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {shapes.map((s, i) => (
                  <FadeIn key={s.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl overflow-hidden h-full border-t-[3px] border-terracotta shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                      <img src={url(s.image)} alt={s.title} width="1600" height="1000" loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
                      <div className="p-8">
                        <h3 className="font-serif text-xl text-navy mb-3">
                          {s.title}
                        </h3>
                        <p className="text-text-muted leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* UV Protection */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'sails.uv.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-3 gap-8 mb-12">
                {stats.map((stat, i) => (
                  <FadeIn key={stat.label} delay={i * 0.1}>
                    <div className="text-center">
                      <span className="block font-mono text-4xl text-terracotta font-bold mb-2">
                        {stat.value}
                      </span>
                      <span className="text-text-muted text-sm uppercase tracking-wide">
                        {stat.label}
                      </span>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <FadeIn delay={0.3}>
                <p className="text-text-muted leading-relaxed text-center max-w-3xl mx-auto">
                  {t(locale, 'sails.uv.description')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={faqs} locale={locale} />

          {/* Service Area */}
          <ServiceAreaSection serviceName={t(locale, 'sails.serviceArea')} locale={locale} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'sails.cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'sails.cta.description')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={localizedUrl("/presupuesto", locale)}>
                  {t(locale, 'sails.cta.quote')}
                </Button>
                <Button variant="outline-white" href={localizedUrl("/galeria", locale)}>
                  {t(locale, 'sails.cta.gallery')}
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
