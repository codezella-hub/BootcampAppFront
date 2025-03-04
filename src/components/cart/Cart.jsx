import React, { useState, useEffect } from "react";
import { getOrders, deleteOrder } from "../../services/orderAPI";
import Header from "./Header";
import Footer from "./Footer";
import "./Cart.css"; 

const Cart = ({ cartItems = [] }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        
        const data = await getOrders();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Invalid orders data format:", data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error loading orders:", error);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

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
                  <a href="/">Home</a>
                  <i className="fa-regular fa-chevron-right"></i>
                  <a className="active" href="/cart">
                    Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <main className="ms-main">
        <div className="ms-page-content container">
          {cartItems.length === 0 ? (
            <p className="empty-message">Your cart is empty.</p>
          ) : (
            <div className="woocommerce">
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
                    {cartItems.map((item) => (
                      <tr key={item._id} className="woocommerce-cart-form__cart-item cart_item">
                        <td className="product-remove">
                          <button
                            className="remove"
                            onClick={() => deleteOrder(item._id)}
                          >
                            ✖
                          </button>
                        </td>
                        <td className="product-thumbnail">
                          <a href={`/course/${item._id}`}>
                            <img src={item.image} alt={item.title} className="cart-image" />
                          </a>
                        </td>
                        <td className="product-name">
                          <a href={`/course/${item._id}`}>{item.title}</a>
                        </td>
                        <td className="product-price"> TND {item.price.toFixed(2)}</td>
                        <td>
                          <div className="cart-edit">
                            <div className="quantity-edit">
                              <button className="button">-</button>
                              <span className="quantity">{item.quantity}</span>
                              <button className="button">+</button>
                            </div>
                          </div>
                        </td>
                        <td className="product-subtotal"> TND {(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="6" className="actions">
                        <div className="ms-actions-inner">
                          <div className="coupon">
                            <input type="text" className="input-text" placeholder="Coupon code" />
                            <button className="button rts-btn btn-primary">Apply coupon</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Section */}
          <h2 className="order-title">Your Orders ({orders.length})</h2>

          {orders.length === 0 ? (
            <p className="empty-message">No orders yet.</p>
          ) : (
            <div className="woocommerce">
              <div className="ms-woocommerce-cart-form-wrapper">
                <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents">
                  <thead>
                    <tr>
                      <th className="order-id">Order ID</th>
                      <th className="order-total">Total</th>
                      <th className="order-status">Payment Status</th>
                      <th className="order-action">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="order-id">{order._id}</td>
                        <td className="order-total">TND{order.totalAmount.toFixed(2)}</td>
                        <td className="order-status">{order.payment.status}</td>
                        <td className="order-action">
                          <button
                            className="rts-btn btn-border cancel-btn"
                            onClick={() => deleteOrder(order._id)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
///
export default Cart;
