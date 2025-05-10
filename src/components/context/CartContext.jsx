import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage when component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem('cart-items');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Save cart to localStorage when cartItems change
    useEffect(() => {
        localStorage.setItem('cart-items', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add item to cart (avoid duplicates, increase quantity)
    const addItem = (item) => {
        const existingItem = cartItems.find((i) => i._id === item._id);
        if (existingItem) {
            updateItemQuantity(item._id, existingItem.quantity + item.quantity);
        } else {
            setCartItems([...cartItems, item]);
        }
    };

    // Remove item by ID
    const removeItem = (itemId) => {
        const updated = cartItems.filter((i) => i._id !== itemId);
        setCartItems(updated);
    };

    // Update quantity of an item
    const updateItemQuantity = (itemId, quantity) => {
        const updated = cartItems.map((i) =>
            i._id === itemId ? { ...i, quantity } : i
        );
        setCartItems(updated);
    };

    // Clear entire cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Replace cart from backend orders
    const setCartFromBackend = (items) => {
        setCartItems(items);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addItem,
                removeItem,
                updateItemQuantity,
                clearCart,
                setCartFromBackend,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
