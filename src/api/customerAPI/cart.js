import { axiosInstance } from "./fetcher.js";


export async function getCart(token) {
    return await axiosInstance.get("/myCart", {
        headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
        return response.data.result;
    });
}

export async function getNumberOfItemsInCart(token) {
    return await axiosInstance.get("/myCart/size", {
        headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
        return response.data.result;
    });
}

export async function addToCart(token, data) {
    return await axiosInstance.post("/addToCart", data, {
        headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
        return response.data.result;
    });
}   

export async function removeFromCart(token, data) {
    return await axiosInstance.post("/removeFromCart", data, {
        headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
        return response.data.result;
    });
}