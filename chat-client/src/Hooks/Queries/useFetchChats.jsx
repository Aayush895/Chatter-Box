import { useQuery } from '@tanstack/react-query';
import { fetchChats } from '../../Apis/chatApis';

export function useFetchChats(accessToken, senderId, receiverId) {
  const { data: userChats, refetch: refetchChats } = useQuery({
    queryKey: ['chatsList'],
    queryFn: () => fetchChats(accessToken, senderId, receiverId),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  return { userChats, refetchChats };
}
