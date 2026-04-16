import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";

const testimonials = [
  {
    quote:
      "La pérgola bioclimática ha transformado nuestra terraza. Ahora la usamos todo el año.",
    name: "María G.",
    location: "Alicante",
    rating: 5,
    date: "2025-11-15",
  },
  {
    quote:
      "Servicio excelente de principio a fin. Los toldos quedaron perfectos y la instalación fue muy rápida.",
    name: "Antonio R.",
    location: "Elche",
    rating: 5,
    date: "2025-09-22",
  },
  {
    quote:
      "Las cortinas de cristal son lo mejor que hemos puesto en casa. Protección total sin perder las vistas.",
    name: "Carmen L.",
    location: "Santa Pola",
    rating: 5,
    date: "2025-08-10",
  },
  {
    quote:
      "Las velas de sombra le dieron un toque moderno a nuestro jardín. Muy contentos con el resultado y la atención recibida.",
    name: "Pedro M.",
    location: "Torrevieja",
    rating: 4,
    date: "2026-01-18",
  },
  {
    quote:
      "Cambiamos todas las ventanas a PVC Cortizo y se nota muchísimo en aislamiento y ruido. Trabajo impecable.",
    name: "Laura S.",
    location: "Benidorm",
    rating: 5,
    date: "2025-12-05",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-4" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? "text-gold" : "text-sand"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function formatDateSpanish(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

export function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedHeading
            text="Lo Que Dicen Nuestros Clientes"
            tag="h2"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15} direction="up">
              <div className="relative bg-sand rounded-2xl p-8 h-full">
                {/* Decorative quote mark */}
                <span
                  className="absolute top-4 left-6 font-serif text-8xl text-terracotta/10 leading-none select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <blockquote className="relative z-10">
                  <StarRating rating={t.rating} />
                  <p className="italic text-lg text-body leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer>
                    <p className="font-medium text-foreground">{t.name}</p>
                    <p className="text-sm text-muted">{t.location}</p>
                    <time
                      dateTime={t.date}
                      className="text-xs text-muted/70 mt-1 block"
                    >
                      {formatDateSpanish(t.date)}
                    </time>
                  </footer>
                </blockquote>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
