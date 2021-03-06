import { createSlice } from "@reduxjs/toolkit";

import { getSearch } from './patchAPI';
const SearchProductSlice = createSlice({
    name: 'search',
    initialState: {
        data: [],
        lenght: 0,
        loading: true,
    },
    extraReducers: {
        [getSearch.pending]: state => {
            state.loading = true;
        },
        [getSearch.rejected]: (state, action) => {
            state.loading = false;
        },
        [getSearch.fulfilled]: (state, action) => {
            state.data = action.payload.data;
            state.lenght = action.payload.lengthProducts;
            state.loading = false;
        }
    }
});
const { reducer } = SearchProductSlice;
export default reducer;