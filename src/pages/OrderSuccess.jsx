import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Button from '../components/Button';
import { CheckCircle } from 'lucide-react';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
    const { order } = useShop();
    const navigate = useNavigate();

    if (!order) {
        return (
            <div className="container section-padding text-center">
                <Button onClick={() => navigate('/')}>Return Home</Button>
            </div>
        );
    }

    return (
        <div className="container section-padding animate-fade-in text-center success-container">
            <div className="glass-panel success-panel">
                <div className="success-glow"></div>

                <div className="success-icon-wrapper">
                    <CheckCircle size={80} strokeWidth={1.5} />
                </div>

                <h1 className="success-title">
                    Order Confirmed!
                </h1>

                <p className="success-message">
                    We have received your offering.
                </p>

                <p className="success-blessing">
                    "May abundance be with you."
                </p>

                <div className="order-details-card">
                    <div className="order-row">
                        <span className="order-label">Order ID</span>
                        <span className="order-value">{order.id}</span>
                    </div>
                    <div className="order-row">
                        <span className="order-label">Amount</span>
                        <span className="order-value">₹{order.total}</span>
                    </div>
                    <div className="order-row">
                        <span className="order-label">Status</span>
                        <span className="order-status">{order.status}</span>
                    </div>
                </div>

                <Button onClick={() => navigate('/')} variant="primary">
                    Continue Shopping
                </Button>
            </div>
        </div>
    );
};

export default OrderSuccess;
