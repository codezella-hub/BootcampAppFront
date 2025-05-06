import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CouponForm from './CouponForm';
// Import Header
import Footer from './Footer'; // Import Footer
import Swal from 'sweetalert2';
import Header from "../commun/Header.jsx"; // Import SweetAlert2

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = async () => {
    const res = await axios.get('http://localhost:3000/api/coupons');
    setCoupons(res.data);
  };

  const handleDelete = async (id) => {
    // Show confirmation dialog before proceeding with deletion
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this coupon?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      // Proceed with deleting the coupon
      await axios.delete(`http://localhost:3000/api/coupons/${id}`);
      fetchCoupons();
      Swal.fire({
        title: 'Deleted!',
        text: 'The coupon has been deleted.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Manage Coupons</h2>
        <CouponForm onSuccess={fetchCoupons} />
        <div className="coupon-list mt-4">
          <h4 className="mb-3">Coupons List</h4>
          <div className="row">
            {coupons.map(coupon => (
              <div
                key={coupon._id}
                className="col-lg-4 col-md-6 mb-4"
              >
                <div className="card shadow-sm p-3">
                  <div className="card-body">
                    <h5 className="card-title">{coupon.code}</h5>
                    <p className="card-text text-muted">
                      {coupon.discount}% Discount - Expires on {new Date(coupon.expirationDate).toLocaleDateString()}
                    </p>
                    <div className="progress mt-3" style={{ height: '8px' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${coupon.discount}%` }}
                        aria-valuenow={coupon.discount}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      className="btn btn-danger btn-sm w-100 mt-3"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CouponList;
