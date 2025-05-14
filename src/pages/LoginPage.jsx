import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // nếu dùng react-router

import { checkPassword } from '../helpers/regex.js'; // điều chỉnh đúng path tới file chứa hàm checkPassword
import { login } from '../api/authenticateAPI/authenticate'; // điều chỉnh đúng path tới file chứa hàm login
import { useNotification } from '../contexts/NotificationContext.jsx';

import '../styles/pages/LoginPage.css'; // Import your CSS file

const LoginPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkPassword(formData.password)) {
        showNotification('Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ và số.', "error");
        return;
    }

    try {
      const user = await login(formData);
      showNotification("Đăng nhập thành công!", "success")
      setTimeout(() => {
        navigate('/')
      }, 3000);
    } catch (error) {
      if (error.response?.status === 400) {
        showNotification("Sai tài khoản hoặc mật khẩu", "error")
      } else {
        showNotification("Lỗi không xác định!", "error")
      }
    }
  };

  return (
    <>
      <div className="form-login-container d-flex flex-column justify-content-center align-items-center">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="header-container d-flex justify-content-between align-items-center">
            <a href="/" aria-label="Go back">
              <i className='bi bi-arrow-left-circle'></i>
            </a>
            <h1 className="form-title">Đăng nhập</h1>
            <a href="/" aria-label="Home">
              <i className='bi bi-house'></i>
            </a>
          </div>
          
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Đăng nhập</button>

          <div className="forgot-password">
            <a href="/forgot-password">Quên mật khẩu?</a>
          </div>

          <hr className="divider" />

          <button type="button" className="btn btn-secondary">
            <a href="/signup" className="signup-link">Đăng ký</a>
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;