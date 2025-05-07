import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-[#111]" : "bg-white"
      }`}
    >
      {/* Navbar at top with higher z-index */}
      <header className="sticky top-0 z-50 w-full shadow-sm">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
      </header>

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

      {/* Main content area below navbar with increased top padding */}
      <main className="flex-1 p-6 pt-20 mt-2 overflow-auto">
        {/* Container for content */}
        <div className="max-w-6xl mx-auto relative min-h-[80vh]">
          <div className="flex items-center justify-center h-full">
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Welcome to Nexell
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
