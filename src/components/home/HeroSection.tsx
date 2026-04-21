import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

interface HeroSectionProps {
  locale?: Locale;
}

export function HeroSection({ locale = 'es' }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image */}
      <img
        src={url("/images/gallery/hero-home-1280.webp")}
        srcSet={`${url("/images/gallery/hero-home-480.webp")} 480w, ${url("/images/gallery/hero-home-768.webp")} 768w, ${url("/images/gallery/hero-home-1280.webp")} 1280w, ${url("/images/gallery/hero-home.webp")} 1920w`}
        sizes="100vw"
        width="1920"
        height="1280"
        fetchPriority="high"
        alt="Toldo extensible en terraza soleada"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <FadeIn delay={0.1} direction="up">
          <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-6">
            {t(locale, 'home.hero.tagline')}
          </p>
        </FadeIn>

        <AnimatedHeading
          text={t(locale, 'home.hero.heading')}
          tag="h1"
          className="text-white max-w-3xl mb-6"
        />

        <FadeIn delay={0.4} direction="up">
          <p className="max-w-2xl text-lg text-white/80 leading-relaxed mb-10">
            {t(locale, 'home.hero.description')}
          </p>
        </FadeIn>

        <FadeIn delay={0.6} direction="up">
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" href={localizedUrl(`/${slugMap.contact[locale]}`, locale)}>
              {t(locale, 'home.hero.cta_quote')}
            </Button>
            <Button variant="outline-white" href="#productos">
              {t(locale, 'home.hero.cta_products')}
            </Button>
          </div>
        </FadeIn>
      </div>

      {/* Bottom terracotta separator */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-terracotta" />
    </section>
  );
}
