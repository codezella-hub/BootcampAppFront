import React, { useState, useEffect } from "react";
import { getOrders, deleteOrder } from "../../services/orderAPI";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Cart.css";

const DEFAULT_IMAGE = "/vite.svg"; // Default image when none is provided

const Cart = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      console.log("Fetched Orders:", data);

      if (Array.isArray(data) && data.length > 0) {
        setOrders(data);
      } else {
        console.warn("No valid orders received.");
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOrder(orderId);
          setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
          Swal.fire("Deleted!", "Your order has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete the order. Try again later.", "error");
        }
      }
    });
  };

  const handleQuantityChange = (orderId, courseId, newQuantity) => {
    if (!orderId || !courseId || newQuantity < 1) return; // Prevent negatives

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.courseId && item.courseId._id === courseId
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            }
          : order
      )
    );
  };

  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="page-container">
      <Header />

      {/* Breadcrumb Section */}
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

      {/* Cart Content */}
      <main className="ms-main">
        <div className="ms-page-content container">
          <div className="woocommerce">
            {loading ? (
              <p className="loading-message">Loading your cart...</p>
            ) : orders.length === 0 ? (
              <p className="empty-message">Your cart is empty.</p>
            ) : (
              <div className="ms-woocommerce-cart-form-wrapper">
                <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents">
                  <thead>
                    <tr>
                      <th className="product-remove">&nbsp;</th>
                      <th className="product-thumbnail">&nbsp;</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) =>
                      order.items.map((item) => {
                        const course = item.courseId || {}; // Ensure course data exists
                        return (
                          <tr key={course._id || item._id}>
                            <td className="product-remove">
                              <button 
                                className="remove" 
                                onClick={() => handleDeleteOrder(order._id)}
                                aria-label="Remove this item"
                              >
                                ✖
                              </button>
                            </td>
                            <td className="product-thumbnail">
                              <Link to={course._id ? `/course/${course._id}` : "#"}>
                                <img
                                  src={course.image || DEFAULT_IMAGE}
                                  alt={course.title || "Unknown Course"}
                                  className="cart-image"
                                />
                              </Link>
                            </td>
                            <td className="product-name">
                              {course._id ? (
                                <Link to={`/course/${course._id}`}>{course.title}</Link>
                              ) : (
                                <span>Unknown Course</span>
                              )}
                            </td>
                            <td className="product-price">
                              TND {item.price?.toFixed(2) || "0.00"}
                            </td>
                            <td className="product-quantity">
                              <div className="cart-edit">
                                <div className="quantity-edit">
                                  <button
                                    className="button minus"
                                    onClick={() =>
                                      handleQuantityChange(order._id, course._id, item.quantity - 1)
                                    }
                                  >
                                    <i className="fal fa-minus"></i>
                                  </button>
                                  <input type="text" className="input" value={item.quantity || 1} readOnly />
                                  <button
                                    className="button plus"
                                    onClick={() =>
                                      handleQuantityChange(order._id, course._id, item.quantity + 1)
                                    }
                                  >
                                    <i className="fal fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="product-subtotal">
                              TND {(item.price * (item.quantity || 1)).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>

                {/* Coupon Section */}
                <div className="coupon-section">
                  <form className="woocommerce-cart-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="ms-actions-inner">
                      <div className="coupon">
                        <input
                          type="text"
                          name="coupon_code"
                          className="input-text"
                          placeholder="Enter your coupon"
                          required
                        />
                        <button type="submit" className="button rts-btn btn-primary">
                          Apply coupon
                        </button>
                      </div>
                    </div>
                  </form>
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
