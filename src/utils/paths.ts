import type { Locale } from "../i18n/index";

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export function url(path: string): string {
  if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  if (BASE && path.startsWith(BASE)) {
    return path;
  }
  return `${BASE}${path}`;
}

/** Build a locale-aware URL with base path */
export function localizedUrl(path: string, locale: Locale = 'es'): string {
  if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  const prefix = locale === 'es' ? '' : `/${locale}`;
  return url(`${prefix}${path}`);
}
