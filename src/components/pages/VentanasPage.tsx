import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { FAQSection } from "../FAQSection";

const apertureTypes = [
  {
    title: "Corredera",
    desc: "Apertura lateral sin invadir el espacio interior. Ideal para grandes ventanales y salidas a terraza.",
    image: "/images/ventanas/ventanas-cortizo.jpg",
  },
  {
    title: "Abatible",
    desc: "Apertura hacia el interior con bisagra lateral. Clásica y versátil.",
    image: "/images/ventanas/ventanas-aluplast.jpg",
  },
  {
    title: "Oscilobatiente",
    desc: "Doble apertura: abatible e inclinada. Ventilación segura sin abrir completamente.",
    image: "/images/ventanas/ventanas-cortizo2.jpg",
  },
];

const ventanasFaqs = [
  { question: "¿Qué es mejor: ventanas de PVC o aluminio?", answer: "Las ventanas de PVC ofrecen un aislamiento térmico hasta un 40% superior al aluminio gracias a sus perfiles multicámara. Son más eficientes energéticamente, reducen más el ruido exterior y no se corroen con la brisa marina. El aluminio es más delgado y puede ser mejor para grandes ventanales. En el clima de Alicante, el PVC es la opción más eficiente." },
  { question: "¿Cuánto se ahorra en energía con ventanas de PVC?", answer: "El ahorro medio en climatización al instalar ventanas de PVC es del 30% al 40% respecto a ventanas antiguas de aluminio sin rotura de puente térmico. En una vivienda media en Alicante, esto puede suponer entre 300€ y 600€ de ahorro anual en aire acondicionado y calefacción." },
  { question: "¿Las ventanas de PVC resisten el calor de Alicante?", answer: "Sí, las ventanas de PVC modernas están fabricadas con formulaciones estabilizadas contra rayos UV que resisten temperaturas extremas sin deformarse ni amarillear. De hecho, su capacidad de aislamiento térmico las hace especialmente eficaces para mantener el frescor interior durante los veranos de Alicante." },
  { question: "¿Qué es una ventana oscilobatiente?", answer: "Una ventana oscilobatiente tiene doble sistema de apertura: se abre como una ventana abatible convencional (hacia el interior con bisagra lateral) o se inclina hacia dentro desde la parte superior para ventilación segura. Es ideal para habitaciones donde se quiere ventilar sin abrir completamente la ventana." },
  { question: "¿Las ventanas de PVC amarillean con el sol?", answer: "No, las ventanas de PVC de calidad actuales utilizan formulaciones con estabilizadores UV que previenen el amarilleamiento durante más de 20 años. Todos nuestros perfiles cuentan con certificación CE y garantía del fabricante." },
  { question: "¿Cuánto tarda el cambio de ventanas en una vivienda?", answer: "El cambio completo de ventanas en una vivienda media (6-8 ventanas) se realiza normalmente en 1 a 2 días laborables. La fabricación a medida tarda entre 2 y 3 semanas. Durante la instalación, la molestia es mínima ya que trabajamos ventana por ventana." },
];

const benefits = [
  "Reducción de hasta un 70% en pérdidas térmicas",
  "Aislamiento acústico superior — hasta 47dB de reducción",
  "Perfiles multicámara de PVC reciclable",
  "Vidrio bajo emisivo y cámara de argón disponibles",
  "Certificación CE y marcado de calidad",
];

export function VentanasPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <img src="/images/gallery/ventanas-pvc-hero.jpg" alt="Ventanas de PVC de alta eficiencia" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <FadeIn>
                <span className="inline-block font-mono tracking-[0.2em] text-gold text-sm mb-6">
                  VENTANAS Y PUERTAS PVC
                </span>
              </FadeIn>
              <AnimatedHeading
                text="Eficiencia Energética y Confort"
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                  Sistemas de ventanas y puertas de PVC de &uacute;ltima
                  generaci&oacute;n. M&aacute;ximo aislamiento t&eacute;rmico y
                  ac&uacute;stico con dise&ntilde;o elegante.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Button variant="primary" href="/presupuesto">
                  Solicitar Presupuesto
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Types Grid */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Tipos de Apertura"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {apertureTypes.map((type, i) => (
                  <FadeIn key={type.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl overflow-hidden h-full border-t-[3px] border-terracotta shadow-sm hover:shadow-md transition-shadow duration-300">
                      <img src={type.image} alt={type.title} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
                      <div className="p-8">
                        <h3 className="font-serif text-xl text-navy mb-3">
                          {type.title}
                        </h3>
                        <p className="text-text-muted leading-relaxed">
                          {type.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Energy Efficiency */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Eficiencia Energética"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="max-w-2xl mx-auto space-y-5">
                {benefits.map((benefit, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-sand-light/50">
                      <svg
                        className="w-6 h-6 text-terracotta shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-text-body leading-relaxed">
                        {benefit}
                      </span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={ventanasFaqs} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Mejora el confort de tu hogar
              </h2>
              <p className="text-lg text-white/70 mb-10">
                Ventanas y puertas de PVC con el mejor aislamiento del mercado.
                Pide tu presupuesto sin compromiso.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href="/presupuesto">
                  Solicitar Presupuesto Gratis
                </Button>
                <Button variant="outline-white" href="/contacto">
                  Contactar
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
