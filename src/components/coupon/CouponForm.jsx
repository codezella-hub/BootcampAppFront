import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CouponForm = ({ onSuccess, existingCoupon }) => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingCoupon) {
      setCode(existingCoupon.code);
      setDiscount(existingCoupon.discount);
      setExpirationDate(existingCoupon.expirationDate.split('T')[0]);
    } else {
      resetForm();
    }
  }, [existingCoupon]);

  const resetForm = () => {
    setCode('');
    setDiscount('');
    setExpirationDate('');
    setError('');
  };

  useEffect(() => {
    if (code && discount > 0 && discount <= 100 && expirationDate) {
      setIsFormValid(true);
      setError('');
    } else {
      setIsFormValid(false);
      if (discount && (discount <= 0 || discount > 100)) {
        setError('Discount must be between 1 and 100.');
      }
    }
  }, [code, discount, expirationDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { code, discount, expirationDate };

    try {
      if (existingCoupon) {
        await axios.put(`http://localhost:3000/api/coupons/${existingCoupon._id}`, payload);
      } else {
        await axios.post('http://localhost:3000/api/coupons', payload);
      }

      resetForm();
      Swal.fire({
        title: '🎉 Success!',
        text: existingCoupon ? 'Coupon updated successfully!' : 'Coupon created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      }).then(() => onSuccess());
    } catch (err) {
      Swal.fire({
        title: '❌ Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm rounded mb-5">
      <div className="card-body">
        <h5 className="card-title fw-bold mb-4 d-flex align-items-center">
          <span role="img" aria-label="ticket" className="me-2">🎟️</span>
          {existingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
        </h5>

        <form onSubmit={handleSubmit}>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td className="fw-semibold align-middle" style={{ width: '150px' }}>Coupon Code</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter coupon code"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td className="fw-semibold align-middle">Discount (%)</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Enter discount (1–100)"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td className="fw-semibold align-middle">Expiration Date</td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {error && <div className="alert alert-danger small py-2">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Please wait...
              </>
            ) : existingCoupon ? 'Update Coupon' : 'Create Coupon'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CouponForm;
