import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '../api/authenticateAPI/authenticate';
import Logo from '../assets/logo.svg';
import '../styles/components/Header.css';

const Header = () => {
    const [username, setUsername] = useState(null); // Lưu tên người dùng (nếu đã đăng nhập)
    const [showDropdown, setShowDropdown] = useState(false); // Hiển thị dropdown tài khoản
    const [searchInput, setSearchInput] = useState(''); // ✅ input tìm kiếm
    const navigate = useNavigate(); // Dùng để điều hướng trang
    const [cartCount, setCartCount] = useState(0); // Số lượng sản phẩm trong giỏ hàng (giả lập)

    // Khi component được mount, lấy thông tin user từ localStorage
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

    // Xử lý đăng xuất
    const handleLogout = () => {
        logout(); // Gọi API logout
        setUsername(null); // Xóa username khỏi header
        setShowDropdown(false); // Ẩn dropdown
        navigate('/login'); // Chuyển hướng về trang đăng nhập
    };

    // ✅ Xử lý tìm kiếm khi nhấn Enter hoặc click icon tìm kiếm
    const handleSearch = () => {
        if (searchInput.trim()) {
            navigate(`/search?key=${encodeURIComponent(searchInput.trim())}`);
            setSearchInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <header className="winmart-header d-flex justify-content-between align-items-center flex-wrap">
            {/* Nút quay lại (chỉ hiển thị trên màn nhỏ - mobile) */}
            <button className="back-btn d-lg-none" onClick={() => window.history.back()}>
                <i className="bi bi-arrow-left"></i>
            </button>

            {/* Logo thương hiệu */}
            <div className="logo d-flex align-items-center justify-content-center">
                <a href="/">
                    <img src={Logo} alt="Logo" width='100'/>
                </a>
            </div>

            {/* ✅ Thanh tìm kiếm có xử lý điều hướng */}
            <div className="search-bar d-flex flex-row align-items-center justify-content-end">
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="search-btn" onClick={handleSearch}>
                    <i className="bi bi-search"></i>
                </button>
            </div>

            {/* Các nút chức năng ở góc phải header */}
            <div className="header-actions d-flex align-items-center position-relative">

                {/* Nút giỏ hàng */}
                <div className="cart-btn-wrapper position-relative">
                    <span className="cart-badge d-flex align-items-center justify-content-center fw-bold bg-danger">{cartCount}</span>
                    <button className="cart-btn" onClick={() => (window.location.href = "/cart")}>
                        <i className="bi bi-cart-plus fs-5"></i> 
                        Giỏ hàng
                    </button>
                </div>


                {/* Nút tài khoản người dùng */}
                <div
                    className="member-btn position-relative"
                    onMouseEnter={() => username && setShowDropdown(true)} // Hover hiện dropdown nếu đã đăng nhập
                    onMouseLeave={() => username && setShowDropdown(false)} // Hover out thì ẩn dropdown
                >
                    {/* Nếu đã đăng nhập, hiển thị tên người dùng và menu tài khoản */}
                    {username ? (
                        <>
                            <button className="user-btn d-flex align-items-center gap-2 fw-bold text-white bg-transparent border-0">
                                <i className="bi bi-person-circle"></i>
                                {username}
                            </button>

                            {/* Dropdown tài khoản */}
                            {showDropdown && (
                                <div className="dropdown-menu-custom">
                                    <ul>
                                        <li className="dropdown-item">
                                            <button onClick={() => (window.location.href = "/customer/profile")}>
                                                Tài khoản
                                            </button>
                                        </li>
                                        <li className="dropdown-item">
                                            <button onClick={handleLogout}>Đăng xuất</button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        // Nếu chưa đăng nhập, hiển thị nút "Hội viên" để đăng nhập
                        <button
                            onClick={() => (window.location.href = "/login")}
                            className="member-button d-flex align-items-center"
                        >
                            <i className="bi bi-person-circle"></i>
                            Hội viên
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
