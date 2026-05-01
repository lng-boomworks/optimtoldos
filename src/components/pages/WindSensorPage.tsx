import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { FAQSection } from "../FAQSection";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

const SECTION_COUNT = 7;
const FAQ_COUNT = 8;

export function WindSensorPage({ locale = "es" }: { locale?: Locale }) {
  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);
  const awningsPath = localizedUrl(`/${slugMap.awnings[locale]}`, locale);
  const guidePath = localizedUrl(`/${slugMap["awning-guide"][locale]}`, locale);
  const maintenancePath = localizedUrl(`/${slugMap["awning-maintenance"][locale]}`, locale);
  const pricesPath = localizedUrl(`/${slugMap["awning-prices-2026"][locale]}`, locale);
  const motorisationPath = localizedUrl(`/${slugMap["awnings-motorisation"][locale]}`, locale);

  const sections = Array.from({ length: SECTION_COUNT }, (_, i) => ({
    heading: t(locale, `windSensorGuide.section.${i + 1}.heading` as any),
    body: t(locale, `windSensorGuide.section.${i + 1}.body` as any),
  }));

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(locale, `windSensorGuide.faq.${i + 1}.q` as any),
    answer: t(locale, `windSensorGuide.faq.${i + 1}.a` as any),
  }));

  const crossLinks = locale === "es" ? {
    motorisationLink: "Motorización Somfy, Nice y Elero - opciones para toldos",
    pricesLink: "Precios actualizados 2026 (sensores y motores)",
    guideLink: "Cómo elegir el toldo adecuado",
    maintenanceLink: "Mantenimiento del sensor en zona costera",
  } : {
    motorisationLink: "Somfy, Nice and Elero motorisation - options for awnings",
    pricesLink: "Updated 2026 prices (sensors and motors)",
    guideLink: "Choosing the right awning",
    maintenanceLink: "Sensor maintenance in coastal zones",
  };

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/gallery/toldo-cofre.webp")}
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={t(locale, "windSensorGuide.hero.heading")}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, "windSensorGuide.hero.heading")}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
                  {t(locale, "windSensorGuide.hero.description")}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <p className="text-lg text-text-body leading-relaxed">
                  {t(locale, "windSensorGuide.intro")}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Section 1: how it works */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={sections[0].heading} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{sections[0].body}</p>
              </FadeIn>
            </div>
          </section>

          {/* Section 2: thresholds (highlight) */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={sections[1].heading} tag="h2" className="text-navy mb-6" />
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-sand-light/40 rounded-2xl p-5 text-center border border-border">
                    <p className="font-serif text-3xl text-terracotta mb-1">15</p>
                    <p className="text-xs uppercase tracking-wider text-text-muted">km/h</p>
                  </div>
                  <div className="bg-sand-light/60 rounded-2xl p-5 text-center border border-border">
                    <p className="font-serif text-3xl text-navy mb-1">25</p>
                    <p className="text-xs uppercase tracking-wider text-text-muted">km/h</p>
                  </div>
                  <div className="bg-sand-light/40 rounded-2xl p-5 text-center border border-border">
                    <p className="font-serif text-3xl text-terracotta mb-1">35</p>
                    <p className="text-xs uppercase tracking-wider text-text-muted">km/h</p>
                  </div>
                </div>
                <p className="text-text-body leading-relaxed">{sections[1].body}</p>
              </FadeIn>
            </div>
          </section>

          {/* Sections 3-4: wireless vs wired + retrofit (cards) */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-6">
                {sections.slice(2, 4).map((s, i) => (
                  <FadeIn key={s.heading} delay={i * 0.07}>
                    <article className="bg-white rounded-2xl p-6 h-full border border-border">
                      <h3 className="font-serif text-lg text-navy mb-3">{s.heading}</h3>
                      <p className="text-text-body leading-relaxed text-sm">{s.body}</p>
                    </article>
                  </FadeIn>
                ))}
              </div>
              <FadeIn className="mt-8" delay={0.2}>
                <p className="text-sm">
                  <a href={motorisationPath} className="text-terracotta hover:underline font-medium">
                    {crossLinks.motorisationLink} →
                  </a>
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Section 5: home automation */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={sections[4].heading} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{sections[4].body}</p>
              </FadeIn>
            </div>
          </section>

          {/* Section 6: vs rain sensor */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={sections[5].heading} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{sections[5].body}</p>
              </FadeIn>
            </div>
          </section>

          {/* Section 7: real cases (highlight) */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="bg-navy/5 border-l-4 border-terracotta rounded-r-2xl p-8">
                  <AnimatedHeading text={sections[6].heading} tag="h2" className="text-navy mb-4" />
                  <p className="text-text-body leading-relaxed">{sections[6].body}</p>
                </div>
                <p className="mt-6 text-sm">
                  <a href={pricesPath} className="text-terracotta hover:underline font-medium">
                    {crossLinks.pricesLink} →
                  </a>
                </p>
                <p className="mt-2 text-sm">
                  <a href={maintenancePath} className="text-terracotta hover:underline font-medium">
                    {crossLinks.maintenanceLink} →
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
                {t(locale, "windSensorGuide.cta.heading")}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, "windSensorGuide.cta.body")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={quotePath}>
                  {t(locale, "windSensorGuide.cta.button")}
                </Button>
                <Button variant="outline-white" href={awningsPath}>
                  {t(locale, "windSensorGuide.cta.secondary")}
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
