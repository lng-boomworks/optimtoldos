import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { url } from "../../utils/paths";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image */}
      <img
        src={url("/images/gallery/hero-toldos-2025.jpg")}
        alt="Toldo extensible en terraza soleada"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <FadeIn delay={0.1} direction="up">
          <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-6">
            Protecci&oacute;n Solar &amp; Vida Exterior
          </p>
        </FadeIn>

        <AnimatedHeading
          text="Transforma tu espacio exterior"
          tag="h1"
          className="text-white max-w-3xl mb-6"
        />

        <FadeIn delay={0.4} direction="up">
          <p className="max-w-2xl text-lg text-white/80 leading-relaxed mb-10">
            Toldos, p&eacute;rgolas bioclim&aacute;ticas, cortinas de cristal y
            m&aacute;s. Soluciones a medida con instalaci&oacute;n profesional en
            toda la provincia de Alicante.
          </p>
        </FadeIn>

        <FadeIn delay={0.6} direction="up">
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" href="/contacto">
              Presupuesto Gratis
            </Button>
            <Button variant="outline-white" href="#productos">
              Ver Productos
            </Button>
          </div>
        </FadeIn>
      </div>

      {/* Bottom terracotta separator */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-terracotta" />
    </section>
  );
}
