import axiosInstance from './axiosConfig';

export async function registerUser(userInformation) {
  const serverResponse = await axiosInstance.post('/sign-up', userInformation);

  return serverResponse.data;
}
