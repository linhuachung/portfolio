import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshAccessToken } from './token-refresh';

const axiosInstance = axios.create( {
  headers: {
    'Content-Type': 'application/json'
  }
} );

axiosInstance.interceptors.request.use( ( config ) => {
  if ( typeof window !== 'undefined' ) {
    const accessToken = Cookies.get( 'token' );
    if ( accessToken ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
}, ( error ) => Promise.reject( error ) );

axiosInstance.interceptors.response.use(
  ( response ) => response.data,
  async ( error ) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if ( error.response?.status === 401 && !originalRequest._retry ) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const newAccessToken = await refreshAccessToken();

        // Update the authorization header with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return axiosInstance( originalRequest );
      } catch ( refreshError ) {
        // Refresh failed, redirect to login
        if ( typeof window !== 'undefined' ) {
          Cookies.remove( 'token' );
          Cookies.remove( 'refreshToken' );
          window.location.href = '/admin/login';
        }
        return Promise.reject( refreshError );
      }
    }

    return Promise.reject( error );
  }
);

export default axiosInstance;
