import React from "react";
import { Link } from "react-router-dom";
import Header from "../cart/Header";
import Footer from "../cart/Footer";
import "./Cancel.css";

const Cancel = () => {
  return (
    <>
      <Header />
      <div className="cancel-container">
        <div className="cancel-box">
          <h1>❌ Payment Cancelled</h1>
          <p>No worries — your cart is safe. You can complete your order anytime.</p>
          <div className="cancel-actions">
            <Link to="/cart" className="btn-retry">🛒 Go Back to Cart</Link>
            <Link to="/" className="btn-home">🏠 Return to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cancel;
