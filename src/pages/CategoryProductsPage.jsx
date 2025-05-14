import React from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';
import ProductBar from '../components/product/ProductBar';
import { ProductProvider, useProducts } from '../contexts/ProductContext';
import useCategory from '../hooks/useCategory';


const CategoryProductList = ({ categoryId, categoryName, isHomePage }) => {
    const { productsByCategory, loading, error } = useProducts();

    let content;

    if (loading) {
        content = <LoadingSpinner />;
    } else if (error) {
        content = <Error error={error} />;
    } else if (Array.isArray(productsByCategory[categoryId]) && productsByCategory[categoryId].length > 0) {
        content = (
            <ProductBar
                titleName={categoryName}
                categoryId={categoryId}
                products={productsByCategory[categoryId]}
                isHomePage={isHomePage}
                isLimit={false}
            />
        );
    } else {
        content = <div>Không có sản phẩm nào trong danh mục này.</div>;
    }

    return <div>{content}</div>;
}

const CategoryProductsPage = () => {
    const { categoryList, error, loading } = useCategory();
    const { state } = useLocation();

    const category = state?.category || null;
    const categoryIds = categoryList.map(category => category.id);

    const isHomePage = state?.isHomePage ?? true;

    return (
        <div className="py-4">
            <ProductProvider categoryIds={categoryIds}>
                <CategoryProductList categoryId={category?.id} categoryName={category?.description} isHomePage={isHomePage} />
            </ProductProvider>
        </div>
    );
};

export default CategoryProductsPage;
