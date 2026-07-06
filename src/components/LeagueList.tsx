import { useState, useMemo } from 'react';
import { useLeagues } from '../hooks/useLeagues';
import { useTranslation } from '../hooks/useTranslation';
import { LeagueCard } from './LeagueCard';
import { LeagueFilters } from './LeagueFilters';
import type { League } from '../types/league';

const PAGE_SIZE = 12;

type Props = {
  onViewBadge: (league: League) => void;
  selectedSport: string;
  onSportChange: (sport: string) => void;
};

export function LeagueList({
  onViewBadge,
  selectedSport,
  onSportChange,
}: Props) {
  const { data: leagues = [], isLoading, isError } = useLeagues();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const sports = useMemo(
    () => [...new Set(leagues.map((l) => l.strSport))].sort(),
    [leagues],
  );

  const filtered = useMemo(
    () =>
      leagues.filter((l) => {
        const matchesSearch = l.strLeague
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesSport =
          selectedSport === '' || l.strSport === selectedSport;
        return matchesSearch && matchesSport;
      }),
    [leagues, search, selectedSport],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSportChange = (value: string) => {
    onSportChange(value);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
        {t('list.loading')}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-red-400 text-sm">
        {t('list.error')}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <LeagueFilters
        search={search}
        onSearchChange={handleSearchChange}
        sport={selectedSport}
        onSportChange={handleSportChange}
        sports={sports}
      />

      <p className="text-sm text-gray-400 mb-4">
        {t('list.count', { count: filtered.length })}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginated.map((league) => (
          <LeagueCard
            key={league.idLeague}
            league={league}
            onViewBadge={onViewBadge}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="text-sm text-gray-500 px-2 py-1 disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              {t('list.previous')}
            </button>
            <div className="hidden sm:flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded text-sm font-medium cursor-pointer ${
                    p === page
                      ? 'bg-red-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <span className="sm:hidden text-sm text-gray-500">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="text-sm text-gray-500 px-2 py-1 disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              {t('list.next')}
            </button>
          </div>
          <span className="text-sm text-gray-400">
            {t('list.showing', {
              from: (page - 1) * PAGE_SIZE + 1,
              to: Math.min(page * PAGE_SIZE, filtered.length),
              total: filtered.length,
            })}
          </span>
        </div>
      )}
    </div>
  );
}
