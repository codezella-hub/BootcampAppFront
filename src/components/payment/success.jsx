import React from "react";
import { Link } from "react-router-dom";
import Header from "../cart/Header";
import Footer from "../cart/Footer";
import "./Success.css";

const Success = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="success-container">
        <div className="success-box">
          <h1>✅ Payment Successful!</h1>
          <p>Thank you for your purchase. You now have full access to your course(s) 🎉</p>
          <div className="success-actions">
            <Link to="/" className="btn-home">🏠 Return to Home</Link>
            <Link to="/dashboard/courses" className="btn-my-courses">📚 Go to My Courses</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;
