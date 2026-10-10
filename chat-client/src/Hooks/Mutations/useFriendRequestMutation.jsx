import { useMutation } from '@tanstack/react-query';
import { sendFriendRequest } from '../../Apis/appApis';

export function useFriendRequestMutation(accessToken, sendUserName) {
  const sendFriendRequestMutation = useMutation({
    mutationFn: async (receiverUserName) => {
      const response = await sendFriendRequest(
        accessToken,
        sendUserName,
        receiverUserName
      );
      return response;
    },
  });

  return sendFriendRequestMutation;
}
