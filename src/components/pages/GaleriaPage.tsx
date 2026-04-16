import { useState } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { url } from "../../utils/paths";

type Category = "Todos" | "Toldos" | "Pérgolas" | "Cortinas de Cristal" | "Velas" | "Ventanas PVC";

const categories: Category[] = [
  "Todos",
  "Toldos",
  "Pérgolas",
  "Cortinas de Cristal",
  "Velas",
  "Ventanas PVC",
];

const projects: { title: string; category: Category; image: string }[] = [
  { title: "Toldo extensible terraza", category: "Toldos", image: "/images/gallery/toldo-cofre-extensible.jpg" },
  { title: "Toldo brazo articulado", category: "Toldos", image: "/images/gallery/toldo-brazos-invisibles.jpg" },
  { title: "Toldo punto recto", category: "Toldos", image: "/images/gallery/toldo-punto-recto.jpg" },
  { title: "Toldo monobloc", category: "Toldos", image: "/images/gallery/toldo-monobloc.jpg" },
  { title: "Toldo de ventana", category: "Toldos", image: "/images/gallery/toldo-ventana.jpg" },
  { title: "Pérgola bioclimática jardín", category: "Pérgolas", image: "/images/pergolas/pergola-bioclimatica.jpg" },
  { title: "Pérgola terraza restaurante", category: "Pérgolas", image: "/images/pergolas/pergola-restaurante.png" },
  { title: "Pérgola Costa Blanca", category: "Pérgolas", image: "/images/pergolas/pergola-costablanca.jpg" },
  { title: "Cortina de cristal panorámica", category: "Cortinas de Cristal", image: "/images/cortinas/cortina-cristal-1.jpg" },
  { title: "Cortina de cristal abatible", category: "Cortinas de Cristal", image: "/images/cortinas/cortina-cristal-abatible.jpg" },
  { title: "Cerramiento cristal terraza", category: "Cortinas de Cristal", image: "/images/cortinas/cortina-cristalera.jpg" },
  { title: "Vela triangular", category: "Velas", image: "/images/velas/vela-1.jpg" },
  { title: "Vela rectangular jardín", category: "Velas", image: "/images/velas/vela-rectangular.jpg" },
  { title: "Vela de forma libre", category: "Velas", image: "/images/velas/vela-freeform.jpg" },
  { title: "Ventanas PVC Cortizo", category: "Ventanas PVC", image: "/images/ventanas/ventanas-cortizo.jpg" },
  { title: "Ventanas PVC Aluplast", category: "Ventanas PVC", image: "/images/ventanas/ventanas-aluplast.jpg" },
];

export function GaleriaPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("Todos");

  const filtered =
    activeFilter === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="bg-navy pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <AnimatedHeading
                text="Galería de Proyectos"
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Descubre algunos de nuestros trabajos m&aacute;s recientes en
                  la provincia de Alicante
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Gallery */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Filters */}
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeFilter === cat
                        ? "bg-terracotta text-white"
                        : "bg-sand text-text-muted hover:bg-terracotta-pale"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project, i) => (
                  <FadeIn key={`${activeFilter}-${project.title}`} delay={i * 0.05}>
                    <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
                      <img
                        src={url(project.image)}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                        <div className="p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <h3 className="font-serif text-lg text-white mb-1">
                            {project.title}
                          </h3>
                          <span className="text-white/70 text-sm">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-sand py-20">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-navy mb-6">
                &iquest;Te gusta lo que ves?
              </h2>
              <p className="text-lg text-text-muted mb-10">
                Podemos hacer lo mismo por tu espacio. Pide tu presupuesto sin
                compromiso.
              </p>
              <Button variant="primary" href="/presupuesto">
                Solicitar Presupuesto
              </Button>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
