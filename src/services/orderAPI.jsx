import axios from "axios";

const API_URL = "http://localhost:3000/api/orders";
export const getCourseById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/courses/course/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};
// Get all orders
export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Get orders by User ID (CIN)
export const getOrderByUserId = async (userid) => {
  try {
    const response = await axios.get(`${API_URL}/user-id/${userid}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch orders");
    }
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw error;
  }
};

// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

// Update the quantity of a specific course in an order
export const updateOrderQuantity = async (orderId, courseId, quantity) => {
  try {
    const response = await axios.put(`${API_URL}/quantity`, {
      orderId,
      courseId,
      quantity
    });
    return response.data;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
  
};
