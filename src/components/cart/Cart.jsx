import React, { useState, useEffect } from "react";
import { getOrders, deleteOrder, getCourseById } from "../../services/orderAPI";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Cart.css";

const Cart = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();

      const enrichedOrders = await Promise.all(
        data.map(async (order) => {
          const enrichedItems = await Promise.all(
            order.items.map(async (item) => {
              let courseTitle = "Untitled Course";
              let courseImage = "/assets/images/shop/01.jpg";

              const courseId =
                typeof item.courseId === "object"
                  ? item.courseId._id?.toString?.() || item.courseId.toString?.()
                  : item.courseId;

              if (!courseId) {
                console.warn("Missing courseId in item:", item);
                return {
                  ...item,
                  courseTitle,
                  courseImage,
                };
              }

              try {
                const course = await getCourseById(courseId);
                if (course) {
                  courseTitle = course.title;
                  courseImage = course.courseImage;
                } else {
                  console.warn("Course not found for ID:", courseId);
                }
              } catch (err) {
                console.warn("Failed to fetch course details", err);
              }

              return {
                ...item,
                courseTitle,
                courseImage,
                courseId: courseId,
              };
            })
          );

          return { ...order, items: enrichedItems };
        })
      );

      setOrders(enrichedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!orderId) return;

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
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderId)
          );
          Swal.fire("Deleted!", "Your order has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting order:", error);
          Swal.fire("Error", "Failed to delete the order.", "error");
        }
      }
    });
  };

  const calculateSubtotal = (items = []) =>
    items.reduce((total, item) => total + (item?.price || 0) * (item?.quantity || 1), 0);

  const calculateTotal = () =>
    orders.reduce((total, order) => total + calculateSubtotal(order?.items || []), 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    Swal.fire({
      title: "Coupon Applied",
      text: "Your coupon has been applied successfully!",
      icon: "success",
    });
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
                  <Link to="/cart" className="active">
                    Cart
                  </Link>
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
            ) : orders.length === 0 ? (
              <div className="empty-cart-message">Your cart is empty.</div>
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
                      order?.items?.map((item) => {
                        const courseIdStr =
                          typeof item.courseId === "object"
                            ? item.courseId._id?.toString?.() || item.courseId.toString?.()
                            : item.courseId;

                        return (
                          <tr key={`${order?._id}-${courseIdStr}`}>
                            <td className="product-remove">
                              <button
                                onClick={() => handleDeleteOrder(order?._id)}
                                className="remove"
                                aria-label="Remove this item"
                              >
                                <svg
                                  viewBox="0 0 200 200"
                                  width="18"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"></path>
                                </svg>
                              </button>
                            </td>
                            <td className="product-thumbnail">
                              <Link to={`/course/${courseIdStr}`}>
                                <img
                                  src={item?.courseImage || "/assets/images/shop/01.jpg"}
                                  alt={item?.courseTitle || "Course"}
                                  className="cart-image"
                                />
                              </Link>
                            </td>
                            <td className="product-name">
                              <Link to={`/course/${courseIdStr}`}>
                                {item?.courseTitle || "Untitled Course"}
                              </Link>
                            </td>
                            <td className="product-price">
                              <span className="amount">
                                TND {(item?.price || 0).toFixed(2)}
                              </span>
                            </td>
                            <td className="product-quantity">{item?.quantity || 1}</td>
                            <td className="product-subtotal">
                              <span className="amount">
                                TND {((item?.price || 0) * (item?.quantity || 1)).toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                    <tr>
                      <td colSpan="6" className="actions">
                        <div className="coupon-section">
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
                            <button type="submit" className="button rts-btn btn-primary">
                              Apply coupon
                            </button>
                          </form>
                        </div>
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
                        <td>TND {calculateTotal().toFixed(2)}</td>
                      </tr>
                      <tr className="order-total">
                        <th>Total</th>
                        <td>TND {calculateTotal().toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="proceed-to-checkout">
                    <Link to="/checkout" className="rts-btn btn-primary">
                      Proceed to checkout
                    </Link>
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
