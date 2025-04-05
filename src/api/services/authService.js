import api from "../config";

export const authService = {
  // Login user with provided credentials
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);

    // If login is successful and token is received, store it in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // Register a new user with the given user data
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);

    // If registration is successful and token is received, store it in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // Logout the user by clearing authentication data
  logout: async () => {
    try {
      // Optional: Call the backend logout endpoint
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Always clear local storage even if API call fails
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  // OAuth methods temporarily removed for initial deployment
  // Will be implemented after frontend deployment

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Get current user data
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem("token");
  },
};
