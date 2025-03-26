import axios from "axios";

const API_URL = "http://localhost:3000/api/orders";

export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

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