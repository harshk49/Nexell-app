import React, { useState, useRef } from "react";

// Simplified Notes Component
const SimplifiedNotes = ({ darkMode }) => {
  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-[#A3F600]" : "text-blue-600"
            }`}
          >
            Notes
          </h1>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="max-w-6xl mx-auto">
        <div
          className={`p-12 text-center rounded-lg border ${
            darkMode
              ? "bg-black/30 border-gray-800 text-gray-300"
              : "bg-white/70 border-gray-200 text-gray-700"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-4 ${
              darkMode ? "text-[#A3F600]" : "text-blue-600"
            }`}
          >
            Coming Soon
          </h2>
          <p className="mb-4">
            The Notes feature is currently under development and will be
            available soon.
          </p>
        </div>
      </div>
    </div>
  );
};

// Simplified Tasks Component
const SimplifiedTasks = ({ darkMode }) => {
  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-[#A3F600]" : "text-blue-600"
            }`}
          >
            Tasks
          </h1>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="max-w-6xl mx-auto">
        <div
          className={`p-12 text-center rounded-lg border ${
            darkMode
              ? "bg-black/30 border-gray-800 text-gray-300"
              : "bg-white/70 border-gray-200 text-gray-700"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-4 ${
              darkMode ? "text-[#A3F600]" : "text-blue-600"
            }`}
          >
            Coming Soon
          </h2>
          <p className="mb-4">
            The Tasks feature is currently under development and will be
            available soon.
          </p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState("notes"); // Default to notes view
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("forward"); // "forward" or "reverse"

  // References for the pages
  const notesRef = useRef(null);
  const tasksRef = useRef(null);

  const toggleView = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    setIsAnimating(true);
    const newView = activeView === "notes" ? "tasks" : "notes";

    // Always use the same animation direction based on which view we're going to
    // When going to Tasks, Notes shifts left and Tasks comes from right
    // When going to Notes, Tasks shifts right and Notes comes from left
    setAnimationDirection(newView === "tasks" ? "forward" : "reverse");

    // Set a timeout matching the animation duration
    setTimeout(() => {
      setActiveView(newView);
      setIsAnimating(false);
    }, 500); // 500ms matches the animation duration
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background based on theme */}
      <div className="absolute inset-0 w-full h-full -z-10">
        {darkMode ? (
          <div className="absolute inset-0 bg-[#000000]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_30%_30%,#1e3a8a33,transparent)] blur-sm"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_50%_-150px,#5ab3e6,transparent)]"></div>
          </div>
        )}
      </div>

      {/* Theme Switch Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute z-50 px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gray-800 rounded-md shadow-md top-4 right-4 hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-100"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Content pages with animation */}
      <div className="relative w-full h-full">
        {/* Notes Page */}
        <div
          ref={notesRef}
          className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${
            activeView === "notes" ? "translate-x-0" : "-translate-x-full" // When not active, always positioned to the left
          }`}
        >
          <SimplifiedNotes darkMode={darkMode} />
        </div>

        {/* Tasks Page */}
        <div
          ref={tasksRef}
          className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${
            activeView === "tasks" ? "translate-x-0" : "translate-x-full" // When not active, always positioned to the right
          }`}
        >
          <SimplifiedTasks darkMode={darkMode} />
        </div>
      </div>

      {/* Toggle Button at bottom */}
      <div className="absolute left-0 right-0 z-50 flex justify-center bottom-8">
        <button
          onClick={toggleView}
          className={`flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            darkMode
              ? "bg-gradient-to-r from-blue-700 to-indigo-800 text-white hover:from-blue-800 hover:to-indigo-900 focus:ring-indigo-700"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 focus:ring-indigo-500"
          }`}
        >
          {activeView === "notes" ? "Switch to Tasks" : "Switch to Notes"}
        </button>
      </div>
    </div>
  );
};

export default Home;
