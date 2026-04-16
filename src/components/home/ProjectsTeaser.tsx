import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";

const projects = [
  {
    title: "Pérgola bioclimática en chalet, Alicante",
    gradient: "from-terracotta/15 via-gold/10 to-sand",
  },
  {
    title: "Cortinas de cristal en ático, Elche",
    gradient: "from-navy/10 via-olive/10 to-sand-light",
  },
  {
    title: "Toldos extensibles para restaurante, Santa Pola",
    gradient: "from-olive/15 via-sand to-warm-white",
  },
];

export function ProjectsTeaser() {
  return (
    <section className="section-sand py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedHeading text="Proyectos Destacados" tag="h2" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.15} direction="up">
              <div className="group rounded-2xl overflow-hidden">
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-[1.03]`}
                />
                <p className="text-sm text-muted mt-3">{project.title}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} direction="up">
          <div className="text-center mt-12">
            <Button variant="ghost" href="/galeria">
              Ver Galer&iacute;a Completa
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
