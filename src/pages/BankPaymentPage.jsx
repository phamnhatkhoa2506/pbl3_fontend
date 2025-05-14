import { useNavigate } from 'react-router-dom';

import { order } from '../api/customerAPI/order'; // Assuming you've imported the order function correctly
import { useNotification } from '../contexts/NotificationContext'

import qrBankImage from '../assets/qr_bank.jpg';

const BankPaymentPage = () => {
    const { showNotification } = useNotification()
    const navigate = useNavigate();

    const handleComplete = async () => {
        const token = localStorage.getItem('token'); // Get user token from localStorage
        
        try {
            const result = await order(token);
            if (result) {
                showNotification('Đặt hàng thành công!', 'success');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }   
        } catch (error) {
            showNotification("Đặt hàng không thành công. Vui lòng thử lại.", 'error');
        }
    }
    
    return (
        <div className="card flex flex-col align-items-center justify-content-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Thanh toán bằng QR Banking</h1>
            <p className="text-gray-600 mb-6 text-center max-w-md">
                Vui lòng sử dụng ứng dụng ngân hàng để quét mã QR bên dưới và thực hiện thanh toán.
            </p>
            <img
                src={qrBankImage}
                alt="QR Banking"
                className="rounded-lg shadow-lg"
                style={{ height: 300 }}
            />
            <p className="text-danger fw-bold mt-5">Sau khi thanh toán xong vui lòng nhấn hoàn thành để hoàn tất đặt hàng</p>

            <button 
                className='btn btn-success'
                onClick={handleComplete}
            >
                Hoàn tất
            </button>
        </div>
    );
};

export default BankPaymentPage;
