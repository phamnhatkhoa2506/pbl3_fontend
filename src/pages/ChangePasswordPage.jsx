import React, { useState } from 'react';

import ConfirmModal from '../components/common/ConfirmModal.jsx';
import { useNotification } from '../contexts/NotificationContext.jsx';
import { updatePassword } from '../api/customerAPI/customer';
import { checkPassword } from '../helpers/regex.js';

import '../styles/pages/ProfilePage.css';

const ChangePasswordPage = () => {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }); // State lưu trữ form nhập liệu
    const [showConfirmModal, setShowConfirmModal] = useState(false); // State để hiển thị modal xác nhận
    const { showNotification } = useNotification();

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Xử lý khi người dùng nhấn nút "Lưu thay đổi"
    const handleSubmit = (e) => {
        e.preventDefault(); // Chặn hành vi reload trang

        // Kiểm tra các trường không được để trống
        if (!form.currentPassword || !form.newPassword || !form.confirmNewPassword) {
            showNotification('Vui lòng điền đầy đủ các trường', "error");
            return;
        }

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu phải giống nhau
        if (form.newPassword !== form.confirmNewPassword) {
            showNotification('Mật khẩu mới không trùng khớp', "error");
            return;
        }

        // Kiểm tra định dạng mật khẩu mới
        if (!checkPassword(form.newPassword)) {
            showNotification('Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ và số', 'error');
            return;
        }

        setShowConfirmModal(true);
    };

    // Hàm xử lý xác nhận đổi mật khẩu
    const confirmChangePassword = async () => {
        try {
            // Gửi yêu cầu cập nhật mật khẩu lên server
            const result = await updatePassword(
                localStorage.getItem('token'),
                {
                    current_password: form.currentPassword,
                    password: form.newPassword
                }
            );

            // Trường hợp mật khẩu hiện tại không đúng
            if (!result) {
                showNotification('Mật khẩu cũ không đúng.', 'error');
                return;
            }

            // Đổi mật khẩu thành công
            showNotification('Đổi mật khẩu thành công!', 'success');
        
            setForm({
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
        } catch (err) {
            // Lỗi trong quá trình gọi API
            showNotification('Đổi mật khẩu thất bại. Vui lòng kiểm tra lại.', 'error');
        } finally {
            // Tắt modal xác nhận
            setShowConfirmModal(false);
        }
    };

    return (
        <>
            <div className="container" style={{ maxWidth: 800 }}>
                <h5 className="mb-4 fw-bold">Đổi mật khẩu</h5>
                <form className="row g-3" onSubmit={handleSubmit}>
                    {[
                        { label: 'Mật khẩu cũ', name: 'currentPassword', placeholder: 'Nhập mật khẩu cũ' },
                        { label: 'Mật khẩu mới', name: 'newPassword', placeholder: 'Nhập mật khẩu mới' },
                        { label: 'Nhập lại mật khẩu mới', name: 'confirmNewPassword', placeholder: 'Nhập lại mật khẩu mới' },
                    ].map(({ label, name, placeholder }) => (
                        <React.Fragment key ={name}>
                            {/* Nhãn input */}
                            <div className="col-4 text-start d-flex align-items-center">
                                <label className="form-label mb-0">{label}</label>
                            </div>
                            {/* Ô nhập mật khẩu */}
                            <div className="col-8">
                                <input
                                    type="password"
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder={placeholder}
                                />
                            </div>
                        </React.Fragment>
                    ))}

                    <div className="w-100 mt-3"></div>

                    <div className="col-12 d-flex justify-content-center align-items-center mt-0">
                        <button type="submit" className="btn btn-success px-4">Lưu thay đổi</button>
                    </div>
                </form>

                <ConfirmModal
                    isOpen={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={confirmChangePassword}
                    title="Xác nhận đổi mật khẩu"
                    content="Bạn chắc chưa?"
                    confirmColor='success'
                />
            </div>
        </>
    );
};

export default ChangePasswordPage;