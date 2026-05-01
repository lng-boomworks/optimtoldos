import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { FAQSection } from "../FAQSection";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

const PRICE_ROW_COUNT = 8;
const FAQ_COUNT = 8;

export function AwningPricesPage({ locale = "es" }: { locale?: Locale }) {
  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);
  const awningsPath = localizedUrl(`/${slugMap.awnings[locale]}`, locale);
  const guidePath = localizedUrl(`/${slugMap["awning-guide"][locale]}`, locale);
  const sensorPath = localizedUrl(`/${slugMap["wind-sensor-guide"][locale]}`, locale);
  const maintenancePath = localizedUrl(`/${slugMap["awning-maintenance"][locale]}`, locale);

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(locale, `pricesGuide.faq.${i + 1}.q` as any),
    answer: t(locale, `pricesGuide.faq.${i + 1}.a` as any),
  }));

  const priceRows = Array.from({ length: PRICE_ROW_COUNT }, (_, i) => ({
    label: t(locale, `pricesGuide.priceTable.${i + 1}.label` as any),
    price: t(locale, `pricesGuide.priceTable.${i + 1}.price` as any),
  }));

  // Render sections 1-5 as standard text blocks, then table (section 6),
  // then sections 7-8 as additional blocks.
  const headSections = [1, 2, 3, 4, 5].map((n) => ({
    heading: t(locale, `pricesGuide.section.${n}.heading` as any),
    body: t(locale, `pricesGuide.section.${n}.body` as any),
  }));

  const tailSections = [7, 8].map((n) => ({
    heading: t(locale, `pricesGuide.section.${n}.heading` as any),
    body: t(locale, `pricesGuide.section.${n}.body` as any),
  }));

  // Cross-link copy by locale
  const crossLinks = locale === "es" ? {
    sensorIntro: "¿Quieres profundizar en sensores de viento? Consulta nuestra guía dedicada",
    sensorLink: "Guía del sensor de viento para toldos motorizados",
    maintenanceIntro: "Para que tu inversión dure 12 a 15 años, sigue nuestro",
    maintenanceLink: "Guía de mantenimiento de toldos en la Costa Blanca",
    pickModel: "¿No sabes qué modelo elegir? - Lee primero nuestra guía",
    pickModelLink: "Cómo elegir el toldo adecuado",
  } : {
    sensorIntro: "Want a deeper dive into wind sensors? See our dedicated guide",
    sensorLink: "Wind sensor guide for motorised awnings",
    maintenanceIntro: "To make your investment last 12 - 15 years, follow our",
    maintenanceLink: "Awning maintenance guide for the Costa Blanca",
    pickModel: "Not sure which model to choose? - Read our guide first",
    pickModelLink: "Choosing the right awning",
  };

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/gallery/toldo-cofre-extensible.webp")}
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={t(locale, "pricesGuide.hero.heading")}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, "pricesGuide.hero.heading")}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
                  {t(locale, "pricesGuide.hero.description")}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <p className="text-lg text-text-body leading-relaxed">
                  {t(locale, "pricesGuide.intro")}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Sections 1-5: by model */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              {headSections.map((s, i) => (
                <FadeIn key={s.heading} delay={i * 0.05}>
                  <AnimatedHeading text={s.heading} tag="h2" className="text-navy mb-4" />
                  <p className="text-text-body leading-relaxed">{s.body}</p>
                </FadeIn>
              ))}
              <FadeIn delay={0.3}>
                <p className="text-sm">
                  <a href={sensorPath} className="text-terracotta hover:underline font-medium">
                    {crossLinks.sensorIntro} - {crossLinks.sensorLink} →
                  </a>
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Price table */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="mb-6">
                <AnimatedHeading
                  text={t(locale, "pricesGuide.section.6.heading")}
                  tag="h2"
                  className="text-navy mb-3"
                />
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="rounded-2xl overflow-hidden bg-sand-light/40 shadow-sm border border-border">
                  <table className="w-full text-left">
                    <tbody>
                      {priceRows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-sand-light/40"}>
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

          {/* Sections 7-8: included/financing */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              {tailSections.map((s, i) => (
                <FadeIn key={s.heading} delay={i * 0.05}>
                  <AnimatedHeading text={s.heading} tag="h2" className="text-navy mb-4" />
                  <p className="text-text-body leading-relaxed">{s.body}</p>
                </FadeIn>
              ))}
              <FadeIn delay={0.2}>
                <p className="text-sm">
                  <a href={maintenancePath} className="text-terracotta hover:underline font-medium">
                    {crossLinks.maintenanceIntro} {crossLinks.maintenanceLink} →
                  </a>
                </p>
                <p className="text-sm mt-3">
                  <a href={guidePath} className="text-terracotta hover:underline font-medium">
                    {crossLinks.pickModel} - {crossLinks.pickModelLink} →
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
                {t(locale, "pricesGuide.cta.heading")}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, "pricesGuide.cta.body")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={quotePath}>
                  {t(locale, "pricesGuide.cta.button")}
                </Button>
                <Button variant="outline-white" href={awningsPath}>
                  {t(locale, "pricesGuide.cta.secondary")}
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
