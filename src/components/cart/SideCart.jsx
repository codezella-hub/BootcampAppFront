import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const SideCart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className={`sidebar-cart ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>MY CART ({cartItems.length} ITEMS)</h3>
        <button className="close-sidebar" onClick={onClose}>×</button>
      </div>

      <div className="sidebar-items">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image || "/online-course.png"} alt={item.title} className="item-image" />
            <div className="item-details">
              <h4>{item.title}</h4>
              <div className="quantity-price">
                <div className="quantity-controls">
                  <button 
                    onClick={() => onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="price">TND {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
            <button 
              className="remove-item" 
              onClick={() => onRemoveItem(item._id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {cartItems.length > 0 ? (
        <div className="sidebar-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>TND {calculateTotal().toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="checkout-btn">
            PROCEED TO CHECKOUT
          </Link>
          <Link to="/cart" className="view-cart-btn">
            VIEW CART
          </Link>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default SideCart;