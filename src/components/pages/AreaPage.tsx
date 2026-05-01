import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { FadeIn } from "../FadeIn";
import { AnimatedHeading } from "../AnimatedHeading";
import { Button } from "../Button";
import { url, localizedUrl } from "../../utils/paths";
import { areaLandingUrl, productAreaUrl } from "../../utils/areaUrls";
import { t, type Locale } from "../../i18n/index";
import { slugMap, type PageId } from "../../i18n/slugs";
import {
  SEO_LOCATIONS_BY_SLUG,
  SEO_LOCATIONS,
  type SeoLocation,
} from "../../data/seoLocations";

/**
 * The product the EN page is emphasising (controls hero heading + intro).
 * `awnings` covers both the ES /toldos-{loc}/ pages and the EN
 * /en/awnings-{loc}/ pages — the general "all-products" area page.
 * The other variants are EN-only: /en/pergolas-X/, /en/shade-sails-X/, etc.
 */
export type AreaProductFocus =
  | "awnings"
  | "pergolas"
  | "bioclimatic-pergola"
  | "glass-curtains"
  | "shade-sails"
  | "pvc-windows";

interface Props {
  locale: Locale;
  locationSlug: string;
  focus: AreaProductFocus;
}

function productLabel(key: PageId, locale: Locale): string {
  switch (key) {
    case "awnings": return t(locale, "nav.awnings");
    case "pergolas": return t(locale, "nav.pergolas");
    case "glass-curtains": return t(locale, "nav.curtains");
    case "shade-sails": return t(locale, "nav.sails");
    case "pvc-windows": return t(locale, "nav.windows");
    default: return "";
  }
}

function relatedAreas(loc: SeoLocation): SeoLocation[] {
  return SEO_LOCATIONS
    .filter((l) => l.area === loc.area && l.slug !== loc.slug)
    .slice(0, 5);
}

export function AreaPage({ locale, locationSlug, focus }: Props) {
  const loc = SEO_LOCATIONS_BY_SLUG[locationSlug];
  if (!loc) return null;

  const name = t(locale, `serviceAreas.location.${loc.i}.name` as any);
  const body = t(locale, `serviceAreas.location.${loc.i}.body` as any);
  const quotePath = localizedUrl(`/${slugMap.quote[locale]}`, locale);
  const contactPath = localizedUrl(`/${slugMap.contact[locale]}`, locale);
  const licencePath = localizedUrl(`/${slugMap["licence-guide"][locale]}`, locale);
  const serviceAreasPath = localizedUrl(`/${slugMap["service-areas"][locale]}`, locale);
  const locationQuotePath = `${quotePath}?location=${loc.slug}`;

  // Pick hero heading + intro text based on product focus.
  const focusKeyMap: Record<AreaProductFocus, string> = {
    awnings: "areaPage.focus.awnings",
    pergolas: "areaPage.focus.pergolas",
    "bioclimatic-pergola": "areaPage.focus.bioclimatic",
    "glass-curtains": "areaPage.focus.curtains",
    "shade-sails": "areaPage.focus.shadeSails",
    "pvc-windows": "areaPage.focus.pvcWindows",
  };
  const focusHeadingKey = focusKeyMap[focus];
  const focusHeading = t(locale, `${focusHeadingKey}.heading` as any).replace(
    "{location}",
    name,
  );
  const focusIntro = t(locale, `${focusHeadingKey}.intro` as any).replace(
    "{location}",
    name,
  );

  // Hero image — placeholder until client supplies geolocated photos.
  // Uses the existing gallery hero rotation. Filename embeds location for
  // sitemap-images.xml without renaming the underlying file.
  const heroImage = url("/images/gallery/hero-home-1280.webp");

  const others = relatedAreas(loc);

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <div className="flex flex-col bg-white">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <img
              src={heroImage}
              srcSet={`${url("/images/gallery/hero-home-480.webp")} 480w, ${url("/images/gallery/hero-home-768.webp")} 768w, ${url("/images/gallery/hero-home-1280.webp")} 1280w, ${url("/images/gallery/hero-home.webp")} 1920w`}
              sizes="100vw"
              width="1920"
              height="1440"
              fetchPriority="high"
              alt={`${focusHeading} - Optim Toldos`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
              <AnimatedHeading
                text={focusHeading}
                tag="h1"
                className="text-white mb-6"
              />
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
                  {focusIntro}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Body */}
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
                  {t(locale, "areaPage.about.heading").replace("{location}", name)}
                </h2>
                <p className="text-lg text-text-body leading-relaxed">{body}</p>
                <p className="mt-6 text-text-muted">
                  <a
                    href={licencePath}
                    className="text-terracotta hover:underline font-medium"
                  >
                    {t(locale, "serviceAreas.licence_link")}
                  </a>
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Local product line-up */}
          <section className="bg-sand-light py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <h2 className="font-serif text-2xl md:text-3xl text-navy mb-3">
                  {t(locale, "areaPage.products.heading").replace(
                    "{location}",
                    name,
                  )}
                </h2>
                <p className="text-text-body mb-8 max-w-2xl">
                  {t(locale, "areaPage.products.lead")}
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {loc.products.map((p) => (
                    <a
                      key={p}
                      href={productAreaUrl(p, loc.slug, locale)}
                      className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md hover:border-terracotta transition-all"
                    >
                      <h3 className="font-serif text-xl text-navy mb-2">
                        {productLabel(p, locale)} - {name}
                      </h3>
                      <p className="text-sm text-text-muted mb-3">
                        {t(locale, `areaPage.product_blurb.${p}` as any)}
                      </p>
                      <span className="text-terracotta font-medium text-sm">
                        {t(locale, "areaPage.products.cta")} →
                      </span>
                    </a>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Why choose us — local */}
          <section className="bg-white py-16 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <h2 className="font-serif text-2xl md:text-3xl text-navy mb-6">
                  {t(locale, "areaPage.why.heading").replace("{location}", name)}
                </h2>
                <ul className="space-y-3 text-text-body">
                  <li className="flex gap-3">
                    <span className="text-terracotta font-bold">✓</span>
                    <span>{t(locale, "areaPage.why.point1")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-terracotta font-bold">✓</span>
                    <span>{t(locale, "areaPage.why.point2")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-terracotta font-bold">✓</span>
                    <span>{t(locale, "areaPage.why.point3")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-terracotta font-bold">✓</span>
                    <span>{t(locale, "areaPage.why.point4")}</span>
                  </li>
                </ul>
              </FadeIn>
            </div>
          </section>

          {/* Related areas */}
          {others.length > 0 && (
            <section className="bg-sand-light py-14 md:py-16">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                  <h2 className="font-serif text-xl md:text-2xl text-navy mb-5">
                    {t(locale, "areaPage.related.heading")}
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {others.map((o) => {
                      const otherHref = areaLandingUrl(o.slug, locale);
                      const otherName = t(
                        locale,
                        `serviceAreas.location.${o.i}.name` as any,
                      );
                      return (
                        <a
                          key={o.slug}
                          href={otherHref}
                          className="inline-block bg-white border border-border rounded-full px-4 py-1.5 text-sm text-navy hover:bg-terracotta hover:text-white hover:border-terracotta transition-colors"
                        >
                          {productLabel("awnings", locale)} - {otherName}
                        </a>
                      );
                    })}
                  </div>
                  <a
                    href={serviceAreasPath}
                    className="inline-block mt-6 text-terracotta hover:text-terracotta-dark font-medium text-sm"
                  >
                    {t(locale, "areaPage.related.all")} →
                  </a>
                </FadeIn>
              </div>
            </section>
          )}

          {/* Bottom CTA */}
          <section className="bg-navy py-20 md:py-24">
            <FadeIn className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t(locale, "areaPage.cta.heading").replace("{location}", name)}
              </h2>
              <p className="text-lg text-white/70 mb-10">
                {t(locale, "areaPage.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="gold" href={locationQuotePath}>
                  {t(locale, "areaPage.cta.button")}
                </Button>
                <Button variant="outline-white" href={contactPath}>
                  {t(locale, "areaPage.cta.contact")}
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
