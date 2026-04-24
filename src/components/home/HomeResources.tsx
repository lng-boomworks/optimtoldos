import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { localizedUrl } from "../../utils/paths";
import { t, type Locale } from "../../i18n/index";
import { slugMap, type PageId } from "../../i18n/slugs";

// Representative locations surfaced on the homepage. Each chip deep-links to
// the matching Service Areas anchor.
const FEATURED_LOCATIONS: { slug: string; display: string }[] = [
  { slug: "torrevieja", display: "Torrevieja" },
  { slug: "orihuela-costa", display: "Orihuela Costa" },
  { slug: "elche", display: "Elche" },
  { slug: "alicante", display: "Alicante" },
  { slug: "benidorm", display: "Benidorm" },
  { slug: "santa-pola", display: "Santa Pola" },
  { slug: "cabo-roig", display: "Cabo Roig" },
  { slug: "guardamar-del-segura", display: "Guardamar del Segura" },
];

// Pillars to surface — the four Phase 2 guides. Titles come from the i18n
// footer keys so they stay consistent with the footer Resources column.
const FEATURED_GUIDES: {
  pageId: PageId;
  titleKey: string;
  blurbKey: string;
}[] = [
  {
    pageId: "licence-guide",
    titleKey: "footer.licence_guide",
    blurbKey: "pergolas.licence_banner.body",
  },
  {
    pageId: "bioclimatic-vs-aluminium",
    titleKey: "footer.bioclimatic_vs_aluminium",
    blurbKey: "bioVsAlu.hero.description",
  },
  {
    pageId: "awning-guide",
    titleKey: "footer.awning_guide",
    blurbKey: "awningGuide.hero.description",
  },
  {
    pageId: "glass-curtains-guide",
    titleKey: "footer.curtains_guide",
    blurbKey: "curtainsGuide.hero.description",
  },
];

export function HomeResources({ locale = 'es' }: { locale?: Locale }) {
  const serviceAreasPath = localizedUrl(
    `/${slugMap["service-areas"][locale]}`,
    locale
  );

  return (
    <section className="bg-sand-light py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Where we work */}
        <div>
          <FadeIn className="text-center mb-8">
            <AnimatedHeading
              text={t(locale, 'home.resources.areas.heading')}
              tag="h2"
              className="text-navy"
            />
            <p className="mt-4 text-text-muted max-w-2xl mx-auto">
              {t(locale, 'home.resources.areas.description')}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {FEATURED_LOCATIONS.map((loc) => (
                <a
                  key={loc.slug}
                  href={`${serviceAreasPath}#${loc.slug}`}
                  className="inline-block bg-white px-4 py-2 rounded-full text-sm text-navy border border-border hover:bg-terracotta hover:text-white hover:border-terracotta transition-colors"
                >
                  {loc.display}
                </a>
              ))}
            </div>
            <div className="text-center">
              <a
                href={serviceAreasPath}
                className="text-terracotta hover:underline font-medium text-sm"
              >
                {t(locale, 'home.resources.areas.see_all')} →
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Featured guides */}
        <div>
          <FadeIn className="text-center mb-8">
            <AnimatedHeading
              text={t(locale, 'home.resources.guides.heading')}
              tag="h2"
              className="text-navy"
            />
            <p className="mt-4 text-text-muted max-w-2xl mx-auto">
              {t(locale, 'home.resources.guides.description')}
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {FEATURED_GUIDES.map((guide, i) => {
              const href = localizedUrl(`/${slugMap[guide.pageId][locale]}`, locale);
              const title = t(locale, guide.titleKey as any);
              const blurb = t(locale, guide.blurbKey as any);
              return (
                <FadeIn key={guide.pageId} delay={i * 0.08}>
                  <a
                    href={href}
                    className="block bg-white rounded-2xl p-6 h-full hover:shadow-md transition-shadow border border-border"
                  >
                    <h3 className="font-serif text-lg text-navy mb-2">
                      {title} →
                    </h3>
                    <p className="text-text-body leading-relaxed text-sm">
                      {blurb}
                    </p>
                  </a>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
