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


function App() {
    return (
        <ShopProvider>
            <Router>
                <ScrollToTop />
                <div className="app-container">
                    <Navbar />

                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Products />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/details" element={<CustomerDetails />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/success" element={<OrderSuccess />} />
                        </Routes>
                    </main>

                    <Footer />
                </div>
            </Router>
        </ShopProvider>
    );
}

export default App;
