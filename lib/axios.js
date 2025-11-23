import axios from 'axios';
import Cookies from 'js-cookie';

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
  ( error ) => Promise.reject( error )
);
export default axiosInstance;
