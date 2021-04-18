import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  getProfile,
  registerUser,
  uploadImageUser,
  getDiaryComment,
  loginGoogle
} from "./patchAPI";
import { deleteComment } from "features/Comment/pathAPI";
import { message } from "antd";
const UserSlice = createSlice({
  name: "name",
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
    },
    // get when token
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
    [registerUser.rejected]: (state) => {
      state.loadingSlice = false;
      message.error("Tài khoản này đã tồn tại !");
    },
    [registerUser.fulfilled]: (state, action) => {
      const { token, data } = action.payload;
      state.loadingSlice = false;
      localStorage.setItem("token", token);
      state.userSlice = data;
      state.tokenSlice = token;
    }, //upload Image
    [uploadImageUser.fulfilled]: (state, action) => {
      state.userSlice = action.payload.data;
    },
    //  Diary Comment user
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
    },

    // delete comment
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
