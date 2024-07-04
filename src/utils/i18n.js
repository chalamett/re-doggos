import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    react: {
      useSuspense: true,
    },
    supported: ["en", "ukr"],
    fallbackLng: "en",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["cookie", "htmlTag"],
      caches: ["cookie"],
    },
  });

export default i18next;
