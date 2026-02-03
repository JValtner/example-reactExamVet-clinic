import axios from "axios";
import { getToken } from "../service/authService";

const AxiosConfig = axios.create({
  baseURL: "http://localhost:5231/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to every request
AxiosConfig.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosConfig;
