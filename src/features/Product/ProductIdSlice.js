import { createSlice } from "@reduxjs/toolkit";

import { getProductId } from './pathAPI';

const ListProductsSlice = createSlice({
  name: 'productId',
  initialState: {
    product: [],
    loading: true
  },
  reducers: {},
  extraReducers: {
    [getProductId.pending]: (state) => {
      state.loading = true;
    },
    [getProductId.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    }
    ,
    [getProductId.rejected]: (state) => {
      state.loading = false;
    }
  }
});
const { reducer } = ListProductsSlice;
export default reducer;