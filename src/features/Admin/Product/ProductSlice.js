import { createSlice } from "@reduxjs/toolkit";
import { getListProduct, deleteToProduct, updateToProduct } from './pathAPI';
const ProductSlice = createSlice({
  name: 'productAdmin',
  initialState: {
    loading: false,
    loadingDelete: false,
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
    },
    // delete product
    [deleteToProduct.pending]: state => {
      state.loadingDelete = true
    },
    [deleteToProduct.fulfilled]: (state, action) => {
      const { product } = action.payload;
      const { data } = state;
      const index = data.findIndex(item => item._id === product._id);
      console.log(index);
      data.splice(index, 1);
      state.loadingDelete = false;
      state.length = state.length - 1;
    },
    [deleteToProduct.rejected]: state => {
      state.loadingDelete = false;
    },
    // put product
    [updateToProduct.pending]: state => {

    },
    [updateToProduct.fulfilled]: (state, action) => {
      console.log(action)
    },
    [updateToProduct.rejected]: state => {

    }
  }
});


const { reducer } = ProductSlice;
export default reducer;
