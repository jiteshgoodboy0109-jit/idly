import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CheckCircle } from 'lucide-react';
import '../styles/OrderSuccess.css';

/**
 * OrderSuccess Page
 * Displays a confirmation message after a successful order.
 * Centered vertically and horizontally for a premium mobile experience.
 */
const OrderSuccess = () => {
    const { order } = useShop();
    const navigate = useNavigate();

    // Safety check: if no order data, go back to shop
    if (!order) {
        return (
            <div className="checkout-page-container">
                <button onClick={() => navigate('/')} className="manual-home-btn" style={{ maxWidth: 300 }}>
                    Return to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-page-container success-page-manual">
            <div className="glass-panel success-panel-manual animate-fade-in">

                <div className="manual-check-icon">
                    <CheckCircle size={70} strokeWidth={1.5} />
                </div>

                <h1 className="manual-success-title">Order Placed!</h1>
                <p className="manual-success-msg">Your order has been recorded. Abundance awaits.</p>

                {/* Order Summary Card */}
                <div className="manual-order-card">
                    <div className="manual-order-row">
                        <span>Order ID</span>
                        <span>{order.id}</span>
                    </div>
                    <div className="manual-order-row">
                        <span>Total Paid</span>
                        <span>₹{order.total}</span>
                    </div>
                    <div className="manual-order-row">
                        <span>Order Status</span>
                        <span className="status-label-manual">{order.status}</span>
                    </div>
                </div>

                <button onClick={() => navigate('/')} className="manual-home-btn">
                    Back to Shop
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
