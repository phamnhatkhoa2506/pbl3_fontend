import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orderItems, setOrderItems]   = useState([]);
    const [canOrder, setCanOrder]       = useState(false);
    const [canPayment, setCanPayment]   = useState(false);

    return (
        <OrderContext.Provider value={{
            orderItems,     setOrderItems,
            canOrder,       setCanOrder,
            canPayment,     setCanPayment,
        }}>
            {children}
        </OrderContext.Provider>
    );
}

// custom hook
export const useOrder = () => useContext(OrderContext);
