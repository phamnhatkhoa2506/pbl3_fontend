import axios from "axios";
import apiConfig from "../../js/config.js";
import { getCustomerInfo } from '../customerAPI/customer.js'
import { getNumberOfItemsInCart } from '../customerAPI/cart.js'

axios.defaults.baseURL = apiConfig.baseUrl + apiConfig.authenticateBase;

async function login(data) {
    const response = await axios.post("login", data);

    if (response.data?.result?.token) {
        const token = response.data.result.token;
        localStorage.setItem("token", token); // Lưu token vào localStorage
        localStorage.setItem("user", JSON.stringify(response.data.result));  // Optional: cũng có thể lưu user info khác nếu có

        const userInfo = await getCustomerInfo(token); // Lấy thông tin người dùng từ API
        localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Lưu thông tin người dùng vào localStorage

        const numCartItems = await getNumberOfItemsInCart(token); // Lấy số lượng sản phẩm trong giỏ hàng
        localStorage.setItem("numCartItems", numCartItems); // Lưu số lượng sản phẩm vào localStorage

        return response.data.result; // hoặc response.data nếu bạn muốn giữ nguyên toàn bộ
    } else {
        throw new Error("Login failed: No token received");
    }
}


async function logout() {
    // const token = localStorage.getItem("token")
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // const response = await axios.post("logout", data, { headers: { Authorization: `Bearer ${token}` } });

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('numCartItems');
    window.dispatchEvent(new Event("cartItemCountChanged")); // Thông báo cho các component khác biết số lượng giỏ hàng đã thay đổi
}


export {login, logout};