import { useTranslation } from '../hooks/useTranslation';

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  sport: string;
  onSportChange: (value: string) => void;
  sports: string[];
};

export function LeagueFilters({
  search,
  onSearchChange,
  sport,
  onSportChange,
  sports,
}: Props) {
  const { t, tSport } = useTranslation();

  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-white">
        <svg
          className="w-4 h-4 text-gray-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          placeholder={t('filters.searchPlaceholder')}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
        />
      </div>
      <div className="relative">
        <select
          value={sport}
          onChange={(e) => onSportChange(e.target.value)}
          className="appearance-none border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-700 bg-white outline-none cursor-pointer min-w-44"
        >
          <option value="">{t('filters.allSports')}</option>
          {sports.map((s) => (
            <option key={s} value={s}>
              {tSport(s)}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
          ▼
        </span>
      </div>
    </div>
  );
}
