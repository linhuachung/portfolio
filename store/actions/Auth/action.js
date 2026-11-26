import { callApi } from '@/app/api/api';
import { ADMIN_ENDPOINT } from '@/constants/endpoint';
import { createAsyncThunk } from '@reduxjs/toolkit';

const endpoint = {
  login: ADMIN_ENDPOINT.LOGIN
};

const AdminLoginAction = createAsyncThunk( endpoint.login, async ( data ) => {
  return await callApi( {
    method: 'post',
    url: ADMIN_ENDPOINT.LOGIN,
    data,
    onSuccess: () => {}
  } );
} );

export {
  AdminLoginAction
};

