import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { FAQSection } from "../FAQSection";
import { ServiceAreaSection } from "../ServiceAreaSection";
import { url } from "../../utils/paths";

const toldosFaqs = [
  {
    question: "¿Cuánto cuesta un toldo extensible en Alicante?",
    answer: "El precio de un toldo extensible en Alicante oscila entre 350€ y 1.500€, dependiendo de las medidas, el tipo de tejido (acrílico o impermeable), la motorización y si incluye cofre de protección. En Optim Toldos ofrecemos presupuestos gratuitos y personalizados sin compromiso.",
  },
  {
    question: "¿Qué tipo de toldo es mejor para una terraza?",
    answer: "Para terrazas, el toldo de brazo extensible es la opción más popular por su versatilidad y cobertura. Para terrazas con mucho viento en la Costa Blanca, recomendamos modelos con sensor de viento y cofre de protección. El toldo vertical o screen es ideal como complemento lateral.",
  },
  {
    question: "¿Cuánto dura un toldo bien mantenido?",
    answer: "Un toldo de calidad con tejido acrílico bien mantenido tiene una vida útil de 10 a 15 años. Recomendamos recogerlo en días de viento fuerte, limpiarlo una vez al año con agua y jabón neutro, y asegurarse de que el tejido esté seco antes de recogerlo.",
  },
  {
    question: "¿Es mejor un toldo con o sin cofre?",
    answer: "El cofre de protección es muy recomendable, especialmente en zonas costeras como Alicante donde la brisa marina y la sal pueden deteriorar el tejido. El cofre protege la lona cuando está recogida y puede alargar su vida útil entre un 30% y un 50%.",
  },
  {
    question: "¿Se puede motorizar un toldo existente?",
    answer: "Sí, en la mayoría de los casos es posible motorizar un toldo manual existente. Las opciones incluyen motor con mando a distancia, sensor de viento para recogida automática, sensor de sol y integración con sistemas domóticos.",
  },
  {
    question: "¿Necesito licencia para instalar un toldo en mi terraza?",
    answer: "Generalmente no se necesita licencia de obras para instalar un toldo en una vivienda privada. Sin embargo, en comunidades de propietarios es necesario contar con la aprobación de la comunidad, especialmente respecto al color y modelo para mantener la uniformidad de la fachada.",
  },
];

const productTypes = [
  {
    title: "Brazo Extensible",
    desc: "El toldo clásico para terrazas y balcones. Brazos articulados con cofre opcional para máxima protección del tejido.",
    image: "/images/gallery/toldo-cofre-extensible.jpg",
  },
  {
    title: "Punto Recto",
    desc: "Ideal para ventanas y escaparates. Brazos rectos con inclinación regulable.",
    image: "/images/gallery/toldo-punto-recto.jpg",
  },
  {
    title: "Vertical / Screen",
    desc: "Cortinas enrollables verticales para fachadas, pérgolas y cerramientos. Protección solar y privacidad.",
    image: "/images/gallery/toldo-palilleria.jpg",
  },
  {
    title: "Capota",
    desc: "Toldos curvos de estilo clásico para comercios, restaurantes y entradas elegantes.",
    image: "/images/gallery/toldo-cofre.png",
  },
  {
    title: "Ventana",
    desc: "Toldos compactos para ventanas. Protección solar directa con mínimo impacto visual.",
    image: "/images/gallery/toldo-ventana.jpg",
  },
];

const features = [
  {
    title: "Tejidos Acrílicos e Impermeables",
    desc: "Máxima durabilidad y resistencia al sol",
  },
  {
    title: "Motorización Opcional",
    desc: "Control remoto, sensor viento y sensor sol",
  },
  {
    title: "Cofre de Protección",
    desc: "Mantiene el tejido protegido cuando está recogido",
  },
  {
    title: "Amplia Carta de Colores",
    desc: "Más de 200 colores y diseños disponibles",
  },
];

export function ToldosPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <img src={url("/images/gallery/toldo-awning-hero.jpg")} alt="Toldos de calidad en Alicante" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <FadeIn>
                <span className="inline-block font-mono tracking-[0.2em] text-gold text-sm mb-6">
                  TOLDOS
                </span>
              </FadeIn>
              <AnimatedHeading
                text="Toldos a Medida Para Cada Espacio"
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                  Protecci&oacute;n solar elegante y funcional para terrazas, balcones y
                  comercios. Fabricaci&oacute;n a medida e instalaci&oacute;n profesional.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Button variant="primary" href="/presupuesto">
                  Solicitar Presupuesto
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Product Types Grid */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Tipos de Toldos"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {productTypes.map((product, i) => (
                  <FadeIn key={product.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl overflow-hidden h-full border-t-[3px] border-terracotta shadow-sm hover:shadow-md transition-shadow duration-300">
                      <img src={url(product.image)} alt={product.title} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
                      <div className="p-8">
                        <h3 className="font-serif text-xl text-navy mb-3">
                          {product.title}
                        </h3>
                        <p className="text-text-muted leading-relaxed">
                          {product.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Características"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                  <FadeIn key={feature.title} delay={i * 0.1}>
                    <div className="flex gap-4 p-6 rounded-xl bg-sand-light/50">
                      <div className="w-3 h-3 rounded-full bg-terracotta shrink-0 mt-2" />
                      <div>
                        <h3 className="font-serif text-lg text-navy mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-text-muted">{feature.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={toldosFaqs} />

          {/* Service Area */}
          <ServiceAreaSection serviceName="Instalamos toldos" />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                &iquest;Necesitas un toldo a medida?
              </h2>
              <p className="text-lg text-white/70 mb-10">
                Te asesoramos sin compromiso y te ofrecemos un presupuesto
                personalizado.
              </p>
              <Button variant="gold" href="/presupuesto">
                Solicitar Presupuesto Gratis
              </Button>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
