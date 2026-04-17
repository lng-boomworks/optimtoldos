import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { SunRay } from "../SunRay";
import { url, localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap } from "../../i18n/slugs";

interface ProductShowcaseProps {
  locale?: Locale;
}

export function ProductShowcase({ locale = 'es' }: ProductShowcaseProps) {
  const products = [
    {
      title: t(locale, 'home.products.1.title'),
      description: t(locale, 'home.products.1.description'),
      image: url("/images/gallery/toldo-cofre-extensible.jpg"),
      href: localizedUrl(`/${slugMap.awnings[locale]}`, locale),
    },
    {
      title: t(locale, 'home.products.2.title'),
      description: t(locale, 'home.products.2.description'),
      image: url("/images/pergolas/pergola-bioclimatica.jpg"),
      href: localizedUrl(`/${slugMap.pergolas[locale]}`, locale),
    },
    {
      title: t(locale, 'home.products.3.title'),
      description: t(locale, 'home.products.3.description'),
      image: url("/images/cortinas/cortina-cristal-1.jpg"),
      href: localizedUrl(`/${slugMap['glass-curtains'][locale]}`, locale),
    },
    {
      title: t(locale, 'home.products.4.title'),
      description: t(locale, 'home.products.4.description'),
      image: url("/images/velas/vela-tensada.jpg"),
      href: localizedUrl(`/${slugMap['shade-sails'][locale]}`, locale),
    },
    {
      title: t(locale, 'home.products.5.title'),
      description: t(locale, 'home.products.5.description'),
      image: url("/images/ventanas/ventanas-cortizo.jpg"),
      href: localizedUrl(`/${slugMap['pvc-windows'][locale]}`, locale),
    },
  ];

  return (
    <section id="productos" className="section-sand py-24">
      <SunRay className="mb-8" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedHeading
            text={t(locale, 'home.products.heading')}
            tag="h2"
            className="mb-4"
          />
          <FadeIn delay={0.2} direction="up">
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {t(locale, 'home.products.subheading')}
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
                    {t(locale, 'home.products.more')}
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
