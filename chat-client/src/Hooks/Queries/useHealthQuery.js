import { useQuery } from '@tanstack/react-query';
import { checkServerHealth } from '../../Apis';

export function useHealthQuery() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['health'],
    queryFn: checkServerHealth,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError, error, refetch, isFetching };
}
