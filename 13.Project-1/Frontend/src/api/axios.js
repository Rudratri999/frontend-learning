import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// Optional: Handle common server errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 500) {
            console.error("Internal Server Error");
        }

        return Promise.reject(error);
    }
);

export default api;