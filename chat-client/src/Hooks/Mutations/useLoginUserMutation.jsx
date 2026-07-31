import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import UserContext from '../../Context/UserContext';
import { loginUser } from '../../Apis/authApi';

export function useLoginUserMutation(userInformation) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const mutation = useMutation({
    mutationFn: async function () {
      console.log('clicked');
      const userResponse = await loginUser(userInformation);
      return userResponse;
    },
    onSuccess: (data) => {
      console.log(data.data);
      setUserInfo({
        ...userInfo,
        userName: data.data.userName,
        email: data.data.email,
        accessToken: data.data.accessToken,
      });
    },
  });

  return mutation;
}
