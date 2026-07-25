import axios from "axios";

export const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // ⚡ THE FIX: Added /users/logout to this list!
    const isAuthRequest =
      originalRequest?.url?.includes("/users/login") ||
      originalRequest?.url?.includes("/users/register") ||
      originalRequest?.url?.includes("/users/refresh-token") ||
      originalRequest?.url?.includes("/users/logout"); 

    if (
      error.response?.status === 401 &&
      !isAuthRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/users/refresh-token");
        return api(originalRequest);
      } catch (refreshError) {
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/"
        ) {
          window.location.href = "/";
        }

        return Promise.reject(refreshError);
      }
    }

    if (
      error.response?.status === 401 &&
      !isAuthRequest &&
      originalRequest?.url?.includes("/users/me")
    ) {
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/"
      ) {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);