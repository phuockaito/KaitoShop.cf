import { createAsyncThunk } from "@reduxjs/toolkit";
import productAPI from 'api/productAPI';

export const getProductAll = createAsyncThunk('getProductAll', async (params) => {
  const response = await productAPI.getProductAll(params);
  return response;
});

export const getProductSlider = createAsyncThunk('getProductSlider', async (params) => {
  const response = await productAPI.getProductSlider(params);
  return response;
});

export const getProductType = createAsyncThunk('getProductType', async (params) => {
  const response = await productAPI.getProductType(params);
  return response;
});

export const getProductId = createAsyncThunk('getProductId', async (params) => {
  const response = await productAPI.getProductId(params);
  return response;
});

export const getProductTrademarkType = createAsyncThunk('trademarkType', async (params) => {
  const response = await productAPI.getProductTrademarkType(params);
  return response;
});
