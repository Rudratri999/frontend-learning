import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let refreshPromise = null;

const authEndpoints = [
    "/login",
    "/register",
    "/refresh",
];

// Below is for one refresh request 
// like /expense- 401
// /category - 401  for all one /refresh request works
// 
const refreshAccessToken = async () => {
    if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = api.post("/refresh")
            .finally(() => {
                isRefreshing = false;
                refreshPromise = null;
            });
    }

    return refreshPromise;
};

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            // this below prevents infinite loop
            !originalRequest._retry &&
            !authEndpoints.includes(originalRequest.url)
        ) {
            originalRequest._retry = true;

            try {
                await refreshAccessToken();

                return api(originalRequest);
            } catch (refreshError) {
                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        if (error.response?.status === 500) {
            console.error("Internal Server Error");
        }

        return Promise.reject(error);
    }
);

export default api;