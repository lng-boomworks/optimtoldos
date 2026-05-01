import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { FAQSection } from "../FAQSection";
import { Button } from "../Button";
import { url } from "../../utils/paths";
import type { Locale } from "../../i18n/index";

export interface SubProductSection {
  heading: string;
  body: string[];
}

export interface SubProductTable {
  heading: string;
  intro?: string;
  columns: string[];
  rows: string[][];
}

export interface SubProductFAQ {
  question: string;
  answer: string;
}

export interface SubProductRelatedLink {
  label: string;
  href: string;
}

export interface SubProductCTA {
  heading: string;
  body: string;
  button: string;
  buttonHref: string;
  secondary?: { label: string; href: string };
}

export interface SubProductHero {
  heading: string;
  description: string;
  image: string;
  imageAlt?: string;
}

export interface SubProductPageProps {
  locale?: Locale;
  hero: SubProductHero;
  intro?: string;
  sections: SubProductSection[];
  comparison?: SubProductTable;
  related?: {
    heading: string;
    links: SubProductRelatedLink[];
  };
  faqHeading: string;
  faqs: SubProductFAQ[];
  cta: SubProductCTA;
}

export function SubProductPage({
  locale = "es",
  hero,
  intro,
  sections,
  comparison,
  related,
  faqHeading,
  faqs,
  cta,
}: SubProductPageProps) {
  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <img
              src={url(hero.image)}
              width="1920"
              height="1280"
              fetchPriority="high"
              alt={hero.imageAlt ?? hero.heading}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={hero.heading}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
                  {hero.description}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Intro */}
          {intro && (
            <section className="bg-white py-12 md:py-14">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                  <p className="text-lg text-text-body leading-relaxed">{intro}</p>
                </FadeIn>
              </div>
            </section>
          )}

          {/* Sections - alternating backgrounds */}
          {sections.map((section, idx) => {
            const isAlt = idx % 2 === 0;
            return (
              <section
                key={idx}
                className={`${isAlt ? "bg-sand-light" : "bg-white"} py-12 md:py-16`}
              >
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                  <FadeIn>
                    <AnimatedHeading
                      text={section.heading}
                      tag="h2"
                      className="text-navy mb-5"
                    />
                    <div className="space-y-4">
                      {section.body.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-text-body leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                      ))}
                    </div>
                  </FadeIn>
                </div>
              </section>
            );
          })}

          {/* Comparison / specs table */}
          {comparison && (
            <section
              className={`${sections.length % 2 === 0 ? "bg-sand-light" : "bg-white"} py-12 md:py-16`}
            >
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn className="mb-6">
                  <AnimatedHeading
                    text={comparison.heading}
                    tag="h2"
                    className="text-navy mb-3"
                  />
                  {comparison.intro && (
                    <p className="text-text-muted">{comparison.intro}</p>
                  )}
                </FadeIn>
                <FadeIn delay={0.1}>
                  <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-border">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-navy text-white">
                          <tr>
                            {comparison.columns.map((col, i) => (
                              <th
                                key={i}
                                className="p-4 font-serif font-medium text-sm uppercase tracking-wide"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {comparison.rows.map((row, ri) => (
                            <tr
                              key={ri}
                              className={ri % 2 === 0 ? "bg-white" : "bg-sand-light/50"}
                            >
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className={`p-4 ${ci === 0 ? "font-medium text-navy" : "text-text-body"}`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>
          )}

          {/* Related links */}
          {related && related.links.length > 0 && (
            <section className="bg-white py-12 md:py-14">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn className="mb-6">
                  <AnimatedHeading
                    text={related.heading}
                    tag="h2"
                    className="text-navy"
                  />
                </FadeIn>
                <FadeIn delay={0.1}>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {related.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.href}
                          className="block bg-sand-light hover:bg-sand rounded-xl p-4 text-navy hover:text-terracotta font-medium transition-colors"
                        >
                          {link.label} <span aria-hidden>&rarr;</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </div>
            </section>
          )}

          {/* FAQ */}
          <FAQSection faqs={faqs} heading={faqHeading} locale={locale} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {cta.heading}
              </h2>
              <p className="text-lg text-white/70 mb-10">{cta.body}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={cta.buttonHref}>
                  {cta.button}
                </Button>
                {cta.secondary && (
                  <Button variant="outline-white" href={cta.secondary.href}>
                    {cta.secondary.label}
                  </Button>
                )}
              </div>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}

export default SubProductPage;
