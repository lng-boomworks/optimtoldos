import { FadeIn } from "../FadeIn";
import { t, type Locale } from "../../i18n/index";

interface TrustStripProps {
  locale?: Locale;
}

export function TrustStrip({ locale = 'es' }: TrustStripProps) {
  const stats = [
    { number: t(locale, 'home.trust.1.number'), label: t(locale, 'home.trust.1.label') },
    { number: t(locale, 'home.trust.2.number'), label: t(locale, 'home.trust.2.label') },
    { number: t(locale, 'home.trust.3.number'), label: t(locale, 'home.trust.3.label') },
  ];

  return (
    <section className="bg-white border-t border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          {stats.map((stat, i) => (
            <FadeIn key={stat.number} delay={i * 0.15} direction="up">
              <p className="font-mono text-4xl font-medium text-terracotta mb-1">
                {stat.number}
              </p>
              <p className="text-sm text-muted">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
