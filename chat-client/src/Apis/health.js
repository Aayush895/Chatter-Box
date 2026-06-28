import axiosInstance from './axiosConfig';

export async function checkServerHealth() {
  const serverResponse = await axiosInstance.get(`/health-check`);
  return serverResponse.data;
}
