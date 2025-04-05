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

  // OAuth methods for Google and GitHub authentication
  googleAuth: () => {
    // Redirect to backend's Google OAuth endpoint
    window.location.href = `https://nexell-js.onrender.com/api/auth/google?redirect_uri=${encodeURIComponent(
      "https://nexell-digitalhub.vercel.app/oauth/callback"
    )}`;
  },

  githubAuth: () => {
    // Redirect to backend's GitHub OAuth endpoint
    window.location.href = `https://nexell-js.onrender.com/api/auth/github?redirect_uri=${encodeURIComponent(
      "https://nexell-digitalhub.vercel.app/oauth/callback"
    )}`;
  },

  // Handle OAuth callback with token
  handleOAuthCallback: (token) => {
    if (!token) return false;

    try {
      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Fetch user data using the token
      // This would typically be an API call, but for now we'll just set a placeholder
      // The actual user data would come from a /me endpoint using the token
      localStorage.setItem("user", JSON.stringify({ id: "oauth-user" }));

      return true;
    } catch (error) {
      console.error("OAuth callback handling error:", error);
      return false;
    }
  },

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
