import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { getSession } from 'next-auth/react';
import useTypedSession from '@/hooks/useTypedSession';

const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: CONFIG.BASE_URL + '/server',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: CONFIG.TIME_OUT,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error || 'Something went wrong'),
);

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  // @ts-ignore
  if (session?.access) {
    // @ts-ignore
    config.headers['Authorization'] = `Bearer ${session?.access}`;
  }

  return config;
});

export default axiosInstance;
