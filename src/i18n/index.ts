import es from "./locales/es";
import en from "./locales/en";

export type Locale = "es" | "en";
export type TranslationKey = keyof typeof es;

const translations: Record<Locale, Record<TranslationKey, string>> = { es, en };

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations.es[key] ?? key;
}

export function getTranslations(locale: Locale): Record<TranslationKey, string> {
  return translations[locale];
}

export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

export const localeLabels: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export const ogLocales: Record<Locale, string> = {
  es: "es_ES",
  en: "en_GB",
};

export const dateLocales: Record<Locale, string> = {
  es: "es-ES",
  en: "en-GB",
};
