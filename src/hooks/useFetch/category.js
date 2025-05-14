// src/hooks/useFetchCategory.js
import { useState, useEffect } from "react";
import getCategoryList from "../../api/categoryAPI/category.js";

export default function useFetchCategory() {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const data = await getCategoryList();
                setCategoryList(data);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryList();
    }, []);

    return { categoryList, loading, error };
}
