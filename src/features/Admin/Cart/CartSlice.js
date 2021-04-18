import { createSlice } from "@reduxjs/toolkit";
import { message } from 'antd';
import {
  getCart,
  checkOutCart,
  deleteCart,
  messagesCart
} from './pathAPI';
const CartSlice = createSlice({
  name: 'cartAdmin',
  initialState: {
    loading: false,
    LoadingCheckOutCart: false,
    loadingDeleteCartAPI: false,
    data: [],
    length: 0
  },
  extraReducers: {
    [getCart.pending]: state => {
      state.loading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      state.data = action.payload.cart;
      state.length = action.payload.length;
      state.loading = false;
    },
    [getCart.rejected]: state => {
      state.loading = false;
    },
    // checkOutCart
    [checkOutCart.pending]: state => {
      state.LoadingCheckOutCart = true;
    },
    [checkOutCart.fulfilled]: (state, action) => {
      const { cart } = action.payload;
      const { data } = state;
      const index = data.findIndex(product => product._id === cart._id);
      data[index] = cart;
      state.LoadingCheckOutCart = false;
    },
    [checkOutCart.rejected]: (state) => {
      state.LoadingCheckOutCart = false;
    },
    // delete Cart
    [deleteCart.pending]: state => {
      state.loadingDeleteCartAPI = true;
    },
    [deleteCart.fulfilled]: (state, action) => {
      const { cart, length } = action.payload;
      const { data } = state;
      const index = data.findIndex(product => product._id === cart._id);
      data.splice(index, 1);
      state.length = length;
      state.loadingDeleteCartAPI = false;
      message.success('Xóa thành công', 1.5);
    },
    [deleteCart.rejected]: state => {
      state.loadingDeleteCartAPI = false;
    },
    //messagesCart
    [messagesCart.fulfilled]: (state, action) => {
      const { cart } = action.payload;
      const { data } = state;
      const index = data.findIndex(product => product._id === cart._id);
      data[index] = cart;
    }
  }
});


const { reducer } = CartSlice;
export default reducer;
