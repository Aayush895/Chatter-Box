import { useQuery } from '@tanstack/react-query';
import { fetchFriendsList } from '../../Apis/appApis';

export function useFetchFriendsList(accessToken, userId) {
  const {
    data: fetchedFriendsListData,
    refetch: refetchFriendsList,
    isLoading: hasFriendListLoaded,
  } = useQuery({
    queryKey: ['friendsList'],
    queryFn: () => fetchFriendsList(accessToken, userId),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  return { fetchedFriendsListData, refetchFriendsList, hasFriendListLoaded };
}
