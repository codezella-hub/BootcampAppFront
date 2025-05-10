import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "../cart/Footer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./Cart.css";
import Header from "../commun/Header.jsx";
import { useCartStore } from "../cartStore/cartStore";
import { useAuthStore } from '../../store/authStore'; 
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, setCartFromBackend } = useCartStore();
   const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [processingCheckout, setProcessingCheckout] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const userString = localStorage.getItem("auth-storage");
      const userId = user._id ;

      if (!userId) {
        console.warn("No userId found in localStorage.");
        setCartFromBackend([]);
        return;
      }

      const response = await axios.get(`/api/orders/user-id/${userId}`);
      const data = response.data;

      if (!Array.isArray(data)) {
        console.warn("Expected array but got:", data);
        setCartFromBackend([]);
        return;
      }

      const enrichedItems = data.flatMap((order) =>
        order.items.map((item) => ({
          _id: order._id,
          courseId: typeof item.courseId === "object"
            ? item.courseId._id?.toString() || item.courseId.toString()
            : item.courseId,
          price: item.price,
          title: item?.courseId?.title || "Untitled Course",
          image: item?.courseId?.courseImage || "/assets/images/shop/01.jpg",
          quantity: item.quantity || 1,
        }))
      );

      setCartFromBackend(enrichedItems);
    } catch (error) {
      if (error.response?.status === 404) {
        console.info("No orders found for this user.");
        setCartFromBackend([]);
      } else {
        console.error("Error fetching orders:", error);
        Swal.fire("Error", "Failed to load your cart. Please try again.", "error");
        setCartFromBackend([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!orderId) return;

    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await axios.delete(`/api/orders/${orderId}`);
      removeFromCart(orderId);
      Swal.fire("Deleted!", "Your order has been removed.", "success");
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error", "Failed to delete the order. Please try again.", "error");
    }
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + (item?.price || 0) * (item?.quantity || 1), 0);

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = (discountPercent / 100) * subtotal;
    return subtotal - discount;
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    const trimmed = couponCode.trim();

    if (!trimmed) {
      setDiscountPercent(0);
      Swal.fire("Invalid Coupon", "Please enter a coupon code.", "error");
      return;
    }

    try {
      const response = await axios.post("/api/coupons/validate", { couponCode: trimmed });
      const { discount, valid } = response.data;

      if (!valid) {
        setDiscountPercent(0);
        Swal.fire("Invalid Coupon", "This coupon does not exist.", "error");
      } else {
        setDiscountPercent(discount);
        Swal.fire("Coupon Applied!", `You received a ${discount}% discount.`, "success");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      Swal.fire("Error", "Failed to apply coupon. Please try again.", "error");
    }
  };

  const handleCheckout = async () => {
    setProcessingCheckout(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const userString = localStorage.getItem("auth-storage");
      const userId = userString ? JSON.parse(userString)?.state?.user?._id : null;

      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Login Required",
          text: "Please log in to proceed to checkout.",
        });
        return;
      }

      const payload = {
        items: cartItems.map(item => ({
          courseId: item.courseId,
          price: item.price,
          quantity: item.quantity,
          title: item.title,
          image: item.image,
        })),
        amount: calculateTotal(),
        userid: userId,
        couponCode: couponCode.trim(),
      };

      const response = await axios.post("/api/payment/create-checkout-session", payload);
      const sessionId = response.data.sessionId || response.data.id;

      if (!sessionId) throw new Error("No session ID returned from the backend");

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw new Error(error.message);
    } catch (error) {
      console.error("❌ Error during checkout:", error);
      Swal.fire({
        icon: "error",
        title: "Checkout Error",
        text: error?.response?.data?.error || error.message || "Checkout failed. Please try again.",
      });
    } finally {
      setProcessingCheckout(false);
    }
  };

  return (
    <div className="page-container">
      <Header />

      <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-main-wrapper">
                <h1 className="title">Cart</h1>
                <div className="pagination-wrapper">
                  <Link to="/">Home</Link>
                  <i className="fa-regular fa-chevron-right"></i>
                  <Link to="/cart" className="active">Cart</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="ms-main">
        <div className="ms-page-content container">
          <div className="woocommerce">
            {loading ? (
              <div className="loading-message">Loading your cart...</div>
            ) : cartItems.length === 0 ? (
              <div className="empty-cart-message">Your cart is empty.</div>
            ) : (
              <div className="ms-woocommerce-cart-form-wrapper">
                <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents">
                  <thead>
                    <tr>
                      <th className="product-remove"></th>
                      <th className="product-thumbnail"></th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td className="product-remove">
                          <button onClick={() => handleDeleteOrder(item._id)} className="remove" aria-label="Remove this item">✕</button>
                        </td>
                        <td className="product-thumbnail">
                          <Link to={`/course/${item.courseId}`}>
                            <img src="/online-course.png" alt={item.title} className="cart-image" />
                          </Link>
                        </td>
                        <td className="product-name">
                          <Link to={`/course/${item.courseId}`}>{item.title}</Link>
                        </td>
                        <td className="product-price">
                          <span className="amount">TND {(item?.price || 0).toFixed(2)}</span>
                        </td>
                        <td className="product-quantity">
                          <span>{item.quantity}</span>
                        </td>
                        <td className="product-subtotal">
                          <span className="amount">TND {(item.price * item.quantity).toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="6" className="actions">
                        <form onSubmit={handleApplyCoupon} className="coupon">
                          <input
                            type="text"
                            name="coupon_code"
                            className="input-text"
                            placeholder="Enter your coupon"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            required
                          />
                          <button type="submit" className="button rts-btn btn-primary">Apply coupon</button>
                        </form>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="cart-totals">
                  <h3>Cart Totals</h3>
                  <table className="shop_table">
                    <tbody>
                      <tr className="cart-subtotal">
                        <th>Subtotal</th>
                        <td>TND {calculateSubtotal().toFixed(2)}</td>
                      </tr>
                      {discountPercent > 0 && (
                        <tr className="cart-discount">
                          <th style={{ color: "red" }}>Discount</th>
                          <td style={{ color: "red" }}>
                            -{discountPercent}% (TND {((calculateSubtotal() * discountPercent) / 100).toFixed(2)})
                          </td>
                        </tr>
                      )}
                      <tr className="order-subtotal">
                        <th>Total</th>
                        <td>TND {calculateTotal().toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="proceed-to-checkout">
                    <button
                      onClick={handleCheckout}
                      disabled={processingCheckout}
                      className="rts-btn btn-primary"
                    >
                      {processingCheckout ? "Processing..." : "Proceed to checkout"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
