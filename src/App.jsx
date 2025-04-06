import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Authenticate from "./components/Authenticate";
import ProtectedRoute from "./components/ProtectedRoute";
import OAuthCallback from "./components/OAuthCallback";

// Pages
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";

function App() {
  useEffect(() => {
    // Ping the backend to wake it up when the app loads
    const pingServer = async () => {
      try {
        const response = await fetch("https://nexell-js.onrender.com/ping", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Server ping successful:", data);
      } catch (error) {
        console.error("Server ping failed:", error);
      }
    };

    pingServer();
  }, []);

  return (
    <Router>
      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={5000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<Authenticate />} />
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />

        {/* Protected Routes */}
        {/* Home Route - Temporarily public for testing */}
        <Route path="/home" element={<Home />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        {/* 404 Route - redirects to home if authenticated, otherwise to login */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
