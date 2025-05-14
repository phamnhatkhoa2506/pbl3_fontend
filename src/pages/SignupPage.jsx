import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkPassword } from '../helpers/regex.js';
import { useNotification } from '../contexts/NotificationContext.jsx';
import register from '../api/customerAPI/register.js'; // đảm bảo đúng path

import '../styles/pages/SignupPage.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        phone: '',
        address: '',
    });
    const { showNotification } = useNotification();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!checkPassword(formData.password)) {
            showNotification('Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ và số.', 'error');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            showNotification('Mật khẩu không khớp!', 'error');
            return;
        }

        try {
            const payload = {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthDate: formData.birthDate,
                point: 0,
            };

            const result = await register(payload);
            showNotification('Đăng ký thành công!', 'success');

            setTimeout(() => {
                navigate('/')
            }, 3000);
        } catch (err) {
            showNotification('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!','error');
        }
    };

    return (
        <>
            <div className="signup-container d-flex flex-column justify-content-center align-items-center">
                <form className="signup-form" onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="header-container d-flex justify-content-between align-items-center">
                        <a href="/login" aria-label="Go back">
                            <i className='bi bi-arrow-left-circle'></i>
                        </a>
                        <h1 className="form-title">Đăng ký</h1>
                        <a href="/" aria-label="Home">
                            <i className='bi bi-house'></i>
                        </a>
                    </div>  

                    {/* Input Fields */}
                    <div className="form-group d-flex">
                        <div className="input-container me-2">
                            <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} required placeholder=" " />
                            <label htmlFor="firstName">Họ</label>
                        </div>
                        <div className="input-container">
                            <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} required placeholder=" " />
                            <label htmlFor="lastName">Tên</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-container">
                            <input type="text" id="username" value={formData.username} onChange={handleChange} required placeholder=" " />
                            <label htmlFor="username">Tên đăng nhập</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-container">
                            <input type="email" id="email" value={formData.email} onChange={handleChange} required placeholder=" " />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-container">
                            <input type="password" id="password" value={formData.password} onChange={handleChange} required placeholder=" " />
                            <label htmlFor="password">Mật khẩu</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-container">
                            <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder=" " />
                            <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-container">
                            <input type="date" id="birthDate" value={formData.birthDate} onChange={handleChange} required />
                            <label htmlFor="birthDate">Ngày sinh</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-container">
                            <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required placeholder=" " />
                            <label htmlFor="phone">Số điện thoại</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-container">
                            <input type="text" id="address" value={formData.address} onChange={handleChange} required placeholder=" " />
                            <label htmlFor="address">Địa chỉ</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Đăng ký</button>
                </form>
            </div>
        </>
    );
};

export default SignupPage;
