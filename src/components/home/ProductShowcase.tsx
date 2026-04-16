import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { SunRay } from "../SunRay";
import { url } from "../../utils/paths";

const products = [
  {
    title: "Toldos",
    description:
      "Toldos extensibles, verticales y de punto para terrazas, balcones y comercios.",
    image: url("/images/gallery/toldo-cofre-extensible.jpg"),
    href: url("/toldos"),
  },
  {
    title: "Pérgolas Bioclimáticas",
    description:
      "Pérgolas de aluminio con lamas orientables, motorización y LED integrado.",
    image: url("/images/pergolas/pergola-bioclimatica.jpg"),
    href: url("/pergolas"),
  },
  {
    title: "Cortinas de Cristal",
    description:
      "Paneles de cristal plegables sin perfiles para cerrar terrazas sin perder vistas.",
    image: url("/images/cortinas/cortina-cristal-1.jpg"),
    href: url("/cortinas-de-cristal"),
  },
  {
    title: "Velas de Sombra",
    description:
      "Velas tensadas de diseño arquitectónico para protección UV con estilo.",
    image: url("/images/velas/vela-tensada.jpg"),
    href: url("/velas-de-sombra"),
  },
  {
    title: "Ventanas y Puertas PVC",
    description:
      "Sistemas de PVC de alta eficiencia energética: correderas, abatibles y oscilobatientes.",
    image: url("/images/ventanas/ventanas-cortizo.jpg"),
    href: url("/ventanas-pvc"),
  },
];

export function ProductShowcase() {
  return (
    <section id="productos" className="section-sand py-24">
      <SunRay className="mb-8" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedHeading
            text="Nuestras Soluciones"
            tag="h2"
            className="mb-4"
          />
          <FadeIn delay={0.2} direction="up">
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Productos de protecci&oacute;n solar y vida exterior
              dise&ntilde;ados a tu medida
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <FadeIn key={product.title} delay={i * 0.1} direction="up">
              <a
                href={product.href}
                className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Image area */}
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-2">{product.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-3">
                    {product.description}
                  </p>
                  <span className="text-terracotta text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                    Ver m&aacute;s
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
