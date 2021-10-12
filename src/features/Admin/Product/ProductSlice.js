import { createSlice } from "@reduxjs/toolkit";
import { getListProduct, deleteToProduct, getCommentProduct } from './pathAPI';
import { deleteCommentUser } from '../User/pathAPI';
import { message } from 'antd';
const ProductSlice = createSlice({
  name: 'productAdmin',
  initialState: {
    loading: false,
    loadingDelete: false,
    productData: [],
    length: 0,
    //
    loadingGetComment: false,
    lengthCommentProduct: 0,
    commentProduct: []
  },
  extraReducers: {
    [getListProduct.pending]: state => {
      state.loading = true;
    },
    [getListProduct.fulfilled]: (state, action) => {
      const { product, length } = action.payload;
      state.loading = false;
      state.productData = product;
      state.length = length;
    },
    [getListProduct.rejected]: state => {
      state.loading = false;
    },
    // get comment products
    [getCommentProduct.pending]: state => {
      state.loadingGetComment = true;
    },
    [getCommentProduct.fulfilled]: (state, action) => {
      const { comment, length } = action.payload;
      state.lengthCommentProduct = length;
      state.commentProduct = comment;
      state.loadingGetComment = false;
    },
    [getCommentProduct.rejected]: state => {
      state.loadingGetComment = false;
    },
    [deleteCommentUser.pending]: state => {

    },
    [deleteCommentUser.fulfilled]: (state, action) => {
      const { id_product, id_comment } = action.payload;
      const { productData, commentProduct } = state;
      const indexProduct = productData.findIndex(prod => prod.product._id === id_product);
      const indexUser = commentProduct.findIndex(comment => comment._id === id_comment);
      if (indexProduct !== -1) {
        productData[indexProduct].length_comment = productData[indexProduct].length_comment - 1;
      };
      if (indexUser !== -1) {
        commentProduct.splice(indexUser, 1);
        state.lengthCommentProduct = state.lengthCommentProduct - 1;
      }
      message.success('Xóa Thành Công', 1.5);
    },
    // delete product
    [deleteToProduct.pending]: state => {
      state.loadingDelete = true
    },
    [deleteToProduct.fulfilled]: (state, action) => {
      const { product } = action.payload;
      const { productData } = state;
      const index = productData.findIndex(item => item._id === product._id);
      if (index >= 0) {
        productData.splice(index, 1);
        state.length = state.length - 1;
      }
      state.loadingDelete = false;
    },
    [deleteToProduct.rejected]: state => {
      state.loadingDelete = false;
    },

  }
});


const { reducer } = ProductSlice;
export default reducer;
