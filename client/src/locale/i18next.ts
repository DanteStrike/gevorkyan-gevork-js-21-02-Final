import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import RU from './ru';
import EN from './en';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    fallbackLng: 'ru',
    resources: {
      en: {
        translation: EN,
      },
      ru: {
        translation: RU,
      },
    },
  });

export default i18next;
