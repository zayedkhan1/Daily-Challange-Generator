import React, { useState } from "react";
import { useChallenge } from "../contexts/ChallengeContext";
import { FiPlusCircle } from "react-icons/fi";
import {  FiSettings, FiCheck, FiX, FiTag, FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";
export default function Settings() {
  const {
    categories,
    toggleCategory,
    addUserChallenge,
  } = useChallenge();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(categories[0] || "Health");

  function handleAdd() {
    if (!title.trim()) return alert("Please enter a challenge title");
    if (!desc.trim()) return alert("Please enter a description");
    const newChallenge = {
      id: "user-" + Date.now(),
      title: title.trim(),
      description: desc.trim(),
      category,
    };
    addUserChallenge(newChallenge);
    setTitle("");
    setDesc("");
    alert("Challenge added!");
  }

  const allCategories = ["Health","Fitness","Learning","Mindfulness","Fun","Social","Productivity"];

  return (
   
     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Settings Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700 mb-8"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                <FiSettings size={28} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">Settings</h1>
                <p className="text-indigo-600 dark:text-indigo-400">Customize your challenge experience</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700 mb-8"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                <FiTag className="text-indigo-500" />
                Select Categories
              </h2>
              <span className="text-sm text-indigo-600 dark:text-indigo-400">
                {categories.length} selected
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {allCategories.map(cat => {
                const selected = categories.includes(cat);
                return (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-full border-2 flex items-center gap-2 transition-all duration-200 ${
                      selected
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent shadow-lg"
                        : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500"
                    }`}
                  >
                    {selected ? <FiCheck size={16} /> : <FiX size={16} />}
                    {cat}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Add Challenge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                <FiEdit2 className="text-indigo-500" />
                Add Your Own Challenge
              </h2>
              <span className="text-sm text-indigo-600 dark:text-indigo-400">
                Personalize your experience
              </span>
            </div>

            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Challenge Title
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  placeholder="e.g. 30-minute meditation"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  rows="3"
                  placeholder="Describe your challenge..."
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <motion.select
                  whileFocus={{ scale: 1.01 }}
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
                >
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </motion.select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                disabled={!title.trim()}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 mt-4 ${
                  !title.trim()
                    ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                }`}
              >
                <FiPlusCircle size={20} />
                Add Challenge
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Additional Settings Sections (example) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
              Notification Preferences
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Daily Reminders</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Weekly Reports</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
              App Appearance
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Animation Effects</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
