import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductSlice from 'api/adminAPI';

export const getListProduct = createAsyncThunk('listProduct', async (params, token) => {
  const response = await ProductSlice.listProduct(params, token);
  return response;
});

export const postAddProduct = createAsyncThunk('addProduct', async (data, image, token) => {
  const response = await ProductSlice.addProduct(data, token);
  return response;
});

export const deleteProduct = createAsyncThunk('delete', async (id, token) => {
  const response = await ProductSlice.deleteProduct(id, token);
  return response;
})