import { useQuery } from '@tanstack/react-query';
import { fetchSeasonBadge } from '../services/leagues';

export function useSeasonBadge(leagueId: string | null) {
  return useQuery({
    queryKey: ['badge', leagueId],
    queryFn: () => fetchSeasonBadge(leagueId!),
    enabled: !!leagueId,
    staleTime: Infinity,
  });
}
