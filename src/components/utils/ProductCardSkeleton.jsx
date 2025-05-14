import '../../styles/components/utils/ProductCardSkeleton.css'

const ProductCardSkeleton = () => {
    return (
        <div className="card shadow-sm skeleton-card" style={{ borderRadius: '8px' }}>
            <div className="position-relative skeleton-image" style={{ borderRadius: '8px 8px 0 0' }}>
                {/* Badge placeholder */}
                <div className="skeleton-badge"></div>
            </div>
            <div className="card-body p-2 d-flex flex-column jusitfy-content-center align-items-center">
                <div className="skeleton-text skeleton-title"></div>
                <div className="skeleton-text skeleton-subtext"></div>
                <div className="skeleton-text skeleton-price"></div>
                <div className="skeleton-button"></div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
