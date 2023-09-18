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
          legal_information: 'chat.znueni.app may produce inaccurate information about people, places, or facts.',
          ok: 'Ok',
          placeholder_api_key: 'Paste your OpenAI API Key here',
          placeholder_chat: 'Ask something about the znueni!',
          submit: 'Chat',
          welcome: 'Welcome to the chat.znueni.app! Happy to help you out.',
          copy_source_code: 'copy source code',
          placeholder_name: 'Full name of the role. i.e. Mia Wallace',
          placeholder_origin: 'Proper origin of the role. i.e. from the movie Pulp Fiction',
          placeholder_context: 'Additional context in whiche the role should be primed',
          name: 'Name',
          origin: 'Origin',
          context: 'Additional Context',
          preview: 'Preview',
          add: 'Add or Update',
        }
      },
      de: {
        translation: {
        }
      }
    }
  });

export default i18n;