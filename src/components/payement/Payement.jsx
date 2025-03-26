import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_publishable_key');

const CheckoutForm = ({ totalAmount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    // Here you would typically make an API call to your backend
    // to process the payment with Stripe
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: totalAmount,
        }),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-row">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      {error && <div className="card-error">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="pay-button"
      >
        {processing ? 'Processing...' : `Pay TND ${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

const Payment = ({ cartItems }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePaymentSuccess = (result) => {
    setPaymentSuccess(true);
    // Handle post-payment actions (clear cart, show confirmation, etc.)
  };

  return (
    <div className="payment-container">
      <div className="payment-summary">
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item._id} className="summary-item">
            <span>{item.title}</span>
            <span>TND {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="total">
          <strong>Total:</strong>
          <strong>TND {calculateTotal().toFixed(2)}</strong>
        </div>
      </div>

      <div className="payment-section">
        <h2>Payment Details</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            totalAmount={calculateTotal()}
            onSuccess={handlePaymentSuccess}
          />
        </Elements>
      </div>

      {paymentSuccess && (
        <div className="payment-success">
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
        </div>
      )}
    </div>
  );
};

export default Payment;