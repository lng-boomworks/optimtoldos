import { useMemo } from "react";
import type { Locale } from "../i18n/index";
import { alternateLocaleUrl } from "../data/hreflangPairs";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

const BASE = (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL || "/").replace(/\/$/, "");

/**
 * The link's href is initially server-rendered as the home page (we have no
 * URL access in SSR). [Base.astro](src/layouts/Base.astro) emits an inline
 * script after the body that selects all `[data-lang-switcher]` anchors and
 * sets their href to the precomputed alternate-locale URL — that runs during
 * HTML parse, before any user click can happen.
 *
 * The useMemo below is a defence-in-depth fallback for the (unlikely) case
 * that the inline script is bypassed: once React hydrates, useMemo recomputes
 * from `window.location.pathname` and updates the href.
 */
export function LanguageSwitcher({ currentLocale, className = "" }: LanguageSwitcherProps) {
  const href = useMemo(() => {
    if (typeof window === "undefined") {
      return currentLocale === "es" ? `${BASE}/en/` : `${BASE}/`;
    }
    return `${BASE}${alternateLocaleUrl(window.location.pathname, currentLocale)}`;
  }, [currentLocale]);

  return (
    <a
      href={href}
      data-lang-switcher
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${className}`}
      aria-label={currentLocale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span>{currentLocale === "es" ? "EN" : "ES"}</span>
    </a>
  );
}
