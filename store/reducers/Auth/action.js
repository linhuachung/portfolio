import { createAsyncThunk } from '@reduxjs/toolkit';
import {callApi} from "@/app/api/api";
import {ADMIN_ENDPOINT} from "@/constants/endpoint";

const endpoint = {
    login: ADMIN_ENDPOINT.LOGIN
}

const AdminLoginAction = createAsyncThunk(endpoint.login, async (data) => {
    const res = await callApi({
        method: 'post',
        url: ADMIN_ENDPOINT.LOGIN,
        data
    })
    console.log(res)
    return res
})

export {
    AdminLoginAction
}