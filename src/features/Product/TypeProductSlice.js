import { createSlice } from "@reduxjs/toolkit";
import { getProductType } from './pathAPI';

const TypeProductSlice = createSlice({
    name: 'productType',
    initialState: {
        listProductSlider: [],
        loading: true,
        length: null
    },
    reducers: {},
    extraReducers: {
        [getProductType.pending]: (state) => {
            state.loading = true;
        },
        [getProductType.rejected]: (state, action) => {
            state.loading = false;
        },
        [getProductType.fulfilled]: (state, action) => {
            state.loading = false;
            state.listProductSlider = action.payload.data;
            state.length = action.payload.length;
        }
    }

});
const { reducer } = TypeProductSlice;
export default reducer;