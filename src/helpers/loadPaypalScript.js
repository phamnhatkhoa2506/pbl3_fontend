export const loadPayPalScript = () => {
    return new Promise((resolve, reject) => {
        if (document.getElementById('paypal-sdk')) {
            resolve(); // Nếu đã có SDK thì thôi
            return;
        }

        const script = document.createElement('script');
        const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
        script.id = 'paypal-sdk';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('PayPal SDK load failed.'));
        document.body.appendChild(script);
    });
};

// AUDEWWoalo9cKxbvJql2mrqvVI6Zmt5LkjWmNq_zClCTozjhPB_sVRt2E2NZdmxKDmiRKhbodfkt1YCu