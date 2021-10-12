import { createSlice } from "@reduxjs/toolkit";
import { getProductAll } from './pathAPI';

const ListProductSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    length: 0,
    loading: true,
  },
  reducers: {},
  extraReducers: {
    [getProductAll.pending]: (state) => {
      state.loading = true;
    },
    [getProductAll.fulfilled]: (state, action) => {
      const { length, product } = action.payload;
      state.loading = false;
      state.length = length;
      state.data = product;
    }
    ,
    [getProductAll.rejected]: (state) => {
      state.loading = false;
    }
  }

});
const { reducer } = ListProductSlice;
export default reducer;