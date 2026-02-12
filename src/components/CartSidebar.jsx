import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import '../styles/CartSidebar.css';

const CartSidebar = () => {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        updateQuantity,
        removeFromCart,
        getCartTotal
    } = useShop();
    const navigate = useNavigate();

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsCartOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setIsCartOpen]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isCartOpen]);

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/details');
    };

    const handleBrowse = () => {
        setIsCartOpen(false);
        navigate('/');
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`cart-sidebar-overlay ${isCartOpen ? 'open' : ''}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-sidebar-header">
                    <h2>Your Cart ({cart.length})</h2>
                    <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-sidebar-content">
                    {cart.length === 0 ? (
                        <div className="cart-empty-state">
                            <ShoppingBag className="cart-empty-icon" size={64} />
                            <h3>Your cart is empty</h3>
                            <p>Looks like you haven't added anything yet.</p>
                            <button onClick={handleBrowse} className="browse-btn-sidebar">
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="sidebar-cart-items">
                            {cart.map(item => (
                                <div key={item.id} className="sidebar-cart-item">
                                    <div className="sidebar-item-thumb">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="sidebar-item-details">
                                        <h4>{item.name}</h4>
                                        <div className="sidebar-item-price">₹{item.price}</div>

                                        <div className="sidebar-item-controls">
                                            <div className="sidebar-qty-picker">
                                                <button
                                                    className="sidebar-qty-btn"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="sidebar-qty-val">{item.quantity}</span>
                                                <button
                                                    className="sidebar-qty-btn"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                className="sidebar-remove-btn"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-sidebar-footer">
                        <div className="sidebar-summary-row">
                            <span>Total</span>
                            <span className="sidebar-total-amount">₹{getCartTotal().toLocaleString()}</span>
                        </div>
                        <button onClick={handleCheckout} className="sidebar-checkout-btn">
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;
