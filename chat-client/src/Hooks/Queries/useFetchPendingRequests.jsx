import { useQuery } from '@tanstack/react-query';
import { fetchPendingRequests } from '../../Apis/appApis';

export function useFetchPendingRequests(accessToken) {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ['fetchPendingRequests'],
    queryFn: () => fetchPendingRequests(accessToken),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return { data, isLoading, error, isError, refetch };
}
