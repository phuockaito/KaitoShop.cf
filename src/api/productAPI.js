import axiosClient from "./axiosClient";
const productAPI = {
    getProductAll: (params) => {
        const url = '/products/get-product';
        return axiosClient.get(url, { params });
    },
    getProductSlider: (params) => {
        const url = 'products/type';
        return axiosClient.get(url, { params });
    },
    getProductType: params => {
        const url = 'products/type';
        return axiosClient.get(url, { params });
    },
    getProductId: params => {
        const url = `products/get-one-product?id=${params}`;
        return axiosClient.get(url);
    },
    getProductTrademarkType: params => {
        const url = `products/${params.key}/${params.NSX}?page=${params.page}&sort_price=${params.sort_price}`;
        return axiosClient.get(url);
    }
}

export default productAPI;