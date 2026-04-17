import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { FAQSection } from "../FAQSection";
import { ServiceAreaSection } from "../ServiceAreaSection";
import { url } from "../../utils/paths";

const cortinasFaqs = [
  {
    question: "¿Cuánto cuestan las cortinas de cristal por metro cuadrado?",
    answer: "El precio de las cortinas de cristal oscila entre 250€ y 450€ por metro cuadrado en Alicante, dependiendo de la altura, el grosor del cristal (8mm o 10mm) y el número de paneles. Te ofrecemos presupuesto gratuito con visita incluida.",
  },
  {
    question: "¿Las cortinas de cristal aíslan del frío?",
    answer: "Las cortinas de cristal ofrecen una protección significativa contra el viento y el frío, aunque no son herméticas como una ventana fija. En Alicante, donde los inviernos son suaves, suelen ser suficientes para disfrutar de la terraza todo el año con una diferencia de temperatura notable respecto al exterior.",
  },
  {
    question: "¿Se pueden cerrar completamente las cortinas de cristal?",
    answer: "Sí, los paneles se cierran completamente con un mínimo espacio entre ellos. Sin embargo, no son totalmente herméticas como un cerramiento fijo de obra. Esto permite cierta ventilación natural que evita la condensación.",
  },
  {
    question: "¿Qué grosor de cristal se usa en las cortinas de cristal?",
    answer: "Utilizamos cristal templado de seguridad de 8mm o 10mm de grosor, dependiendo de las dimensiones y la exposición al viento. El cristal templado es hasta 5 veces más resistente que el cristal normal y, en caso de rotura, se fragmenta en pequeños trozos sin aristas cortantes.",
  },
  {
    question: "¿Se empañan las cortinas de cristal?",
    answer: "La condensación puede producirse en días fríos y húmedos, especialmente si hay diferencia de temperatura entre interior y exterior. Una correcta instalación con sistema de ventilación regulable minimiza este efecto. En el clima de Alicante, la condensación es poco frecuente.",
  },
  {
    question: "¿Se pueden instalar cortinas de cristal en una pérgola?",
    answer: "Sí, es una de las combinaciones más demandadas. Las cortinas de cristal complementan perfectamente una pérgola bioclimática, creando un espacio exterior cerrado y protegido que se puede disfrutar los 365 días del año.",
  },
];

const features = [
  {
    title: "Sin Perfiles Verticales",
    desc: "Visión panorámica sin interrupciones. Cristal de suelo a techo.",
    image: "/images/cortinas/cortina-cristal-1.jpg",
  },
  {
    title: "Plegado Total",
    desc: "Los paneles se pliegan completamente a un lado. Terraza abierta cuando quieras.",
    image: "/images/cortinas/cortina-cristal-abatible.jpg",
  },
  {
    title: "Protección Climática",
    desc: "Barrera eficaz contra viento, lluvia y frío sin renunciar a la luz natural.",
    image: "/images/cortinas/cortina-cristalera.jpg",
  },
  {
    title: "Aislamiento Acústico",
    desc: "Reduce significativamente el ruido exterior para mayor confort.",
    image: "/images/cortinas/cortina-cristal-2x.png",
  },
];

const steps = [
  {
    num: "01",
    title: "Medición",
    desc: "Visitamos tu espacio y tomamos medidas exactas.",
  },
  {
    num: "02",
    title: "Fabricación",
    desc: "Cristal templado de seguridad fabricado a medida.",
  },
  {
    num: "03",
    title: "Instalación",
    desc: "Montaje profesional con acabado impecable.",
  },
];

export function CortinasPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <img src={url("/images/cortinas/cortina-cristal-2024.jpg")} alt="Cortinas de cristal en terraza moderna" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <FadeIn>
                <span className="inline-block font-mono tracking-[0.2em] text-gold text-sm mb-6">
                  CORTINAS DE CRISTAL
                </span>
              </FadeIn>
              <AnimatedHeading
                text="Cierra Tu Terraza Sin Perder las Vistas"
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                  Paneles de cristal templado plegables y sin perfiles verticales.
                  M&aacute;xima protecci&oacute;n contra viento y lluvia manteniendo la
                  luminosidad y las vistas abiertas.
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
                  text="Ventajas del Cristal Templado"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                  <FadeIn key={feature.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      <img src={url(feature.image)} alt={feature.title} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
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

          {/* How It Works */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text="¿Cómo Funcionan?"
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid md:grid-cols-3 gap-10">
                {steps.map((step, i) => (
                  <FadeIn key={step.num} delay={i * 0.15}>
                    <div className="relative text-center">
                      <span className="block font-mono text-6xl md:text-7xl text-terracotta/15 font-bold leading-none mb-4">
                        {step.num}
                      </span>
                      <h3 className="font-serif text-xl text-navy mb-3">
                        {step.title}
                      </h3>
                      <p className="text-text-muted">{step.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection faqs={cortinasFaqs} />

          {/* Service Area */}
          <ServiceAreaSection serviceName="Instalamos cortinas de cristal" />

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Disfruta de tu terraza los 365 d&iacute;as del a&ntilde;o
              </h2>
              <p className="text-lg text-white/70 mb-10">
                Cristal templado de seguridad, instalaci&oacute;n profesional y
                garant&iacute;a completa. Pide tu presupuesto sin compromiso.
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
