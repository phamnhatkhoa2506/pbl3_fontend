import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmModal from '../components/common/ConfirmModal.jsx';
import { useNotification } from '../contexts/NotificationContext.jsx';
import { deleteCustomer, updateCustomerInfo } from '../api/customerAPI/customer.js';

import '../styles/pages/ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo'))); // Dữ liệu người dùng hiện tại
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);              // Hiện modal xóa
    const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);              // Hiện modal cập nhật
    const [updatedFields, setUpdatedFields] = useState({});                         // Trường đã thay đổi           
    const { showNotification } = useNotification();

    const navigate = useNavigate();

    // Xử lý thay đổi form input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    // So sánh để lấy các field đã thay đổi
    const getUpdatedFields = (original, updated) => {
        return Object.keys(updated).reduce((diff, key) => {
            if (original[key] !== updated[key]) {
                diff[key] = updated[key];
            }
            return diff;
        }, {});
    };

    // Mở modal xác nhận cập nhật
    const handleSaveChanges = (e) => {
        e.preventDefault();

        const originalUser = JSON.parse(localStorage.getItem('userInfo'));
        const changes = getUpdatedFields(originalUser, user);

        if (Object.keys(changes).length === 0) {
            showNotification('Không có thông tin nào thay đổi', 'error');
            return;
        }        

        setUpdatedFields(changes);
        setShowUpdateConfirmModal(true);
    };

    // Thực hiện cập nhật người dùng
    const confirmUpdateCustomer = async () => {
        try {
            const token = localStorage.getItem('token');
            const originalUser = JSON.parse(localStorage.getItem('userInfo'));

            await updateCustomerInfo(user.id, token, updatedFields);
            localStorage.setItem('userInfo', JSON.stringify({ ...originalUser, ...updatedFields }));

            setShowUpdateConfirmModal(false);
            showNotification('Cập nhật thành công!', 'success');

        } catch (err) {
           showNotification('Đã xảy ra lỗi khi cập nhật. Vui lòng thử lại.', 'error');
        }
    };

    // Mở modal xác nhận xóa
    const handleDeleteAccount = () => {
        setShowDeleteConfirmModal(true);
    };

    // Thực hiện xóa tài khoản
    const confirmDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const isDeleted = await deleteCustomer(user.id, token);
    
            if (!isDeleted) {
                showNotification('Xóa tài khoản không thành công. Vui lòng thử lại sau.', 'error');
                return;
            }
    
            localStorage.clear();
            showNotification('Tài khoản của bạn đã được xóa. Đang chuyển hướng...', 'success');
            setShowDeleteConfirmModal(false);
    
            setTimeout(() => {
                navigate('/login');
            }, 2000); // 2 giây sau chuyển hướng
        } catch (error) {
            showNotification('Đã xảy ra lỗi khi xóa tài khoản. Vui lòng thử lại sau.', 'error');
        }
    };

    return (
        <div className="container" style={{ maxWidth: 800 }}>
            <h5 className="mb-4 fw-bold">Thông tin tài khoản</h5>

            {/* Form thông tin người dùng */}
            <form className="row g-3">
                {[
                    { label: 'Họ', name: 'firstName', type: 'text', placeholder: 'Nhập họ' },
                    { label: 'Tên', name: 'lastName', type: 'text', placeholder: 'Nhập tên'},
                    { label: 'Tên đăng nhập', name: 'username', type: 'text', placeholder: 'Nhập tên đăng nhập' },
                    { label: 'Số điện thoại', name: 'phone', type: 'text', placeholder: 'Nhập số điện thoại' },
                    { label: 'Email', name: 'email', type: 'email', placeholder: 'Nhập email'},
                    { label: 'Ngày sinh', name: 'birthDate', type: 'date', placeholder: 'Chọn ngày sinh' },
                    { label: 'Địa chỉ', name: 'address', type: 'text', placeholder: 'Nhập địa chỉ' }, // sửa lại đúng field: address
                ].map(({ label, name, type, placeholder }) => (
                    <React.Fragment key={name}>
                        <div className="col-4 text-start d-flex align-items-center">
                            <label className="form-label mb-0" style={{ fontSize: '10px'}}>{label}</label>
                        </div>
                        <div className="col-8">
                            <input
                                type={type}
                                name={name}
                                value={user[name] || ''}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="form-control"
                                style={{ fontSize: '10px'}}
                            />
                        </div>
                    </React.Fragment>
                ))}

                <div className='w-100 mt-3'></div>

                {/* Nút hành động */}
                <div className="col-12 text-start d-flex align-items-center gap-2 mt-0 justify-content-center">
                    <button className="btn btn-success px-4" style={{ fontSize: '12px'}} onClick={handleSaveChanges}>
                        Lưu thay đổi
                    </button>
                    <button type="button" className="btn btn-danger px-4" style={{ fontSize: '12px'}} onClick={handleDeleteAccount}>
                        Xóa tài khoản
                    </button>
                </div>
            </form>

            <ConfirmModal
                isOpen={showDeleteConfirmModal}
                onClose={() => setShowDeleteConfirmModal(false)}
                onConfirm={confirmDeleteAccount}
                title="Xác nhận xóa tài khoản"
                content="Bạn chắc chưa?"
            />

            <ConfirmModal
                isOpen={showUpdateConfirmModal}
                onClose={() => setShowUpdateConfirmModal(false)}
                onConfirm={confirmUpdateCustomer}
                title="Xác nhận thay đổi thông tin"
                content="Bạn chắc chưa?"
                confirmColor='success'
            />  
        </div>
    );
};

export default ProfilePage;
