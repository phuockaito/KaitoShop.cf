import axiosClient from "./axiosClient";

const userAPI = {
  login: data => {
    const url = '/user/login';
    return axiosClient.post(url, data);
  },
  loginGoogle: tokenId => {
    const url = '/user/google-login';
    return axiosClient.post(url, { tokenId });
  },
  ChangePassword: (password, token) => {
    const url = '/user/change-password';
    return axiosClient.post(url, password, token);
  },
  profile: () => {
    const url = '/user/profile';
    return axiosClient.get(url);
  },
  register: data => {
    const url = '/user/register';
    return axiosClient.post(url, data);
  },
  activeEmail: accessToken => {
    const url = '/user/active-email';
    return axiosClient.post(url, accessToken);
  },
  forgotPassword: email => {
    const url = '/user/forgot-password';
    return axiosClient.post(url, email);
  },
  resetPassword: (data) => {
    const url = '/user/reset-password';
    return axiosClient.put(url, data);
  }
  ,
  updateInformationUser: (data, token) => {
    const url = '/user/update-information';
    return axiosClient.put(url, data, token);
  },
  uploadImage: (image, token) => {
    const url = '/user/update-image';
    return axiosClient.put(url, image, token);
  },
  diaryComment: (params, token) => {
    const url = '/comments/history-comments';
    return axiosClient.get(url, params, token);
  },
};
export default userAPI;