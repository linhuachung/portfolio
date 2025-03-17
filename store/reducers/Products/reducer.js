import { createSlice } from '@reduxjs/toolkit'
import { GetListProducts } from './action.js'

const initialState = {
    productList: {
        data: [],
        pagination: {
            limit: 10,
            page: 1,
            total: 0,
            totalPage: 0,
        },
    },
    loadingProduct: false
}
let data = 0
const ProductReducer = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(GetListProducts.pending, (state) => ({
            ...state,
            loadingProduct:true,
            productList: initialState.productList
        }))

        addCase(GetListProducts.fulfilled, (state, { payload }) =>({
            ...state,
            loadingProduct: false,
            productList: {
                data: payload,
                pagination: {
                    limit: 10,
                    page: 1,
                    total: 0,
                    totalPage: 0,
                },
            },
        }))

        addCase(GetListProducts.rejected, (state) => ({
            ...state,
            loadingProduct: false,
        }))
    },
})

const action = ProductReducer.actions

export { action }

export default ProductReducer.reducer