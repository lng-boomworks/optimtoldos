import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { FAQSection } from "../FAQSection";
import { url } from "../../utils/paths";
import type { Locale } from "../../i18n/index";

/**
 * Generic component for ES product+zone landing pages (PDF §5).
 * 24 .astro routes hydrate this component with inline copy — content is
 * NOT pulled from the i18n locale files (other agents are editing those
 * files in parallel; we must not race).
 */

export interface ProductZoneFAQ {
  q: string;
  a: string;
}

export interface ProductZoneRelated {
  label: string;
  href: string;
}

export interface ProductZonePageProps {
  locale?: Locale;
  /** H1 — e.g., "Pérgolas en Torrevieja" */
  heading: string;
  /** Sub-hero one-liner */
  intro: string;
  /** Hero image (full path under /images, gallery hero used as fallback) */
  heroImage?: string;
  /** "About this area + product" — 3-5 sentences UNIQUE per page */
  locationParagraph: string;
  /** "Why this product fits this area" - 4-5 bullets */
  whyFitsBullets: string[];
  /** Typical project example narrative (2-3 sentences) */
  caseStudy: string;
  /** Local price band string. Omit to hide the entire price column —
   *  used when prices are pending client clearance. */
  priceBand?: string;
  /** Comunidad / licence note (HTML allowed via licenceLink prop) */
  comunidadNote: string;
  /** Path to the licence guide (anchored CTA inside comunidad block) */
  licenceHref: string;
  /** FAQ entries */
  faqs: ProductZoneFAQ[];
  /** Cross-links for the related-pages block */
  related: ProductZoneRelated[];
  /** Final CTA target — `/presupuesto/?product=X&location=Y` */
  ctaHref: string;
  /** Contact path for secondary CTA */
  contactHref: string;
}

export function ProductZonePage({
  locale = "es",
  heading,
  intro,
  heroImage = "/images/gallery/hero-home-1280.webp",
  locationParagraph,
  whyFitsBullets,
  caseStudy,
  priceBand,
  comunidadNote,
  licenceHref,
  faqs,
  related,
  ctaHref,
  contactHref,
}: ProductZonePageProps) {
  const faqItems = faqs.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <img
              src={url(heroImage)}
              srcSet={`${url("/images/gallery/hero-home-480.webp")} 480w, ${url("/images/gallery/hero-home-768.webp")} 768w, ${url("/images/gallery/hero-home-1280.webp")} 1280w, ${url("/images/gallery/hero-home.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={`${heading} - Optim Toldos`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={heading}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
                  {intro}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Location-specific paragraph */}
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <h2 className="font-serif text-2xl md:text-3xl text-navy mb-5">
                  {heading}
                </h2>
                <p className="text-lg text-text-body leading-relaxed whitespace-pre-line">
                  {locationParagraph}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Why this product fits this area */}
          <section className="bg-sand-light py-16 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <h2 className="font-serif text-2xl md:text-3xl text-navy mb-6">
                  Por qué encaja aquí
                </h2>
                <ul className="space-y-3 text-text-body">
                  {whyFitsBullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-terracotta font-bold">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </section>

          {/* Typical project (+ price band when supplied) */}
          <section className="bg-white py-16 md:py-20">
            <div
              className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${
                priceBand ? "grid md:grid-cols-2 gap-10" : ""
              }`}
            >
              <FadeIn>
                <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
                  Proyecto tipo
                </h2>
                <p className="text-text-body leading-relaxed">{caseStudy}</p>
              </FadeIn>
              {priceBand && (
                <FadeIn delay={0.1}>
                  <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
                    Banda de precio orientativa
                  </h2>
                  <p className="text-text-body leading-relaxed">{priceBand}</p>
                  <p className="text-sm text-text-muted mt-3">
                    Precio orientativo 2026, sujeto a medición y opciones (motor,
                    iluminación, sensores). Le entregamos un presupuesto cerrado
                    tras la visita técnica.
                  </p>
                </FadeIn>
              )}
            </div>
          </section>

          {/* Comunidad / licence note */}
          <section className="bg-sand-light py-14 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <h2 className="font-serif text-xl md:text-2xl text-navy mb-3">
                  Comunidad y licencias
                </h2>
                <p className="text-text-body leading-relaxed">
                  {comunidadNote}
                </p>
                <p className="mt-4">
                  <a
                    href={licenceHref}
                    className="text-terracotta hover:underline font-medium"
                  >
                    Guía de licencias en Alicante →
                  </a>
                </p>
              </FadeIn>
            </div>
          </section>

          {/* FAQs */}
          {faqItems.length > 0 && (
            <FAQSection
              faqs={faqItems}
              heading="Preguntas frecuentes"
              locale={locale}
            />
          )}

          {/* Related cross-links */}
          {related.length > 0 && (
            <section className="bg-white py-14 md:py-16">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                  <h2 className="font-serif text-xl md:text-2xl text-navy mb-5">
                    También te puede interesar
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {related.map((r) => (
                      <a
                        key={r.href}
                        href={r.href}
                        className="inline-block bg-white border border-border rounded-full px-4 py-1.5 text-sm text-navy hover:bg-terracotta hover:text-white hover:border-terracotta transition-colors"
                      >
                        {r.label}
                      </a>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </section>
          )}

          {/* Bottom CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                ¿Listo para empezar?
              </h2>
              <p className="text-lg text-white/70 mb-10">
                Visita técnica sin compromiso, presupuesto cerrado y plazo de
                instalación claro desde el primer contacto.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="gold" href={ctaHref}>
                  Solicitar presupuesto
                </Button>
                <Button variant="outline-white" href={contactHref}>
                  Contactar
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
