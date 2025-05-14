import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductCard from './ProductCard';
import ProductCardSkeleton from '../utils/ProductCardSkeleton';
import LazyLoadWrapper from '../utils/LazyLoadWrapper';

import '../../styles/components/product/ProductBar.css';

const ProductBar = ({ titleName, products, category, isHomePage, isLimit = true }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [displayLimit, setDisplayLimit] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isLimit) {
            if (products.length >= 10) {
                setDisplayLimit(10);
                if (windowWidth < 1200 && windowWidth >= 992) {
                    setDisplayLimit(8);
                } else if (windowWidth < 992) {
                    setDisplayLimit(6);
                }
            } else {
                if (windowWidth < 1200 && windowWidth >= 992) {
                    setDisplayLimit(Math.min(products.length, 8));
                } else if (windowWidth < 992) {
                    setDisplayLimit(Math.min(products.length, 6));
                } else {
                    setDisplayLimit(products.length);
                }
            }
        } else {
            setDisplayLimit(products.length);
        }
    }, [windowWidth, products.length, isLimit]);

    const productCards = products.slice(0, displayLimit).map((product, index) => (
        <LazyLoadWrapper key={index} fallback={<ProductCardSkeleton />} rootMargin="100px">
            <ProductCard product={product} />
        </LazyLoadWrapper>
    ));

    const isMdDown = windowWidth < 768;

    return (
        <div className="py-4 bg-light border rounded">
            <h2 className="fs-4 mb-3">{titleName}</h2>

            {/* Nếu là md trở lên hoặc isLimit = false thì hiển thị dạng lưới */}
            {(!isMdDown || !isLimit) ? (
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-1">
                    {productCards}
                </div>
            ) : (
                // Ngược lại, chỉ khi isLimit = true & màn hình nhỏ thì cuộn ngang
                <div className="horizontal-scroll-container d-flex gap-1">
                    {productCards.map((card, idx) => (
                        <div key={idx} className="flex-shrink-0" style={{ maxWidth: 'none' }}>
                            {card}
                        </div>
                    ))}
                </div>
            )}

            {isHomePage && (
                <button
                    className="btn more-btn rounded-pill fw-bold mt-3 d-inline-flex align-items-center justify-content-center gap-2"
                    onClick={() => navigate(`/category/${category.id}`, {
                        state: {
                            category: category,
                            isHomePage: false
                        }
                    })}
                >
                    <i className="bi bi-arrow-right-circle"></i> Xem thêm
                </button>
            )}
        </div>
    );
};


ProductBar.propTypes = {
    titleName: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            unit_price: PropTypes.string.isRequired,
            discount: PropTypes.number,
            createDate: PropTypes.string.isRequired,
            expiryDate: PropTypes.string.isRequired,
            supplier: PropTypes.shape({
                name: PropTypes.string.isRequired,
                phone: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
                address: PropTypes.string.isRequired,
            }).isRequired,
            categories: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    description: PropTypes.string,
                })
            ).isRequired,
        })
    ).isRequired,
};

export default ProductBar;
