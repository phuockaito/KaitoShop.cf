import { createSlice } from '@reduxjs/toolkit';
import { getUser, getListCommentsUser } from './pathAPI';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    lengthUser: 0,
    loading: false,
    // comments
    comment: [],
    lengthComment: 0,
    loadingComments: false
  },
  extraReducers: {
    // get list users
    [getUser.pending]: state => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      const { length, user } = action.payload;
      state.loading = false;
      state.user = user;
      state.lengthUser = length;
    },
    [getUser.rejected]: state => {
      state.loading = false;
    },
    // get list comment user
    [getListCommentsUser.pending]: state => {
      state.loadingComments = true;
    },
    [getListCommentsUser.fulfilled]: (state, action) => {
      const { comment, length } = action.payload;
      state.comment = comment;
      state.lengthComment = length;
      state.loadingComments = false;
    },
    [getListCommentsUser.rejected]: state => {
      state.loadingComments = false;
    }
  }
});

const { reducer } = UserSlice;
export default reducer;