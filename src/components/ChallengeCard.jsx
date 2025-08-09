import React from "react";

export default function ChallengeCard({ challenge }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
        {challenge.title}
      </h3>
      <p className="mt-1 text-gray-700 dark:text-gray-300">{challenge.description}</p>
      <span className="inline-block mt-3 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-100 text-sm font-semibold">
        {challenge.category}
      </span>
    </div>
  );
}
