export const locales = ["en", "es", "uk", "ro"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  uk: "Українська",
  ro: "Română",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
