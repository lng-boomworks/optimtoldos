import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";

export function CTASection() {
  return (
    <section className="relative section-navy py-24">
      {/* Top terracotta accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-terracotta" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <AnimatedHeading
          text="¿Listo Para Transformar Tu Espacio?"
          tag="h2"
          className="text-white mb-6"
        />

        <FadeIn delay={0.2} direction="up">
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Solicita tu presupuesto gratuito y sin compromiso. Te visitamos,
            medimos y asesoramos sin coste.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} direction="up">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" href="/contacto">
              Solicitar Presupuesto
            </Button>
            <Button variant="outline-white" href="tel:+34603572348">
              Ll&aacute;manos
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
