import axios from "axios";

const baseURL = import.meta.env.VITE_DEFAULT_URL

export const api = axios.create({
  baseURL: baseURL,
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return Promise.reject(new Error("Ruxsat yo'q!"));
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
