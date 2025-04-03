import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion as FramerMotion } from "framer-motion"; // Import Framer Motion for animations
import Login from "./Login";
import SignUp from "./Signup";
import "react-toastify/dist/ReactToastify.css";

const Authenticate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") || "login";

  // State to track whether the login form is active
  const [isLoginActive, setIsLoginActive] = useState(mode === "login");

  // Update the URL when the active form changes
  useEffect(() => {
    const newMode = isLoginActive ? "login" : "signup";
    if (mode !== newMode) {
      navigate(`/auth?mode=${newMode}`, { replace: true });
    }
  }, [isLoginActive, mode, navigate]);

  // Handle switching between login and signup forms
  const handleSwitch = (form) => {
    setIsLoginActive(form === "login");
  };

  return (
    <div className="absolute inset-0 min-h-screen w-full flex items-center justify-center bg-[#A3F600]">
      <div
        className="w-full max-w-5xl mx-auto min-h-[600px] rounded-2xl border-2 border-gray-900 flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6 bg-[#000000] 
          shadow-[0_0_40px_rgba(0,0,0,0.3),0_0_80px_rgba(0,0,0,0.2),0_0_120px_rgba(0,0,0,0.1)] overflow-hidden relative"
      >
        {/* Sliding Highlighter Effect using Framer Motion */}
        <FramerMotion.div
          className="absolute inset-2 h-[calc(100%-16px)] w-[calc(50%-8px)] rounded-xl bg-[#A3F600] 
             shadow-[0_4px_10px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.2)] z-20"
          initial={{ x: isLoginActive ? "100%" : "0%" }} // Initial position based on active form
          animate={{ x: isLoginActive ? "100%" : "0%" }} // Animate movement on switch
          transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
        ></FramerMotion.div>

        {/* Login Form */}
        <div className="z-10 flex items-center justify-center flex-1 p-8">
          <Login onSwitch={() => handleSwitch("signup")} />
        </div>

        {/* SignUp Form */}
        <div className="z-10 flex items-center justify-center flex-1 p-8">
          <SignUp onSwitch={() => handleSwitch("login")} />
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
