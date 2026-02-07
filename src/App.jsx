import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import Cart from './pages/Cart';
import CustomerDetails from './pages/CustomerDetails';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';

function App() {
    return (
        <ShopProvider>
            <Router>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    backgroundColor: 'var(--color-bg)'
                }}>
                    <Navbar />

                    <main style={{ flex: 1 }}>
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
