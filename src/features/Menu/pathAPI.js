import { createAsyncThunk } from "@reduxjs/toolkit";
import menuAPI from 'api/menuAPI';

export const getMenu = createAsyncThunk('getMenu', async () => {
    const response = await menuAPI.getAll();
    return response;
})