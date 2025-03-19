import { createAsyncThunk } from '@reduxjs/toolkit';
import {callApi} from "@/app/api/api";

const keyReducer = {
    getList: 'product/getList'
}

const GetListProducts = createAsyncThunk(keyReducer.getList, async () => {
    const res = await callApi({
        method: 'get',
        url: "/"
    })
    return res
})

export {
    GetListProducts
}