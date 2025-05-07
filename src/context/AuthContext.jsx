import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../api/services/authService";

// Create the auth context
const AuthContext = createContext();

// Provider component that wraps the app and provides the auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if user is already logged in
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error initializing auth state:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login method
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Register method
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Logout method
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Handle OAuth callback
  const handleOAuthCallback = (token) => {
    const success = authService.handleOAuthCallback(token);
    if (success) {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    }
    return success;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // The value that will be provided to consumers of this context
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    handleOAuthCallback,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};