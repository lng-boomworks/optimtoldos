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

export function CommunitiesPage({ locale = "es" }: { locale?: Locale }) {
  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);
  const awningsPath = localizedUrl(`/${slugMap.awnings[locale]}`, locale);
  const licencePath = localizedUrl(`/${slugMap["licence-guide"][locale]}`, locale);
  const guidePath = localizedUrl(`/${slugMap["awning-guide"][locale]}`, locale);

  const sections = Array.from({ length: SECTION_COUNT }, (_, i) => ({
    heading: t(locale, `communitiesGuide.section.${i + 1}.heading` as any),
    body: t(locale, `communitiesGuide.section.${i + 1}.body` as any),
  }));

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(locale, `communitiesGuide.faq.${i + 1}.q` as any),
    answer: t(locale, `communitiesGuide.faq.${i + 1}.a` as any),
  }));

  const crossLinks = locale === "es" ? {
    licenceLink: "Guía municipal de licencias para toldos y pérgolas",
    guideLink: "Cómo elegir un toldo (modelo, lona, motorización)",
    legalIntro: "Una vez aprobado en junta, recuerda tramitar la licencia municipal:",
  } : {
    licenceLink: "Municipal licence guide for awnings and pergolas",
    guideLink: "How to choose an awning (model, fabric, motorisation)",
    legalIntro: "Once the AGM approves, remember to apply for the council licence:",
  };

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <img
              src={url("/images/gallery/toldo-brazo-extensible-1280.webp")}
              srcSet={`${url("/images/gallery/toldo-brazo-extensible-480.webp")} 480w, ${url("/images/gallery/toldo-brazo-extensible-768.webp")} 768w, ${url("/images/gallery/toldo-brazo-extensible-1280.webp")} 1280w, ${url("/images/gallery/toldo-brazo-extensible.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={t(locale, "communitiesGuide.hero.heading")}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, "communitiesGuide.hero.heading")}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
                  {t(locale, "communitiesGuide.hero.description")}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <p className="text-lg text-text-body leading-relaxed">
                  {t(locale, "communitiesGuide.intro")}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Sections 1-2: legal + uniformity */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              {sections.slice(0, 2).map((s, i) => (
                <FadeIn key={s.heading} delay={i * 0.05}>
                  <AnimatedHeading text={s.heading} tag="h2" className="text-navy mb-4" />
                  <p className="text-text-body leading-relaxed">{s.body}</p>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* Section 3: majorities (highlight box) */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <div className="bg-navy/5 border-l-4 border-terracotta rounded-r-2xl p-8">
                  <AnimatedHeading text={sections[2].heading} tag="h2" className="text-navy mb-4" />
                  <p className="text-text-body leading-relaxed">{sections[2].body}</p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Section 4: drafting proposal */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={sections[3].heading} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{sections[3].body}</p>
              </FadeIn>
            </div>
          </section>

          {/* Section 5: if community says no */}
          <section className="bg-white py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <AnimatedHeading text={sections[4].heading} tag="h2" className="text-navy mb-4" />
                <p className="text-text-body leading-relaxed">{sections[4].body}</p>
              </FadeIn>
            </div>
          </section>

          {/* Sections 6-7: risks + special cases */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-6">
                {sections.slice(5, 7).map((s, i) => (
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
                  {crossLinks.legalIntro}{" "}
                  <a href={licencePath} className="text-terracotta hover:underline font-medium">
                    {crossLinks.licenceLink} →
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
                {t(locale, "communitiesGuide.cta.heading")}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, "communitiesGuide.cta.body")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={quotePath}>
                  {t(locale, "communitiesGuide.cta.button")}
                </Button>
                <Button variant="outline-white" href={awningsPath}>
                  {t(locale, "communitiesGuide.cta.secondary")}
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
