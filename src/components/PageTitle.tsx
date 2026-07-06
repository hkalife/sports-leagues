import { useTranslation } from '../hooks/useTranslation';

export function PageTitle() {
  const { t } = useTranslation();

  return (
    <div className="pb-4">
      <h1 className="text-2xl font-bold text-gray-900">{t('page.title')}</h1>
      <p className="text-sm text-gray-500 mt-1">{t('page.subtitle')}</p>
    </div>
  );
}
