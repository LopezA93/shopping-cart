import axios from "axios";
const isDev = false;
const apiURL = isDev
  ? "http://localhost:3000"
  : "https://api-shopping-cart-production.up.railway.app";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${apiURL}/grocery`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateFavoriteStatus = async (id: string, favorite: number) => {
  try {
    await axios.patch(`${apiURL}/grocery/${id}`, { favorite });
  } catch (error) {
    console.error("Error updating favorite status:", error);
  }
};

export const getFavoriteProducts = async () => {
  try {
    const response = await axios.get(`${apiURL}/grocery?favorite=1`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    return null;
  }
};
