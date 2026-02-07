import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, getCartTotal } = useShop();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-header">
                    <h1>Your Cart</h1>
                    <button onClick={() => navigate('/')} className="close-btn">
                        <X size={24} />
                    </button>
                </div>
                <div className="cart-empty">
                    <p>Your cart is empty</p>
                    <button onClick={() => navigate('/')} className="browse-btn">
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h1>Your Cart</h1>
                <button onClick={() => navigate('/')} className="close-btn">
                    <X size={24} />
                </button>
            </div>

            <div className="cart-items-container">
                {cart.map(item => (
                    <div key={item.id} className="cart-card">
                        <div className="cart-image-wrapper">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="cart-item-image"
                            />
                        </div>

                        <div className="cart-item-details">
                            <h3 className="cart-item-title">{item.name}</h3>
                            <p className="cart-item-unit-price">₹{item.price}</p>

                            <div className="cart-item-controls">
                                <div className="qty-selector">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="qty-btn"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="qty-count">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="qty-btn"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="delete-btn"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="cart-item-total">
                            ₹{item.price * item.quantity}
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-footer">
                <div className="cart-total">
                    <span>Total</span>
                    <span className="total-amount">₹{getCartTotal().toLocaleString()}</span>
                </div>
                <button onClick={() => navigate('/details')} className="checkout-btn">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
