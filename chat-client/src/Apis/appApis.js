import axiosInstance from './axiosConfig';

export async function welcomeDashboardApi(accessToken) {
  try {
    // Modify the request header if the accessToken is present
    axiosInstance.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return config;
    });

    const serverResponse = await axiosInstance.get('/refresh');
    return serverResponse.data;
  } catch (error) {
    console.log('LOGGING Error: ', error.response.data);
  }
}
