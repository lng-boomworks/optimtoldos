import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { FAQSection } from "../FAQSection";
import { url } from "../../utils/paths";

const shapes = [
  {
    title: "Triangular",
    desc: "La forma clásica. Perfecta para esquinas y espacios irregulares.",
    shape: "triangle" as const,
    image: "/images/velas/vela-1.jpg",
  },
  {
    title: "Cuadrada / Rectangular",
    desc: "Cobertura uniforme para terrazas, patios y zonas de piscina.",
    shape: "square" as const,
    image: "/images/velas/vela-rectangular.jpg",
  },
  {
    title: "Personalizada",
    desc: "Diseño a medida para adaptarse a cualquier configuración.",
    shape: "custom" as const,
    image: "/images/velas/vela-freeform.jpg",
  },
];

const velasFaqs = [
  { question: "¿Cuánto cuesta una vela de sombra a medida?", answer: "El precio de una vela de sombra a medida en Alicante varía entre 200€ y 1.500€ según el tamaño, el material (HDPE o poliéster con PVC) y el sistema de anclaje. Las velas triangulares son más económicas que las rectangulares o las formas personalizadas." },
  { question: "¿Qué material es mejor para una vela de sombra?", answer: "Depende del uso. El HDPE (polietileno de alta densidad) es transpirable, ideal para zonas de piscina ya que permite el paso del aire y bloquea hasta el 95% de los rayos UV. El poliéster con recubrimiento de PVC es impermeable y protege también de la lluvia, perfecto para zonas de comedor exterior." },
  { question: "¿Las velas de sombra aguantan la lluvia?", answer: "Depende del material. Las velas de HDPE son permeables y no protegen de la lluvia, solo del sol. Las velas de poliéster con PVC son impermeables y sí protegen de la lluvia. Es importante que la vela tenga una inclinación mínima del 20% para que el agua escurra correctamente." },
  { question: "¿Cómo se fijan las velas de sombra?", answer: "Las velas se pueden anclar a postes de acero, placas murales en paredes, árboles resistentes o estructuras existentes. Lo más importante es que los puntos de anclaje soporten la tensión necesaria. En Optim Toldos realizamos un estudio del espacio para determinar la mejor configuración." },
  { question: "¿Cuánto dura una vela de sombra?", answer: "Una vela de sombra de calidad con tejido estabilizado contra rayos UV tiene una vida útil de 10 a 15 años. Recomendamos retirarla en invierno si no se usa para alargar su vida útil, aunque muchos clientes en Alicante las mantienen instaladas todo el año sin problema." },
];

const stats = [
  { value: "95%", label: "protección UV" },
  { value: "Hasta 50°C", label: "reducción temperatura" },
  { value: "10+ años", label: "vida útil" },
];

export function VelasPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <img src={url("/images/velas/vela-tensada.jpg")} alt="Vela de sombra tensada en jardín" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <FadeIn>
                <span className="inline-block font-mono tracking-[0.2em] text-gold text-sm mb-6">
                  VELAS DE SOMBRA
                </span>
              </FadeIn>
              <AnimatedHeading
                text="Sombra con Estilo Arquitectónico"
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                  Velas tensadas de dise&ntilde;o moderno que combinan
                  protecci&oacute;n UV con una est&eacute;tica espectacular. La
                  soluci&oacute;n m&aacute;s elegante para grandes espacios.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Button variant="primary" href="/presupuesto">
                  Solicitar Presupuesto
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Shapes / Options */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Formas y Opciones"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {shapes.map((s, i) => (
                  <FadeIn key={s.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl overflow-hidden h-full border-t-[3px] border-terracotta shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                      <img src={url(s.image)} alt={s.title} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
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
                  text="Protección UV Certificada"
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
                  Nuestros tejidos t&eacute;cnicos bloquean hasta el 95% de los
                  rayos UV, reduciendo significativamente la temperatura bajo la
                  vela. Fabricados con materiales de alta tenacidad resistentes
                  al desgarro y a la intemperie.
                </p>
              </FadeIn>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={velasFaqs} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Dale car&aacute;cter a tu espacio exterior
              </h2>
              <p className="text-lg text-white/70 mb-10">
                Las velas de sombra son la soluci&oacute;n perfecta para crear
                ambientes &uacute;nicos al aire libre.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href="/presupuesto">
                  Solicitar Presupuesto Gratis
                </Button>
                <Button variant="outline-white" href="/galeria">
                  Ver Galer&iacute;a
                </Button>
              </div>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
