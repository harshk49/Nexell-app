import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ChevronDown, LogOut, Moon, Sun, User } from "lucide-react";
import SpotlightSearch from "./SpotlightSearch";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Search results - this would be replaced with actual search functionality
  const [searchResults, setSearchResults] = useState([]);

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchQuery(value);

    // Mock search results based on query
    if (value.trim() !== "") {
      setSearchResults([
        { id: 1, type: "note", title: "Sample Note", path: "/notes" },
        { id: 2, type: "task", title: "Sample Task", path: "/tasks" },
      ]);
    } else {
      setSearchResults([]);
    }
  };

  // Toggle search modal
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Toggle logout confirmation
  const toggleLogoutConfirm = (e) => {
    if (e) e.stopPropagation();
    setLogoutConfirmOpen(!logoutConfirmOpen);
    setUserMenuOpen(false);
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  // Handle scroll events
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 10) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Handle keyboard shortcut (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        toggleSearch();
      } else if (e.key === "Escape") {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        }
        if (userMenuOpen) {
          setUserMenuOpen(false);
        }
        if (logoutConfirmOpen) {
          setLogoutConfirmOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, userMenuOpen, logoutConfirmOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  // Close logout confirm when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const modal = document.getElementById("logout-confirm-modal");
      if (logoutConfirmOpen && modal && !modal.contains(e.target)) {
        setLogoutConfirmOpen(false);
      }
    };

    if (logoutConfirmOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [logoutConfirmOpen]);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 px-0 transition-all duration-500 ${
          hasScrolled
            ? darkMode
              ? "py-3 bg-black/30 backdrop-blur-md border-b border-gray-800"
              : "py-3 bg-white/70 backdrop-blur-md border-b border-gray-200"
            : "py-4 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between w-full px-6">
          {/* Logo - pushed to far left */}
          <Link to="/home" className="flex items-center">
            <div
              className={`font-bold text-xl ${
                darkMode ? "text-[#A3F600]" : "text-blue-600"
              }`}
            >
              Nexell
            </div>
          </Link>

          {/* Centered Search Bar */}
          <div className="absolute w-full max-w-lg px-6 transform -translate-x-1/2 left-1/2">
            <button
              onClick={toggleSearch}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 w-full ${
                darkMode
                  ? "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10 shadow-md"
                  : "bg-black/5 text-gray-600 hover:bg-black/10 border border-black/5 shadow-md"
              }`}
            >
              <Search size={20} />
              <span className="flex-1 text-base text-left">Search</span>
              <div
                className={`px-2 py-0.5 rounded text-xs ${
                  darkMode
                    ? "bg-white/20 text-white"
                    : "bg-black/10 text-gray-600"
                }`}
              >
                Ctrl + K / ⌘ + K
              </div>
            </button>
          </div>

          {/* User Profile Button - pushed to far right */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={toggleUserMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-full transition-transform duration-200 transform hover:scale-105 ${
                userMenuOpen ? (darkMode ? "bg-white/20" : "bg-black/10") : ""
              } ${
                darkMode
                  ? "hover:bg-white/15 text-white"
                  : "hover:bg-black/5 text-gray-800"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  darkMode ? "bg-blue-900/60" : "bg-blue-100"
                } shadow-md`}
              >
                <User
                  size={20}
                  className={darkMode ? "text-blue-300" : "text-blue-600"}
                />
              </div>
              <span className="hidden text-base font-medium sm:inline-block">
                {user
                  ? `${user.firstName || ""} ${user.lastName || ""}`
                  : "User"}
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-56 rounded-lg overflow-hidden shadow-xl border transition-all duration-200 origin-top-right scale-100 ${
                  darkMode
                    ? "bg-gray-900/90 backdrop-blur-xl border-gray-700 text-white"
                    : "bg-white/90 backdrop-blur-xl border-gray-200 text-gray-800"
                }`}
                style={{
                  animation: "dropdownFade 0.2s ease-out forwards",
                }}
              >
                <div className="py-2">
                  {/* Theme Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (toggleDarkMode) toggleDarkMode();
                    }}
                    className={`w-full text-left px-4 py-2 flex items-center gap-3 ${
                      darkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                    }`}
                  >
                    {darkMode ? (
                      <>
                        <Sun size={18} className="text-yellow-400" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon size={18} className="text-blue-600" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div
                    className={`my-1 mx-3 h-px ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>

                  {/* Logout Button */}
                  <button
                    onClick={toggleLogoutConfirm}
                    className={`w-full text-left px-4 py-2 flex items-center gap-3 ${
                      darkMode
                        ? "hover:bg-white/10 text-red-400"
                        : "hover:bg-black/5 text-red-600"
                    }`}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Search Modal - Using SpotlightSearch Component */}
      <SpotlightSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        darkMode={darkMode}
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        searchResults={searchResults}
      />

      {/* Centered Logout Confirmation Modal */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            id="logout-confirm-modal"
            className={`w-full max-w-md mx-4 overflow-hidden transition-all duration-300 rounded-xl shadow-2xl ${
              darkMode
                ? "bg-gray-900/90 backdrop-blur-xl border border-gray-700"
                : "bg-white/90 backdrop-blur-xl border border-gray-200"
            }`}
            style={{
              animation:
                "modalFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              boxShadow: darkMode
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="p-6 text-center">
              <div
                className={`w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center ${
                  darkMode ? "bg-red-900/30" : "bg-red-100"
                }`}
              >
                <LogOut
                  size={28}
                  className={darkMode ? "text-red-400" : "text-red-600"}
                />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Logout
              </h3>
              <p
                className={`mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Are you sure you want to log out of your account?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setLogoutConfirmOpen(false)}
                  className={`px-5 py-2 rounded-lg transition-colors ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx="true">{`
        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes modalFade {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
