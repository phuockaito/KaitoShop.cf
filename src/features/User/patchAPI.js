import { createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from 'api/userAPI';

export const loginUser = createAsyncThunk('login', async (data) => {
    const response = await userAPI.login(data);
    return response;
});

export const getProfile = createAsyncThunk('profile', async () => {
    const response = await userAPI.profile();
    return response;
});

export const registerUser = createAsyncThunk('register', async (data) => {
    const response = await userAPI.register(data);
    return response;
});

export const updateNameSexUser = createAsyncThunk('update', async (data, token) => {
    const response = await userAPI.updateInformationUser(data, token);
    return response;
});

export const uploadImageUser = createAsyncThunk('upload', async (image, token) => {
    const response = await userAPI.uploadImage(image, token);
    return response;
});

export const getDiaryComment = createAsyncThunk('getDiaryComment', async (data, token) => {
    const response = await userAPI.diaryComment(data, token);
    return response;
})