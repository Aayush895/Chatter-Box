import { useQuery } from '@tanstack/react-query';
import { fetchPendingRequests } from '../../Apis/appApis';

export function useFetchPendingRequests(accessToken) {
  const {
    data: pendingRequestData,
    isLoading: hasRequestsLoaded,
    error,
    isError,
    refetch: refetchPendingRequests,
  } = useQuery({
    queryKey: ['fetchPendingRequests'],
    queryFn: () => fetchPendingRequests(accessToken),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return {
    pendingRequestData,
    hasRequestsLoaded,
    error,
    isError,
    refetchPendingRequests,
  };
}
