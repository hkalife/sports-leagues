import { useContext } from 'react';
import { LanguageContext } from '../i18n/languageContext';

export function useLanguage() {
  return useContext(LanguageContext);
}
