import axios from "axios";

import apiConfig from "../../js/config.js";

const productAPI = axios.create({
    baseURL: apiConfig.baseUrl + apiConfig.productBase
})

async function searchProducts(query) {
    try {
        console.log(apiConfig.baseUrl + apiConfig.productBase)
        const response = await productAPI.get("search", { params: { key: query } });
        console.log("Response data:", response.data.result);
        return response.data.result;
    } catch (error) {
        console.error("Error searching products:", error);
        throw error;
    }
}

export default searchProducts;