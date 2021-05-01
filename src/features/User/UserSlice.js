import { createSlice } from "@reduxjs/toolkit";
import { notification } from 'antd';
import {
  loginUser,
  getProfile,
  registerUser,
  postActiveEmail,
  uploadImageUser,
  getDiaryComment,
  loginGoogle,
  postForgotPassword,
  putResetPassword
} from "./patchAPI";
import { deleteComment } from "features/Comment/pathAPI";
import { message } from "antd";
const UserSlice = createSlice({
  name: "user",
  initialState: {
    userSlice: [],
    tokenSlice: null,
    loadingSlice: false,
    // history comment
    diaryComment: [],
    diaryCommentLength: 0,
    loadingDiaryComment: false,
    loadingGetProfile: false,
    isAdmin: false,
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loadingSlice = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { accessToken, user } = action.payload;
      state.userSlice = user;
      state.tokenSlice = accessToken;
      state.loadingSlice = false;
      if (user[0].role === 1) {
        state.isAdmin = true;
      }
      localStorage.setItem("token", accessToken);
    },
    [loginUser.rejected]: (state) => {
      state.loadingSlice = false;
      message.error("Tài khoản hoặc mật khẩu không đúng !");
    },// active email
    [postActiveEmail.pending]: state => {
      state.loadingSlice = true;
    },
    [postActiveEmail.fulfilled]: (state, action) => {
      state.loadingSlice = false;
      const { token, user } = action.payload;
      state.userSlice = user;
      if (user[0].role === 1) {
        state.isAdmin = true;
      }
      state.tokenSlice = token;
      localStorage.setItem("token", token);
    },
    [postActiveEmail.rejected]: (state) => {
      state.loadingSlice = false;
    },// for get password
    [postForgotPassword.fulfilled]: (state, action) => {
      notification['info']({
        message: 'Thông báo',
        description:
          'Vui lòng kiểm tra email để tạo mật khẩu mới',
      });
    },
    [postForgotPassword.rejected]: () => {
      notification['error']({
        message: 'Thông báo',
        description:
          'Email này không có trong hệ thống',
      });
    },
    // login google
    [loginGoogle.pending]: (state) => {
      state.loadingSlice = true;
    },
    [loginGoogle.rejected]: (state) => {
      state.loadingSlice = false;
      message.error("Tài khoản hoặc mật khẩu không đúng !");
    },
    [loginGoogle.fulfilled]: (state, action) => {
      const { accessToken, user } = action.payload;
      if (user[0].role === 1) {
        state.isAdmin = true;
      }
      const token = accessToken;
      state.userSlice = user;
      state.tokenSlice = token;
      state.loadingSlice = false;
      localStorage.setItem("token", token);
    },// get when token
    [getProfile.pending]: (state) => {
      state.loadingGetProfile = true;
    },
    [getProfile.fulfilled]: (state, action) => {
      const { user } = action.payload;
      if (user[0].role === 1) {
        state.isAdmin = true;
      }
      state.userSlice = user;
      state.loadingGetProfile = false;
      state.tokenSlice = localStorage.getItem("token");
    },
    [getProfile.rejected]: (state) => {
      state.userSlice = [];
      localStorage.removeItem("token");
      state.tokenSlice = null;
      state.loadingGetProfile = false;
    }, // post register user
    [registerUser.pending]: (state) => {
      state.loadingSlice = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.loadingSlice = false;
      notification['info']({
        message: 'Thông báo',
        description: 'Vui lòng kiểm tra email để kích hoạt tài khoản',
      });
    },
    [registerUser.rejected]: (state) => {
      state.loadingSlice = false;
    },// reset password
    [putResetPassword.fulfilled]: (state, action) => {
      state.loadingSlice = false;
      const { token, user } = action.payload;
      state.userSlice = user;
      if (user[0].role === 1) {
        state.isAdmin = true;
      }
      state.tokenSlice = token;
      localStorage.setItem("token", token);
    },
    //upload Image
    [uploadImageUser.fulfilled]: (state, action) => {
      state.userSlice = action.payload.data;
    },//  Diary Comment user
    [getDiaryComment.pending]: (state) => {
      state.loadingDiaryComment = true;
    },
    [getDiaryComment.fulfilled]: (state, action) => {
      const { comment, length } = action.payload;
      state.loadingDiaryComment = false;
      state.diaryComment = comment;
      state.diaryCommentLength = length;
    },
    [getDiaryComment.rejected]: state => {
      state.loadingDiaryComment = false;
    },// delete comment
    [deleteComment.fulfilled]: (state, action) => {
      const id = action.payload.data._id;
      const index = state.diaryComment.findIndex(
        (comment) => comment._id === id
      );
      state.diaryComment.splice(index, 1);
      state.diaryCommentLength = state.diaryCommentLength - 1;
    },
  },
});
const { reducer } = UserSlice;
export default reducer;
