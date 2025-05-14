import React from 'react';
import { logout } from '../../api/authenticateAPI/authenticate'; // Import hàm logout

const settings = [
    { icon: 'bi-person', label: 'Tài khoản', link: '/customer/profile' },
    { icon: 'bi-lock', label: 'Đổi mật khẩu', link: '/customer/change-password' },
    { icon: 'bi-box', label: 'Sản phẩm đã mua', link: '/customer/history' },
];

const MySettingPage = () => {
    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        logout(); // Gọi API đăng xuất
        localStorage.removeItem('userInfo'); // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem('token');
    };

    return (
        <div className="d-flex flex-column bg-white" style={{ height: '100vh' }}>
            {/* Header trang cài đặt tài khoản */}
            <div className="text-center fw-semibold py-2 border-bottom">
                Thông tin tài khoản
            </div>

            {/* Danh sách các tùy chọn điều hướng */}
            <div className="flex-grow-1 overflow-auto">
                {/* Menu chính: các mục quản lý tài khoản và dự thưởng */}
                <ul className="list-group list-group-flush">
                    {settings.map((item, index) => (
                        <li key={index} className="list-group-item">
                            <a
                                href={item.link}
                                className="d-flex align-items-center text-decoration-none text-dark"
                            >
                                {/* Icon và nhãn hiển thị */}
                                <i className={`bi ${item.icon} me-3`}></i>
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mục đăng xuất */}
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <a
                            href="/login"
                            onClick={handleLogout}
                            className="d-flex align-items-center text-decoration-none text-danger"
                        >
                            <i className="bi bi-box-arrow-right me-3"></i>
                            <span>Đăng xuất</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MySettingPage;
