import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY,
  }
});

instance.interceptors.request.use(
  (config) => {
    // Retrieve the token from a secure location (e.g., localStorage, sessionStorage)
    const token = localStorage.getItem("token");

    if (token) {
      // Add the token to the Authorization header
      config.headers['x-auth'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default instance;