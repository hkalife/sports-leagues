import { useMemo } from 'react';
import { useLeagues } from '../hooks/useLeagues';
import { useTranslation } from '../hooks/useTranslation';

const TOP_N = 5;

type Props = {
  selectedSport: string;
  onSportChange: (sport: string) => void;
};

export function SportNav({ selectedSport, onSportChange }: Props) {
  const { t, tSport } = useTranslation();
  const { data: leagues = [] } = useLeagues();

  const topSports = useMemo(() => {
    const counts = leagues.reduce<Record<string, number>>((acc, l) => {
      acc[l.strSport] = (acc[l.strSport] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, TOP_N)
      .map(([sport]) => sport);
  }, [leagues]);

  const handleClick = (sport: string) => {
    onSportChange(selectedSport === sport ? '' : sport);
  };

  return (
    <nav className="bg-white border-b border-gray-200 h-11">
      <div className="max-w-6xl mx-auto h-full flex items-center gap-6">
        <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase mr-2">
          {t('nav.mostPopular')}
        </span>
        {topSports.map((sport) => (
          <button
            key={sport}
            onClick={() => handleClick(sport)}
            className={`text-sm cursor-pointer transition-colors ${
              selectedSport === sport
                ? 'font-bold text-red-500'
                : 'font-medium text-gray-700 hover:text-gray-900'
            }`}
          >
            {tSport(sport)}
          </button>
        ))}
      </div>
    </nav>
  );
}
