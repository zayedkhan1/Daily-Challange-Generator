import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { ChallengeProvider } from "./contexts/ChallengeContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import clsx from "clsx";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { motion } from "framer-motion";

export default function App() {
  // Dark mode toggle
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    window.localStorage.setItem("darkMode", dark);
  }, [dark]);

  return (
    <ChallengeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-indigo-50 dark:bg-gray-900 transition-colors duration-500">
          <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <a href="/" className="text-xl font-bold text-indigo-700 dark:text-indigo-300 select-none">
                Daily Challenge
              </a>
              <div className="flex gap-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    clsx(
                      "p-2 rounded-md flex items-center gap-1 text-indigo-600 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-700",
                      isActive && "bg-indigo-200 dark:bg-indigo-600 font-semibold"
                    )
                  }
                  end
                >
                  <FiHome /> Home
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    clsx(
                      "p-2 rounded-md flex items-center gap-1 text-indigo-600 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-700",
                      isActive && "bg-indigo-200 dark:bg-indigo-600 font-semibold"
                    )
                  }
                >
                  <FiUser /> Profile
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    clsx(
                      "p-2 rounded-md flex items-center gap-1 text-indigo-600 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-700",
                      isActive && "bg-indigo-200 dark:bg-indigo-600 font-semibold"
                    )
                  }
                >
                  <FiSettings /> Settings
                </NavLink>
               
                  <motion.button
      onClick={() => setDark(!dark)}
      className="ml-4 px-3 py-1"
      aria-label="Toggle Dark Mode"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        key={dark ? "light" : "dark"}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 30, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {dark ? (
          <CiLight className="text-3xl text-yellow-600" />
        ) : (
          <MdDarkMode className="text-3xl text-indigo-700" />
        )}
      </motion.div>
    </motion.button>
              </div>
            </div>
          </nav>
          <main className="container mx-auto p-4 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <footer className="bg-white dark:bg-gray-800 text-center p-3 text-sm text-gray-500 select-none">
            &copy; 2025 Daily Challenge • Made with 💜 by Zayed Khan
          </footer>
        </div>
      </BrowserRouter>
    </ChallengeProvider>
  );
}
