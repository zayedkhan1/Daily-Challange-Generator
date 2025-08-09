import React, { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_CHALLENGES } from "../utils/challengesPool";
import { BADGES } from "../utils/badges";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ChallengeContext = createContext();

export function useChallenge() {
  return useContext(ChallengeContext);
}

function getTodayString() {
  return new Date().toISOString().slice(0, 10); // yyyy-mm-dd
}

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function ChallengeProvider({ children }) {
  // User-added challenges (array)
  const [userChallenges, setUserChallenges] = useLocalStorage("userChallenges", [], 2 * 24 * 60 * 60 * 1000);

  // Completed challenges by date: { [date]: { challengeId: bool } }
  const [completionData, setCompletionData] = useLocalStorage("completionData", {}, 2 * 24 * 60 * 60 * 1000);

  // Current streak count
  const [streak, setStreak] = useLocalStorage("streak", 0, 2 * 24 * 60 * 60 * 1000);

  // Last completion date string yyyy-mm-dd
  const [lastCompletionDate, setLastCompletionDate] = useLocalStorage("lastCompletionDate", null, 2 * 24 * 60 * 60 * 1000);

  // Badge earned
  const [earnedBadges, setEarnedBadges] = useLocalStorage("earnedBadges", [], 2 * 24 * 60 * 60 * 1000);

  // Selected categories (all enabled by default)
  const [categories, setCategories] = useLocalStorage("categories", ["Health","Fitness","Learning","Mindfulness","Fun","Social","Productivity"], 2 * 24 * 60 * 60 * 1000);

  // Combine default + user challenges filtered by selected categories
  const challengePool = [...DEFAULT_CHALLENGES, ...userChallenges].filter(c => categories.includes(c.category));

  // Today's challenge id (persisted)
  const [todayChallengeId, setTodayChallengeId] = useLocalStorage("todayChallengeId", null, 2 * 24 * 60 * 60 * 1000);
  const [todayDate, setTodayDate] = useLocalStorage("todayDate", null, 2 * 24 * 60 * 60 * 1000);

  // On mount or date change, pick a new challenge for today if none or date changed
  useEffect(() => {
    const today = getTodayString();
    if (todayDate !== today || !todayChallengeId) {
      // pick a random challenge for today
      if (challengePool.length === 0) {
        setTodayChallengeId(null);
        setTodayDate(today);
        return;
      }
      const challenge = randomFromArray(challengePool);
      setTodayChallengeId(challenge.id);
      setTodayDate(today);
    }
  }, [todayDate, todayChallengeId, challengePool, setTodayChallengeId, setTodayDate]);

  // Get today's challenge full object
  const todayChallenge = challengePool.find(c => c.id === todayChallengeId) || null;

  // Check if today challenge is completed
  const completedToday = completionData[todayDate]?.[todayChallengeId] || false;

  // Mark today's challenge as done
  function completeToday() {
    if (!todayChallengeId || completedToday) return;
    const updatedCompletionData = {...completionData};
    if (!updatedCompletionData[todayDate]) updatedCompletionData[todayDate] = {};
    updatedCompletionData[todayDate][todayChallengeId] = true;
    setCompletionData(updatedCompletionData);

    // Update streak logic
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0,10);

    if (lastCompletionDate === yesterdayStr || lastCompletionDate === todayDate) {
      setStreak(streak + 1);
    } else {
      setStreak(1);
    }
    setLastCompletionDate(todayDate);

    // Check badges
    const newBadges = [...earnedBadges];
    BADGES.forEach(badge => {
      if (streak + 1 >= badge.streak && !earnedBadges.includes(badge.id)) {
        newBadges.push(badge.id);
      }
    });
    setEarnedBadges(newBadges);
  }

  // Skip today (mark challenge as skipped, counts as no completion)
  function skipToday() {
    if (!todayChallengeId) return;
    const updatedCompletionData = {...completionData};
    if (!updatedCompletionData[todayDate]) updatedCompletionData[todayDate] = {};
    updatedCompletionData[todayDate][todayChallengeId] = false;
    setCompletionData(updatedCompletionData);

    // Reset streak on skip
    setStreak(0);
    setLastCompletionDate(null);
  }

  // Add user challenge
  function addUserChallenge(challenge) {
    setUserChallenges([...userChallenges, challenge]);
  }

  // Toggle category
  function toggleCategory(category) {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  }

  const value = {
    todayChallenge,
    completedToday,
    completeToday,
    skipToday,
    streak,
    earnedBadges,
    addUserChallenge,
    categories,
    toggleCategory,
    completionData,
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
}
