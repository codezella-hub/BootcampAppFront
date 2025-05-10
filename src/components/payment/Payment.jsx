import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { getOrderByUserId, createPaymentIntent } from '../../services/orderAPI';
import { useAuthStore } from "../../store/authStore.js";

const stripePromise = loadStripe('pk_test_51QyQ9GPr7Wx2VC7r2cJomZjfiM47Pypu2bMv8AVNvkuhHJTkXv90ScMt0Ve2qMVpy6J88GBc6pIQNHdJdFqLq6zd00eUXIns2i');

const calculateSubtotal = (items = []) => {
  return items.reduce((total, item) => total + ((item?.price || 0) * (item?.quantity || 1)), 0);
};

const CheckoutForm = ({ clientSecret, totalAmount, onSuccess, onFailure }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again later.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details are missing.");
      setProcessing(false);
      return;
    }

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        onFailure(stripeError);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
      } else {
        setError("Payment did not complete. Please try again.");
        onFailure(paymentIntent);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("An error occurred while processing your payment. Please try again.");
      onFailure(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="total">
        <strong>Total: </strong>
        <strong>TND {totalAmount.toFixed(2)}</strong>
      </div>
      <CardElement />
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="submit-button" disabled={!stripe || processing}>
        {processing ? "Processing..." : `Pay TND ${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

const Payment = ({ cartItems = [] }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchOrdersAndIntent = async () => {
      try {
        const userId = user._id;
        const orders = await getOrderByUserId(userId);
        const total = orders.reduce((total, order) => total + calculateSubtotal(order?.items || []), 0);
        setTotalAmount(total);

        // ✅ Call backend to create PaymentIntent and get clientSecret
        const { clientSecret } = await createPaymentIntent({
          amount: total,
          userId: userId,
        });
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error setting up payment:", error);
      }
    };

    fetchOrdersAndIntent();
  }, [user._id]);

  const handlePaymentSuccess = (result) => {
    setPaymentSuccess(true);
    console.log("Payment successful:", result);
  };

  const handlePaymentFailure = (result) => {
    console.error("Payment failed:", result);
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
      </div>

      <div className="payment-section">
        <h2>Payment Details</h2>
        <Elements stripe={stripePromise}>
          {clientSecret ? (
            <CheckoutForm
              clientSecret={clientSecret}
              totalAmount={totalAmount}
              onSuccess={handlePaymentSuccess}
              onFailure={handlePaymentFailure}
            />
          ) : (
            <p>Loading payment details...</p>
          )}
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
