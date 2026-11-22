
import axios from "axios";

const API = axios.create({
  baseURL: "https://smartexploretourism-backend.onrender.com",
});

// Get all destinations
export const getDestinations = async () => {
  try {
    const response = await API.get("/api/destinations");
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw error;
  }
};

// Get personalized recommendations
export const getRecommendations = async (preferences) => {
  try {
    const response = await API.post("/api/recommend", preferences);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};

export const getHotels = async (budget, hotelType) => {
  try {
    const response = await API.post("/api/hotels", {
      budget: Number(budget),
      hotelType: hotelType,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};


export default API;
