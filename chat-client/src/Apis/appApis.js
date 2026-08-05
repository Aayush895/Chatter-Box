import axiosInstance from './axiosConfig';

export async function welcomeDashboardApi(accessToken) {
  // Modify the request header if the accessToken is present
  const serverResponse = await axiosInstance.get('/welcome', {
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {},
  });

  return serverResponse.data;
}
