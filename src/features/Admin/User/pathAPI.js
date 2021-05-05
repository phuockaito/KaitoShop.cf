import { createAsyncThunk } from "@reduxjs/toolkit";
import UserSlice from 'api/adminAPI';

export const getUser = createAsyncThunk('getUser', async (params, token) => {
  const response = await UserSlice.getAllUser(params, token);
  return response;
});

export const getListCommentsUser = createAsyncThunk('listCommentUser', async (params, token) => {
  const response = await UserSlice.getListCommentsUser(params, token);
  return response;
});
