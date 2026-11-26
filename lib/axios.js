import axios from 'axios';
import { refreshAccessToken } from './token-refresh';

const axiosInstance = axios.create( {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
} );

axiosInstance.interceptors.response.use(
  ( response ) => response.data,
  async ( error ) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if ( error.response?.status === 401 && !originalRequest._retry ) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        await refreshAccessToken();

        // Retry the original request
        return axiosInstance( originalRequest );
      } catch ( refreshError ) {
        // Refresh failed, redirect to login
        if ( typeof window !== 'undefined' ) {
          window.location.href = '/admin/login';
        }
        return Promise.reject( refreshError );
      }
    }

    return Promise.reject( error );
  }
);

export default axiosInstance;
