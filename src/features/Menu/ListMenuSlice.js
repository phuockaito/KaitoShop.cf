import { createSlice } from "@reduxjs/toolkit";
import { getMenu } from './pathAPI';

const ListMenuSlice = createSlice({
    name: 'menu',
    initialState: {
        listMenu: [],
        loading: true
    },
    reducers: {},
    extraReducers: {
        [getMenu.pending]: (state) => {
            state.loading = true;
        },
        [getMenu.rejected]: (state, action) => {
            state.loading = false;
        },
        [getMenu.fulfilled]: (state, action) => {
            state.loading = false;
            state.listMenu = action.payload;
        }
    }

});
const { reducer } = ListMenuSlice;
export default reducer;