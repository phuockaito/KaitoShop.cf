import { createSlice } from '@reduxjs/toolkit';
import { getUser } from './pathAPI';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    data: [],
    length: 0
  },
  extraReducers: {
    [getUser.pending]: state => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      const { length, user } = action.payload;
      state.loading = false;
      state.data = user;
      state.length = length;
    },
    [getUser.rejected]: state => {
      state.loading = false;
    }
  }
});

const { reducer } = UserSlice;
export default reducer;