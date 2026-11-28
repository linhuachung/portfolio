import axios from 'axios';
import { ADMIN_ENDPOINT } from './endpoints';
import { refreshAccessToken } from './token-refresh';

const SESSION_ENDPOINTS = new Set( [ADMIN_ENDPOINT.LOGIN, ADMIN_ENDPOINT.REFRESH, ADMIN_ENDPOINT.LOGOUT] );

const axiosInstance = axios.create( {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
} );

// A 401 from the session endpoints means bad credentials or a dead session, not an
// expired access token, so it is returned to the caller instead of triggering a refresh.
const shouldRefresh = ( error ) => error.response?.status === 401
  && !error.config._retry
  && !SESSION_ENDPOINTS.has( error.config.url );

axiosInstance.interceptors.response.use(
  ( response ) => response.data,
  async ( error ) => {
    if ( !shouldRefresh( error ) ) {return Promise.reject( error );}

    error.config._retry = true;
    try {
      await refreshAccessToken();
      return axiosInstance( error.config );
    } catch ( refreshError ) {
      if ( typeof window !== 'undefined' ) {
        window.location.href = '/admin/login';
      }
      return Promise.reject( refreshError );
    }
  }
);

export default axiosInstance;
