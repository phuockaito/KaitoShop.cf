import axiosClient from "./axiosClient";
const menuAPI = {
  getAll: () => {
    const url = '/menu';
    return axiosClient.get(url);
  },
};
export default menuAPI;