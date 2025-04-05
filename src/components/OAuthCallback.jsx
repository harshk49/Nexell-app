import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../api/services/authService";
import { toast } from "react-toastify";

/**
 * Component to handle OAuth callbacks from providers
 * It extracts the token from the URL and redirects to the home page
 */
const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract token from URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (error) {
          console.error("OAuth error:", error);
          toast.error(`Authentication failed: ${error}`);
          navigate("/auth?mode=login", { replace: true });
          return;
        }

        if (!token) {
          toast.error("Authentication failed. No token received.");
          navigate("/auth?mode=login", { replace: true });
          return;
        }

        // Store the token and user data
        const success = authService.handleOAuthCallback(token);

        if (success) {
          toast.success("Authentication successful!");

          // Redirect to home page
          navigate("/home", { replace: true });
        } else {
          toast.error("Failed to process authentication.");
          navigate("/auth?mode=login", { replace: true });
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        toast.error("Authentication failed. Please try again.");
        navigate("/auth?mode=login", { replace: true });
      } finally {
        setProcessing(false);
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111]">
      <div className="w-full max-w-md p-8 bg-black border border-gray-800 shadow-lg rounded-xl">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">
            {processing ? "Processing Authentication..." : "Redirecting..."}
          </h1>

          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A3F600]"></div>
          </div>

          <p className="text-gray-400">
            {processing
              ? "Please wait while we authenticate your account."
              : "You will be redirected to the home page shortly..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback;
