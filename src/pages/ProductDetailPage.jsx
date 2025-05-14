import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ConfirmModal from '../components/common/ConfirmModal.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { logout } from '../api/authenticateAPI/authenticate.js'
import { addToCart } from '../api/customerAPI/cart.js'
import { getNumberOfItemsInCart } from '../api/customerAPI/cart.js';
import { formatCurrency } from '../helpers/currency.js';
import { useNotification } from '../contexts/NotificationContext.jsx';

const ProductDetail = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [quantity, setQuantity] = useState(1);
    const [notifications, setNotifications] = useState([]);
    const [showPreConfirm, setShowPreConfirm] = useState(false); // Form xác nhận trước
    const [showPostConfirm, setShowPostConfirm] = useState(false); // Form đã thêm thành công
    const { showNotification } = useNotification();

    const product = state?.product || null;
    const loading = !state?.product;

    const originalPrice = product.price;
    const discountedPrice = product.discount > 0
        ? originalPrice * (1 - product.discount / 100)
        : originalPrice;

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };
    
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const confirmAddToCart = () => {
        setShowPreConfirm(true); // Mở form xác nhận đầu tiên
    };

    const handleConfirmAdd = async () => {
        setShowPreConfirm(false); // Đóng form xác nhận
        try {
            const token = localStorage.getItem("token");
            const payload = {
                productId: product.id,
                quantity: quantity,
            };
            const result = await addToCart(token, payload);
            showNotification("Đã thêm vào giỏ hàng", "success");

            if (result) {
                setQuantity(1);
                const numCartItems = await getNumberOfItemsInCart(token);
                localStorage.setItem("numCartItems", numCartItems);
                window.dispatchEvent(new Event("cartItemCountChanged"));
                setShowPostConfirm(true); // Mở form thành công
            }
        } catch (error) {
            setTimeout(() => {
                showNotification("Lỗi hệ thống, vui lòng đăng nhập lại!", "error");
            }, 3000);
            await logout()
            navigate('/login')
        }
    };

    if (loading) return <LoadingSpinner message="Đang tải thông tin sản phẩm" />;

    if (!product) {
        return (
            <div className="container py-4">
                <h4>Không tìm thấy thông tin sản phẩm.</h4>
                <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>Quay lại</button>
            </div>
        );
    }

    return (
        <>
            <div className="container">
                <div className="row bg-white shadow-sm rounded py-2 ">
                    <div className="col-md-5 text-center position-relative">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: '350px', objectFit: 'contain' }}
                        />
                    </div>
                    <div className="col-md-7 text-start">
                        <h5 className="fw-bold">{product.name}</h5>
                        <hr />
                        <p className="mb-1">Đơn vị tính: <span className="fw-bold text-success">{product.unit_price}</span></p>
                        <hr />
                        <p className="d-flex align-items-center justify-content-between">
                            Giá:
                            <span className="fs-5 fw-bold text-success">
                                {formatCurrency(product.price)} 
                                {product.discount > 0 && (
                                    <span className="badge ms-2" style={{ backgroundColor: 'green' }}>-{product.discount}%</span>
                                )}
                            </span>
                            {product.discount > 0 && (
                                <span className="text-muted text-decoration-line-through">
                                    {formatCurrency(discountedPrice)}
                                </span>
                            )}
                        </p>
                        <hr />
                        <p>Trạng thái: {product.quantity > 0
                            ? <span className="text-success fw-bold">Còn hàng</span>
                            : <span className="text-danger fw-bold">Hết hàng</span>}
                        </p>
                        <hr />
                        <div className="d-flex align-items-center mb-3">
                            <label className="me-3">Số lượng:</label>
                            <div className="input-group" style={{ width: '120px' }}>
                                <button className="btn btn-outline-secondary fw-bold" onClick={decreaseQuantity}>-</button>
                                <input
                                    type="text"
                                    className="form-control text-center"
                                    value={quantity}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (!isNaN(val) && val > 0) setQuantity(val);
                                    }}
                                />
                                <button className="btn btn-outline-secondary fw-bold" onClick={increaseQuantity}>+</button>
                            </div>
                        </div>
                        <hr />
                        <button
                            className="btn btn-success btn-md"
                            onClick={confirmAddToCart}
                        >
                            <i className="bi bi-cart-plus me-2"></i> Thêm vào giỏ hàng
                        </button>
                        <hr />
                        <h5 className="fw-semibold">Nhà cung cấp</h5>
                        <p><strong>Tên:</strong> {product.supplier.name}</p>
                        <p><strong>Địa chỉ:</strong> {product.supplier.address}</p>
                        <p><strong>Điện thoại:</strong> {product.supplier.phone}</p>
                        <p><strong>Email:</strong> {product.supplier.email}</p>
                    </div>
                </div>

                <ConfirmModal
                    isOpen={showPreConfirm}
                    onClose={() => setShowPreConfirm(false)}
                    onConfirm={handleConfirmAdd}
                    title="Xác nhận thêm vào giỏ hàng"
                    content="Bạn chắc chưa?"
                    confirmColor='success'
                />
                <ConfirmModal
                    isOpen={showPostConfirm}
                    onClose={() => setShowPostConfirm(false)}
                    onConfirm={() => navigate('/cart')}
                    title="Di chuyển đến giỏ hàng"
                    content="Bạn chắc chưa?"
                    confirmColor='success'
                />
            </div>
        </>
    );
};

export default ProductDetail;
