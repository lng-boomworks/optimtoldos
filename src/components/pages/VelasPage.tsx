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

const shapeImages = [
  "/images/velas/vela-1.webp",
  "/images/velas/vela-rectangular.webp",
  "/images/velas/vela-freeform.webp",
];

const shapeTypes = ["triangle", "square", "custom"] as const;
const shapeCount = 3;
const statCount = 3;
const faqCount = 7;
const installStepCount = 4;
const useCount = 4;

export function VelasPage({ locale = 'es' }: { locale?: Locale }) {
  const quoteWithProduct = `${localizedUrl(`/${slugMap.quote[locale]}`, locale)}?product=shade-sails`;
  const awningsPath = localizedUrl(`/${slugMap.awnings[locale]}`, locale);
  const pergolasPath = localizedUrl(`/${slugMap.pergolas[locale]}`, locale);
  const galleryPath = localizedUrl(`/${slugMap.gallery[locale]}`, locale);

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

  const installSteps = Array.from({ length: installStepCount }, (_, i) => ({
    title: t(locale, `sails.install.${i + 1}.title` as any),
    body: t(locale, `sails.install.${i + 1}.body` as any),
  }));

  const uses = Array.from({ length: useCount }, (_, i) => ({
    title: t(locale, `sails.uses.${i + 1}.title` as any),
    body: t(locale, `sails.uses.${i + 1}.body` as any),
  }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
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
                <Button variant="primary" href={quoteWithProduct}>
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

          {/* Triangular vs rectangular */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading
                  text={t(locale, 'sails.shapeCompare.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'sails.shapeCompare.triangular.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'sails.shapeCompare.triangular.body')}
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="bg-white rounded-2xl p-7 h-full">
                    <h3 className="font-serif text-xl text-navy mb-3">
                      {t(locale, 'sails.shapeCompare.rectangular.title')}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {t(locale, 'sails.shapeCompare.rectangular.body')}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Wind limits */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading
                  text={t(locale, 'sails.wind.heading')}
                  tag="h2"
                  className="text-navy mb-5"
                />
                <p className="text-text-body leading-relaxed">
                  {t(locale, 'sails.wind.body')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Installation process */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading text={t(locale, 'sails.install.heading')} tag="h2" className="text-navy" />
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

          {/* Best-use grid */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-10">
                <AnimatedHeading text={t(locale, 'sails.uses.heading')} tag="h2" className="text-navy" />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {uses.map((u, i) => (
                  <FadeIn key={u.title} delay={i * 0.08}>
                    <div className="bg-sand-light rounded-2xl p-6 h-full">
                      <h3 className="font-serif text-lg text-navy mb-2">{u.title}</h3>
                      <p className="text-text-body leading-relaxed text-sm">{u.body}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={faqs} locale={locale} />

          {/* Related alternatives */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-8">
                <AnimatedHeading text={t(locale, 'sails.related.heading')} tag="h2" className="text-navy" />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.1}>
                  <a
                    href={awningsPath}
                    className="block bg-sand-light rounded-2xl p-6 h-full hover:bg-sand transition-colors"
                  >
                    <h3 className="font-serif text-lg text-navy mb-2">
                      {t(locale, 'sails.related.awnings.title')} →
                    </h3>
                    <p className="text-text-body leading-relaxed text-sm">
                      {t(locale, 'sails.related.awnings.body')}
                    </p>
                  </a>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <a
                    href={pergolasPath}
                    className="block bg-sand-light rounded-2xl p-6 h-full hover:bg-sand transition-colors"
                  >
                    <h3 className="font-serif text-lg text-navy mb-2">
                      {t(locale, 'sails.related.pergolas.title')} →
                    </h3>
                    <p className="text-text-body leading-relaxed text-sm">
                      {t(locale, 'sails.related.pergolas.body')}
                    </p>
                  </a>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Service Area */}
          <ServiceAreaSection
            serviceName={t(locale, 'sails.serviceArea')}
            locale={locale}
            teaserLocations={['ciudad-quesada', 'campoamor', 'la-marina', 'dolores', 'elche', 'gran-alacant']}
          />

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
                <Button variant="gold" href={quoteWithProduct}>
                  {t(locale, 'sails.cta.quote')}
                </Button>
                <Button variant="outline-white" href={galleryPath}>
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
