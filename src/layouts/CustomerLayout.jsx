import { Outlet, NavLink } from "react-router-dom";
import { FaUser, FaGift, FaPen, FaClipboardCheck, FaClock, FaTrophy, FaBox, FaSignOutAlt, FaLock } from "react-icons/fa";
import '../styles/layouts/CustomerLayout.css';

const navItems = [
    { label: "Thông tin tài khoản", to: "/customer/profile", icon: <FaUser /> },
    { label: "Đổi mật khẩu", to: "/customer/change-password", icon: <FaLock /> },
    { label: "Đơn hàng đã đặt", to: "/customer/history", icon: <FaBox /> }
];

const CustomerLayout = () => {
    return (
        <div className="customer-container d-flex">
            {/* Sidebar */}
            <aside className="sidebar bg-white p-3 border-end" style={{ width: "240px", minHeight: "100vh" }}>
                <nav className="nav flex-column small">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.to}
                            className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-2 py-2 ${item.className || ""} ${isActive ? "active" : ""}`
                            }
                        >
                            {item.icon} <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="p-4 flex-grow-1 outlet-wrapper">
                <Outlet />
            </main>
        </div>
    );
};

export default CustomerLayout;
