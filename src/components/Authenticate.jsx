import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion as FramerMotion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { VscFolderOpened } from "react-icons/vsc";
import Login from "./Login";
import SignUp from "./Signup";
import "react-toastify/dist/ReactToastify.css";
import portfolioIcon from "/public/hk_logo.svg"; // Public folder
import highlightImage from "../assets/notes_slider.png"; // First image
import tasksImage from "../assets/tasks_slider.png"; // Second image

const Authenticate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") || "login";

  const [isLoginActive, setIsLoginActive] = useState(mode === "login");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Setup an array of images and state for the current image index
  const images = [highlightImage, tasksImage];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change the slider image every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 10,000ms = 10 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);

  // Update URL mode when switching between login and signup
  useEffect(() => {
    const newMode = isLoginActive ? "login" : "signup";
    if (mode !== newMode) {
      navigate(`/auth?mode=${newMode}`, { replace: true });
    }
  }, [isLoginActive, mode, navigate]);

  const handleSwitch = (form) => {
    setIsLoginActive(form === "login");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F5F5F5] bg-[repeating-linear-gradient(to_bottom,_#F5F5F5_0px,_#F5F5F5_23px,_#a0c4ff_24px)]">
      {/* Top-Left Box */}
      <div className="absolute z-30 flex items-center justify-center w-20 h-20 text-white bg-black rounded shadow-md top-4 left-4">
        LOGO
      </div>

      {/* Top-Right Dropdown */}
      <div className="absolute z-50 top-4 right-4">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 text-sm text-white transition duration-300 bg-black rounded-lg hover:bg-neutral-800"
          >
            <span className="flex items-center gap-2">By Harsh Kardile</span>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <FramerMotion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 z-50 w-56 p-3 mt-2 space-y-2 text-white bg-neutral-900 rounded-xl"
              >
                <a
                  href="https://harshkardile-two.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 transition rounded-lg hover:bg-neutral-800"
                >
                  <img
                    src={portfolioIcon}
                    alt="Portfolio"
                    className="object-contain w-5 h-5"
                  />
                  <span>Portfolio</span>
                </a>
                <a
                  href="https://github.com/harshk49"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 transition rounded-lg hover:bg-neutral-800"
                >
                  <FaGithub size={18} />
                  <span>GitHub</span>
                </a>
              </FramerMotion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Red Margin Line */}
      <div className="absolute left-[40px] top-0 h-full w-[1px] bg-red-400" />

      {/* Auth Container */}
      <div
        className="w-full max-w-5xl mx-auto min-h-[600px] rounded-2xl border-2 border-black flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6 bg-[#000000] 
        shadow-[0_0_40px_rgba(0,0,0,0.3),0_0_80px_rgba(0,0,0,0.2),0_0_120px_rgba(0,0,0,0.1)] overflow-hidden relative"
      >
        {/* Sliding Highlight with Animated Image */}
        <FramerMotion.div
          className="absolute inset-2 h-[calc(100%-16px)] w-[calc(50%-8px)] rounded-xl overflow-hidden z-20"
          initial={{ x: isLoginActive ? "100%" : "0%" }}
          animate={{ x: isLoginActive ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* White Background always visible behind images */}
          <div className="absolute inset-0 w-full h-full bg-white" />

          <AnimatePresence mode="wait">
            <FramerMotion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt="Highlight"
              className="absolute inset-0 object-cover w-full h-full rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            />
          </AnimatePresence>
        </FramerMotion.div>

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
