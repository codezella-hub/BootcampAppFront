import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../commun/Header.jsx';
import Footer from '../commun/FooterPrinciple.jsx';
import { Link } from "react-router-dom";
import "./Cart.css";
import {useAuthStore} from "../../store/authStore.js";

const Cart = () => {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Purchased Courses";

    const fetchPurchasedCourses = async () => {
      try {
        const response = await axios.get(
            `/api/paypal/purchased-courses/${user._id}`,
            {
              headers: { Authorization: `Bearer ${user.token}` }
            }
        );

        if (response.status === 200) {
          setCourses(response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        Swal.fire({
          icon: 'error',
          title: 'Loading Failed',
          text: 'Could not load your courses. Please try again later.'
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchPurchasedCourses();
    }
  }, [user]);

  return (
      <div className="page-container">
        <Header />

        <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-main-wrapper">
                  <h1 className="title">Purchased Courses</h1>
                  <div className="pagination-wrapper">
                    <Link to="/">Home</Link>
                    <i className="fa-regular fa-chevron-right"></i>
                    <Link to="/purchased-courses" className="active">My Courses</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="ms-main">
          <div className="ms-page-content container">
            {loading ? (
                <div className="loading-message">Loading your courses...</div>
            ) : courses.length === 0 ? (
                <div className="empty-cart-message">
                  You haven't purchased any courses yet.
                  <Link to="/courses" className="browse-link">Browse Courses</Link>
                </div>
            ) : (
                <div className="ms-woocommerce-cart-form-wrapper">
                  <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents">
                    <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Title</th>
                      <th className="product-price">Price</th>
                      <th className="product-duration">Duration</th>
                      <th className="product-rating">Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((course) => (
                        <tr key={course._id}>
                          <td className="product-thumbnail">
                            <Link to={`/course/${course._id}`}>
                              <img
                                  src={course.courseImage ? `http://localhost:3000${course.courseImage}` : "/assets/images/courses/default.jpg"}
                                  alt={course.title}
                                  className="cart-image"
                              />
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link to={`/course/${course._id}`}>{course.title}</Link>

                          </td>
                          <td className="product-price">
                            TND {course.price?.toFixed(2)}
                          </td>
                          <td className="product-duration">
                            {course.courseDuration} hours
                          </td>
                          <td className="product-rating">
                            {course.rating || 'N/A'} ⭐
                          </td>
                          <td className="product-actions">
                            <Link
                                to={`/course/${course._id}/videos`}
                                className="rts-btn btn-primary"
                            >
                              upload pdf
                            </Link>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default Cart;