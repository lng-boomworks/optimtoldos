import { AnimatedHeading } from "../AnimatedHeading";
import { FadeIn } from "../FadeIn";
import { t, type Locale } from "../../i18n/index";

interface WhyChooseUsProps {
  locale?: Locale;
}

export function WhyChooseUs({ locale = 'es' }: WhyChooseUsProps) {
  const features = [
    {
      icon: "M",
      color: "bg-terracotta/10 text-terracotta",
      title: t(locale, 'home.why.1.title'),
      description: t(locale, 'home.why.1.description'),
    },
    {
      icon: "I",
      color: "bg-olive/10 text-olive",
      title: t(locale, 'home.why.2.title'),
      description: t(locale, 'home.why.2.description'),
    },
    {
      icon: "G",
      color: "bg-gold/10 text-gold",
      title: t(locale, 'home.why.3.title'),
      description: t(locale, 'home.why.3.description'),
    },
    {
      icon: "E",
      color: "bg-navy/10 text-navy",
      title: t(locale, 'home.why.4.title'),
      description: t(locale, 'home.why.4.description'),
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedHeading
            text={t(locale, 'home.why.heading')}
            tag="h2"
          />
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 max-w-4xl mx-auto">
          {features.map((feat, i) => (
            <FadeIn key={feat.title} delay={i * 0.12} direction="up">
              <div className="flex gap-5">
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-full ${feat.color} flex items-center justify-center font-serif text-xl`}
                >
                  {feat.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2">{feat.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
