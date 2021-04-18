import { createSlice } from "@reduxjs/toolkit";

import { getProductId } from './pathAPI';

const ListProductsSlice = createSlice({
  name: 'productId',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {},
  extraReducers: {
    [getProductId.pending]: (state) => {
      state.loading = true;
    },
    [getProductId.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    }
    ,
    [getProductId.rejected]: (state, action) => {
      state.loading = false;
    }
  }
});
const { reducer } = ListProductsSlice;
export default reducer;