import { ADMIN_ENDPOINT } from './endpoints';
import axios from 'axios';

let refreshPromise = null;

export async function refreshAccessToken() {
  if ( refreshPromise ) {return refreshPromise;}

  refreshPromise = axios.post( ADMIN_ENDPOINT.REFRESH, null, { withCredentials: true } )
    .then( response => response.data )
    .finally( () => { refreshPromise = null; } );

  return refreshPromise;
}
