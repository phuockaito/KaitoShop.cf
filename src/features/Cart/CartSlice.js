import { createSlice } from "@reduxjs/toolkit";
import { message, notification } from 'antd';
import { postCartAPI, getCartAPI, putCartStatusOrderAPI, putCartAddressesAPI, deleteCartAPI } from './pathAPI';
const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    dataCart: JSON.parse(localStorage.getItem('cart')) || [],
    // historyCart
    historyCart: [],
    loadingHistoryCart: false,
    // update
    loadingUpdateCartStatus: false,
    loadingPostCartAPI: false,
    loadingDeleteCartAPI: false,
  },
  reducers: {
    addCartProduct: (state, action) => {
      const { dataCart } = state;
      const { product, quantity } = action.payload;
      const sizeCart = action.payload.product.size;
      const fileIndex = (product, size, id) => {
        let result = -1;
        product.forEach((productCart, index) => {
          if (productCart.product.size === size && productCart.product._id === id) {
            result = index;
          }
        })
        return result;
      };
      const index = fileIndex(dataCart, sizeCart, product._id);
      if (index !== -1) {
        if (dataCart[index].quantity < 5) {
          if (quantity > 5) {
            dataCart[index].quantity = 5;
          }
          else {
            let newQuantity = dataCart[index].quantity + quantity;
            if (newQuantity > 5) {
              dataCart[index].quantity = 5;
            } else {
              dataCart[index].quantity += quantity;
            }
          }
          message.success('Cập nhật Số Lượng Thành Công', 2);
        } else {
          notification['error']({
            message: 'Thông báo',
            description:
              'Bạn được phép thêm tối đa số lượng là 5',
          });
        }
      }
      else {
        dataCart.unshift({
          product,
          quantity: quantity > 5 ? 5 : quantity
        });
        message.success('Đã Thêm Vào Vỏ Hàng Thành Công', 2);
      }
      localStorage.setItem("cart", JSON.stringify(dataCart));
    },
    deleteCartProduct: (state, action) => {
      const { dataCart } = state;
      const index = action.payload;
      const indexState = dataCart.findIndex((product, indexCart) => indexCart === index);
      if (indexState !== -1) {
        dataCart.splice(indexState, 1);
      }
      message.success('Xóa Thành Công', 1.5);
      localStorage.setItem("cart", JSON.stringify(dataCart));
    },
    updateCartProduct: (state, action) => {
      const { dataCart } = state;
      const { index, quantity } = action.payload;
      const indexState = dataCart.findIndex((product, indexCart) => indexCart === index);
      if (indexState !== -1) {
        dataCart[indexState].quantity = quantity;
      }
      message.success('Cập Nhật Thành Công', 1.5);
      localStorage.setItem("cart", JSON.stringify(dataCart));

    }
  },
  extraReducers: {
    // post cart API
    [postCartAPI.pending]: state => {
      state.loadingPostCartAPI = true;
    },
    [postCartAPI.fulfilled]: (state, action) => {
      state.loadingPostCartAPI = false;
      notification['success']({
        message: 'Đặt Hàng Thành Công !',
        description: 'Chi tiết trong lịch sử mua hàng'
      });
      state.dataCart = [];
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      localStorage.removeItem("cart");
    },
    // get history cart user
    [getCartAPI.pending]: state => {
      state.loadingHistoryCart = true;
    },
    [getCartAPI.rejected]: (state, action) => {
      state.loadingHistoryCart = false;
    },
    [getCartAPI.fulfilled]: (state, action) => {
      state.loadingHistoryCart = false;
      const { cart } = action.payload;
      state.historyCart = cart;
    },
    // upload data status oder cart
    [putCartStatusOrderAPI.pending]: state => {
      state.loadingUpdateCartStatus = true;
    },
    [putCartStatusOrderAPI.rejected]: (state, action) => {
      state.loadingUpdateCartStatus = false;
      console.log('ero', action);
    },
    [putCartStatusOrderAPI.fulfilled]: (state, action) => {
      const { historyCart } = state;
      state.loadingUpdateCartStatus = false;
      const id = action.payload.data[0]._id;
      const cartReq = action.payload.data[0];
      const index = historyCart.findIndex(cart => cart._id === id);
      historyCart[index] = cartReq;
      notification['success']({
        message: 'Thao tác Thành công',
        description: 'Thông tin chi tiết trong lịch sử mua hàng'
      });
    },
    // upload data address
    [putCartAddressesAPI.pending]: state => {
      state.loadingUpdateCartStatus = true;
    },
    [putCartAddressesAPI.fulfilled]: (state, action) => {
      const { historyCart } = state;
      state.loadingUpdateCartStatus = false;
      const id = action.payload.data[0]._id;
      const cartReq = action.payload.data[0];
      const index = historyCart.findIndex(cart => cart._id === id);
      historyCart[index] = cartReq;
      notification['success']({
        message: 'Thao tác Thành công',
        description: 'Thông tin chi tiết trong lịch sử mua hàng'
      });
    },
    [putCartAddressesAPI.rejected]: (state, action) => {
      state.loadingUpdateCartStatus = false;
      console.log('ero', action);
    },
    // delete cart
    [deleteCartAPI.pending]: state => {
      state.loadingDeleteCartAPI = true;
    },
    [deleteCartAPI.fulfilled]: (state, action) => {
      const { historyCart } = state;
      const { _id } = action.payload.data;
      state.loadingDeleteCartAPI = false;
      const index = historyCart.findIndex((cart => cart._id === _id));
      historyCart.splice(index, 1);
      message.success('Xóa thành công', 1.5);
    }
  }
});
const { reducer, actions } = CartSlice;
export const { addCartProduct, deleteCartProduct, updateCartProduct } = actions;
export default reducer;
