import React, { useState } from "react";
import { useChallenge } from "../contexts/ChallengeContext";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function Home() {
  const {
    todayChallenge,
    completedToday,
    completeToday,
    skipToday,
    streak,
    earnedBadges,
  } = useChallenge();

  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  async function handleComplete() {
    if (completedToday) return;
    completeToday();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  }

  if (!todayChallenge)
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-md">
        <p className="text-lg font-semibold text-gray-600">
          No challenges available in your selected categories.
        </p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      <div>
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
          Today's Challenge
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-lg">
          {todayChallenge.title}
        </p>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {todayChallenge.description}
        </p>
        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold select-none">
          {todayChallenge.category}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleComplete}
          disabled={completedToday}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold shadow-md transition-colors duration-300 ${
            completedToday
              ? "bg-green-400 cursor-default text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          <FiCheckCircle size={20} />
          {completedToday ? "Completed ✓" : "Mark as Done"}
        </button>
        <button
          onClick={skipToday}
          disabled={completedToday}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-red-500 hover:bg-red-600 text-white shadow-md transition-colors duration-300"
        >
          <FiXCircle size={20} />
          Skip
        </button>
      </div>

      <div className="mt-6">
        <p className="text-gray-700 dark:text-gray-300">
          Current Streak:{" "}
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            {streak} {streak === 1 ? "day" : "days"}
          </span>
        </p>
        <div className="mt-2 h-3 bg-indigo-200 dark:bg-indigo-700 rounded-full overflow-hidden">
          <div
            className="h-3 bg-indigo-600 dark:bg-indigo-400 transition-all duration-500"
            style={{ width: `${Math.min(streak * 6, 100)}%` }}
          ></div>
        </div>
      </div>

      {earnedBadges.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          <h3 className="w-full font-semibold text-indigo-700 dark:text-indigo-300">
            Badges Earned:
          </h3>
          {earnedBadges.map((id) => {
            const badge = {
              bronze: { label: "🥉 Bronze Streak", color: "bg-yellow-400" },
              silver: { label: "🥈 Silver Streak", color: "bg-gray-400" },
              gold: { label: "🥇 Gold Streak", color: "bg-yellow-500" },
              diamond: { label: "💎 Diamond Streak", color: "bg-indigo-500" },
            }[id];
            return (
              <div
                key={id}
                className={`${badge.color} text-white px-4 py-2 rounded-full shadow-md select-none`}
              >
                {badge.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
