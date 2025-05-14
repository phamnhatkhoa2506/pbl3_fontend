import React, { useEffect, useState } from 'react';

import '../../styles/components/common/Notification.css';

const Notification = ({ message, type = 'info', onClose }) => {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setHidden(true); // bắt đầu làm mờ
        }, 2500);

        const timer2 = setTimeout(() => {
            onClose(); // xoá sau khi mờ xong
        }, 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onClose]);

    return (
        <div 
            className={`cart-notification ${type} ${hidden ? 'hidden' : ''}`}
            onClick={onClose}
            style={{ cursor: 'pointer' }}
            title="Click để đóng"
        >
            {message}
        </div>
    );
};

export default Notification;
