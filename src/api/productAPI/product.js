import axios from "axios";

import apiConfig from "../../js/config.js";

const productAPI = axios.create({
    baseURL: apiConfig.baseUrl + apiConfig.productBase,
    headers: {
        'Content-Type': 'application/json',
    },
})

export async function getAllProducts() {
    try {
        const response = await productAPI.get("all");
        
        console.log("Data", response.data.result)
        return response.data.result;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function getProductById(id) {
    try {
        const response = await productAPI.get(`${id}`);
        return response.data.result;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
}

export async function getProductsByCategory(id) {
    try {
        const response = await productAPI.post("searchByCategories", 
            { 
                categoryIds: id 
            }
        );

        return response.data.result;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        throw error;
    }
}