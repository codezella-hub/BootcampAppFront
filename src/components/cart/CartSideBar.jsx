import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import './CartSidebar.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CartSidebar = ({ isOpen, toggleSidebar }) => {
  const { cartItems, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();
  const [processingCheckout, setProcessingCheckout] = useState(false);

  const handleCheckout = async () => {
    try {
      setProcessingCheckout(true);
      const stripe = await stripePromise;

      const response = await axios.post("/api/payment/create-checkout-session", {
        items: cartItems.map(item => ({
          courseId: item._id,
          quantity: 1,
        })),
      });

      await stripe.redirectToCheckout({ sessionId: response.data.sessionId });

    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setProcessingCheckout(false);
    }
  };

  if (!isOpen) return null; // If not open, hide the sidebar

  return (
    <div className="cart-sidebar" style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '300px',
      height: '100%',
      backgroundColor: '#fff',
      boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
      padding: '20px',
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      <button onClick={toggleSidebar} style={{ marginBottom: '20px', background: 'none', border: 'none', fontSize: '20px' }}>
        ❌ Close
      </button>

      <h3>My Cart ({cartItems.length} items)</h3>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item._id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <h4>{item.title}</h4>
              <p>TND {item.price}</p>
              <button onClick={() => removeFromCart(item._id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                Remove
              </button>
            </div>
          ))}

          <div style={{ marginTop: '20px' }}>
            <h4>Total: TND {totalAmount.toFixed(2)}</h4>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={() => {navigate("/cart"); toggleSidebar();}}
              className="rts-btn btn-primary"
            >
              View Cart
            </button>
            <button 
              onClick={handleCheckout}
              disabled={processingCheckout}
              className="rts-btn btn-primary"
            >
              {processingCheckout ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
