import { axiosInstance } from "./fetcher.js";

async function register(data) {
    return await axiosInstance.post("", data).then((response) => {
        return response.data;
    });
}

export default register;