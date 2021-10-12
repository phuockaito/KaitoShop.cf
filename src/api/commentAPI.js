import axiosClient from "./axiosClient";
const commentAPI = {
  getCommentOne: (params) => {
    const url = '/comments/get-comments';
    return axiosClient.get(url, { params });
  },
  deleteComment: (data, token) => {
    const url = `comments/delete-comments?id=${data._id}&_id_product=${data._id_product}`;
    return axiosClient.delete(url, null, token);
  }
};

export default commentAPI;