
import { create } from "zustand";
import { api } from "../lib/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await api.get("/users/me"); 
      set({ user: res.data.data, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },

  login: async (credentials) => {
    try {
      const res = await api.post("/users/login", credentials);
      set({ user: res.data.data.loggedInUser });
      return { success: true };
    } catch (error) {
      console.log(error.response);
      return {
        success: false, 
        error: error.response?.data?.message || "Login failed" 
      };
    }
  },
  logout: async () => {
      try {

        await api.post("/users/logout"); 

        set({ user: null }); 
        
        return { success: true };
      } catch (error) {
        console.error("Logout failed", error);
        return { success: false };
      }
    },
}));