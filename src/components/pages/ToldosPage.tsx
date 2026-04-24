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

const productImages = [
  "/images/gallery/toldo-cofre-extensible.webp",
  "/images/gallery/toldo-punto-recto.webp",
  "/images/gallery/toldo-palilleria.webp",
  "/images/gallery/toldo-cofre.webp",
  "/images/gallery/toldo-ventana.webp",
];

const featureCount = 4;
const productCount = 5;
const faqCount = 8;
const installStepCount = 4;
const priceRowCount = 3;

export function ToldosPage({ locale = 'es' }: { locale?: Locale }) {
  const quoteWithProduct = `${localizedUrl(`/${slugMap.quote[locale]}`, locale)}?product=awnings`;
  const licencePath = localizedUrl(`/${slugMap["licence-guide"][locale]}`, locale);
  const awningGuidePath = localizedUrl(`/${slugMap["awning-guide"][locale]}`, locale);
  const pergolasPath = localizedUrl(`/${slugMap.pergolas[locale]}`, locale);

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

  const installSteps = Array.from({ length: installStepCount }, (_, i) => ({
    title: t(locale, `awnings.install.${i + 1}.title` as any),
    body: t(locale, `awnings.install.${i + 1}.body` as any),
  }));

  const priceRows = Array.from({ length: priceRowCount }, (_, i) => ({
    label: t(locale, `awnings.price.${i + 1}.label` as any),
    price: t(locale, `awnings.price.${i + 1}.price` as any),
  }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/gallery/hero-toldos-1280.webp")}
              srcSet={`${url("/images/gallery/hero-toldos-480.webp")} 480w, ${url("/images/gallery/hero-toldos-768.webp")} 768w, ${url("/images/gallery/hero-toldos-1280.webp")} 1280w, ${url("/images/gallery/hero-toldos.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="864"
              fetchPriority="high"
              alt="Toldos de calidad en Alicante"
              className="absolute inset-0 w-full h-full object-cover"
            />
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
                <Button variant="primary" href={quoteWithProduct}>
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
                      <img src={url(product.image)} alt={product.title} width="1600" height="1000" loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
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

          {/* Cassette vs open-arm */}
          <section className="bg-sand-light py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading
                  text={t(locale, 'awnings.cassette.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <div className="bg-white rounded-2xl p-7 h-full border-t-4 border-terracotta">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'awnings.cassette.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'awnings.cassette.body')}
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'awnings.openRoll.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'awnings.openRoll.body')}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* UV protection */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading
                  text={t(locale, 'awnings.uv.heading')}
                  tag="h2"
                  className="text-navy mb-5"
                />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'awnings.uv.body')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Installation process */}
          <section className="bg-sand-light py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading
                  text={t(locale, 'awnings.install.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {installSteps.map((s, i) => (
                  <FadeIn key={s.title} delay={i * 0.08}>
                    <div className="bg-white rounded-2xl p-6 h-full">
                      <h3 className="font-serif text-lg text-navy mb-2">{s.title}</h3>
                      <p className="text-text-body leading-relaxed text-sm">{s.body}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Maintenance */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading
                  text={t(locale, 'awnings.maintenance.heading')}
                  tag="h2"
                  className="text-navy mb-5"
                />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'awnings.maintenance.body')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Price guide */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="mb-6">
                <AnimatedHeading
                  text={t(locale, 'awnings.price.heading')}
                  tag="h2"
                  className="text-navy mb-3"
                />
                <p className="text-text-muted">{t(locale, 'awnings.price.intro')}</p>
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
                      {t(locale, 'awnings.licence_banner.title')}
                    </h3>
                    <p className="text-text-body text-sm leading-relaxed">
                      {t(locale, 'awnings.licence_banner.body')}
                    </p>
                  </div>
                  <a
                    href={licencePath}
                    className="shrink-0 text-terracotta hover:underline font-medium text-sm"
                  >
                    {t(locale, 'awnings.licence_banner.cta')} →
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
                  text={t(locale, 'awnings.related.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <a
                    href={awningGuidePath}
                    className="block bg-sand-light rounded-2xl p-6 h-full hover:bg-sand transition-colors"
                  >
                    <h3 className="font-serif text-lg text-navy mb-2">
                      {t(locale, 'awnings.related.buying.title')} →
                    </h3>
                    <p className="text-text-body leading-relaxed text-sm">
                      {t(locale, 'awnings.related.buying.body')}
                    </p>
                  </a>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <a
                    href={pergolasPath}
                    className="block bg-sand-light rounded-2xl p-6 h-full hover:bg-sand transition-colors"
                  >
                    <h3 className="font-serif text-lg text-navy mb-2">
                      {t(locale, 'awnings.related.pergolas.title')} →
                    </h3>
                    <p className="text-text-body leading-relaxed text-sm">
                      {t(locale, 'awnings.related.pergolas.body')}
                    </p>
                  </a>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Service Area */}
          <ServiceAreaSection
            serviceName={t(locale, 'awnings.serviceArea')}
            locale={locale}
            teaserLocations={['torrevieja', 'santa-pola', 'punta-prima', 'guardamar-del-segura', 'elche', 'benidorm']}
          />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'awnings.cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'awnings.cta.description')}
              </p>
              <Button variant="gold" href={quoteWithProduct}>
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
