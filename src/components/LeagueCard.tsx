import { useTranslation } from '../hooks/useTranslation';
import type { League } from '../types/league';

const SPORT_STYLES: Record<string, string> = {
  soccer: 'bg-green-50 text-green-700 border-green-200',
  football: 'bg-green-50 text-green-700 border-green-200',
  basketball: 'bg-orange-50 text-orange-600 border-orange-200',
  'ice hockey': 'bg-sky-50 text-sky-600 border-sky-200',
  'american football': 'bg-purple-50 text-purple-600 border-purple-200',
  motorsport: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  baseball: 'bg-red-50 text-red-600 border-red-200',
};

function getSportStyle(sport: string) {
  return (
    SPORT_STYLES[sport.toLowerCase()] ??
    'bg-gray-100 text-gray-600 border-gray-200'
  );
}

type Props = {
  league: League;
  onViewBadge: (league: League) => void;
};

export function LeagueCard({ league, onViewBadge }: Props) {
  const { t } = useTranslation();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
      <span
        className={`self-start text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded border ${getSportStyle(league.strSport)}`}
      >
        {league.strSport}
      </span>
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-snug">
          {league.strLeague}
        </h3>
        {league.strLeagueAlternate && (
          <p className="text-sm text-gray-400 mt-1">
            {league.strLeagueAlternate}
          </p>
        )}
      </div>
      <button
        onClick={() => onViewBadge(league)}
        className="self-start text-sm text-red-500 font-medium cursor-pointer hover:text-red-600"
      >
        {t('card.viewBadge')}
      </button>
    </div>
  );
}
