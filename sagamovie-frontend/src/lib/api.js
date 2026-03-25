import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const buildPosterUrl = (posterPath) => {
  if (!posterPath) {
    return "";
  }

  return `http://localhost:8080/${posterPath}`;
};

export default api;
