import { localizedUrl } from "../utils/paths";
import { t, type Locale } from "../i18n/index";
import { slugMap } from "../i18n/slugs";

interface ServiceAreaSectionProps {
  serviceName: string;
  locale?: Locale;
  /** Anchor slugs on the Service Areas page to link as teaser chips. */
  teaserLocations?: string[];
}

// Map anchor slug → display name for the teaser chips. Matches the Service
// Areas page LOCATIONS list, using the 20 brief locations where relevant.
const LOCATION_DISPLAY: Record<string, string> = {
  torrevieja: "Torrevieja",
  "orihuela-costa": "Orihuela Costa",
  elche: "Elche",
  alicante: "Alicante",
  benidorm: "Benidorm",
  "santa-pola": "Santa Pola",
  "guardamar-del-segura": "Guardamar del Segura",
  "cabo-roig": "Cabo Roig",
  "la-zenia": "La Zenia",
  villamartin: "Villamartín",
  "gran-alacant": "Gran Alacant",
  "ciudad-quesada": "Ciudad Quesada",
};

export function ServiceAreaSection({
  serviceName,
  locale = 'es',
  teaserLocations,
}: ServiceAreaSectionProps) {
  const heading = t(locale, 'serviceArea.heading').replace('{serviceName}', serviceName);
  const serviceAreasPath = localizedUrl(`/${slugMap["service-areas"][locale]}`, locale);
  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);

  // Use teaserLocations if given; otherwise take 6 widely-relevant anchors.
  const chipSlugs = teaserLocations ?? [
    "torrevieja",
    "orihuela-costa",
    "elche",
    "alicante",
    "benidorm",
    "guardamar-del-segura",
  ];

  const chips = chipSlugs
    .map((slug) => ({ slug, name: LOCATION_DISPLAY[slug] }))
    .filter((c) => c.name);

  return (
    <section className="bg-sand py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
          {heading}
        </h2>
        <p className="text-text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          {t(locale, 'serviceArea.description')}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {chips.map((city) => (
            <a
              key={city.slug}
              href={`${serviceAreasPath}#${city.slug}`}
              className="inline-block bg-white px-4 py-2 rounded-full text-sm text-navy border border-border hover:bg-terracotta hover:text-white hover:border-terracotta transition-colors"
            >
              {city.name}
            </a>
          ))}
        </div>
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

