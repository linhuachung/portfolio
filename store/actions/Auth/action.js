import { createAsyncThunk } from "@reduxjs/toolkit";
import { callApi } from "@/app/api/api";
import Cookies from "js-cookie";
import { ADMIN_ENDPOINT } from "@/constants/endpoint";

const endpoint = {
  login: ADMIN_ENDPOINT.LOGIN
};

const AdminLoginAction = createAsyncThunk( endpoint.login, async ( data ) => {
  return await callApi( {
    method: "post",
    url: ADMIN_ENDPOINT.LOGIN,
    data,
    onSuccess: ( res ) => {
      Cookies.set( "token", res.data, { expires: 7, path: "/admin" } );
    }
  } );
} );

export {
  AdminLoginAction
};