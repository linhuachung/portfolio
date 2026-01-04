import axios from 'axios';
import Cookies from 'js-cookie';
import { ADMIN_ENDPOINT } from '@/constants/endpoint';

let isRefreshing = false;
let failedQueue = [];

const processQueue = ( error, token = null ) => {
  failedQueue.forEach( prom => {
    if ( error ) {
      prom.reject( error );
    } else {
      prom.resolve( token );
    }
  } );

  failedQueue = [];
};

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken() {
  if ( isRefreshing ) {
    return new Promise( ( resolve, reject ) => {
      failedQueue.push( { resolve, reject } );
    } );
  }

  isRefreshing = true;

  try {
    const refreshToken = Cookies.get( 'refreshToken' );

    if ( !refreshToken ) {
      throw new Error( 'No refresh token available' );
    }

    // Create a temporary axios instance without interceptors to avoid infinite loop
    // Send refresh token in request body
    const response = await axios.post( ADMIN_ENDPOINT.REFRESH, { refreshToken }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    } );

    // Response structure from DataResponse: { status, message, data }
    // Axios returns response.data directly, so we need to check response.data.data
    const responseData = response.data;
    const tokens = responseData?.data || responseData;

    // Handle both old format (string) and new format (object with accessToken and refreshToken)
    let newAccessToken;
    let newRefreshToken;

    if ( typeof tokens === 'string' ) {
      // Old format: only access token
      newAccessToken = tokens;
    } else if ( tokens && typeof tokens === 'object' ) {
      // New format: both tokens
      newAccessToken = tokens.accessToken;
      newRefreshToken = tokens.refreshToken;
    } else {
      throw new Error( 'Failed to refresh token: Invalid response format' );
    }

    if ( newAccessToken && typeof newAccessToken === 'string' ) {
      // Update access token
      Cookies.set( 'token', newAccessToken, { expires: 7, path: '/' } );

      // Update refresh token if provided (token rotation)
      if ( newRefreshToken && typeof newRefreshToken === 'string' ) {
        Cookies.set( 'refreshToken', newRefreshToken, { expires: 7, path: '/' } );
      }

      processQueue( null, newAccessToken );
      return newAccessToken;
    } else {
      throw new Error( 'Failed to refresh token: Invalid response format' );
    }
  } catch ( error ) {
    processQueue( error, null );
    // Clear tokens and redirect to login
    Cookies.remove( 'token' );
    Cookies.remove( 'refreshToken' );
    if ( typeof window !== 'undefined' ) {
      window.location.href = '/admin/login';
    }
    throw error;
  } finally {
    isRefreshing = false;
  }
}

