import { useQuery } from '@tanstack/react-query';
import { fetchChats } from '../../Apis/chatApis';

export function useFetchChats(accessToken, senderId, receiverId) {
  const { data: userChats } = useQuery({
    queryKey: ['chats', senderId, receiverId],
    queryFn: () => fetchChats(accessToken, senderId, receiverId),
    enabled: Boolean(senderId && receiverId),
    refetchOnWindowFocus: false,
  });

  return { userChats };
}
