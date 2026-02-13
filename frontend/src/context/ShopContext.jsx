import React, { createContext, useContext, useState, useEffect } from 'react';
import CartToast from '../components/CartToast';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    // Cart State
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('annapoorani_cart');
        return saved ? JSON.parse(saved) : [];
    });

    // User Details State
    const [userDetails, setUserDetails] = useState(() => {
        const saved = localStorage.getItem('annapoorani_user');
        return saved ? JSON.parse(saved) : { name: '', phone: '', address: '' };
    });

    // Order State
    const [order, setOrder] = useState(null);

    // Toast State
    const [toast, setToast] = useState({ visible: false, product: null });

    // Persistence
    useEffect(() => {
        localStorage.setItem('annapoorani_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('annapoorani_user', JSON.stringify(userDetails));
    }, [userDetails]);

    // Actions
    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const productId = product._id || product.id;
            const existing = prev.find(item => (item._id || item.id) === productId);
            if (existing) {
                return prev.map(item =>
                    (item._id || item.id) === productId ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prev, { ...product, quantity }];
        });

        // Trigger Toast
        setToast({ visible: true, product });
        setTimeout(() => setToast({ visible: false, product: null }), 3000);
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => (item._id || item.id) !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if ((item._id || item.id) === productId) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const placeOrder = async () => {
        try {
            const orderData = {
                orderItems: cart,
                shippingAddress: userDetails,
                totalPrice: getCartTotal(),
            };

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!res.ok) {
                throw new Error('Failed to create order');
            }

            const data = await res.json();

            setOrder(data);
            clearCart();
            return data;
        } catch (error) {
            console.error("Order placement failed:", error);
            // Fallback for offline/demo
            const fallbackOrder = {
                _id: `LOC-${Math.floor(Math.random() * 10000)}`,
                items: cart,
                totalPrice: getCartTotal(),
                date: new Date().toISOString(),
                status: 'Local'
            };
            setOrder(fallbackOrder);
            clearCart();
            return fallbackOrder;
        }
    };

    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        userDetails,
        setUserDetails,
        order,
        placeOrder,
        isCartOpen,
        setIsCartOpen,
        toggleCart
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
            <CartToast
                visible={toast.visible}
                product={toast.product}
                onClose={() => setToast({ visible: false, product: null })}
            />
        </ShopContext.Provider>
    );
};
