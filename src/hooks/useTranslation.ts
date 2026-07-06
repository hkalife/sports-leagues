import { useLanguage } from './useLanguage';
import { translations, sportNames } from '../i18n/translations';
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

  function tSport(sport: string): string {
    return sportNames[language][sport] ?? sport;
  }

  return { t, tSport, language, setLanguage };
}
