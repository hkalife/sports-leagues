import { useQuery } from '@tanstack/react-query';
import { fetchAllLeagues } from '../services/leagues';

export function useLeagues() {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: fetchAllLeagues,
    staleTime: Infinity,
  });
}
