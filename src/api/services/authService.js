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
  logout: () => {
    localStorage.removeItem("token"); // Remove authentication token
    localStorage.removeItem("user"); // Remove stored user details

    // Additional cleanup can be done here if necessary (e.g., redirecting user)
  },
};
