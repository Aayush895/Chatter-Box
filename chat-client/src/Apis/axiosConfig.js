import axios from 'axios';
import { SERVER_ENDPOINT } from '../Config/clientConfigs';

const axiosInstance = axios.create({
  baseURL: SERVER_ENDPOINT,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
