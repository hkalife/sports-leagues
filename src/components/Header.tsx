import { useTranslation } from '../hooks/useTranslation';
import type { Language } from '../i18n/translations';

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Português' },
];

export function Header() {
  const { t, language, setLanguage } = useTranslation();

  return (
    <header className="bg-red-600 h-14">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between">
        <span className="text-white font-bold text-xl tracking-tight italic">
          {t('header.logo')}
        </span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="appearance-none border border-white/60 text-white text-sm font-medium pl-4 pr-8 py-1.5 rounded bg-transparent cursor-pointer outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value} className="text-gray-900">
                {l.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white text-xs">
            ▼
          </span>
        </div>
      </div>
    </header>
  );
}
