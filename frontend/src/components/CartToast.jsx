import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import '../styles/CartToast.css';

const CartToast = ({ visible, product, onClose }) => {
    if (!product) return null;

    return (
        <div className="cart-toast-overlay">
            <div className={`cart-toast ${visible ? 'visible' : ''}`}>
                <div className="toast-img-wrapper">
                    <img src={product.image} alt={product.name} className="toast-img" />
                </div>

                <div className="toast-content">
                    <span className="toast-msg">Added to Cart!</span>
                    <span className="toast-name">{product.name}</span>
                </div>

                <button className="toast-close" onClick={onClose}>
                    <X size={18} />
                </button>

                <div className="toast-progress"></div>
            </div>
        </div>
    );
};

export default CartToast;
