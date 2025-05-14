import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductBar from '../components/product/ProductBar'; // Component hiển thị danh sách sản phẩm
import Error from '../components/Error'; // Component hiển thị lỗi
import LoadingSpinner from '../components/LoadingSpinner'; // Component hiển thị loading
import searchProducts from '../api/productAPI/search'; // Hàm gọi API tìm kiếm sản phẩm

const FilteredProductsPage = () => {
    const [searchParams] = useSearchParams(); // Lấy query params từ URL, ví dụ: ?key=chanh
    const [products, setProducts] = useState([]);  // State quản lý danh sách sản phẩm trả về từ API
    const [loading, setLoading] = useState(true);  // State quản lý trạng thái loading
    const [error, setError] = useState(''); // State quản lý thông báo lỗi (nếu có)

    // Lấy giá trị `key` từ query string (ví dụ: ?key=sua -> query = 'sua')
    const query = searchParams.get('key');

    // useEffect sẽ được gọi mỗi khi query thay đổi
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); // Bắt đầu loading
                const result = await searchProducts(query); // Gọi API tìm kiếm sản phẩm
                setProducts(result); // Lưu danh sách sản phẩm vào state
                setError(''); // Xóa lỗi (nếu có)
            } catch (err) {
                setError('Không thể tải sản phẩm.'); // Nếu lỗi, hiển thị thông báo
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };

        // Nếu có query (không rỗng), thì gọi fetchProducts
        if (query) fetchProducts();
    }, [query]); // Chạy lại khi query thay đổi

    return (
        <div className="container mt-4">
            {/* Hiển thị spinner loading nếu đang tải */}
            {loading && <LoadingSpinner message="Đang tải sản phẩm..." color="success" />}

            {/* Hiển thị thông báo lỗi nếu có */}
            {error && <Error error={error} />}

            {/* Hiển thị danh sách sản phẩm nếu có kết quả */}
            <ProductBar 
                titleName={`Kết quả tìm kiếm cho: ${query}`} // Tiêu đề thanh sản phẩm
                products={products} // Danh sách sản phẩm tìm được
                isHomePage={false} // Không phải trang chủ
                isLimit={false} // Hiển thị toàn bộ sản phẩm (không giới hạn)
            />
        </div>
    );
};

export default FilteredProductsPage;
