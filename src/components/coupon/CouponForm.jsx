import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2 for pop-up messages

const CouponForm = ({ onSuccess, existingCoupon }) => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (existingCoupon) {
      setCode(existingCoupon.code);
      setDiscount(existingCoupon.discount);
      setExpirationDate(existingCoupon.expirationDate.split('T')[0]); // ISO date format
    }
  }, [existingCoupon]);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form inputs
    if (!code || discount <= 0 || discount > 100 || !expirationDate) {
      setError("All fields are required and discount must be between 0 and 100.");
      return;
    }

    const payload = { code, discount, expirationDate };

    try {
      if (existingCoupon) {
        await axios.put(`http://localhost:3000/api/coupons/${existingCoupon._id}`, payload);
      } else {
        await axios.post('http://localhost:3000/api/coupons', payload);
      }

      // Reset form fields
      setCode('');
      setDiscount('');
      setExpirationDate('');
      setError('');
      
      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Coupon has been created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        onSuccess();
      });
    } catch (error) {
      // Handle error
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong! Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // Validate form fields on change to enable/disable the submit button
  useEffect(() => {
    if (code && discount > 0 && discount <= 100 && expirationDate) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [code, discount, expirationDate]);

  return (
    <form onSubmit={handleSubmit} className="coupon-form mb-5 p-4 shadow-lg rounded">
      <div className="mb-4">
        <label htmlFor="code" className="form-label" style={{ color: '#6c757d' }}>Coupon Code</label>
        <input
          id="code"
          className="form-control"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Code"
          required
        />
      </div>
      <div className="mb-4">
  <label htmlFor="discount" className="form-label" style={{ color: '#6c757d' }}>Discount (%)</label>
  <input
    id="discount"
    className="form-control"
    type="number"
    value={discount}
    onChange={(e) => setDiscount(e.target.value)}
    placeholder="Enter Discount"
    required
    style={{ color: '#495057', backgroundColor: '#f8f9fa' }} // Input text color and background
  />
</div>

      <div className="mb-4">
        <label htmlFor="expirationDate" className="form-label" style={{ color: '#6c757d' }}>Expiration Date</label>
        <input
          id="expirationDate"
          className="form-control"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 py-2" disabled={!isFormValid}>Create Coupon</button>
    </form>
  );
};

export default CouponForm;
