import { axiosInstance } from "./fetcher.js";


export async function order(token) {
    return await axiosInstance.post("/order", 
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    ).then((response) => {
        localStorage.setItem("numCartItems", 0);
        window.dispatchEvent(new Event("cartItemCountChanged")); // Them Event cap nhat so luong item trong cart
        return response.data.result;
    });
}

export async function getOrderHistory(token) {
    return await axiosInstance.get("/order", 
        { headers: { Authorization: `Bearer ${token}` } }
    ).then((response) => {  
        return response.data.result;
    });
}