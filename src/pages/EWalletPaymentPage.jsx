import { useNavigate } from 'react-router-dom';

import PayPalButton from '../components/common/PaypalButton';

const EWalletPaymentPage = () => {
    const navigate = useNavigate();

    const handleSuccessPayment = (details) => {
        console.log('Thanh toán thành công:', details);
        // Bạn có thể làm các xử lý sau thanh toán thành công ở đây
        navigate('/', { state: { paymentDetails: details } }); // ví dụ điều hướng tới trang cảm ơn
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Thanh toán bằng Ví điện tử</h1>
            <p className="text-gray-600 mb-4">Số tiền cần thanh toán: <span className="font-semibold text-green-600">$10.00</span></p>

            {/* Nút PayPal */}
            <div className="d-flex flex-column justify-content-center w-full max-w-xs">
                <h5>Thanh toán bằng PayPal</h5>
                <PayPalButton amount={10} onSuccess={handleSuccessPayment} />
            </div>
        </div>
    );
};

export default EWalletPaymentPage;
