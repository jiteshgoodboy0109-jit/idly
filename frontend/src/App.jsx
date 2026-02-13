import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Products from './pages/Products';
import Cart from './pages/Cart';
import CustomerDetails from './pages/CustomerDetails';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';

import CartSidebar from './components/CartSidebar';

// Admin Imports
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import ProductList from './admin/pages/ProductList';
import ProductForm from './admin/pages/ProductForm';
import OrderList from './admin/pages/OrderList';

function AppContent() {
    const location = useLocation();
    // Hide navbar and footer on admin routes
    const isAdminRoute = location.pathname.includes('/admin');

    return (
        <>
            <ScrollToTop />
            <CartSidebar />
            <div className="app-container">
                {!isAdminRoute && <Navbar />}

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Products />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/details" element={<CustomerDetails />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/success" element={<OrderSuccess />} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/*" element={<AdminLayout />}>
                            <Route index element={<Dashboard />} /> {/* Default to Dashboard */}
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="products" element={<ProductList />} />
                            <Route path="products" element={<ProductList />} />
                            <Route path="products/new" element={<ProductForm />} />
                            <Route path="products/edit/:id" element={<ProductForm />} />
                            <Route path="orders" element={<OrderList />} />
                        </Route>
                    </Routes>
                </main>

                {!isAdminRoute && <Footer />}
            </div>
        </>
    );
}

function App() {
    return (
        <ShopProvider>
            <Router>
                <AppContent />
            </Router>
        </ShopProvider>
    );
}

export default App;
