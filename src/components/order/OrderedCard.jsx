import React from "react";

import ProductCard from "../product/ProductCard";
import { formatCurrency } from "../../helpers/currency";

const OrderedCard = ({ order }) => {
    return (
        <div className="card border-0 shadow-lg rounded-4 p-4">
            <div>
                <h5 >
                    Đã đặt lúc {order.time.slice(0, 8)} – {order.date}
                </h5>

                {order.productResponseList.length > 0 ? (
                    <div className="d-flex flex-row flex-nowrap gap-2 horizontal-scroll-container overflow-x-auto p-4">
                        {order.productResponseList.map((product) => (
                            <div key={product.id} className="flex-shrink-0" style={{ maxWidth: 'none' }}>
                                <ProductCard key={product.id} product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">(Không có sản phẩm)</p>
                )}

                <hr />
                <p className="fs-5 fw-bold text-end mb-0">
                    Tổng tiền: {formatCurrency(order.totalPrice)}
                </p>
            </div>
        </div>
    );
};

export default OrderedCard;
