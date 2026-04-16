import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { FAQSection } from "../FAQSection";

const pergolasFaqs = [
  {
    question: "¿Cuánto cuesta una pérgola bioclimática en Alicante?",
    answer: "El precio de una pérgola bioclimática en Alicante varía entre 3.000€ y 12.000€ según las dimensiones, acabados y opciones como motorización, iluminación LED o sensor de lluvia. En Optim Toldos realizamos una visita gratuita para tomar medidas y ofrecerte un presupuesto personalizado.",
  },
  {
    question: "¿Qué diferencia hay entre una pérgola bioclimática y un toldo?",
    answer: "La pérgola bioclimática es una estructura fija de aluminio con lamas orientables que permite regular la luz y ventilación. A diferencia del toldo, ofrece protección contra la lluvia, se puede usar los 365 días del año y aumenta el valor de la propiedad. El toldo es más económico y flexible, pero no ofrece protección completa.",
  },
  {
    question: "¿Necesito licencia de obra para una pérgola bioclimática?",
    answer: "En la mayoría de municipios de Alicante se requiere una comunicación previa o licencia de obra menor. Los requisitos varían según el ayuntamiento y las dimensiones de la estructura. En Optim Toldos te asesoramos sobre la normativa local y te ayudamos con la documentación necesaria.",
  },
  {
    question: "¿Las pérgolas bioclimáticas necesitan mantenimiento?",
    answer: "El mantenimiento es mínimo. Recomendamos limpiar las lamas 2 veces al año con agua y jabón neutro y revisar el motor anualmente. La estructura de aluminio es resistente a la corrosión, ideal para el clima costero de Alicante.",
  },
  {
    question: "¿Se pueden integrar cortinas de cristal en una pérgola?",
    answer: "Sí, las cortinas de cristal son el complemento perfecto para una pérgola bioclimática. También se pueden añadir toldos verticales, screens y estores zip como cerramientos laterales, creando un espacio cerrado utilizable todo el año.",
  },
  {
    question: "¿Cuánto tarda la instalación de una pérgola bioclimática?",
    answer: "La fabricación suele tardar entre 3 y 4 semanas desde la confirmación del pedido. La instalación en sí se realiza normalmente en 1 a 2 días laborables, dependiendo de la complejidad del proyecto.",
  },
];

const features = [
  {
    title: "Lamas Orientables",
    desc: "Controla la entrada de luz y ventilación girando las lamas de 0° a 135°.",
    image: "/images/pergolas/pergola-bioclimatica.jpg",
  },
  {
    title: "Motorización Inteligente",
    desc: "Apertura y cierre motorizado con mando a distancia o app móvil.",
    image: "/images/pergolas/pergola-costablanca.jpg",
  },
  {
    title: "Iluminación LED",
    desc: "LED integrado para crear el ambiente perfecto en tus noches de verano.",
    image: "/images/pergolas/pergola-restaurante.png",
  },
  {
    title: "Sensor de Lluvia",
    desc: "Las lamas se cierran automáticamente al detectar lluvia. Protección sin preocupaciones.",
    image: "/images/pergolas/pergola-design-1.png",
  },
];

const benefits = [
  "Uso 365 días al año — lluvia, sol o viento",
  "Aumenta el valor de tu propiedad",
  "Estructura de aluminio resistente a la corrosión",
  "Personalización total: medidas, colores y acabados",
  "Integración con sistemas domóticos",
];

export function PergolasPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <img src="/images/pergolas/pergola-bioclimatica-2024.jpg" alt="Pérgola bioclimática instalada en terraza" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <FadeIn>
                <span className="inline-block font-mono tracking-[0.2em] text-gold text-sm mb-6">
                  P&Eacute;RGOLAS BIOCLIM&Aacute;TICAS
                </span>
              </FadeIn>
              <AnimatedHeading
                text="Vive Tu Terraza Todo el Año"
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                  P&eacute;rgolas de aluminio con lamas orientables que regulan luz,
                  ventilaci&oacute;n y protecci&oacute;n contra la lluvia. El sal&oacute;n
                  exterior definitivo.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <Button variant="primary" href="/presupuesto">
                  Solicitar Presupuesto
                </Button>
              </FadeIn>
            </div>
          </section>

          {/* Features */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Características Premium"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                  <FadeIn key={feature.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      <img src={feature.image} alt={feature.title} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
                      <div className="p-8">
                        <h3 className="font-serif text-xl text-navy mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-text-muted leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="Beneficios"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="space-y-5">
                {benefits.map((benefit, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-sand-light/50">
                      <svg
                        className="w-6 h-6 text-terracotta shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-lg text-text-body">{benefit}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={pergolasFaqs} />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                El sal&oacute;n exterior que siempre so&ntilde;aste
              </h2>
              <p className="text-lg text-white/70 mb-10">
                Dise&ntilde;amos e instalamos tu p&eacute;rgola bioclim&aacute;tica a
                medida. Consulta sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
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
