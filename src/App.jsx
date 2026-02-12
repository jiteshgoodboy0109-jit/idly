import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
    return (
        <ShopProvider>
            <Router>
                <ScrollToTop />
                <CartSidebar />
                <div className="app-container">
                    <Navbar />

                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Products />} />
                            <Route path="/success" element={<OrderSuccess />} />

                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="products" element={<ProductList />} />
                                <Route path="products/new" element={<ProductForm />} />
                                <Route path="products/edit/:id" element={<ProductForm />} />
                            </Route>
                        </Routes>
                    </main>

                    <Footer />
                </div>
            </Router>
        </ShopProvider>
    );
}

export default App;
