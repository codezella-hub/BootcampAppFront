import axios from "axios";

const API_URL = "http://localhost:3000/api/orders";

// Fetch all orders with robust error handling
export const getOrders = async () => {
  try {
    console.log("Fetching orders...");
    const response = await axios.get(API_URL);

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    if (!response.data || !Array.isArray(response.data)) {
      console.error("Invalid API response format:", response.data);
      return [];
    }

    console.log("Fetched Orders:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
    return [];
  }
};

// Create a new order with input validation
export const createOrder = async (userId, items, totalAmount) => {
  try {
    if (!userId || !Array.isArray(items) || items.length === 0 || totalAmount <= 0) {
      throw new Error("Invalid order data. Please check the user ID, items, and total amount.");
    }

    const response = await axios.post(API_URL, { userId, items, totalAmount });

    if (response.status !== 201) {
      throw new Error(`Failed to create order. Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    throw error;
  }
};

// Delete an order with confirmation handling
export const deleteOrder = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required to delete an order.");
    }

    const response = await axios.delete(`${API_URL}/${orderId}`);

    if (response.status !== 200) {
      throw new Error(`Failed to delete order. Status: ${response.status}`);
    }

    return { success: true, message: "Order deleted successfully." };
  } catch (error) {
    console.error("Error deleting order:", error.response?.data || error.message);
    throw error;
  }
};
