import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../Apis/authApi';

export function useRegisterUserMutation(userInformation) {
  const mutation = useMutation({
    mutationFn: async function () {
      if (userInformation.password !== userInformation.confirmPassword) {
        throw new Error('Passwords do not match'); // Throwing an error rejects the promise
      }

      const userResponse = await registerUser(userInformation);
      return userResponse;
    },
  });

  return mutation;
}
