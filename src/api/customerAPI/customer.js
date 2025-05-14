import { axiosInstance } from "./fetcher.js";


export async function getCustomerInfo(token) {
    const response = await axiosInstance.get("/myInfo", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.result;
}


export async function updateCustomerInfo(id, token, data) {
    return await axiosInstance.patch(`/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
        return response.data.result;
    });
}


export async function updatePassword(token, data) {
    return await axiosInstance.patch(`/pass`, data, {
        headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
        return response.data.result;
    });
}


export async function deleteCustomer(id, token) {
    return await axiosInstance.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
        return response.data.result;
    });
}
