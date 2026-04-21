import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

interface ProjectsTeaserProps {
  locale?: Locale;
}

export function ProjectsTeaser({ locale = 'es' }: ProjectsTeaserProps) {
  const projects = [
    {
      title: t(locale, 'home.projects.1.title'),
      image: "/images/pergolas/pergola-bioclimatica.webp",
    },
    {
      title: t(locale, 'home.projects.2.title'),
      image: "/images/cortinas/cortina-cristal-panoramica.webp",
    },
    {
      title: t(locale, 'home.projects.3.title'),
      image: "/images/gallery/toldo-brazo-extensible.webp",
    },
  ];

  return (
    <section className="section-sand py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedHeading text={t(locale, 'home.projects.heading')} tag="h2" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.15} direction="up">
              <div className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={url(project.image)}
                    alt={project.title}
                    width="1200"
                    height="900"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="text-sm text-muted mt-4 text-center">{project.title}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5} direction="up">
          <div className="text-center mt-12">
            <Button variant="ghost" href={localizedUrl(`/${slugMap.gallery[locale]}`, locale)}>
              {t(locale, 'home.projects.cta')}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
