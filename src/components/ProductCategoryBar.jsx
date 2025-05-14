import { useNavigate } from 'react-router-dom';

import useCategory from '../hooks/useCategory';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';

import "../styles/components/ProductCategoryBar.css";

const ProductCategoryBar = () => {
    const { categoryList, loading, error } = useCategory();
    const navigate = useNavigate();

    let content;

    if (loading) {
        content = <LoadingSpinner />;
    } else if (error) {
        content = <Error error={error} />;
    } else if (Array.isArray(categoryList) && categoryList.length > 0) {
        content = (
            <ul>
                {categoryList.map((category) => (
                    <li
                        key={category.id}
                        onClick={() => navigate(`/category/${category.id}`, {
                            state: {
                                category: category,
                                isHomePage: false
                            }
                        })}
                        className="category-item"
                    >
                        {category.description || category.name}
                    </li>
                ))}
            </ul>
        );
    } else {
        content = <div>Không có danh mục sản phẩm nào.</div>;
    }

    return (
        <div className="product-category-bar">
            <div className="hover-wrapper">
                <button className="menu-toggle d-flex align-items-center">
                    <i className="bi bi-list"></i>
                    <span>Danh mục sản phẩm</span>
                </button>

                <div className="dropdown-menu">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default ProductCategoryBar;
