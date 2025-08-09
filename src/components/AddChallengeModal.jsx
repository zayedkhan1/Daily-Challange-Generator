import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useChallenge } from "../contexts/ChallengeContext";

/**
 * Lightweight modal. This component is self-contained and shows/hides inline.
 * If you prefer separate portal/modal, swap with react-portal or headlessui Dialog.
 */

export default function AddChallengeModal({ className = "" }) {
  const { addUserChallenge, categories } = useChallenge();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState(categories[0] || "Health");

  function submit() {
    if (!title.trim()) return alert("Title required");
    const newChallenge = { id: "user-" + Date.now(), title: title.trim(), description: desc.trim(), category: cat };
    addUserChallenge(newChallenge);
    setTitle("");
    setDesc("");
    setOpen(false);
    alert("Added challenge!");
  }

  return (
    <div className={className}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow"
      >
        <FiPlus /> Add Challenge
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">Add Challenge</h3>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full mt-4 p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700"
            />
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Description"
              rows={3}
              className="w-full mt-3 p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 resize-none"
            />
            <select
              value={cat}
              onChange={e => setCat(e.target.value)}
              className="w-full mt-3 p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
              <button onClick={submit} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
