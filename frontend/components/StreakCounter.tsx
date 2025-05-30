'use client'

import React, { useEffect, useState } from "react";

const STORAGE_KEY = "streak_data";

type StreakData = {
  count: number;
  lastDate: string; // ISO date string (yyyy-mm-dd)
};

// Helper: format date to yyyy-mm-dd
const formatDate = (date: Date) => date.toISOString().split("T")[0];

// Helper: get difference in days between two yyyy-mm-dd dates
const daysBetween = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d2.getTime() - d1.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

const StreakCounter: React.FC = () => {
  const [streak, setStreak] = useState<number>(0);
  const [lastDate, setLastDate] = useState<string>("");

  useEffect(() => {
    // Load streak data from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: StreakData = JSON.parse(stored);
      const today = formatDate(new Date());
      const daysDiff = daysBetween(data.lastDate, today);

      if (daysDiff === 0) {
        // Same day, keep streak as is
        setStreak(data.count);
        setLastDate(data.lastDate);
      } else if (daysDiff === 1) {
        // Next day, keep streak (allow increment)
        setStreak(data.count);
        setLastDate(data.lastDate);
      } else {
        // Missed days, reset streak
        setStreak(0);
        setLastDate("");
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage whenever streak or lastDate changes
  useEffect(() => {
    if (streak > 0 && lastDate) {
      const data: StreakData = { count: streak, lastDate };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [streak, lastDate]);

  const incrementStreak = () => {
    const today = formatDate(new Date());

    if (!lastDate) {
      // First day starting streak
      setStreak(1);
      setLastDate(today);
      return;
    }

    const daysDiff = daysBetween(lastDate, today);

    if (daysDiff === 0) {
      alert("You already logged your streak for today!");
    } else if (daysDiff === 1) {
      // Valid next day increment streak
      setStreak((prev) => prev + 1);
      setLastDate(today);
    } else {
      // Missed days, reset streak and start over
      if (confirm("You missed days! Streak will reset. Start over?")) {
        setStreak(1);
        setLastDate(today);
      }
    }
  };

  const resetStreak = () => {
    setStreak(0);
    setLastDate("");
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-md text-center">
      <h1 className="text-4xl font-bold mb-4">🔥 Consecutive Day Streak</h1>
      <p className="text-6xl font-extrabold text-indigo-600 mb-6">{streak}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={incrementStreak}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Log Today
        </button>
        <button
          onClick={resetStreak}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
      {lastDate && (
        <p className="mt-4 text-sm text-gray-500">
          Last logged day: <span className="font-medium">{lastDate}</span>
        </p>
      )}
    </div>
  );
};

export default StreakCounter;
