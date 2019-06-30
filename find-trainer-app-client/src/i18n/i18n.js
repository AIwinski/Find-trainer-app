import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import pl from "./locales/pl/translation.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: true,

        interpolation: {
            escapeValue: false
        },

        resources: {
            en: {
                translation: en
            },
            pl: {
                translation: pl
            }
        },

        wait: true
    });

export default i18n;
