import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute component to handle authentication protection
 * Checks if the user is authenticated and redirects to login if not
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return (
      <Navigate to="/auth?mode=login" state={{ from: location }} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
