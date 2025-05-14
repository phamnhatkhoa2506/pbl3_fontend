import axios from "axios";

import apiConfig from "../../js/config.js";

export const axiosInstance = axios.create({
    baseURL: apiConfig.baseUrl + apiConfig.customerBase,
});