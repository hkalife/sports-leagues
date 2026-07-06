import { useState } from 'react';
import { LeagueCard, type League } from './LeagueCard';
import { LeagueFilters } from './LeagueFilters';

const PAGE_SIZE = 12;

const MOCK_LEAGUES: League[] = [
  {
    idLeague: '4328',
    strLeague: 'English Premier League',
    strSport: 'Football',
  },
  {
    idLeague: '4329',
    strLeague: 'English League Championship',
    strSport: 'Football',
  },
  {
    idLeague: '4330',
    strLeague: 'Scottish Premier League',
    strSport: 'Football',
  },
  { idLeague: '4331', strLeague: 'German Bundesliga', strSport: 'Football' },
  { idLeague: '4332', strLeague: 'Italian Serie A', strSport: 'Football' },
  {
    idLeague: '4334',
    strLeague: 'French Ligue 1',
    strSport: 'Football',
    strLeagueAlternate: 'Ligue 1 Uber Eats',
  },
  {
    idLeague: '4335',
    strLeague: 'Spanish La Liga',
    strSport: 'Football',
    strLeagueAlternate: 'LaLiga Santander',
  },
  {
    idLeague: '4346',
    strLeague: 'American Major League Soccer',
    strSport: 'Football',
    strLeagueAlternate: 'MLS',
  },
  {
    idLeague: '4387',
    strLeague: 'NBA',
    strSport: 'Basketball',
    strLeagueAlternate: 'National Basketball Association',
  },
  {
    idLeague: '4389',
    strLeague: 'NCAA Division I Basketball',
    strSport: 'Basketball',
    strLeagueAlternate: "NCAA Men's Basketball",
  },
  {
    idLeague: '4380',
    strLeague: 'NHL',
    strSport: 'Ice Hockey',
    strLeagueAlternate: 'National Hockey League',
  },
  {
    idLeague: '4391',
    strLeague: 'NFL',
    strSport: 'American Football',
    strLeagueAlternate: 'National Football League',
  },
  {
    idLeague: '4424',
    strLeague: 'MLB',
    strSport: 'Baseball',
    strLeagueAlternate: 'Major League Baseball',
  },
  {
    idLeague: '4450',
    strLeague: 'Formula 1',
    strSport: 'Motorsport',
    strLeagueAlternate: 'F1',
  },
  {
    idLeague: '4394',
    strLeague: 'Australian Football League',
    strSport: 'American Football',
    strLeagueAlternate: 'AFL',
  },
  {
    idLeague: '4403',
    strLeague: 'UFC',
    strSport: 'Fighting',
    strLeagueAlternate: 'Ultimate Fighting Championship',
  },
  {
    idLeague: '4410',
    strLeague: 'ATP World Tour',
    strSport: 'Tennis',
    strLeagueAlternate: 'ATP',
  },
  {
    idLeague: '4411',
    strLeague: 'WTA Tour',
    strSport: 'Tennis',
    strLeagueAlternate: 'WTA',
  },
  { idLeague: '4430', strLeague: 'PGA Tour', strSport: 'Golf' },
  {
    idLeague: '4440',
    strLeague: 'NHL Eastern Conference',
    strSport: 'Ice Hockey',
  },
];

const ALL_SPORTS = [...new Set(MOCK_LEAGUES.map((l) => l.strSport))].sort();

export function LeagueList() {
  const [search, setSearch] = useState('');
  const [sport, setSport] = useState('');
  const [page, setPage] = useState(1);

  const filtered = MOCK_LEAGUES.filter((l) => {
    const matchesSearch = l.strLeague
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSport = sport === '' || l.strSport === sport;
    return matchesSearch && matchesSport;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange =
    (setter: (v: string) => void) => (value: string) => {
      setter(value);
      setPage(1);
    };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <LeagueFilters
        search={search}
        onSearchChange={handleFilterChange(setSearch)}
        sport={sport}
        onSportChange={handleFilterChange(setSport)}
        sports={ALL_SPORTS}
      />

      <p className="text-sm text-gray-400 mb-4">{filtered.length} leagues</p>

      <div className="grid grid-cols-4 gap-4">
        {paginated.map((league) => (
          <LeagueCard
            key={league.idLeague}
            league={league}
            onViewBadge={() => {}}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="text-sm text-gray-500 px-2 py-1 disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              ‹ Previous
            </button>
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
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="text-sm text-gray-500 px-2 py-1 disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              Next ›
            </button>
          </div>
          <span className="text-sm text-gray-400">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}{' '}
            results
          </span>
        </div>
      )}
    </div>
  );
}
