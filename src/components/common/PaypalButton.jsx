import React, { useEffect, useRef, useState } from 'react';

import { loadPayPalScript } from '../../helpers/loadPaypalScript.js'; // Đường dẫn đúng tới file export hàm bạn vừa gửi

const PayPalButton = ({ amount, onSuccess }) => {
    const paypalRef = useRef();
    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
        loadPayPalScript()
            .then(() => setSdkReady(true))
            .catch((err) => console.error('PayPal SDK Load Error:', err));
    }, []);

    useEffect(() => {
        if (sdkReady && window.paypal) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: { value: amount.toString() }
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then(details => {
                        onSuccess(details);
                    });
                },
                onError: err => {
                    console.error('PayPal Error:', err);
                }
            }).render(paypalRef.current);
        }
    }, [sdkReady, amount, onSuccess]);

    return (
        <div ref={paypalRef}>
            {!sdkReady && <p>Đang tải phương thức thanh toán...</p>}
        </div>
    );
};

export default PayPalButton;
