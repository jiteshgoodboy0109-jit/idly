import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Button from '../components/Button';
import { ShieldCheck } from 'lucide-react';
import '../styles/Payment.css';

const Payment = () => {
    const { cart, getCartTotal, placeOrder } = useShop();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    if (cart.length === 0) {
        navigate('/');
        return null;
    }

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            placeOrder();
            setIsProcessing(false);
            navigate('/success');
        }, 2000);
    };

    return (
        <div className="container section-padding animate-fade-in text-center payment-container">
            <h2 className="payment-title">
                Complete Transaction
            </h2>

            <div className="glass-card payment-card">
                <p className="payment-total-label">
                    Total Amount
                </p>
                <div className="payment-total-wrapper">
                    <strong className="payment-total-amount">
                        ₹{getCartTotal()}
                    </strong>
                </div>

                <div className="qr-code-wrapper">
                    <img
                        src="https://placehold.co/200x200/FFFFFF/000000?text=UPI+QR"
                        alt="UPI QR Code"
                        className="qr-code-img"
                    />
                </div>

                <p className="payment-instruction">
                    Scan using GPay, PhonePe, or Paytm
                </p>

                <Button
                    onClick={handlePayment}
                    variant="primary"
                    className="payment-button"
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Verifying...' : 'I Have Paid'}
                </Button>
            </div>

            <div className="payment-secure-badge">
                <ShieldCheck size={20} />
                <span>100% Secure Transaction</span>
            </div>
        </div>
    );
};

export default Payment;
