import { useContext } from 'react';
import { LanguageContext } from '../i18n/LanguageContext';

export function useLanguage() {
  return useContext(LanguageContext);
}
