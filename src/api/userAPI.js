import axiosClient from "./axiosClient";

const userAPI = {
    login: data => {
        const url = '/user/login';
        return axiosClient.post(url, data);
    },
    profile: () => {
        const url = '/user/profile';
        return axiosClient.get(url);
    },
    register: data => {
        const url = '/user/register';
        return axiosClient.post(url, data);
    },
    updateInformationUser: (data, token) => {
        const url = '/user/updata-informaiton';
        return axiosClient.put(url, data, token);
    },
    uploadImage: (image, token) => {
        const url = 'user/updata-image';
        return axiosClient.put(url, image, token);
    },
    diaryComment: (data, token) => {
        const url = `comments/history-comments?page=${data.page}&iteml=${data.iteml}`;
        return axiosClient.get(url, null, token);
    }

};
export default userAPI;