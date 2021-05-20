import { createAsyncThunk } from "@reduxjs/toolkit";
import cartAPI from 'api/cartAPI';
export const postCartAPI = createAsyncThunk('postCart', async (data, token) => {
  const response = await cartAPI.postToCartAPI(data, token);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response)
    }, 1300);
  })
});

export const getCartAPI = createAsyncThunk('getCart', async (token) => {
  const response = await cartAPI.getToCartAPI(token);
  return response;
});

export const putCartStatusOrderAPI = createAsyncThunk('putCartStatus', async (data, token) => {
  const response = await cartAPI.putToCartStatusOrderAPI(data, token);
  return response;
});

export const putCartAddressesAPI = createAsyncThunk('putCartAddress', async (data, token) => {
  const response = await cartAPI.putToCartAddressesAPI(data, token);
  return response;
});

export const deleteCartAPI = createAsyncThunk('deleteCart', async (id_card, token) => {
  const response = await cartAPI.deleteToCartAPI(id_card, token);
  return response;
});