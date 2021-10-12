import axiosClient from "./axiosClient";
const cartAPI = {
    postToCartAPI: (data, token) => {
        const url = '/cart/add-cart';
        return axiosClient.post(url, data, token);
    },
    getToCartAPI: (token) => {
        const url = '/cart/get-cart';
        return axiosClient.get(url, null, token);
    },
    putToCartStatusOrderAPI: (data, token) => {
        const { id_card, data_card } = data;
        const url = `/cart/update-status-order?id_card=${id_card}`;
        return axiosClient.put(url, data_card, token);
    },
    putToCartAddressesAPI: (data, token) => {
        const { id_card, inForCart } = data;
        const url = `/cart/update-address?id_card=${id_card}`;
        return axiosClient.put(url, inForCart, token);
    },
    deleteToCartAPI: (id_card, token) => {
        
        const url = `/cart/delete-cart?id_cart=${id_card}`;
        return axiosClient.delete(url, null, token);
    }
};
export default cartAPI;