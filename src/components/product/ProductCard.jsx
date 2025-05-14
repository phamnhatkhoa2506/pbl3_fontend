import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { addToCart } from '../../api/customerAPI/cart';
import { useNavigate } from 'react-router-dom';

import LazyImage from '../utils/LazyImage';
import ProductCardSkeleton from '../utils/ProductCardSkeleton';
import { formatCurrency } from '../../helpers/currency';
import { getNumberOfItemsInCart } from '../../api/customerAPI/cart';

import '../../styles/components/product/ProductCard.css';


const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const discountPrice = product.price * (100 - product.discount) / 100;

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Adjust the time as needed

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <ProductCardSkeleton />;
    }

    const goToDetailPage = () => {
        navigate(`/products/${product.id}`, { state: { product } });
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation(); // Ngăn việc click lan lên thẻ cha (navigate sang trang chi tiết)
        flyToCart(e, product.imageUrl); // <<< thêm dòng này trước khi await
        
        try {
            const token = localStorage.getItem("token"); // hoặc từ context, state tùy bạn đang quản lý auth như nào
            const payload = {
                productId: product.id,
                quantity: 1, // hoặc số lượng bạn muốn thêm
            };
            const result = await addToCart(token, payload);
            console.log("Đã thêm vào giỏ hàng:", result);
            if (result) {
                const numCartItems = await getNumberOfItemsInCart(token); // Lấy số lượng sản phẩm trong giỏ hàng
                localStorage.setItem("numCartItems", numCartItems);
                window.dispatchEvent(new Event("cartItemCountChanged")); // Them Event cap nhat so luong item trong cart
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ:", error);
        }
    };

    const flyToCart = (e, imageUrl) => {
        let cartIcon;
        if (window.innerWidth <= 918) {
            // Mobile: lấy icon trong MobileFooterNav
            cartIcon = document.querySelector('.mobile-footer-nav .cart-btn-wrapper a i');
        } else {
            // Desktop: lấy icon trên header
            cartIcon = document.querySelector('.cart-btn'); 
        }
    
        if (!cartIcon) return; // Phòng trường hợp chưa load xong icon
    
        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'flying-image';
    
        const { top, left } = e.target.getBoundingClientRect();
        img.style.top = `${top}px`;
        img.style.left = `${left}px`;
        img.style.position = 'fixed';
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        img.style.transition = 'all 1s ease-in-out';
        img.style.zIndex = '2000';
    
        document.body.appendChild(img);
    
        const cartRect = cartIcon.getBoundingClientRect();
    
        setTimeout(() => {
            img.style.top = `${cartRect.top}px`;
            img.style.left = `${cartRect.left}px`;
            img.style.transform = 'scale(0.2)';
            img.style.opacity = '0.5';
        }, 10);
    
        setTimeout(() => {
            img.remove();
        }, 1000);
    };
    
    return (
        <div
            className="card-container card card-hover shadow-sm"
            onClick={goToDetailPage}
        >
            <div className="card-image-container position-relative">
                <LazyImage
                    imageUrl={product.imageUrl}
                    name={product.name}
                />  
                <span className="badge position-absolute top-0 start-0 m-2" style={{ backgroundColor: 'green' }}>-{product.discount}%</span>
            </div>
            <div className="card-body p-2" 
                 style={{ display: 'flex', flexDirection: 'column' }}>
                <h6 className="card-title m-0" 
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.name}
                </h6>
                <p className="text-muted m-0">
                    Đơn vị tính: {product.unit_price}
                </p>
                <p className="m-0">
                    <span className="discount-price me-1 text-muted fw-bold text-decoration-line-through" style={{ fontSize: '10px'}}>{formatCurrency(product.price)}</span>
                    <span className="text-danger fw-bold">{formatCurrency(discountPrice)}</span>
                </p>
                <button
                    className="btn w-100 fw-bold text-white"
                    onClick={handleAddToCart}
                >
                    <i className="bi bi-cart me-1"></i> Thêm vào giỏ
                </button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        unit_price: PropTypes.string.isRequired,
        discount: PropTypes.number,
        createDate: PropTypes.string.isRequired,    // ISO date string
        expiryDate: PropTypes.string.isRequired,

        supplier: PropTypes.shape({
            name: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired
        }).isRequired,

        categories: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                description: PropTypes.string
            })
        ).isRequired
    }).isRequired
};

export default ProductCard;
