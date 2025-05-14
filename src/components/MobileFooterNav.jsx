import React, { useEffect, useState } from 'react';

import '../styles/components/MobileFooterNav.css';

const MobileFooterNav = () => {
    const [username, setUsername] = useState(null);
    const [cartCount, setCartCount] = useState(0); // Số lượng sản phẩm trong giỏ hàng (giả lập)

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userInfo'));
        const token = localStorage.getItem('token');

        if (userData) {
            setUsername(userData.lastName);
        }

        const updateCartCount = () => {
            const count = localStorage.getItem('numCartItems');
            setCartCount(count ? parseInt(count) : 0);
        };

        if (token) updateCartCount();

        window.addEventListener("cartItemCountChanged", updateCartCount); // Lắng nghe sự kiện thay đổi

        return () => {
            window.removeEventListener("cartItemCountChanged", updateCartCount);
        };
    }, []);
    
    return (
        <nav className="mobile-footer-nav">
            <a href="/">
                <i className="bi bi-house"></i>
                <span>Trang chủ</span>
            </a>

            <div className="cart-btn-wrapper position-relative">
                <span className="cart-badge d-flex align-items-center justify-content-center fw-bold bg-danger">{cartCount}</span>
                <a href="/cart">
                    <i className="bi bi-cart3"></i>
                    <span>Giỏ hàng</span>
                </a>
            </div>

            <a href="/categories">
                <i className="bi bi-grid"></i>
                <span>Danh mục</span>
            </a>

            <a href="/notifications">
                <i className="bi bi-bell"></i>
                <span>Thông báo</span>
            </a>

            {username ? (
                <a href="/my-setting">
                    <i className="bi bi-person"></i>
                    <span>{username}</span>
                </a>
            ) : (
                <a href="/login">
                    <i className="bi bi-person"></i>
                    <span>Hội viên</span>
                </a>
            )}
        </nav>
    );
};

export default MobileFooterNav; 