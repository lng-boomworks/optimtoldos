import type { Locale } from "./index";
import { locales } from "./index";
import { slugMap, type PageId } from "./slugs";

const SITE = "https://optimtoldos.com";

export interface AlternateUrl {
  locale: Locale;
  href: string;
}

/** Get hreflang alternate URLs for a given page */
export function getAlternateUrls(pageId: PageId): AlternateUrl[] {
  return locales.map((locale) => {
    const slug = slugMap[pageId][locale];
    const prefix = locale === "es" ? "" : `/${locale}`;
    const path = slug ? `${prefix}/${slug}` : `${prefix}/`;
    return { locale, href: `${SITE}${path}` };
  });
}

/** Get hreflang alternate URLs for a blog post */
export function getBlogAlternateUrls(
  esSlug: string,
  enSlug?: string
): AlternateUrl[] {
  const urls: AlternateUrl[] = [
    { locale: "es", href: `${SITE}/blog/${esSlug}` },
  ];
  if (enSlug) {
    urls.push({ locale: "en", href: `${SITE}/en/blog/${enSlug}` });
  }
  return urls;
}
