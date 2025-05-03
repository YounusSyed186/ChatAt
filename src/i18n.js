// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Optional: Move this to a separate file for scalability
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      // Add more key-value pairs as needed
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
