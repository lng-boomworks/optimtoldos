import { SERVICE_CITIES } from "../data/cities";
import { url } from "../utils/paths";

interface ServiceAreaSectionProps {
  serviceName: string;
}

export function ServiceAreaSection({ serviceName }: ServiceAreaSectionProps) {
  return (
    <section className="bg-sand py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
          {serviceName} en toda la provincia de Alicante
        </h2>
        <p className="text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Nuestro equipo de instaladores profesionales da servicio desde Dénia hasta
          Torrevieja, incluyendo el área metropolitana de Alicante y el interior de la
          provincia. Presupuesto gratuito y sin compromiso en tu zona.
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
          href={url("/presupuesto")}
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold bg-gold text-navy hover:bg-gold-light transition-all"
        >
          Solicitar Presupuesto en Tu Zona
        </a>
      </div>
    </section>
  );
}
