import type { Locale } from "../i18n/index";
import { PATH_TO_PAIR } from "../data/hreflangPairs";

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

/** Build a locale-aware URL with base path. For known ES paths registered in
 *  HREFLANG_PAIRS, translates to the EN counterpart slug (e.g. `/presupuesto/`
 *  → `/en/free-quote/`). For unregistered paths, falls back to the bare
 *  `/{locale}` prefix so callers passing already-EN paths still work. */
export function localizedUrl(path: string, locale: Locale = 'es'): string {
  if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  if (locale === 'es') return url(path);

  const withSlash = path.endsWith('/') ? path : path + '/';
  const pair = PATH_TO_PAIR.get(withSlash) ?? PATH_TO_PAIR.get(path);
  if (pair) return url(pair.en);

  return url(`/${locale}${path}`);
}
