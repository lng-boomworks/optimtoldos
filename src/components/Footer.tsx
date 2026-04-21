import { url, localizedUrl } from "../utils/paths";
import { t, type Locale } from "../i18n/index";
import { slugMap, type PageId } from "../i18n/slugs";

interface FooterProps {
  locale?: Locale;
}

function footerPath(pageId: PageId, locale: Locale): string {
  const slug = slugMap[pageId][locale];
  return localizedUrl(slug ? `/${slug}` : '/', locale);
}

export function Footer({ locale = 'es' }: FooterProps) {
  const productLinks = [
    { name: t(locale, 'nav.awnings'), path: footerPath('awnings', locale) },
    { name: t(locale, 'nav.pergolas'), path: footerPath('pergolas', locale) },
    { name: t(locale, 'nav.curtains'), path: footerPath('glass-curtains', locale) },
    { name: t(locale, 'nav.sails'), path: footerPath('shade-sails', locale) },
    { name: t(locale, 'nav.windows'), path: footerPath('pvc-windows', locale) },
  ];

  const companyLinks = [
    { name: t(locale, 'footer.about'), path: footerPath('about-us', locale) },
    { name: t(locale, 'footer.gallery'), path: footerPath('gallery', locale) },
    { name: t(locale, 'footer.contact'), path: footerPath('contact', locale) },
    { name: t(locale, 'footer.blog'), path: footerPath('blog', locale) },
    { name: t(locale, 'footer.quote'), path: footerPath('quote', locale) },
  ];

  const legalLinks = [
    { name: t(locale, 'footer.legal_notice'), path: footerPath('legal-notice', locale) },
    { name: t(locale, 'footer.privacy'), path: footerPath('privacy-policy', locale) },
    { name: t(locale, 'footer.cookies'), path: footerPath('cookie-policy', locale) },
  ];

  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href={localizedUrl("/", locale)} className="inline-block mb-5">
              <img
                src={url("/images/logos/logo-footer.png")}
                alt="OptimToldos"
                loading="lazy"
                decoding="async"
                className="h-10 w-auto"
              />
            </a>
            <p className="text-text-muted text-[15px] leading-relaxed max-w-sm mb-5">
              {t(locale, 'footer.description')}
            </p>
            <div className="flex flex-col gap-1.5 text-sm text-text-muted">
              <span>{t(locale, 'footer.location')}</span>
              <a
                href="mailto:info@optimtoldos.com"
                className="hover:text-terracotta transition-colors"
              >
                info@optimtoldos.com
              </a>
              <a
                href="tel:+34603572348"
                className="hover:text-terracotta transition-colors"
              >
                +34 603 572 348
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-navy font-medium text-sm uppercase tracking-wide mb-4">
              {t(locale, 'footer.products_heading')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-text-muted text-[15px] hover:text-terracotta transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-navy font-medium text-sm uppercase tracking-wide mb-4">
              {t(locale, 'footer.company_heading')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-text-muted text-[15px] hover:text-terracotta transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col gap-4">
          <nav aria-label={t(locale, 'footer.legal_heading')} className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="text-text-muted text-sm hover:text-terracotta transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-text-muted text-sm">
              &copy; 2026 OptimToldos. {t(locale, 'footer.copyright')}
            </p>
            <p className="text-text-muted/60 text-xs">
              {t(locale, 'footer.region')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
