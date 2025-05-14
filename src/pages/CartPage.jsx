import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatCurrency } from '../helpers/currency.js';
import { getCart } from '../api/customerAPI/cart.js';
import { useNotification } from '../contexts/NotificationContext.jsx';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ConfirmModal from '../components/common/ConfirmModal.jsx';

import '../styles/pages/CartPage.css';

const CartPage = () => {    
    const [cartItems, setCartItems] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(true);
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');

                const data = await getCart(token);
                setCartItems(data || []);
            } catch (error) {
                console.error('Lỗi khi lấy giỏ hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);    

    const handleRemoveItem = (productId) => {
        setCartItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const calculateTotals = () => {
        let total = 0;
        let saved = 0;
        const shippingFee = 0;
    
        cartItems.forEach(item => {
            const price = item.product.price;
            const discount = item.product.discount;
            const discountedPrice = price * (1 - discount / 100);
    
            total += discountedPrice * item.quantity;
            saved += (price - discountedPrice) * item.quantity;
        });
    
        return {
            total,
            saved,
            shippingFee,
            finalTotal: total + shippingFee,
        };
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        setCartItems(prev => 
            prev.map(item => 
                item.product.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            showNotification('Giỏ hàng trống, không thể thanh toán!', 'error');
            return;
        }
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        setShowConfirm(false);
        showNotification('Chuyển đến trang thanh toán', 'success');
    
        setTimeout(() => {
            navigate('/order', { 
                state: { orderItems: cartItems, allowOrder: true, }
            });
        }, 10); // delay nhẹ để chắc chắn context update
    };
    

    const { total, saved, shippingFee, finalTotal } = calculateTotals();

    if (loading) {
        return <LoadingSpinner message="Đang tải giỏ hàng" />
    }

    return (
        <>
            <div className="container mt-4 mb-5">
                <h5 className="fw-bold mb-4">Giỏ hàng</h5>
                <div className="row">
                    {/* Bên trái: danh sách sản phẩm */}
                    <div className="col-md-8">
                        {cartItems.map((item, index) => (
                            <CartItem 
                                key={index} 
                                item={item} 
                                onRemoveItem={handleRemoveItem} 
                                onNotify={showNotification}
                                onUpdateQuantity={handleUpdateQuantity}
                            /> 
                        ))}
                    </div>

                    {/* Bên phải: tóm tắt thanh toán */}
                    <div className="col-md-4">
                        <CartSummary
                            total={formatCurrency(total)}
                            saved={formatCurrency(saved)}
                            shippingFee={formatCurrency(shippingFee)}
                            finalTotal={formatCurrency(finalTotal)}
                            onCheckout={handleCheckout} // truyền prop
                        />
                    </div>

                    <ConfirmModal
                        isOpen={showConfirm}
                        onClose={() => setShowConfirm(false)}
                        onConfirm={handleConfirm}
                        title="Xác nhận thanh toán"
                        content="Bạn có chắc chắn muốn thanh toán đơn hàng này không?"
                    />
                </div>
            </div>
        </>
    );
};

export default CartPage;
