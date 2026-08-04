import axios from 'axios';
import { SERVER_ENDPOINT } from '../Config/clientConfigs';

const axiosInstance = axios.create({
  baseURL: SERVER_ENDPOINT,
  withCredentials: true,
});

export default axiosInstance;
