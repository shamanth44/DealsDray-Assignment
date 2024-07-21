import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true; 

const api = axios.create({
  baseURL: "https://deals-dray-assignment.vercel.app/api/v1",
});

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

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config.__isRetry) {
      try {
        // const refreshToken = Cookies.get('refreshToken');
        // if (!refreshToken) {
        //   console.error('Refresh token missing');
        //   throw new Error('Refresh token missing'); // Consider redirecting to login
        // }

        const response = await api.post(
          "https://deals-dray-assignment.vercel.app/api/v1/admin/refresh-token"
        ); 
        const responseData = response.data.accessToken;
        if (!responseData) {
            console.error("Invalid refresh token");
            throw new Error("Invalid refresh token"); 
        }
        
        const newAccessToken =  responseData;
        Cookies.set("accessToken", newAccessToken);

        error.config.__isRetry = true;
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        

        return api(error.config);
      } catch (err) {
        
        console.error("Failed to refresh access token:", err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
