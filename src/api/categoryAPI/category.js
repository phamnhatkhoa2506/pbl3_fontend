import axios from "axios";

import apiConfig from "../../js/config.js"

const categoryApi = axios.create({
  baseURL: apiConfig.baseUrl + apiConfig.categoryBase
});

async function getCategoryList() {
    try {
        const response = await categoryApi.get("all");
        
        return response.data.result;
    } catch (error) {
        console.error("Error fetching category list:", error);
        throw error;
    }
}

export default getCategoryList;