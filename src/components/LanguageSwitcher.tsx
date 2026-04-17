import { useMemo } from "react";
import type { Locale } from "../i18n/index";
import { slugMap, type PageId } from "../i18n/slugs";
import { url } from "../utils/paths";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

const BASE = (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL || "/").replace(/\/$/, "");

/** Build a map from current path → other locale path */
function buildPathMap(): Map<string, string> {
  const map = new Map<string, string>();

  for (const [pageId, slugs] of Object.entries(slugMap)) {
    const esPath = slugs.es ? `${BASE}/${slugs.es}` : `${BASE}/`;
    const enPath = slugs.en ? `${BASE}/en/${slugs.en}` : `${BASE}/en/`;

    // ES → EN
    map.set(esPath, enPath);
    map.set(esPath + "/", enPath);
    // EN → ES
    map.set(enPath, esPath);
    map.set(enPath + "/", esPath);
  }

  // Blog index
  map.set(`${BASE}/blog`, `${BASE}/en/blog`);
  map.set(`${BASE}/blog/`, `${BASE}/en/blog`);
  map.set(`${BASE}/en/blog`, `${BASE}/blog`);
  map.set(`${BASE}/en/blog/`, `${BASE}/blog`);

  return map;
}

const pathMap = buildPathMap();

function getAlternatePath(currentPath: string, currentLocale: Locale): string {
  // Exact match
  const exact = pathMap.get(currentPath) || pathMap.get(currentPath.replace(/\/$/, ""));
  if (exact) return exact;

  // Blog post: swap /blog/slug ↔ /en/blog/slug (keep same slug)
  if (currentLocale === "es" && currentPath.startsWith(`${BASE}/blog/`)) {
    return currentPath.replace(`${BASE}/blog/`, `${BASE}/en/blog/`);
  }
  if (currentLocale === "en" && currentPath.startsWith(`${BASE}/en/blog/`)) {
    return currentPath.replace(`${BASE}/en/blog/`, `${BASE}/blog/`);
  }

  // Fallback: other locale's home
  return currentLocale === "es" ? `${BASE}/en/` : `${BASE}/`;
}

export function LanguageSwitcher({ currentLocale, className = "" }: LanguageSwitcherProps) {
  const href = useMemo(() => {
    if (typeof window === "undefined") {
      return currentLocale === "es" ? `${BASE}/en/` : `${BASE}/`;
    }
    return getAlternatePath(window.location.pathname, currentLocale);
  }, [currentLocale]);

  return (
    <a
      href={href}
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
