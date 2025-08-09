import React, { useState } from "react";
import { useChallenge } from "../contexts/ChallengeContext";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { FiAward, FiTrendingUp, FiCalendar, FiStar, FiUsers, FiBarChart2 } from "react-icons/fi";
import { motion } from "framer-motion";

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
 
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4"
        >
          Daily Growth Challenge
        </motion.h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Transform your life one small challenge at a time. Build habits, earn rewards, and track your progress.
        </p>
      </header>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Today's Challenge Card */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700"
        >
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                <FiCalendar className="text-indigo-500" />
                Today's Challenge
              </h2>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
                {todayChallenge.category}
              </span>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {todayChallenge.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {todayChallenge.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleComplete}
                disabled={completedToday}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                  completedToday
                    ? "bg-green-400 cursor-default text-white"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                }`}
              >
                <FiCheckCircle size={20} />
                {completedToday ? "Completed ✓" : "Mark as Done"}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={skipToday}
                disabled={completedToday}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg transition-all duration-300"
              >
                <FiXCircle size={20} />
                Skip
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Stats & Progress Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                  style={{ width: `${Math.min(streak * 6, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Keep it going! {streak >= 3 ? "🔥" : "💪"}
              </p>
            </div>
          </motion.div>

          {/* Badges Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-indigo-50 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400">
                <FiAward size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Your Badges</h3>
            </div>
            <div className="space-y-3">
              {earnedBadges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {earnedBadges.map((id) => {
                    const badge = {
                      bronze: { label: "🥉 Bronze", color: "bg-gradient-to-r from-yellow-600 to-yellow-700" },
                      silver: { label: "🥈 Silver", color: "bg-gradient-to-r from-gray-400 to-gray-500" },
                      gold: { label: "🥇 Gold", color: "bg-gradient-to-r from-yellow-400 to-yellow-500" },
                      diamond: { label: "💎 Diamond", color: "bg-gradient-to-r from-indigo-400 to-purple-500" },
                    }[id];
                    return (
                      <span
                        key={id}
                        className={`${badge.color} text-white px-3 py-1 rounded-full text-sm shadow-md`}
                      >
                        {badge.label}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Complete challenges to earn badges!
                </p>
              )}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Next badge at {streak < 3 ? 3 : streak < 7 ? 7 : streak < 14 ? 14 : 30} days
              </p>
            </div>
          </motion.div>

          {/* Community Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-indigo-50 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                <FiUsers size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Community</h3>
            </div>
            <div className="space-y-3">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                12.4k
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                people completing challenges today
              </p>
              <button className="w-full mt-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors">
                Share your progress
              </button>
            </div>
          </motion.div>
        </section>

        {/* Weekly Progress Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                <FiBarChart2 className="text-indigo-500" />
                Weekly Progress
              </h2>
              <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            
            <div className="h-64 bg-indigo-50 dark:bg-gray-700 rounded-xl p-4">
              {/* Placeholder for chart - replace with your actual chart component */}
              <div className="flex items-end justify-between h-full">
                {[30, 60, 45, 80, 65, 90, 70].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="w-8 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg relative"
                  >
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Featured Challenges Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 dark:border-gray-700"
        >
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2 mb-6">
              <FiStar className="text-yellow-500" />
              Featured Challenges
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Morning Journaling", category: "Mindset", icon: "📓" },
                { title: "10k Steps", category: "Fitness", icon: "👟" },
                { title: "Digital Detox", category: "Wellness", icon: "📵" },
                { title: "Learn a Skill", category: "Growth", icon: "🧠" },
                { title: "Gratitude List", category: "Mindfulness", icon: "🙏" },
                { title: "Hydration Goal", category: "Health", icon: "💧" },
              ].map((challenge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{challenge.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{challenge.title}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                        {challenge.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
    
  );
}
