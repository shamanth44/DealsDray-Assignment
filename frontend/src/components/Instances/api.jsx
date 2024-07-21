import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true; // Enable sending cookies across requests

const api = axios.create({
  baseURL: "https://employee-dashboard-backend-iota.vercel.app/api/v1", // Update with your actual API base URL
});

// Define a function to intercept requests and add access token (if needed)
axios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Define a function to intercept responses and handle errors
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check for specific error status code (e.g., 401 for Unauthorized)
    if (error.response.status === 401 && !error.config.__isRetry) {
      try {
        // const refreshToken = Cookies.get('refreshToken');
        // if (!refreshToken) {
        //   // Handle case where refresh token is missing (redirect to login?)
        //   console.error('Refresh token missing');
        //   throw new Error('Refresh token missing'); // Consider redirecting to login
        // }

        const response = await api.post(
          "https://employee-dashboard-backend-iota.vercel.app/api/v1/admin/refresh-token"
        ); // Assuming your backend endpoint
        const responseData = response.data.accessToken;
        if (!responseData) {
            // Handle case where refresh token is invalid (redirect to login?)
            console.error("Invalid refresh token");
            throw new Error("Invalid refresh token"); // Consider redirecting to login
        }
        
        const newAccessToken =  responseData;
        Cookies.set("accessToken", newAccessToken);

        // Update the original request config with the new access token
        error.config.__isRetry = true;
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        

        // Retry the original request with the new access token
        return api(error.config);
      } catch (err) {
        // Handle refresh token errors (redirect to login?)
        console.error("Failed to refresh access token:", err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
