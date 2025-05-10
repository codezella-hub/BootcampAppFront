import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../coupon/Header';
import Footer from '../cart/Footer';
import './HistoryOrderList.css';
import { Link } from 'react-router-dom';

const HistoryOrderList = () => {
  const [historyOrders, setHistoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = (() => {
    const userString = localStorage.getItem('auth-storage');
    return userString ? JSON.parse(userString)?.state?.user?._id : null;
  })();

  useEffect(() => {
    const fetchHistoryOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/history-orders/user-id/${userId}`);
        setHistoryOrders(response.data);
      } catch (err) {
        console.error('Error fetching history orders:', err);
        setError('Failed to load order history. Please try again.');
        setHistoryOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchHistoryOrders();
    } else {
      setError('User not logged in. Please log in to view your order history.');
      setLoading(false);
    }
  }, [userId]);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="history-container">
        <h1 className="history-title">🕘 My Purchased Courses</h1>

        {loading ? (
          <p className="history-loading">Loading your order history...</p>
        ) : error ? (
          <p className="history-error">{error}</p>
        ) : historyOrders.length === 0 ? (
          <p className="history-empty">No past orders found.</p>
        ) : (
          <div className="history-list">
            {historyOrders.map((order) => (
              <div key={order._id} className="history-card">
                <div className="order-header">
                  <h5>Your order:</h5>
                  <span className={`order-status ${order.status?.toLowerCase()}`}>
                    {order.status || 'Completed'}
                  </span>
                </div>
                <p className="order-date">
                  📅 {order.completedAt ? new Date(order.completedAt).toLocaleString() : 'N/A'}
                </p>
                <p className="order-total">💵 Total: TND {order.totalAmount?.toFixed(2) || '0.00'}</p>

                <div className="history-items">
                  {order.items?.map((item) => (
                    <div key={item._id} className="history-item">
                      <img
                        src={item.courseId?.courseImage || '/assets/images/shop/01.jpg'}
                        alt={item.courseId?.title || 'Course image'}
                        className="history-item-image"
                      />
                      <div className="history-item-info">
                        <h3>{item.courseId?.title || 'Untitled Course'}</h3>
                        <p>Quantity: {item.quantity || 1}</p>
                        <p>Price: TND {item.price?.toFixed(2) || '0.00'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="back-home">
          <Link to="/">🏠 Back to Home</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoryOrderList;
