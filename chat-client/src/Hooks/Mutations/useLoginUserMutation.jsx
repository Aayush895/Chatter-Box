import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import UserContext from '../../Context/UserContext';
import { loginUser } from '../../Apis/authApi';

export function useLoginUserMutation(userInformation) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async function () {
      const userResponse = await loginUser(userInformation);
      return userResponse;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', JSON.stringify(data.data.accessToken));
      setUserInfo({
        ...userInfo,
        userName: data.data.userName,
        email: data.data.email,
        accessToken: data.data.accessToken,
      });

      // Once we login redirect the user to the protected route component
      navigate('/welcome');
    },
  });

  return mutation;
}
