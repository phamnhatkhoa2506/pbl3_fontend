import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentRoute = ({ children }) => {
    const { state } = useLocation();

    if (!state?.allowOrder || !state?.allowPayment) {
        // Không Navigate nữa, mà hiện thông báo lỗi ngay tại URL hiện tại
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>🚫 Bạn không có quyền truy cập vào trang payment này.</h2>
                <p>Vui lòng thực hiện các bước cần thiết trước khi truy cập.</p>
            </div>
        );
    }

    return children
};

export default PaymentRoute;
