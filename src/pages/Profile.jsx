import React from "react";
import { useChallenge } from "../contexts/ChallengeContext";

export default function Profile() {
  const { streak, earnedBadges, completionData } = useChallenge();

  // Count total completed challenges in last 2 days
  const totalCompleted = Object.values(completionData)
    .flatMap(dayObj => Object.values(dayObj))
    .filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">Profile</h2>

      <section>
        <h3 className="text-xl font-semibold mb-2">Current Streak</h3>
        <p className="text-gray-700 dark:text-gray-300 text-lg">{streak} {streak === 1 ? "day" : "days"}</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Badges Earned</h3>
        {earnedBadges.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400 italic">No badges earned yet.</p>
        )}
        <div className="flex flex-wrap gap-3">
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
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Total Completed Challenges (Last 2 Days)</h3>
        <p className="text-gray-700 dark:text-gray-300 text-lg">{totalCompleted}</p>
      </section>
    </div>
  );
}
