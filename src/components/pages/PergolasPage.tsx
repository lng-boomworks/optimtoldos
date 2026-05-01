import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { FAQSection } from "../FAQSection";
import { ServiceAreaSection } from "../ServiceAreaSection";
import { RelatedProducts } from "../RelatedProducts";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

const featureImages = [
  "/images/pergolas/pergola-bioclimatica.webp",
  "/images/pergolas/pergola-lamas.webp",
  "/images/pergolas/pergola-restaurante.webp",
  "/images/pergolas/pergola-led.webp",
];

const featureCount = 4;
const benefitCount = 5;
const faqCount = 8;
const priceRowCount = 3;

export function PergolasPage({ locale = 'es' }: { locale?: Locale }) {
  const quoteWithProduct = `${localizedUrl(`/${slugMap.quote[locale]}`, locale)}?product=pergolas`;
  const licencePath = localizedUrl(`/${slugMap["licence-guide"][locale]}`, locale);
  const bioVsAluPath = localizedUrl(`/${slugMap["bioclimatic-vs-aluminium"][locale]}`, locale);
  const curtainsPath = localizedUrl(`/${slugMap["glass-curtains"][locale]}`, locale);
  const contactPath = localizedUrl(`/${slugMap.contact[locale]}`, locale);

  const features = Array.from({ length: featureCount }, (_, i) => ({
    title: t(locale, `pergolas.features.${i + 1}.title` as any),
    desc: t(locale, `pergolas.features.${i + 1}.description` as any),
    image: featureImages[i],
  }));

  const benefits = Array.from({ length: benefitCount }, (_, i) =>
    t(locale, `pergolas.benefits.${i + 1}` as any)
  );

  const faqs = Array.from({ length: faqCount }, (_, i) => ({
    question: t(locale, `pergolas.faq.${i + 1}.q` as any),
    answer: t(locale, `pergolas.faq.${i + 1}.a` as any),
  }));

  const priceRows = Array.from({ length: priceRowCount }, (_, i) => ({
    label: t(locale, `pergolas.price.${i + 1}.label` as any),
    price: t(locale, `pergolas.price.${i + 1}.price` as any),
  }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/pergolas/hero-pergolas-1280.webp")}
              srcSet={`${url("/images/pergolas/hero-pergolas-480.webp")} 480w, ${url("/images/pergolas/hero-pergolas-768.webp")} 768w, ${url("/images/pergolas/hero-pergolas-1280.webp")} 1280w, ${url("/images/pergolas/hero-pergolas.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1920"
              fetchPriority="high"
              alt="Pérgola bioclimática instalada en terraza"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <FadeIn>
                <span className="inline-block font-mono tracking-[0.2em] text-gold text-sm mb-6">
                  {t(locale, 'pergolas.hero.tagline')}
                </span>
              </FadeIn>
              <AnimatedHeading
                text={t(locale, 'pergolas.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                  {t(locale, 'pergolas.hero.description')}
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Button variant="primary" href={quoteWithProduct}>
                  {t(locale, 'pergolas.hero.cta')}
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Features */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'pergolas.features.heading')}
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

          {/* Benefits */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'pergolas.benefits.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="space-y-5">
                {benefits.map((benefit, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-sand-light/50">
                      <svg
                        className="w-6 h-6 text-terracotta shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-lg text-text-body">{benefit}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Installation types - freestanding vs wall-mounted */}
          <section className="bg-sand-light py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading
                  text={t(locale, 'pergolas.types.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'pergolas.types.freestanding.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'pergolas.types.freestanding.body')}
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'pergolas.types.wallmounted.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'pergolas.types.wallmounted.body')}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Comunidad de propietarios */}
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading
                  text={t(locale, 'pergolas.comunidad.heading')}
                  tag="h2"
                  className="text-navy mb-5"
                />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'pergolas.comunidad.body')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Price guide */}
          <section className="bg-sand-light py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="mb-6">
                <AnimatedHeading
                  text={t(locale, 'pergolas.price.heading')}
                  tag="h2"
                  className="text-navy mb-3"
                />
                <p className="text-text-muted">{t(locale, 'pergolas.price.intro')}</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left">
                    <tbody>
                      {priceRows.map((row, i) => (
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

          {/* Licence banner */}
          <section className="bg-white py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="rounded-2xl border-l-4 border-terracotta bg-sand-light p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-navy mb-1">
                      {t(locale, 'pergolas.licence_banner.title')}
                    </h3>
                    <p className="text-text-body text-sm leading-relaxed">
                      {t(locale, 'pergolas.licence_banner.body')}
                    </p>
                  </div>
                  <a
                    href={licencePath}
                    className="shrink-0 text-terracotta hover:underline font-medium text-sm"
                  >
                    {t(locale, 'pergolas.licence_banner.cta')} →
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={faqs} locale={locale} />

          {/* Related reading */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-8">
                <AnimatedHeading
                  text={t(locale, 'pergolas.related.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <a
                    href={bioVsAluPath}
                    className="block bg-sand-light rounded-2xl p-6 h-full hover:bg-sand transition-colors"
                  >
                    <h3 className="font-serif text-lg text-navy mb-2">
                      {t(locale, 'pergolas.related.bioVsAlu.title')} →
                    </h3>
                    <p className="text-text-body leading-relaxed text-sm">
                      {t(locale, 'pergolas.related.bioVsAlu.body')}
                    </p>
                  </a>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <a
                    href={curtainsPath}
                    className="block bg-sand-light rounded-2xl p-6 h-full hover:bg-sand transition-colors"
                  >
                    <h3 className="font-serif text-lg text-navy mb-2">
                      {t(locale, 'pergolas.related.curtains.title')} →
                    </h3>
                    <p className="text-text-body leading-relaxed text-sm">
                      {t(locale, 'pergolas.related.curtains.body')}
                    </p>
                  </a>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Service Area */}
          <ServiceAreaSection
            serviceName={t(locale, 'pergolas.serviceArea')}
            locale={locale}
            product="pergolas"
            teaserLocations={['torrevieja', 'orihuela-costa', 'ciudad-quesada', 'alicante', 'benidorm', 'elche']}
          />
          {/* Related products (SEO internal linking) */}
          <RelatedProducts current="pergolas" locale={locale} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'pergolas.cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'pergolas.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="gold" href={quoteWithProduct}>
                  {t(locale, 'pergolas.cta.quote')}
                </Button>
                <Button variant="outline-white" href={contactPath}>
                  {t(locale, 'pergolas.cta.contact')}
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
