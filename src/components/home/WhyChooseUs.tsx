import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";

const features = [
  {
    icon: "M",
    color: "bg-terracotta/10 text-terracotta",
    title: "A Medida",
    description:
      "Cada solución se diseña y fabrica según las medidas exactas de tu espacio.",
  },
  {
    icon: "I",
    color: "bg-olive/10 text-olive",
    title: "Instalación Profesional",
    description:
      "Nuestro equipo de instaladores certificados garantiza un acabado perfecto.",
  },
  {
    icon: "G",
    color: "bg-gold/10 text-gold",
    title: "Garantía Total",
    description:
      "Todos nuestros productos incluyen garantía completa de fabricante.",
  },
  {
    icon: "E",
    color: "bg-navy/10 text-navy",
    title: "Expertos Locales",
    description:
      "Conocemos el clima y las necesidades de la Costa Blanca como nadie.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedHeading
            text="¿Por Qué Elegir Optim Toldos?"
            tag="h2"
          />
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 max-w-4xl mx-auto">
          {features.map((feat, i) => (
            <FadeIn key={feat.title} delay={i * 0.12} direction="up">
              <div className="flex gap-5">
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-full ${feat.color} flex items-center justify-center font-serif text-xl`}
                >
                  {feat.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2">{feat.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
