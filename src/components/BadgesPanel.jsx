import React from "react";
import { BADGES } from "../utils/badges";
import { useChallenge } from "../contexts/ChallengeContext";

/**
 * Displays available badges and highlights earned ones
 */

export default function BadgesPanel() {
  const { earnedBadges } = useChallenge();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-3">Badges</h4>
      <div className="flex gap-3 flex-wrap">
        {BADGES.map(b => {
          const earned = earnedBadges.includes(b.id);
          return (
            <div key={b.id} className={`px-4 py-2 rounded-lg shadow ${earned ? 'ring-2 ring-indigo-300' : 'opacity-60'}`}>
              <div className="flex items-center gap-2">
                <div className="text-lg">{b.icon}</div>
                <div>
                  <div className="text-sm font-semibold">{b.title}</div>
                  <div className="text-xs text-gray-500">Reach {b.streak} day{b.streak>1?'s':''}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
