import { createSlice } from "@reduxjs/toolkit";
import { getListProduct } from './pathAPI';
const ProductSlice = createSlice({
  name: 'productAdmin',
  initialState: {
    loading: false,
    data: [],
    length: 0
  },
  extraReducers: {
    [getListProduct.pending]: state => {
      state.loading = true;
    },
    [getListProduct.fulfilled]: (state, action) => {
      const { product, length } = action.payload;
      state.loading = false;
      state.data = product;
      state.length = length;
    },
    [getListProduct.rejected]: state => {
      state.loading = false;
    }
  }
});


const { reducer } = ProductSlice;
export default reducer;
