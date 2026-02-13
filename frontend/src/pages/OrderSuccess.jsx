import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CheckCircle } from 'lucide-react';
import '../styles/OrderSuccess.css';

/**
 * OrderSuccess Page
 * Grand celebration page with confetti animation and smooth transitions
 */
const OrderSuccess = () => {
    const { order } = useShop();
    const navigate = useNavigate();
    const [confetti, setConfetti] = useState([]);

    // Generate confetti particles on mount
    useEffect(() => {
        const particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 0.5,
                duration: 2 + Math.random() * 2,
                color: ['#4ade80', '#22c55e', '#16a34a', '#15803d', '#fbbf24', '#f59e0b'][Math.floor(Math.random() * 6)]
            });
        }
        setConfetti(particles);
    }, []);

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
            {/* Confetti Animation */}
            <div className="confetti-container">
                {confetti.map(particle => (
                    <div
                        key={particle.id}
                        className="confetti-particle"
                        style={{
                            left: `${particle.left}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                            backgroundColor: particle.color
                        }}
                    />
                ))}
            </div>

            <div className="glass-panel success-panel-manual animate-slide-up">
                {/* Animated Success Icon */}
                <div className="manual-check-icon success-icon-animated">
                    <div className="icon-circle-bg"></div>
                    <CheckCircle size={70} strokeWidth={2.5} />
                </div>

                <h1 className="manual-success-title animate-text-reveal">Order Placed Successfully!</h1>
                <p className="manual-success-msg animate-text-reveal-delayed">Your order has been confirmed. Thank you for choosing us!</p>

                {/* Order Summary Card */}
                <div className="manual-order-card animate-card-reveal">
                    <div className="manual-order-row">
                        <span>Order ID</span>
                        <span className="order-value">{order._id || order.id}</span>
                    </div>
                    <div className="manual-order-row">
                        <span>Total Paid</span>
                        <span className="order-value highlight-amount">₹{order.totalPrice || order.total}</span>
                    </div>
                    <div className="manual-order-row">
                        <span>Order Status</span>
                        <span className="status-label-manual">
                            <span className="status-dot"></span>
                            {order.status}
                        </span>
                    </div>
                </div>

                <button onClick={() => navigate('/')} className="manual-home-btn animate-button-reveal">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
