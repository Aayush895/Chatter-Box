import { useMutation } from '@tanstack/react-query';
import { sendFriendRequest } from '../../Apis/appApis';

export function useFriendRequestMutation(accessToken) {
  const sendFriendRequestMutation = useMutation({
    mutationFn: async (receiverUserName) => {
      const response = await sendFriendRequest(accessToken, receiverUserName);
      return response;
    },
  });

  return sendFriendRequestMutation;
}
