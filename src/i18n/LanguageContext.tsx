import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Language } from './translations';

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
