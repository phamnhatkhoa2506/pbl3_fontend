import { createContext, useContext, useEffect, useState } from 'react';
import { getProductsByCategory } from '../api/productAPI/product'; // đường dẫn theo bạn

export const ProductContext = createContext();

export const ProductProvider = ({ categoryIds = [], children }) => {
    const [productsByCategory, setProductsByCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);
            try {
                const newData = {};

                for (const id of categoryIds) {
                    const result = await getProductsByCategory([id]);
                    newData[id] = result;
                }

                setProductsByCategory(newData);
            } catch (err) {
                setError(err.message || "Lỗi khi lấy sản phẩm theo danh mục");
            } finally {
                setLoading(false);
            }
        };

        if (categoryIds.length > 0) {
            fetchAllProducts();
        }
    }, [categoryIds]);

    return (
        <ProductContext.Provider value={{ productsByCategory, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
