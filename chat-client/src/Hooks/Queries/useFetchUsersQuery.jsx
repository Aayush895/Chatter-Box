import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../Apis/appApis';

export function useFetchUsersQuery(searchQuery, accessToken) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['fetch-users-query-key', searchQuery],
    queryFn: () => fetchUsers(searchQuery, accessToken),
    enabled: searchQuery.length > 0 ? true : false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
