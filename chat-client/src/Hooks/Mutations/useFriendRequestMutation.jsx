import { useMutation } from '@tanstack/react-query';
import { sendFriendRequest } from '../../Apis/appApis';

export function useFriendRequestMutation(accessToken, sendUserName, receiverUserName) {
  const sendFriendRequestMutation = useMutation({
    mutationFn: async () => {
      const response = await sendFriendRequest(
        accessToken,
        sendUserName,
        receiverUserName
      );
      console.log('FriendRequest Resp: ', response);
      return response;
    },
  });

  return sendFriendRequestMutation;
}
