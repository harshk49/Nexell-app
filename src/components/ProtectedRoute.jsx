import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../api/services/authService";

/**
 * ProtectedRoute component to handle authentication protection
 * Checks if the user is authenticated and redirects to login if not
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth?mode=login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;