import arTranslations from "../locales/ar/common.json";
import enTranslations from "../locales/en/common.json";

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

export type ILocale = "en" | "ar";

export const useTranslation = (locale?: "en" | "ar") => {
  return translations[locale ?? "en"];
};
