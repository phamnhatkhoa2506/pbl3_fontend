// src/contexts/NotificationContext.jsx
import { createContext, useContext, useState } from "react";
import Notification from "../components/common/Notification";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (message, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {/* Hiển thị stack thông báo ở đây */}
            <div className="cart-notification-container mt-5 position-absolute">
                {notifications.map(n => (
                    <Notification 
                        key={n.id} 
                        message={n.message} 
                        type={n.type} 
                        onClose={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))}
                    />
                ))}
            </div>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
