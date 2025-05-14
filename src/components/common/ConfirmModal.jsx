import React from 'react';

import '../../styles/components/common/ConfirmModal.css';

const ConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "", 
    content = "", 
    closeContent = "Hủy", 
    confirmContent = "Xác nhận" ,
    confirmColor = "danger"
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content fade-in">
                <h5>{title}</h5>
                <p>{content}</p>
                <div className="modal-actions">
                    <button className="btn btn-secondary me-2" onClick={onClose}>{closeContent}</button>
                    <button className={`btn btn-${confirmColor}`} onClick={onConfirm}>{confirmContent}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
