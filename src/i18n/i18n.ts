import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          cancel: 'Cancel',
          ok: 'Ok',
          placeholder_api_key: 'Paste your OpenAI API Key here',
          placeholder_chat: 'Ask something about the znueni!',
          submit: 'Chat',
          welcome: 'Welcome to the chat.znueni.app! Happy to help you out.',
          you: 'You',
        }
      },
      de: {
        translation: {
        }
      }
    }
  });

export default i18n;