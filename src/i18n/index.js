import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationHE from './locales/he';
import translationEN from './locales/en';
import { languages } from '../constants/languages';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      he: { translation: translationHE },
      en: { translation: translationEN }
    },
    fallbackLng: languages.he,

    interpolation: { escapeValue: false }
  });

export default i18n;
