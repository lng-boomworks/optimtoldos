import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { FAQSection } from "../FAQSection";
import { ServiceAreaSection } from "../ServiceAreaSection";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";

const productImages = [
  "/images/gallery/toldo-cofre-extensible.jpg",
  "/images/gallery/toldo-punto-recto.jpg",
  "/images/gallery/toldo-palilleria.jpg",
  "/images/gallery/toldo-cofre.png",
  "/images/gallery/toldo-ventana.jpg",
];

const featureCount = 4;
const productCount = 5;
const faqCount = 6;

export function ToldosPage({ locale = 'es' }: { locale?: Locale }) {
  const productTypes = Array.from({ length: productCount }, (_, i) => ({
    title: t(locale, `awnings.product.${i + 1}.title` as any),
    desc: t(locale, `awnings.product.${i + 1}.description` as any),
    image: productImages[i],
  }));

  const features = Array.from({ length: featureCount }, (_, i) => ({
    title: t(locale, `awnings.features.${i + 1}.title` as any),
    desc: t(locale, `awnings.features.${i + 1}.description` as any),
  }));

  const faqs = Array.from({ length: faqCount }, (_, i) => ({
    question: t(locale, `awnings.faq.${i + 1}.q` as any),
    answer: t(locale, `awnings.faq.${i + 1}.a` as any),
  }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <img src={url("/images/gallery/toldo-awning-hero.jpg")} alt="Toldos de calidad en Alicante" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <FadeIn>
                <span className="inline-block font-mono tracking-[0.2em] text-gold text-sm mb-6">
                  {t(locale, 'awnings.hero.tagline')}
                </span>
              </FadeIn>
              <AnimatedHeading
                text={t(locale, 'awnings.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                  {t(locale, 'awnings.hero.description')}
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Button variant="primary" href={localizedUrl("/presupuesto", locale)}>
                  {t(locale, 'awnings.hero.cta')}
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Product Types Grid */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'awnings.types.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {productTypes.map((product, i) => (
                  <FadeIn key={product.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl overflow-hidden h-full border-t-[3px] border-terracotta shadow-sm hover:shadow-md transition-shadow duration-300">
                      <img src={url(product.image)} alt={product.title} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
                      <div className="p-8">
                        <h3 className="font-serif text-xl text-navy mb-3">
                          {product.title}
                        </h3>
                        <p className="text-text-muted leading-relaxed">
                          {product.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'awnings.features.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                  <FadeIn key={feature.title} delay={i * 0.1}>
                    <div className="flex gap-4 p-6 rounded-xl bg-sand-light/50">
                      <div className="w-3 h-3 rounded-full bg-terracotta shrink-0 mt-2" />
                      <div>
                        <h3 className="font-serif text-lg text-navy mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-text-muted">{feature.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={faqs} locale={locale} />

          {/* Service Area */}
          <ServiceAreaSection serviceName={t(locale, 'awnings.serviceArea')} locale={locale} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'awnings.cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'awnings.cta.description')}
              </p>
              <Button variant="gold" href={localizedUrl("/presupuesto", locale)}>
                {t(locale, 'awnings.cta.quote')}
              </Button>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
