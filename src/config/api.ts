import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://choice-backend.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT
api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
