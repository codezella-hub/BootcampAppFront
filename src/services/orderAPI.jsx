import axios from "axios";

const API_URL = "http://localhost:3000/api/orders";

// Fetch all orders with better error handling
export const getOrders = async () => {
  try {
    console.log("Fetching orders...");
    const response = await axios.get(API_URL);
    
    if (!response.data || !Array.isArray(response.data)) {
      console.error("Invalid API response:", response.data);
      return [];
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
    return [];
  }
};

// Create a new order
export const createOrder = async (userId, courses, totalAmount) => {
  try {
    const response = await axios.post(API_URL, {
      user: userId,
      courses,
      totalAmount,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    throw error;
  }
};

// Process payment for an order
export const processPayment = async (orderId, paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/${orderId}/payment`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error processing payment:", error.response?.data || error.message);
    throw error;
  }
};

// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`${API_URL}/${orderId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting order:", error.response?.data || error.message);
    throw error;
  }
};
