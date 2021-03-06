import { createSlice } from "@reduxjs/toolkit";
import { getCommentOne, postComment, deleteComment } from './pathAPI';
import { message } from 'antd';
import $ from "jquery";
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
        [getCommentOne.rejected]: (state, action) => {
            state.loading = false;
        },
        [getCommentOne.fulfilled]: (state, action) => {
            state.loading = false;
            state.length = action.payload.length;
            state.data = action.payload.data;
        },// post comment
        [postComment.pending]: (state) => {
            state.loading = true;
        },
        [postComment.rejected]: (state, action) => {
            state.loading = false;
        },
        [postComment.fulfilled]: (state, action) => {
            state.length = action.payload.length;
            state.data.unshift(action.payload.data);
            state.loading = false;
            $("body,html").animate({ scrollTop: $(".item-comment").offset().top - 90 }, 500);
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
            state.data.splice(index, 1);
            state.length = action.payload.length;
            state.loadingDeleteCmtAPI = false;
            message.success('Xóa Thành Công', 1.5);
        }
    }

});
const { reducer } = CommentSlice;
export default reducer;