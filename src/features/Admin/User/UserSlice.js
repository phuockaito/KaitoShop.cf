import { createSlice } from '@reduxjs/toolkit';
import { getUser, getListCommentsUser, deleteCommentUser, deleteAccountUser } from './pathAPI';
import { message } from 'antd';
const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    lengthUser: 0,
    loading: false,
    // comments
    comment: [],
    lengthComment: 0,
    loadingComments: false,
    // delete account
    loadingDeleteAccount: false

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
    },
    // delete comments user
    [deleteCommentUser.fulfilled]: (state, action) => {
      const { length, id_comment, id_user } = action.payload;
      console.log(action)
      const { comment } = state;
      state.lengthComment = length;
      const indexCmt = comment.findIndex(cmt => cmt._id === id_comment);
      const indexUser = state.user.findIndex(ur => ur._id === id_user);
      if (indexCmt !== -1) {
        comment.splice(indexCmt, 1);
        message.success('Xóa Thành Công', 1.5);
      }
      if (indexUser !== -1) {
        state.user[indexUser].__v = length;
      }
    },
    [deleteCommentUser.rejected]: () => {
      message.error('Xóa thất bại !', 1.5);
    },
    // delete account user
    [deleteAccountUser.pending]: (state) => {
      state.loadingDeleteAccount = true;
    },
    [deleteAccountUser.fulfilled]: (state, action) => {
      const { id_user } = action.payload;
      const index = state.user.findIndex(ur => ur._id === id_user);
      if (index !== -1) {
        state.user.splice(index, 1);
        message.success('Xóa Thành Công', 1.5);
        state.lengthUser = state.lengthUser - 1;
      };
      state.loadingDeleteAccount = false;
    },
    [getListCommentsUser.rejected]: state => {
      state.loadingDeleteAccount = false;
    }
  }
});

const { reducer } = UserSlice;
export default reducer;