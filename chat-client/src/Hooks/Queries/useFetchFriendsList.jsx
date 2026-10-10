import { useQuery } from '@tanstack/react-query';
import { fetchFriendsList } from '../../Apis/appApis';

// TODO: Have to merge it on UI
export function useFetchFriendsList(accessToken, userId) {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['friendsList'],
    queryFn: () => fetchFriendsList(accessToken, userId),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  return { data, refetch, isLoading };
}
