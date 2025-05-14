import ProductBar from '../components/product/ProductBar'
import useCategory from '../hooks/useCategory';
import { ProductProvider, useProducts } from '../contexts/ProductContext';
import Error from '../components/Error';
import LoadingSpinner from '../components/LoadingSpinner';
import LazyLoadWrapper from '../components/utils/LazyLoadWrapper';

const ProductListByCategory = ({ categoryList }) => {
    const { productsByCategory } = useProducts();

    return (
        <div className="d-flex flex-column gap-4 py-4 w-100">
            {categoryList.map((category) => (
                <ProductBar
                    key={category.id}
                    titleName={category.description}
                    category={category}
                    products={productsByCategory[category.id] || []}
                    isHomePage={true}
                />
            ))}
        </div>
    );
};

const Home = () => {
    const { categoryList, error, loading } = useCategory();

    if (error) return <Error error={error} />;

    if (loading) return <LoadingSpinner />

    const categoryIds = categoryList.map(category => category.id);

    return (
        <ProductProvider categoryIds={categoryIds}>
            <LazyLoadWrapper rootMargin="100px">
                <ProductListByCategory categoryList={categoryList} />
            </LazyLoadWrapper>
        </ProductProvider>
    );
};

export default Home;
