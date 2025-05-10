import axios from "axios";

const BASE_URL = "http://localhost:3000/api";
const ORDERS_URL = `${BASE_URL}/orders`;
const COURSES_URL = `${BASE_URL}/courses`;

// ✅ Get course by ID
export const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${COURSES_URL}/course/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching course by ID:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get all orders
export const getOrders = async () => {
  try {
    const response = await axios.get(ORDERS_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching orders:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get orders by User ID
export const getOrderByUserId = async (userId) => {
  try {
    const response = await axios.get(`${ORDERS_URL}/user-id/${userId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching orders by user ID:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete an order
export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${ORDERS_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting order:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update the quantity of a specific course in an order
export const updateOrderQuantity = async (orderId, courseId, quantity) => {
  try {
    const response = await axios.put(`${ORDERS_URL}/quantity`, {
      orderId,
      courseId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error updating quantity:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Create Stripe payment intent (used in Payment.jsx)
export const createPaymentIntent = async ({ amount, userId }) => {
  try {
    const response = await axios.post(`${BASE_URL}/payment/create-payment-intent`, {
      amount,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error creating payment intent:", error.response?.data || error.message);
    throw error;
  }
};
