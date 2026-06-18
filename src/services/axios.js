import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    // 1. Ambil bungkus utama dari redux-persist
    const persistAuth = localStorage.getItem("persist:auth"); 
    
    if (persistAuth) {
      // 2. Ubah string JSON menjadi Object Javascript
      const authData = JSON.parse(persistAuth);
      
      // 3. Pastikan tokennya ada
      if (authData.token) {
        // 4. JSON.parse sekali lagi KHUSUS untuk token agar tanda kutip ("") hilang
        const cleanToken = JSON.parse(authData.token); 
        
        // 5. Sisipkan ke header
        config.headers.Authorization = `Bearer ${cleanToken}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response && error.response.status === 401) {

            localStorage.removeItem("persist:auth");

            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default api