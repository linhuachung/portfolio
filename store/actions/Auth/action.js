import { callApi } from '@/app/api/api';
import { ADMIN_ENDPOINT } from '@/constants/endpoint';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const endpoint = {
  login: ADMIN_ENDPOINT.LOGIN
};

const AdminLoginAction = createAsyncThunk( endpoint.login, async ( data ) => {
  return await callApi( {
    method: 'post',
    url: ADMIN_ENDPOINT.LOGIN,
    data,
    onSuccess: ( res ) => {
      // Store both access token and refresh token
      const { accessToken, refreshToken } = res.data || {};
      if ( accessToken ) {
        Cookies.set( 'token', accessToken, { expires: 7, path: '/' } );
      }
      if ( refreshToken ) {
        Cookies.set( 'refreshToken', refreshToken, { expires: 7, path: '/' } );
      }
    }
  } );
} );

export {
  AdminLoginAction
};

