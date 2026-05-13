import * as CookieConsent from 'vanilla-cookieconsent';

/** True once the visitor has opted into the `functional` category via the
 *  vanilla-cookieconsent banner. Used by Google Maps embeds to auto-load
 *  the iframe instead of showing the in-page click-to-load fallback. */
export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return CookieConsent.acceptedCategory('functional');
  } catch {
    return false;
  }
}
