import { createSlice } from "@reduxjs/toolkit";

import { getProductId } from './pathAPI';

const ListProductsSlice = createSlice({
    name: 'productId',
    initialState: {
        data: [],
        length: 0,
        loading: true
    },
    reducers: {},
    extraReducers: {
        [getProductId.pending]: (state) => {
            state.loading = true;
        },
        [getProductId.rejected]: (state, action) => {
            state.loading = false;
        },
        [getProductId.fulfilled]: (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        }
    }
});
const { reducer} = ListProductsSlice;
export default reducer;