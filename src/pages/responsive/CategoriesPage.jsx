import { useNavigate } from 'react-router-dom';
import useCategory from '../../hooks/useCategory.js'; // đảm bảo đúng path context
import { 
    FaAppleAlt, FaFish, FaCandyCane, FaBeer, 
    FaUtensils, FaCouch, FaBlender 
} from 'react-icons/fa';

const categoryIcons = {
    'Rau, củ, quả, trái cây tươi': <FaAppleAlt color="#28a745" />, // xanh lá
    'Thịt và hải sản tươi': <FaFish color="#17a2b8" />, // xanh biển
    'Bánh kẹo': <FaCandyCane color="#ffc107" />, // vàng
    'Bia': <FaBeer color="#fd7e14" />, // cam
    'Thực phẩm ăn liền': <FaUtensils color="#6f42c1" />, // tím
    'Đồ nội thất': <FaCouch color="#20c997" />, // teal
    'Đồ dùng nhà bếp': <FaBlender color="#dc3545" />, // đỏ
};

const CategoriesPage = () => {
    const navigate = useNavigate();
    const { categoryList } = useCategory();

    const handleCategoryClick = (category) => {
        navigate(`/category/${category.id}`, {
            state: { 
                category,
                isHomePage: false 
            }
        });
    };

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4" style={{ color: 'green' }}>Danh mục sản phẩm</h2>
            <div className="list-group">
                {categoryList.map((cat) => (
                    <button
                        key={cat.id}
                        className="list-group-item list-group-item-action d-flex align-items-center gap-3"
                        onClick={() => handleCategoryClick(cat)}
                    >
                        <span className="fs-4 text-danger d-flex align-items-center">
                            {categoryIcons[cat.description] || <FaAppleAlt />}
                        </span>
                        <span className="fw-medium">{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;
