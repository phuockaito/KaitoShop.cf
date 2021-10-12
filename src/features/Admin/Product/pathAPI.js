import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductSlice from 'api/adminAPI';

export const getListProduct = createAsyncThunk('listProduct', async (params, token) => {
  const response = await ProductSlice.listProduct(params, token);
  return response;
});

export const getCommentProduct = createAsyncThunk('commentProduct', async (params, token) => {
  const response = await ProductSlice.CommentProduct(params, token);
  return response;
});

export const postAddProduct = createAsyncThunk('addProduct', async (data, image, token) => {
  const response = await ProductSlice.addProduct(data, token);
  return response;
});

export const deleteToProduct = createAsyncThunk('delete', async (id, token) => {
  const response = await ProductSlice.deleteProduct(id, token);
  return response;
});

export const updateToProduct = createAsyncThunk('putProduct', async (data, token) => {
  const response = await ProductSlice.updateProduct(data, token);
  return response;
});