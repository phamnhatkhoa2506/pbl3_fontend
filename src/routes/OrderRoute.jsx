import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderRoute = ({ children }) => {
    const { state } = useLocation();

    // chỉ cho phép nếu navigate đến đây kèm allowOrder === true
    if (!state?.allowOrder) {
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <h2>🚫 Bạn chưa đi qua Cart, không thể vào Order!</h2>
            </div>
        );
    }
    
    return children;
};

export default OrderRoute;
