import axiosClient from "./axiosClient";

const adminAPI = {
  //------------------cart------------------
  getCart: (params) => {
    const url = '/admin/get-cart';
    return axiosClient.get(url, { params });
  },
  checkOutCart: (id_cart, token) => {
    const url = `/admin/check-out-cart?id_cart=${id_cart}`;
    return axiosClient.put(url, null, token);
  },
  deleteCart: (id_cart, token) => {
    const url = `/admin/delete-cart?id_cart=${id_cart}`;
    return axiosClient.delete(url, null, token);
  },
  messagesCart: ({ message, id_cart }, token) => {
    const url = `/admin/messages-cart?id_cart=${id_cart}`;
    return axiosClient.post(url, { message }, token);
  },
  //------------------Product------------------
  listProduct: (params, token) => {
    const url = "/admin/list-product";
    return axiosClient.get(url, { params }, token);
  },
  CommentProduct: (params, token) => {
    const url = "/admin/get-comments-product";
    return axiosClient.get(url, { params }, token);
  },
  addProduct: (data, token) => {
    const url = "/admin/add-product";
    return axiosClient.post(url, data, token);
  },
  deleteProduct: (id, token) => {
    const url = `/admin/delete-product?id_product=${id}`;
    return axiosClient.delete(url, null, token);
  },
  updateProduct: (data, token) => {
    const url = "/admin/update-product";
    return axiosClient.put(url, data, token);
  },
  //------------------user------------------
  getAllUser: (params, token) => {
    const url = "/admin/get-users";
    return axiosClient.get(url, { params }, token);
  },
  getListCommentsUser: (params, token) => {
    const url = "/admin/get-list-comments-user";
    return axiosClient.get(url, { params }, token);
  },
  getListCommentsCart: (params, token) => {
    const url = "/admin/get-list-cart-user";
    return axiosClient.get(url, { params }, token);
  },
  deleteCommentUser: (params, token) => {
    const url = "/admin/delete-comments-user";
    return axiosClient.delete(url, { params }, token);
  },
  deleteAccountUser: (params, token) => {
    const url = "/admin/delete-account-user";
    return axiosClient.delete(url, params, token);
  },
  postActiveRoleUser: (id_user, token) => {
    const url = "/admin/active-role-user";
    return axiosClient.post(url, id_user, token);
  },
  deleteAllCart: (id_user, token) => {
    const url = `/admin/delete-all-cart?_id_user=${id_user}`;
    return axiosClient.delete(url, null, token);
  },
};
export default adminAPI;