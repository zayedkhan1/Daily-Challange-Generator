import React from "react";
import { useChallenge } from "../contexts/ChallengeContext";

/**
 * Shows recent challenge history for the last 2 days (or whatever in completionData).
 * Expects completionData shaped like { '2025-08-08': {challengeId: true/false}, ... }
 */

export default function ChallengeHistory() {
  const { completionData } = useChallenge();

  const days = Object.keys(completionData)
    .sort((a,b) => (a < b ? 1 : -1)); // newest first

  if (days.length === 0) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
        <p className="text-sm text-gray-500">No recent history.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow space-y-3">
      <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-200">Recent History</h3>
      <div className="space-y-2">
        {days.map(date => (
          <div key={date} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{date}</div>
              <div className="text-xs text-gray-500">
                {Object.entries(completionData[date]).map(([cid, ok], idx) => (
                  <span key={cid} className="inline-block mr-2">
                    {ok ? "✅" : "❌"} {cid}
                    {idx < Object.entries(completionData[date]).length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500">{Object.values(completionData[date]).filter(Boolean).length} done</div>
          </div>
        ))}
      </div>
    </div>
  );
}
