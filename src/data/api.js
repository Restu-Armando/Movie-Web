import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch data films
export const fetchMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, language: "en-US", page },
    });
    return response.data;
  } catch (error) {
    console.error("Error Fatching Movies:", error);
    return null;
  }
};

// Fetching details film by ID
export const fetchDetailMovies = async (movieID) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieID}`, {
      params: { api_key: API_KEY, language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Error Fetching Movie Details", error);
    return null;
  }
};

// Search Films
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, language: "en-US", query, page },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    return null;
  }
};
