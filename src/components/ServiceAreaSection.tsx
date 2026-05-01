import { localizedUrl } from "../utils/paths";
import { productAreaUrl, hasProductAreaPage } from "../utils/areaUrls";
import { t, type Locale } from "../i18n/index";
import { slugMap, type PageId } from "../i18n/slugs";
import { SEO_LOCATIONS_BY_SLUG } from "../data/seoLocations";

interface ServiceAreaSectionProps {
  serviceName: string;
  locale?: Locale;
  /** Which product hub is hosting this section. Drives chip URLs to the
   *  matching product+area page (e.g. /pergolas-torrevieja/), falling back
   *  to the area landing page when no dedicated combo exists. */
  product: PageId;
  /** SEO_LOCATIONS slugs to surface as chips. */
  teaserLocations?: string[];
}

export function ServiceAreaSection({
  serviceName,
  locale = 'es',
  product,
  teaserLocations,
}: ServiceAreaSectionProps) {
  const heading = t(locale, 'serviceArea.heading').replace('{serviceName}', serviceName);
  const serviceAreasPath = localizedUrl(`/${slugMap["service-areas"][locale]}`, locale);
  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);

  // Default chip set if caller doesn't supply one. All 6 have EN counterparts.
  const chipSlugs = teaserLocations ?? [
    "torrevieja",
    "orihuela-costa",
    "elche",
    "alicante",
    "benidorm",
    "guardamar",
  ];

  // Only render chips for slugs that have a dedicated product+area page —
  // otherwise users land on the awnings-themed area page, which is misleading
  // when the chip is shown beneath e.g. "We install glass curtains across...".
  const chips = chipSlugs
    .map((slug) => {
      const loc = SEO_LOCATIONS_BY_SLUG[slug];
      if (!loc) return null;
      if (!hasProductAreaPage(product, slug, locale)) return null;
      return { slug, name: loc.name };
    })
    .filter((c): c is { slug: string; name: string } => c !== null);

  return (
    <section className="bg-sand py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
          {heading}
        </h2>
        <p className="text-text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          {t(locale, 'serviceArea.description')}
        </p>
        {chips.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {chips.map((city) => (
              <a
                key={city.slug}
                href={productAreaUrl(product, city.slug, locale)}
                className="inline-block bg-white px-4 py-2 rounded-full text-sm text-navy border border-border hover:bg-terracotta hover:text-white hover:border-terracotta transition-colors"
              >
                {city.name}
              </a>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <a
            href={quotePath}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold bg-gold text-navy hover:bg-gold-light transition-all"
          >
            {t(locale, 'serviceArea.cta')}
          </a>
          <a
            href={serviceAreasPath}
            className="text-terracotta hover:underline font-medium text-sm"
          >
            {t(locale, 'serviceArea.see_all')} →
          </a>
        </div>
      </div>
    </section>
  );
}

