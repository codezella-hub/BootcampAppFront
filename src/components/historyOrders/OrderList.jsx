import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const OrderList = () => {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const {user} = useAuthStore();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/user-id/${user._id}`);
        setOrders(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    };

    switch (status.toLowerCase()) {
      case 'completed':
        return {
          ...baseStyle,
          backgroundColor: '#e6f7ee',
          color: '#10b981'
        };
      case 'pending':
        return {
          ...baseStyle,
          backgroundColor: '#fff4e6',
          color: '#f59e0b'
        };
      case 'cancelled':
        return {
          ...baseStyle,
          backgroundColor: '#fee2e2',
          color: '#ef4444'
        };
      default:
        return baseStyle;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px' 
      }}>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#fee2e2', 
        color: '#ef4444',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        Error: {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h5 style={{ marginBottom: '16px' }}>No orders found</h5>
        <p>You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="col-lg-9">
      <div 
        className="rts-reviewd-area-dashed table-responsive" 
        style={{ 
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <h5 
              className="title" 
              style={{ 
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '24px',
                color: '#1e293b'
              }}
            >
              Order History
            </h5>
            
            <div style={{ overflowX: 'auto' }}>
              <table 
                className="table-reviews quiz mb--0" 
                style={{ 
                  width: '100%',
                  borderCollapse: 'collapse'
                }}
              >
                <thead>
                  <tr style={{ 
                    backgroundColor: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <th style={{ 
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#64748b'
                    }}>Order ID</th>
                    <th style={{ 
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#64748b'
                    }}>Course Name</th>
                    <th style={{ 
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#64748b'
                    }}>Date</th>
                    <th style={{ 
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#64748b'
                    }}>Price</th>
                    <th style={{ 
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#64748b'
                    }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr 
                      key={order._id}
                      style={{ 
                        borderBottom: '1px solid #e2e8f0',
                        transition: 'background-color 0.2s',
                        ':hover': {
                          backgroundColor: '#f8fafc'
                        }
                      }}
                    >
                      <td style={{ 
                        padding: '16px',
                        fontSize: '14px',
                        color: '#334155'
                      }}>
                        <div className="information-quiz">
                          <p className="quiz" style={{ margin: 0 }}>#{order._id.slice(-4).toUpperCase()}</p>
                        </div>
                      </td>
                      <td style={{ 
                        padding: '16px',
                        fontSize: '14px',
                        color: '#334155'
                      }}>
                        {order.items.map((item, index) => (
                          <div key={index}>
                            <span 
                              className="questions" 
                              style={{ 
                                display: 'block',
                                marginBottom: index < order.items.length - 1 ? '8px' : '0'
                              }}
                            >
                              {item.courseId?.title || 'Course not available'}
                              {item.certificate && (
                                <span style={{
                                  marginLeft: '8px',
                                  fontSize: '12px',
                                  backgroundColor: '#e0f2fe',
                                  color: '#0369a1',
                                  padding: '2px 8px',
                                  borderRadius: '4px'
                                }}>
                                  Certificate
                                </span>
                              )}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td style={{ 
                        padding: '16px',
                        fontSize: '14px',
                        color: '#64748b'
                      }}>
                        <span className="marks">{formatDate(order.orderDate)}</span>
                      </td>
                      <td style={{ 
                        padding: '16px',
                        fontSize: '14px',
                        color: '#334155',
                        fontWeight: '600'
                      }}>
                        ${order.totalAmount.toFixed(2)}
                        {order.discount > 0 && (
                          <span style={{
                            display: 'block',
                            fontSize: '12px',
                            color: '#10b981',
                            marginTop: '4px'
                          }}>
                            Saved {order.discount}%
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div className="hold-area">
                          <span style={getStatusStyle(order.status)}>
                            {order.status}
                            <i className="fa-regular fa-clipboard-list" style={{ fontSize: '12px' }} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;