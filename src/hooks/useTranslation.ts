import { useLanguage } from './useLanguage';
import { translations } from '../i18n/translations';
import type { TranslationKey } from '../i18n/translations';

export function useTranslation() {
  const { language, setLanguage } = useLanguage();

  function t(
    key: TranslationKey,
    params?: Record<string, string | number>,
  ): string {
    let text: string =
      translations[language][key] ?? translations.en[key] ?? key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  }

  return { t, language, setLanguage };
}
