import API from "../api/axiosConfig";

export const productService = {
  getAllProducts: async () => {
    const response = await API.get("/products");
    return response.data;
  },

  getProduct: async (id) => {
    const response = await API.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await API.post("/products", productData);
    return response.data;
  }
};