import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { english } from "./en";
import { bengali } from "./bn";
import { arabic } from "./ar";
import { spain } from "./es";

const resources = {
  en: {
    translation: english,
  },
  es: {
    translation: spain,
  },
};

const savedLanguage =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("language-setting")) || "es"
    : "es";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;