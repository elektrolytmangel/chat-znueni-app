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
          copy_source_code: 'copy source code',
          placeholder_name: 'Full name of the role. i.e. Mia Wallace',
          placeholder_origin: 'Proper origin of the role. i.e. from the movie Pulp Fiction',
          placeholder_context: 'Additional context in whiche the role should be primed',
          name: 'Name',
          origin: 'Origin',
          context: 'Additional Context',
          preview: 'Preview',
          add: 'Add or Update',
          is_thinking: 'is thinking...',
          card_role_title: 'Roles',
          card_role_description:
            'Roles are used to prime the AI. There are 3 predefined roles with specific abilities and restrictions available.',
          card_custom_role_title: 'Custom Roles',
          card_custom_role_description:
            'Create your own role to prime the AI as you need it. This can be a character from a movie or a person from history or whoever has an wikipedia entry.',
          card_custom_api_key_title: 'OpenAI API Key',
          card_custom_api_key_description:
            'Add your own OpenAI API Key to use the full power of the application. You can get one for free at https://platform.openai.com/.',
        },
      },
      de: {
        translation: {},
      },
    },
  });

export default i18n;
