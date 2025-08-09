import React, { useState } from "react";
import { useChallenge } from "../contexts/ChallengeContext";
import { FiPlusCircle } from "react-icons/fi";

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
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">Settings</h2>

      <section>
        <h3 className="text-xl font-semibold mb-2">Select Categories</h3>
        <div className="flex flex-wrap gap-3">
          {allCategories.map(cat => {
            const selected = categories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-4 py-2 rounded-full border ${
                  selected
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                } transition-colors duration-200`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Add Your Own Challenge</h3>
        <div className="space-y-3 max-w-lg">
          <input
            type="text"
            placeholder="Challenge Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <textarea
            rows="3"
            placeholder="Description"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-colors duration-300"
          >
            <FiPlusCircle size={20} /> Add Challenge
          </button>
        </div>
      </section>
    </div>
  );
}
