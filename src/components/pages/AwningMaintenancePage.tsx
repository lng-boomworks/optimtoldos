import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { FAQSection } from "../FAQSection";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

const SECTION_COUNT = 8;
const FAQ_COUNT = 7;

export function AwningMaintenancePage({ locale = "es" }: { locale?: Locale }) {
  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);
  const awningsPath = localizedUrl(`/${slugMap.awnings[locale]}`, locale);
  const guidePath = localizedUrl(`/${slugMap["awning-guide"][locale]}`, locale);
  const sensorPath = localizedUrl(`/${slugMap["wind-sensor-guide"][locale]}`, locale);
  const pricesPath = localizedUrl(`/${slugMap["awning-prices-2026"][locale]}`, locale);

  const sections = Array.from({ length: SECTION_COUNT }, (_, i) => ({
    heading: t(locale, `maintenanceGuide.section.${i + 1}.heading` as any),
    body: t(locale, `maintenanceGuide.section.${i + 1}.body` as any),
  }));

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(locale, `maintenanceGuide.faq.${i + 1}.q` as any),
    answer: t(locale, `maintenanceGuide.faq.${i + 1}.a` as any),
  }));

  const crossLinks = locale === "es" ? {
    sensorLink: "Cómo funciona y se calibra un sensor de viento - guía completa",
    pricesLink: "Precios actualizados 2026 para reposiciones y motores",
    guideLink: "Cómo elegir un toldo nuevo si toca sustitución",
  } : {
    sensorLink: "How a wind sensor works and how to calibrate it - full guide",
    pricesLink: "Updated 2026 prices for replacement parts and motors",
    guideLink: "How to choose a new awning if replacement is needed",
  };

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/gallery/toldo-monobloc.webp")}
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={t(locale, "maintenanceGuide.hero.heading")}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, "maintenanceGuide.hero.heading")}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
                  {t(locale, "maintenanceGuide.hero.description")}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <p className="text-lg text-text-body leading-relaxed">
                  {t(locale, "maintenanceGuide.intro")}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Section 1: Why coast demands more */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={sections[0].heading} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{sections[0].body}</p>
              </FadeIn>
            </div>
          </section>

          {/* Sections 2-4: cleaning + fabrics + mechanics (cards) */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-6">
                {sections.slice(1, 4).map((s, i) => (
                  <FadeIn key={s.heading} delay={i * 0.07}>
                    <article className="bg-sand-light/40 rounded-2xl p-6 h-full border border-border">
                      <h3 className="font-serif text-lg text-navy mb-3">{s.heading}</h3>
                      <p className="text-text-body leading-relaxed text-sm">{s.body}</p>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5: Wind sensor calibration */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={sections[4].heading} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{sections[4].body}</p>
                <p className="mt-5">
                  <a href={sensorPath} className="text-terracotta hover:underline font-medium">
                    {crossLinks.sensorLink} →
                  </a>
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Sections 6-7: storage + post-storm */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-6">
                {sections.slice(5, 7).map((s, i) => (
                  <FadeIn key={s.heading} delay={i * 0.07}>
                    <article className="bg-sand-light/40 rounded-2xl p-6 h-full border border-border">
                      <h3 className="font-serif text-lg text-navy mb-3">{s.heading}</h3>
                      <p className="text-text-body leading-relaxed text-sm">{s.body}</p>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Section 8: Replace fabric vs whole unit */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={sections[7].heading} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{sections[7].body}</p>
                <p className="mt-5 text-sm">
                  <a href={pricesPath} className="text-terracotta hover:underline font-medium">
                    {crossLinks.pricesLink} →
                  </a>
                </p>
                <p className="mt-2 text-sm">
                  <a href={guidePath} className="text-terracotta hover:underline font-medium">
                    {crossLinks.guideLink} →
                  </a>
                </p>
              </FadeIn>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={faqs} heading={t(locale, "faqSection.heading")} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, "maintenanceGuide.cta.heading")}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, "maintenanceGuide.cta.body")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={quotePath}>
                  {t(locale, "maintenanceGuide.cta.button")}
                </Button>
                <Button variant="outline-white" href={awningsPath}>
                  {t(locale, "maintenanceGuide.cta.secondary")}
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
