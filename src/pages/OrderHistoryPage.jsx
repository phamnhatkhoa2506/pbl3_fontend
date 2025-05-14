import { useEffect, useState } from "react";
import { getOrderHistory } from "../api/customerAPI/order.js";
import OrderedCard from "../components/order/OrderedCard"; // import component mới

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const data = await getOrderHistory(token);
            setOrders(data);
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <h3 className="text-center fw-bold">Lịch sử đơn hàng</h3>

            <div className="d-flex flex-column gap-2">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <OrderedCard key={index} order={order} />
                    ))
                ) : (
                    <p className="text-center text-muted">Bạn chưa có đơn hàng nào.</p>
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
