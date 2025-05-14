import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileFooterNav from '../components/MobileFooterNav';
import ProductCategoryBar from '../components/ProductCategoryBar';

import { CategoryProvider } from '../contexts/CategoryContext';
import { ProductProvider } from '../contexts/ProductContext';
import { AuthProvider } from '../contexts/AuthContext';


const MainLayout = () => {
  return (
    <>
      <ProductProvider>
        <CategoryProvider>
          <AuthProvider>
              <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
                <Header />
              </div>
            
              <ProductCategoryBar />
      
              <main className="px-0 w-100">
                  <Outlet /> {/* Đây là chỗ nội dung từng trang sẽ hiển thị */}
                  <div style={{ height: '60px', width: '100%' }}></div>
              </main>

              <Footer />

              <MobileFooterNav />
          </AuthProvider>
        </CategoryProvider>
      </ProductProvider>  
    </>
  );
};

export default MainLayout;
