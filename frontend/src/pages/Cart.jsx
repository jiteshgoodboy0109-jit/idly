import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import '../styles/Cart.css';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, getCartTotal } = useShop();
    const navigate = useNavigate();

    // Empty Cart View
    if (cart.length === 0) {
        return (
            <div className="checkout-page-container">
                <div className="cart-empty-panel glass-panel text-center">
                    <div className="empty-icon">🛒</div>
                    <h2>Your Cart is Empty</h2>
                    <p>Add some delicious items to get started!</p>
                    <button onClick={() => navigate('/')} className="browse-btn-manual">
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page-container cart-page-manual">
            {/* Page Header */}
            <div className="cart-header-manual">
                <button onClick={() => navigate('/')} className="back-btn-manual">
                    <X size={20} />
                </button>
                <h1>My Cart</h1>
                <div style={{ width: 40 }}></div> {/* Spacer for symmetry */}
            </div>

            {/* Cart Items List */}
            <div className="cart-items-list-manual">
                {cart.map(item => (
                    <div key={item.id} className="cart-item-card-manual glass-panel">
                        <div className="item-thumb">
                            <img src={item.image} alt={item.name} />
                        </div>

                        <div className="item-info">
                            <h3>{item.name}</h3>
                            <p className="item-price-tag">₹{item.price}</p>

                            <div className="item-actions">
                                <div className="qty-picker">
                                    <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                                        <Minus size={14} />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="item-subtotal-desktop">
                            ₹{item.price * item.quantity}
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart Footer / Summary */}
            <div className="cart-summary-panel-manual glass-panel">
                <div className="summary-row">
                    <span>Total Amount</span>
                    <span className="summary-total-price">₹{getCartTotal().toLocaleString()}</span>
                </div>
                <button onClick={() => navigate('/details')} className="checkout-btn-manual">
                    Proceed to Order Details
                </button>
            </div>
        </div>
    );
};

export default Cart;
