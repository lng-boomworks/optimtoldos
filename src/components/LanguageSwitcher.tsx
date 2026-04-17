import type { Locale } from "../i18n/index";

interface AlternateUrl {
  locale: string;
  href: string;
}

interface LanguageSwitcherProps {
  currentLocale: Locale;
  alternates: AlternateUrl[];
  className?: string;
}

export function LanguageSwitcher({ currentLocale, alternates, className = "" }: LanguageSwitcherProps) {
  const otherLocale = alternates.find((a) => a.locale !== currentLocale);
  if (!otherLocale) return null;

  return (
    <a
      href={otherLocale.href}
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
