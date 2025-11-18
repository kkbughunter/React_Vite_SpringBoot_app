import API from "../api/axiosConfig";

export const orderService = {
  createOrder: async (orderData) => {
    const response = await API.post("/orders", orderData);
    return response.data;
  },

  getUserOrders: async (userId) => {
    const response = await API.get(`/orders/user/${userId}`);
    return response.data;
  }
};