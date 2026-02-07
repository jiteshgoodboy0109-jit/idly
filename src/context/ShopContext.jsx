import React, { createContext, useContext, useState, useEffect } from 'react';

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
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
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

    const placeOrder = () => {
        const newOrder = {
            id: `ORD-${Math.floor(Math.random() * 10000)}`,
            items: cart,
            total: getCartTotal(),
            date: new Date().toISOString(),
            status: 'Confirmed'
        };
        setOrder(newOrder);
        clearCart();
        return newOrder;
    };

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
        placeOrder
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
