import { useEffect, useState } from "react";

const STORAGE_KEY = "streak_data";

type StreakData = {
  count: number;
  lastDate: string; // yyyy-mm-dd
};

const formatDate = (date: Date) => date.toISOString().split("T")[0];
const daysBetween = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d2.getTime() - d1.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export function useStreak() {
  const [streak, setStreak] = useState<number>(0);
  const [lastDate, setLastDate] = useState<string>("");
  const [today, setToday] = useState<string>(formatDate(new Date()));

  // Update 'today' at midnight rollover
  useEffect(() => {
    // Calculate milliseconds until next midnight
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0, 0
    );
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setToday(formatDate(new Date()));
    }, msUntilMidnight + 1000); // add 1 sec buffer

    return () => clearTimeout(timer);
  }, [today]);

  // Load streak from localStorage once on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: StreakData = JSON.parse(stored);
      setStreak(data.count);
      setLastDate(data.lastDate);
    }
  }, []);

  // Save streak on changes
  useEffect(() => {
    if (streak > 0 && lastDate) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: streak, lastDate }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [streak, lastDate]);

  // Is streak logged today?
  const loggedToday = lastDate === today;

  // Check if user skipped days (more than 1 day gap)
  // If so, reset streak automatically
  useEffect(() => {
    if (lastDate) {
      const diff = daysBetween(lastDate, today);
      if (diff > 1) {
        setStreak(0);
        setLastDate("");
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [today, lastDate]);

  const incrementStreak = () => {
    if (loggedToday) {
      alert("You already logged your streak for today!");
      return;
    }

    if (!lastDate) {
      // First time logging streak
      setStreak(1);
      setLastDate(today);
      return;
    }

    const diff = daysBetween(lastDate, today);

    if (diff === 1) {
      // Consecutive day - increment streak
      setStreak((prev) => prev + 1);
      setLastDate(today);
    } else if (diff > 1) {
      // Missed days — reset streak and start over
      if (confirm("You missed days! Streak will reset. Start over?")) {
        setStreak(1);
        setLastDate(today);
      }
    } else {
      // This should not happen if loggedToday is false, but just in case
      setStreak(1);
      setLastDate(today);
    }
  };

  const resetStreak = () => {
    setStreak(0);
    setLastDate("");
    localStorage.removeItem(STORAGE_KEY);
  };

  return { streak, lastDate, today, loggedToday, incrementStreak, resetStreak };
}
