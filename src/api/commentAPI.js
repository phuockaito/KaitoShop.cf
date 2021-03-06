import axiosClient from "./axiosClient";
const commentAPI = {
    getCommentOne: (params) => {
        const url = '/comments/get-comments';
        return axiosClient.get(url, { params });
    },
    createComment: (data, token) => {
        const url = '/comments/create-commnet';
        return axiosClient.post(url, data, token);
    },
    deleteComment: (data, token) => {
        const url = `comments/delete-comments?id=${data._id}&_id_product=${data._id_product}`;
        return axiosClient.delete(url, null, token);
    }
};

export default commentAPI;