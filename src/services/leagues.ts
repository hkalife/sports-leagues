import type { League, Season } from '../types/league';

const BASE = 'https://www.thesportsdb.com/api/v1/json/3';

export async function fetchAllLeagues(): Promise<League[]> {
  const res = await fetch(`${BASE}/all_leagues.php`);
  if (!res.ok) throw new Error('Failed to fetch leagues');
  const data = await res.json();
  return data.leagues ?? [];
}

export async function fetchSeasonBadge(leagueId: string): Promise<Season[]> {
  const res = await fetch(
    `${BASE}/search_all_seasons.php?badge=1&id=${leagueId}`,
  );
  if (!res.ok) throw new Error('Failed to fetch season badge');
  const data = await res.json();
  return data.seasons ?? [];
}
