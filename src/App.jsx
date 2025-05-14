import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LoadingSpinner from './components/LoadingSpinner'
import PrivateRoute from './routes/PrivateRoute'
import OrderRoute from './routes/OrderRoute'
import PaymentRoute from './routes/PaymentRoute'

// Load layouts
const MainLayout = lazy(() => import('./layouts/MainLayout'))
const CustomerLayout = lazy(() => import('./layouts/CustomerLayout'))

// Load pages
const Page404 = lazy(() => import('./pages/404Page'))
const Page500 = lazy(() => import('./pages/500Page'))
const Home = lazy(() => import('./pages/HomePage')) 
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const MySettingPage = lazy(() => import('./pages/responsive/MySettingPage'))
const CategoriesPage = lazy(() => import('./pages/responsive/CategoriesPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CategoryProductsPage = lazy(() => import('./pages/CategoryProductsPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const NotificationPage = lazy(() => import('./pages/NotificationPage'))
const ChangePasswordPage = lazy(() => import('./pages/ChangePasswordPage'))
const FilteredProductsPage = lazy(() => import('./pages/FilteredProductsPage'))
const OrderPage = lazy(() => import('./pages/OrderPage'))
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage'))
const BankPaymentPage = lazy(() => import('./pages/BankPaymentPage'))
const EWalletPaymentPage = lazy(() => import('./pages/EWalletPaymentPage'))

function App() {

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="search" element={<FilteredProductsPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="category/:id" element={<CategoryProductsPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route 
                  path="my-setting" 
                  element={
                    <PrivateRoute> 
                      <MySettingPage /> 
                    </PrivateRoute>
                }/>
                <Route path="cart" element={
                  <PrivateRoute> 
                    <CartPage /> 
                  </PrivateRoute>
                } />
                <Route path="notifications" element={
                  <PrivateRoute> 
                    <NotificationPage /> 
                  </PrivateRoute>} 
                />
                <Route path="order" element={
                  <PrivateRoute> 
                    <OrderRoute> 
                      <OrderPage /> 
                    </OrderRoute> 
                  </PrivateRoute>
                }/>
                <Route path="order/payment/bank" element={
                  <PrivateRoute> 
                    <OrderRoute> 
                      <PaymentRoute>
                        <BankPaymentPage /> 
                      </PaymentRoute>
                    </OrderRoute>  
                  </PrivateRoute>
                }/>
                <Route path="order/payment/e-wallet" element={
                  <PrivateRoute> 
                    <OrderRoute> 
                      <PaymentRoute>
                        <EWalletPaymentPage /> 
                      </PaymentRoute>
                    </OrderRoute> 
                  </PrivateRoute>
                }/>

                <Route path="customer/" element={<PrivateRoute> <CustomerLayout /> </PrivateRoute>}>
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="change-password" element={<ChangePasswordPage />} />
                  <Route path="history" element={<OrderHistoryPage />} />
                </Route>

                <Route path="/error" element={<Page500 />} />
                <Route path="*" element={<Page404 />} />
              </Route>
            
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
