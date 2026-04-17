import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { t, type Locale, dateLocales } from "../../i18n/index";

interface TestimonialsProps {
  locale?: Locale;
}

const testimonials = [
  { index: 1, rating: 5, date: "2025-11-15" },
  { index: 2, rating: 5, date: "2025-09-22" },
  { index: 3, rating: 5, date: "2025-08-10" },
  { index: 4, rating: 4, date: "2026-01-18" },
  { index: 5, rating: 5, date: "2025-12-05" },
  { index: 6, rating: 5, date: "2026-02-08" },
  { index: 7, rating: 5, date: "2025-10-12" },
  { index: 8, rating: 5, date: "2026-03-01" },
  { index: 9, rating: 5, date: "2025-07-20" },
];

function StarRating({ rating, locale = 'es' }: { rating: number; locale?: Locale }) {
  const ariaLabel = t(locale, 'home.testimonials.star_rating').replace('{rating}', String(rating));
  return (
    <div className="flex gap-0.5 mb-4" aria-label={ariaLabel}>
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

function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat(dateLocales[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function Testimonials({ locale = 'es' }: TestimonialsProps) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedHeading
            text={t(locale, 'home.testimonials.heading')}
            tag="h2"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => {
            const quote = t(locale, `home.testimonials.${item.index}.quote` as any);
            const name = t(locale, `home.testimonials.${item.index}.name` as any);
            const location = t(locale, `home.testimonials.${item.index}.location` as any);
            return (
              <FadeIn key={name} delay={i * 0.15} direction="up">
                <div className="relative bg-sand rounded-2xl p-8 h-full">
                  {/* Decorative quote mark */}
                  <span
                    className="absolute top-4 left-6 font-serif text-8xl text-terracotta/10 leading-none select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>

                  <blockquote className="relative z-10">
                    <StarRating rating={item.rating} locale={locale} />
                    <p className="italic text-lg text-body leading-relaxed mb-6">
                      &ldquo;{quote}&rdquo;
                    </p>
                    <footer>
                      <p className="font-medium text-foreground">{name}</p>
                      <p className="text-sm text-muted">{location}</p>
                      <time
                        dateTime={item.date}
                        className="text-xs text-muted/70 mt-1 block"
                      >
                        {formatDate(item.date, locale)}
                      </time>
                    </footer>
                  </blockquote>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
