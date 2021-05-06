import { createSlice } from "@reduxjs/toolkit";
import { getCommentOne, deleteComment } from './pathAPI';
import { message } from 'antd';
const CommentSlice = createSlice({
  name: 'comment',
  initialState: {
    data: [],
    length: 0,
    loading: true,
    loadingDeleteCmtAPI: false
  },
  extraReducers: {
    // get comment
    [getCommentOne.pending]: (state) => {
      state.loading = true;
    },
    [getCommentOne.fulfilled]: (state, action) => {
      state.loading = false;
      state.length = action.payload.length;
      state.data = action.payload.data;
    },
    [getCommentOne.rejected]: (state, action) => {
      state.loading = false;
    },

    // delete comment
    [deleteComment.pending]: (state) => {
      state.loadingDeleteCmtAPI = true;
    },
    [deleteComment.rejected]: (state) => {
      state.loadingDeleteCmtAPI = false;
    },
    [deleteComment.fulfilled]: (state, action) => {
      const id = action.payload.data._id;
      const index = state.data.findIndex(comment => comment._id === id);
      if (index !== -1) {
        state.data.splice(index, 1);
        state.length = action.payload.length;
        state.loadingDeleteCmtAPI = false;
        message.success('Xóa Thành Công', 1.5);
      }
    }
  }

});
const { reducer } = CommentSlice;
export default reducer;