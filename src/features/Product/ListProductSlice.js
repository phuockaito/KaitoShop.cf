import { createSlice } from "@reduxjs/toolkit";
import { getProductAll } from './pathAPI';

const ListProductSlice = createSlice({
    name: 'products',
    initialState: {
        data: {},
        length: 0,
        loading: true,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [getProductAll.pending]: (state) => {
            state.loading = true;
        },
        [getProductAll.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getProductAll.fulfilled]: (state, action) => {
            state.loading = false;
            state.length = action.payload.lengthProducts;
            state.data = action.payload.data;
        }
    }

});
const { reducer} = ListProductSlice;
export default reducer;