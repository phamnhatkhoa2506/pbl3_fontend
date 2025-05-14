import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatCurrency } from '../../helpers/currency';
import { addToCart, removeFromCart } from '../../api/customerAPI/cart';

const CartItem = ({ item, onRemoveItem, onNotify, onUpdateQuantity }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(item.quantity);

    const product = item.product;

    const goToDetailPage = () => {
        navigate(`/products/${item.product.id}`, { state: { product } });
    };

    const handleIncrease = async (e) => {
        e.stopPropagation(); // Ngăn việc click lan lên thẻ cha (navigate sang trang chi tiết)
        
        try {
            if (quantity >= item.product.quantity) {
                onNotify("Số lượng hàng không đủ", "error");
                return
            }
            
            const token = localStorage.getItem("token");
            const payload = {
                productId: product.id,
                quantity: 1,
            };
            const result = await addToCart(token, payload);
    
            if (result) {
                const newQuantity = quantity + 1;
                setQuantity(newQuantity);
                onUpdateQuantity(product.id, newQuantity); // <-- báo lên CartPage
            }
        } catch (error) {
            onNotify("Lỗi khi thêm vào giỏ", "error");
        }
    };

    const handleDecrease = async (e) => {
        e.stopPropagation();

        try {
            if (quantity <= 1) {
                onNotify("Số lượng hàng đạt tối thiểu", "error");
                return
            }

            const token = localStorage.getItem("token"); // hoặc từ context, state tùy bạn đang quản lý auth như nào
            const payload = {
                productId: product.id,
                quantity: 1, // hoặc số lượng bạn muốn thêm
            };
            const result = await removeFromCart(token, payload);

            if (result) {
                const newQuantity = quantity - 1;
                setQuantity(newQuantity);
                onUpdateQuantity(product.id, newQuantity); // <-- báo lên CartPage
            }
        } catch (error) {
            onNotify("Giảm số lượng thất bại", "error");
        }
    };

    const handleRemoveAll = async (e) => {
        e.stopPropagation();
        
        try {
            const token = localStorage.getItem("token");
            const payload = {
                productId: product.id,
                quantity: quantity,
            };
            const result = await removeFromCart(token, payload);

            if (result) {
                onRemoveItem(product.id); // Thông báo CartPage xoá khỏi UI
                onNotify("Đã xóa sản phẩm khỏi giỏ hàng", "success");

                localStorage.setItem("numCartItems", parseInt(localStorage.getItem("numCartItems")) - 1);
                window.dispatchEvent(new Event("cartItemCountChanged")); // Them Event cap nhat so luong item trong cart
            }
        } catch (error) {
            onNotify("Xóa sản phẩm thất bại, hãy thử lại!", "error");
        }
    };

    return (
        <div className="d-flex border-bottom py-3 align-items-center small">
            {/* Ảnh sản phẩm */}
            <img
                src={item.product.imageUrl}
                alt={item.product.name}
                width={64}
                height={64}
                className="rounded"
                onClick={goToDetailPage}
                style={{ objectFit: 'cover', cursor: 'pointer' }}
            />

            {/* Thông tin sản phẩm */}
            <div className='d-md-flex flex-grow-1 justify-content-between align-items-center ms-3'>
                <div className="px-3 d-flex flex-column justify-content-start align-items-start flex-grow-1">
                    <div className="fw-semibold text-start" onClick={goToDetailPage} style={{ cursor: 'pointer' }}>{item.product.name}</div>
                    <div className="text-muted">DVT: {item.product.unit_price}</div>
                </div>

                {/* Giá, số lượng và xoá */}
                <div className="d-flex flex-grow-1 justify-content-end align-items-center gap-3">
                    <div className="text-end">
                        <div className="text-muted text-decoration-line-through mb-1">{formatCurrency(item.product.price)}</div>
                        <div className="text-danger fw-bold mb-2">{formatCurrency(item.product.price * (100 - item.product.discount) / 100)}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className="d-flex align-items-center justify-content-end gap-1">
                            <button 
                                className="btn btn-outline-danger btn-sm px-2"
                                onClick={handleDecrease}
                            >–</button>
                            <input
                                type="text"
                                className="form-control form-control-sm text-center"
                                value={quantity}
                                readOnly
                                style={{ width: 40 }}
                            />
                            <button 
                                className="btn btn-outline-danger btn-sm px-2"
                                onClick={handleIncrease}
                            >+</button>
                            <button 
                                className="btn fw-bold text-danger p-0 fs-5 ms-2"
                                onClick={handleRemoveAll}
                            >×</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
