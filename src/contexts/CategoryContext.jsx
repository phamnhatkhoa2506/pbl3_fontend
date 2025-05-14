import { CategoryContext } from '../hooks/useCategory';
import { useState, useEffect } from 'react';
import getCategoryList from '../api/categoryAPI/category';

export const CategoryProvider = ({ children }) => {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const data = await getCategoryList();
                setCategoryList(data);
            } catch (err) {
                setError(err.message || "Lỗi khi lấy dữ liệu danh mục");
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryList();
    }, []);

    return (
        <CategoryContext.Provider value={{ categoryList, loading, error }}>
            {children}
        </CategoryContext.Provider>
    );
};
