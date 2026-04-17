import { useState } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";

type CategoryKey = "all" | "awnings" | "pergolas" | "curtains" | "sails" | "windows";

const categoryKeys: CategoryKey[] = [
  "all",
  "awnings",
  "pergolas",
  "curtains",
  "sails",
  "windows",
];

const projectCount = 16;

const projectImages = [
  "/images/gallery/toldo-cofre-extensible.jpg",
  "/images/gallery/toldo-brazos-invisibles.jpg",
  "/images/gallery/toldo-punto-recto.jpg",
  "/images/gallery/toldo-monobloc.jpg",
  "/images/gallery/toldo-ventana.jpg",
  "/images/pergolas/pergola-bioclimatica.jpg",
  "/images/pergolas/pergola-restaurante.png",
  "/images/pergolas/pergola-costablanca.jpg",
  "/images/cortinas/cortina-cristal-1.jpg",
  "/images/cortinas/cortina-cristal-abatible.jpg",
  "/images/cortinas/cortina-cristalera.jpg",
  "/images/velas/vela-1.jpg",
  "/images/velas/vela-rectangular.jpg",
  "/images/velas/vela-freeform.jpg",
  "/images/ventanas/ventanas-cortizo.jpg",
  "/images/ventanas/ventanas-aluplast.jpg",
];

const projectCategoryKeys: CategoryKey[] = [
  "awnings", "awnings", "awnings", "awnings", "awnings",
  "pergolas", "pergolas", "pergolas",
  "curtains", "curtains", "curtains",
  "sails", "sails", "sails",
  "windows", "windows",
];

export function GaleriaPage({ locale = 'es' }: { locale?: Locale }) {
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("all");

  const categories = categoryKeys.map((key) => ({
    key,
    label: t(locale, `gallery.filter.${key}` as any),
  }));

  const projects = Array.from({ length: projectCount }, (_, i) => ({
    title: t(locale, `gallery.project.${i + 1}.title` as any),
    categoryKey: projectCategoryKeys[i],
    categoryLabel: t(locale, `gallery.filter.${projectCategoryKeys[i]}` as any),
    image: projectImages[i],
  }));

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.categoryKey === activeFilter);

  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="bg-navy pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <AnimatedHeading
                text={t(locale, 'gallery.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  {t(locale, 'gallery.hero.description')}
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
                    key={cat.key}
                    onClick={() => setActiveFilter(cat.key)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeFilter === cat.key
                        ? "bg-terracotta text-white"
                        : "bg-sand text-text-muted hover:bg-terracotta-pale"
                    }`}
                  >
                    {cat.label}
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
                            {project.categoryLabel}
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
                {t(locale, 'gallery.cta.heading')}
              </h2>
              <p className="text-lg text-text-muted mb-10">
                {t(locale, 'gallery.cta.description')}
              </p>
              <Button variant="primary" href={localizedUrl("/presupuesto", locale)}>
                {t(locale, 'gallery.cta.quote')}
              </Button>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
