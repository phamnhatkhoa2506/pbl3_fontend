import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';

import ConfirmModal from '../components/common/ConfirmModal';
import { formatCurrency } from '../helpers/currency';
import { order } from '../api/customerAPI/order'; 
import { useNotification } from '../contexts/NotificationContext'

import '../styles/pages/OrderPage.css';

const OrderPage = () => {
    const location = useLocation();
    const { orderItems } = location.state || { orderItems: [] };
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    const [paymentMethod, setPaymentMethod] = useState(null);  // Track payment method
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const { showNotification } = useNotification()

    const options = [
        { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)' },
        { value: 'bank', label: 'Chuyển khoản ngân hàng' },
        { value: 'wallet', label: 'Thanh toán qua ví điện tử' },
    ];

    const totalAmount = orderItems.reduce(
        (acc, item) => acc + item.product.price * (100 - item.product.discount) / 100 * item.quantity,
        0
    );

    const handleConfirm = () => {
        if (paymentMethod === null) {
            showNotification('Hãy chọn phương thức thanh toán!', 'error');
            return;
        }

        setShowConfirm(true);
    }
    const handleConfirmPayment = async () => {
        if (paymentMethod === 'cod') {
            const token = localStorage.getItem('token'); // Get user token from localStorage

            try {
                const result = await order(token);
                if (result) {
                    showNotification('Đặt hàng thành công!', 'success');
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                }   
            } catch (error) {
                showNotification("Đặt hàng không thành công. Vui lòng thử lại.", 'error');
                console.error(error);
            }
        }
        else if (paymentMethod === 'bank') {
            showNotification('Chuyển khoản trang thanh toán bằng ngân hàng', 'success');
            setTimeout(() => {
                navigate('/order/payment/bank', { state: {allowOrder: true, allowPayment: true}});
            }, 1000);
        }
        else {
            showNotification('Chuyển khoản trang thanh toán bằng ví điện tử', 'success');
            setTimeout(() => {
                navigate(
                    '/order/payment/e-wallet', 
                    { state: {
                        allowOrder: true  , 
                        allowPayment: true
                    }
                });
            }, 1000);
        }
    };

    return (
        <>
            <div className="container my-3" style={{ maxWidth: '700px' }}>
                {/* Thông tin khách hàng */}
                <div className="card mb-4 p-4 shadow-sm border-0">
                    <h5 className="fw-bold mb-3 border-bottom pb-2">Thông Tin Khách Hàng</h5>
                    <div className="row mb-2">
                        <div className="col-4 text-muted text-start">Khách hàng:</div>
                        <div className="col-8 text-capitalize fw-semibold text-end">{userInfo?.firstName} {userInfo?.lastName}</div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4 text-muted text-start">Số điện thoại:</div>
                        <div className="col-8 fw-semibold text-end">{userInfo?.phone}</div>
                    </div>
                    <div className="row">
                        <div className="col-4 text-muted text-start">Địa chỉ giao hàng:</div>
                        <div className="col-8 fw-semibold text-end">{userInfo?.address}</div>
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="card p-4 mb-4 shadow-sm border-0">
                    <h5 className="fw-bold mb-3 border-bottom pb-2">Sản Phẩm Đã Chọn</h5>
                    {orderItems.length === 0 ? (
                        <div className="text-center text-muted">Không có sản phẩm trong đơn hàng.</div>
                    ) : (
                        orderItems.map((item, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-center justify-content-between py-3 border-bottom"
                            >
                                <div className="d-flex align-items-center">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="me-3 rounded"
                                        style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                    />
                                    <div className='text-start'>
                                        <div className="fw-bold text-danger">{item.product.name}</div>
                                        <div className="text-muted small">
                                        <span className='fw-bold'>Số lượng:</span> {item.quantity} x {item.product.unit_price}
                                        </div>
                                        <div className=''><span className='fw-bold'>Giá:</span> {formatCurrency(item.product.price * (100 - item.product.discount) / 100)}</div>
                                    </div>
                                </div>
                                <div className="fw-bold text-end text-danger" style={{ minWidth: '100px' }}>
                                    {formatCurrency(formatCurrency(item.product.price * (100 - item.product.discount) / 100  * item.quantity))}
                                </div>
                            </div>
                        ))
                    )}
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <div className="fw-bold">Tổng tiền:</div>
                        <div className="fw-bold fs-5 text-muted">{formatCurrency(totalAmount)}</div>
                    </div>
                </div>

                {/* Phương thức thanh toán */}
                <div className="card p-4 mb-4 shadow-sm border-0">
                    <h5 className="fw-bold mb-3 border-bottom pb-2">Phương Thức Thanh Toán</h5>
                    <Select
                        options={options}
                        placeholder="Chọn phương thức thanh toán"
                        onChange={(selectedOption) => setPaymentMethod(selectedOption?.value)}
                        styles={{
                            control: (base) => ({
                                ...base,
                                minHeight: 45,
                                fontSize: 16,
                                borderRadius: 8,
                            }),
                            singleValue: (base) => ({
                                ...base,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }),
                        }}
                    />
                </div>

                {/* Nút xác nhận */}
                <div className="d-grid gap-2">
                    <button
                        className="confirm-btn btn btn-lg fw-bold"
                        style={{ backgroundColor: 'rgb(247, 247, 67)', color: 'rgb(25, 25, 141)' }}
                        onClick={handleConfirm}
                    >
                        Xác Nhận Thanh Toán
                    </button>
                </div>

                <ConfirmModal
                    isOpen={showConfirm}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleConfirmPayment}
                    title="Xác nhận thanh toán"
                    content="Bạn chắc chưa?"
                    confirmColor='success'
                />
            </div>
        </>
    );
};

export default OrderPage;
