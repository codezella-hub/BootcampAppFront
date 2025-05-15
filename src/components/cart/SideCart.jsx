import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import { useCartStore } from '../cartStore/cartStore';

const SideCart = ({ isOpen, onClose }) => {
    const { cartItems } = useCartStore();

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + (item.price || 0),
            0
        );
    };

    return (
        <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="cart-title">
                    <span className="cart-icon">🛒</span>
                    <h3>
                        My Cart <span className="item-count">({cartItems.length} items)</span>
                    </h3>
                </div>
                <button className="close-sidebar" onClick={onClose}>×</button>
            </div>

            <div className="sidebar-items">
                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img
                                src= "/online-course.png"
                                alt={item.title || "Course image"}
                                className="item-image"
                            />
                            <div className="cart-item-content">
                                <div className="cart-item-header">
                                    <div className="cart-item-title">
                                        <h4>{item.title}</h4>
                                        <p className="item-subtitle">
                                            {item.variant || 'General'} &nbsp;|&nbsp; {(item.price || 0).toFixed(2)} TND
                                        </p>
                                    </div>
                                </div>
                                <div className="price-only">
                                    <span className="price">
                                        TND {(item.price || 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="sidebar-footer">
                    <div className="cart-total">
                        <span>Total:</span>
                        <span className="total-amount">TND {calculateTotal().toFixed(2)}</span>
                    </div>

                    <Link to="/cart" className="view-cart-btn" onClick={onClose}>
                        View Full Cart
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SideCart;
