import { SERVICE_CITIES } from "../data/cities";
import { localizedUrl } from "../utils/paths";
import { t, type Locale } from "../i18n/index";
import { slugMap } from "../i18n/slugs";

interface ServiceAreaSectionProps {
  serviceName: string;
  locale?: Locale;
}

export function ServiceAreaSection({ serviceName, locale = 'es' }: ServiceAreaSectionProps) {
  const heading = t(locale, 'serviceArea.heading').replace('{serviceName}', serviceName);

  return (
    <section className="bg-sand py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
          {heading}
        </h2>
        <p className="text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          {t(locale, 'serviceArea.description')}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SERVICE_CITIES.map((city) => (
            <span
              key={city.name}
              className="inline-block bg-white px-4 py-2 rounded-full text-sm text-navy border border-border"
            >
              {city.name}
            </span>
          ))}
        </div>
        <a
          href={localizedUrl(`/${slugMap.quote[locale]}`, locale)}
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold bg-gold text-navy hover:bg-gold-light transition-all"
        >
          {t(locale, 'serviceArea.cta')}
        </a>
      </div>
    </section>
  );
}
