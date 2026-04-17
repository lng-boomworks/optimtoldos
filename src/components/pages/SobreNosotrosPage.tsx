import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";

const valueCount = 4;
const certCount = 5;
const teamCount = 3;

const cityKeys = [
  'cities.alicante', 'cities.elche', 'cities.torrevieja', 'cities.benidorm',
  'cities.santa_pola', 'cities.orihuela', 'cities.guardamar', 'cities.denia',
  'cities.javea', 'cities.altea', 'cities.calpe',
] as const;

export function SobreNosotrosPage({ locale = 'es' }: { locale?: Locale }) {
  const values = Array.from({ length: valueCount }, (_, i) => ({
    title: t(locale, `about.values.${i + 1}.title` as any),
    desc: t(locale, `about.values.${i + 1}.description` as any),
  }));

  const certifications = Array.from({ length: certCount }, (_, i) =>
    t(locale, `about.certifications.${i + 1}` as any)
  );

  const team = Array.from({ length: teamCount }, (_, i) => ({
    name: t(locale, `about.team.${i + 1}.name` as any),
    role: t(locale, `about.team.${i + 1}.role` as any),
  }));

  const areas = cityKeys.map((key) => t(locale, key as any));

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-navy via-navy-dark to-navy-light overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={t(locale, 'about.hero.heading')}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                  {t(locale, 'about.hero.description')}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Story */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'about.story.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <FadeIn>
                  <div className="space-y-6">
                    <p className="text-text-muted leading-relaxed">
                      {t(locale, 'about.story.paragraph1')}
                    </p>
                    <p className="text-text-muted leading-relaxed">
                      {t(locale, 'about.story.paragraph2')}
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-terracotta-pale via-sand to-gold-pale" />
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'about.values.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((v, i) => (
                  <FadeIn key={v.title} delay={i * 0.1}>
                    <div className="bg-white rounded-2xl p-8 h-full text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="w-12 h-12 rounded-full bg-terracotta-pale flex items-center justify-center mx-auto mb-5">
                        <div className="w-3 h-3 rounded-full bg-terracotta" />
                      </div>
                      <h3 className="font-serif text-xl text-navy mb-3">
                        {v.title}
                      </h3>
                      <p className="text-text-muted leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'about.certifications.heading')}
                  tag="h2"
                  className="text-navy"
                />
                <p className="text-text-muted mt-4 max-w-2xl mx-auto">
                  {t(locale, 'about.certifications.description')}
                </p>
              </FadeIn>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {certifications.map((cert, i) => (
                  <FadeIn key={cert} delay={i * 0.08}>
                    <div className="bg-sand-light border border-sand rounded-xl px-5 py-4 text-center h-full flex items-center justify-center">
                      <span className="text-sm font-medium text-navy">
                        {cert}
                      </span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* Service Area */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'about.serviceArea.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <FadeIn>
                  <p className="text-text-muted leading-relaxed mb-8">
                    {t(locale, 'about.serviceArea.description')}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {areas.map((area) => (
                      <span
                        key={area}
                        className="bg-sand-light text-text-body px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="aspect-[4/3] rounded-2xl bg-sand flex items-center justify-center">
                    <span className="text-text-muted text-lg">
                      {t(locale, 'about.serviceArea.map_placeholder')}
                    </span>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="bg-sand-light py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn className="text-center mb-16">
                <AnimatedHeading
                  text={t(locale, 'about.team.heading')}
                  tag="h2"
                  className="text-navy"
                />
              </FadeIn>
              <div className="grid sm:grid-cols-3 gap-8">
                {team.map((member, i) => (
                  <FadeIn key={member.name} delay={i * 0.1}>
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-terracotta-pale via-sand to-gold-pale mx-auto mb-5" />
                      <h3 className="font-serif text-lg text-navy mb-1">
                        {member.name}
                      </h3>
                      <p className="text-text-muted text-sm">{member.role}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, 'about.cta.heading')}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, 'about.cta.description')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="gold" href={localizedUrl("/contacto", locale)}>
                  {t(locale, 'about.cta.contact')}
                </Button>
                <Button variant="outline-white" href={localizedUrl("/presupuesto", locale)}>
                  {t(locale, 'about.cta.quote')}
                </Button>
              </div>
            </FadeIn>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
