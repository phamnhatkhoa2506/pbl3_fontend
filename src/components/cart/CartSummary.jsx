import React from 'react';

const CartSummary = ({ total, saved, shippingFee, finalTotal, onCheckout }) => {
    return (
        <div className="border rounded p-3 bg-light">
            <p className="d-flex justify-content-between mb-2">
                <span>Tạm tính giỏ hàng:</span><span>{total}</span>
            </p>
            <p className="d-flex justify-content-between mb-2">
                <span>Giảm giá:</span><span className="text-success">-{saved}</span>
            </p>
            <p className="d-flex justify-content-between mb-2">
                <span>Phí vận chuyển:</span><span>{shippingFee}</span>
            </p>
            <hr />
            <p className="d-flex justify-content-between fw-bold fs-5">
                <span>Thành tiền:</span><span>{finalTotal}</span>
            </p>
            {/* <p className="small text-muted">(Giá đã bao gồm VAT)</p> */}
            {/* <p className="small text-danger">
                Mua thêm để miễn phí giao hàng từ <strong>300.000 ₫</strong>
            </p> */}
            <button className="btn btn-danger w-100 mb-2" onClick={onCheckout}>THANH TOÁN</button>
            {/* <button className="btn btn-outline-danger w-100">
                <i className="bi bi-ticket"></i> Mã Giảm Giá
            </button> */}
            <div className="mt-3 text-center">
                <span className="badge bg-warning text-dark p-2">🎁 Ưu đãi đặc biệt cho bạn</span>
            </div>
        </div>
    );
};

export default CartSummary;
