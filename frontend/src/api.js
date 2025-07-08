import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Automatically sends cookies
});

export default API;
