import React from "react";
import { useChallenge } from "../contexts/ChallengeContext";
import { FiTrendingUp } from "react-icons/fi";

export default function StreakBar() {
  const { streak } = useChallenge();

  // visual percent: cap at 100. e.g. each day ~3.33% for 30-day diamond target
  const percent = Math.min((streak / 30) * 100, 100);

  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white">
          <FiTrendingUp />
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-300">Current Streak</div>
          <div className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{streak} {streak === 1 ? "day" : "days"}</div>
        </div>
      </div>

      <div className="mt-3">
        <div className="h-3 bg-indigo-100 dark:bg-indigo-700 rounded-full overflow-hidden">
          <div className="h-3 bg-indigo-600 dark:bg-indigo-400 transition-all" style={{ width: `${percent}%` }}></div>
        </div>
        <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">Progress to 30-day Diamond: {Math.round(percent)}%</div>
      </div>
    </div>
  );
}
