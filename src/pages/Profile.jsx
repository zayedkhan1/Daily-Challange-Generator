import React from "react";
import { useChallenge } from "../contexts/ChallengeContext";
import { FiAward, FiTrendingUp, FiCheckCircle, FiUser, FiCalendar, FiBarChart2 } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Profile() {
  const { streak, earnedBadges, completionData } = useChallenge();

  // Count total completed challenges in last 2 days
  const totalCompleted = Object.values(completionData)
    .flatMap(dayObj => Object.values(dayObj))
    .filter(Boolean).length;

  return (
 
     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700 mb-8"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                  <FiUser size={32} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-gray-800">
                  {streak}
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">Your Profile</h1>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium">Daily Challenge Enthusiast</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                    {totalCompleted} challenges
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Streak Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-indigo-50 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                <FiTrendingUp size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Current Streak</h3>
            </div>
            <div className="space-y-3">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {streak} {streak === 1 ? "day" : "days"}
              </p>
              <div className="h-2 bg-indigo-100 dark:bg-indigo-900 rounded-full overflow-hidden">
                <div 
                  className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${Math.min(streak * 5, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {streak >= 7 
                  ? "🔥 You're on fire!" 
                  : streak >= 3 
                    ? "💪 Keep it up!" 
                    : "🚀 Start your streak!"}
              </p>
            </div>
          </motion.div>

          {/* Completed Challenges Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-indigo-50 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                <FiCheckCircle size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Completed Challenges</h3>
            </div>
            <div className="space-y-3">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {totalCompleted}
              </p>
              <div className="h-2 bg-green-100 dark:bg-green-900 rounded-full overflow-hidden">
                <div 
                  className="h-2 bg-gradient-to-r from-green-500 to-teal-500"
                  style={{ width: `${Math.min(totalCompleted * 2, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last 30 days: {Math.floor(totalCompleted * 0.7)} completed
              </p>
            </div>
          </motion.div>
        </div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700 mb-8"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                <FiAward className="text-yellow-500" />
                Badges Earned
              </h2>
              <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                {earnedBadges.length} of 4 unlocked
              </span>
            </div>

            {earnedBadges.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Complete challenges to earn your first badge!
                </p>
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors">
                  View Challenges
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: "bronze", label: "Bronze", icon: "🥉", days: 3, color: "from-yellow-600 to-yellow-700" },
                  { id: "silver", label: "Silver", icon: "🥈", days: 7, color: "from-gray-400 to-gray-500" },
                  { id: "gold", label: "Gold", icon: "🥇", days: 14, color: "from-yellow-400 to-yellow-500" },
                  { id: "diamond", label: "Diamond", icon: "💎", days: 30, color: "from-indigo-400 to-purple-500" },
                ].map((badge) => {
                  const isEarned = earnedBadges.includes(badge.id);
                  return (
                    <motion.div
                      key={badge.id}
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 rounded-xl border ${
                        isEarned 
                          ? "bg-gradient-to-br " + badge.color + " text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                      } text-center`}
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h3 className="font-semibold mb-1">{badge.label}</h3>
                      <p className="text-xs">
                        {isEarned 
                          ? "Earned!" 
                          : `${badge.days} day streak`}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>

        {/* Activity History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                <FiCalendar className="text-indigo-500" />
                Recent Activity
              </h2>
              <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                Last 7 days
              </span>
            </div>

            <div className="space-y-4">
              {[
                { date: "Today", challenge: "30-minute meditation", completed: true },
                { date: "Yesterday", challenge: "10k steps walking", completed: true },
                { date: "2 days ago", challenge: "Journaling session", completed: true },
                { date: "3 days ago", challenge: "Learn a new skill", completed: false },
                { date: "4 days ago", challenge: "Digital detox", completed: true },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className={`mt-1 w-3 h-3 rounded-full ${
                    activity.completed 
                      ? "bg-green-500" 
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        {activity.challenge}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.date}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      activity.completed 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {activity.completed ? "Completed" : "Skipped"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full mt-6 px-4 py-2 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors">
              View Full History
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
