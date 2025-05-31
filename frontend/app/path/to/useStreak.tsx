import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "streak_data";

type StreakData = {
  history: {};
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

// export function useStreak() {
//   const [streak, setStreak] = useState<number>(0);
//   const [lastDate, setLastDate] = useState<string>("");
//   const [today, setToday] = useState<string>(formatDate(new Date()));

//   useEffect(() => {
//     const now = new Date();
//     const nextMidnight = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate() + 1,
//       0, 0, 0, 0
//     );
//     const msUntilMidnight = nextMidnight.getTime() - now.getTime();

//     const timer = setTimeout(() => {
//       setToday(formatDate(new Date()));
//       toast("A new day has started! Don't forget to log your streak 🔥", {
//         icon: '🔥',
//       });
//     }, msUntilMidnight + 1000);

//     return () => clearTimeout(timer);
//   }, [today]);

//   useEffect(() => {
//     const stored = localStorage.getItem(STORAGE_KEY);
//     if (stored) {
//       const data: StreakData = JSON.parse(stored);
//       setStreak(data.count);
//       setLastDate(data.lastDate);
//     }
//   }, []);

//   useEffect(() => {
//     if (streak > 0 && lastDate) {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: streak, lastDate }));
//     } else {
//       localStorage.removeItem(STORAGE_KEY);
//     }
//   }, [streak, lastDate]);

//   const loggedToday = lastDate === today;

//   useEffect(() => {
//     if (lastDate) {
//       const diff = daysBetween(lastDate, today);
//       if (diff > 1) {
//         setStreak(0);
//         setLastDate("");
//         localStorage.removeItem(STORAGE_KEY);
//         toast.error("You missed a day! Your streak has been reset.");
//       }
//     }
//   }, [today, lastDate]);

//   const incrementStreak = () => {
//     if (loggedToday) {
//       toast("You already logged your streak for today!");
//       return;
//     }

//     if (!lastDate) {
//       setStreak(1);
//       setLastDate(today);
//       toast.success("Streak started! 🔥");
//       return;
//     }

//     const diff = daysBetween(lastDate, today);

//     if (diff === 1) {
//       setStreak((prev) => prev + 1);
//       setLastDate(today);
//       toast.success("Great! Streak incremented! 🔥");
//     } else if (diff > 1) {
//       if (confirm("You missed days! Streak will reset. Start over?")) {
//         setStreak(1);
//         setLastDate(today);
//         toast.success("Streak reset and started over! 🔥");
//       }
//     } else {
//       setStreak(1);
//       setLastDate(today);
//       toast.success("Streak started! 🔥");
//     }
//   };

//   const resetStreak = () => {
//     setStreak(0);
//     setLastDate("");
//     localStorage.removeItem(STORAGE_KEY);
//     toast("Streak reset.");
//   };

//   return { streak, lastDate, today, loggedToday, incrementStreak, resetStreak };
// }

export function useStreak() {
  const [streak, setStreak] = useState<number>(0);
  const [lastDate, setLastDate] = useState<string>("");
  const [history, setHistory] = useState<{ [date: string]: number }>({});
  const [today, setToday] = useState<string>(formatDate(new Date()));

  useEffect(() => {
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
      toast("A new day has started! Don't forget to log your streak 🔥", {
        icon: "🔥",
      });
    }, msUntilMidnight + 1000);

    return () => clearTimeout(timer);
  }, [today]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: StreakData = JSON.parse(stored);
      setStreak(data.count);
      setLastDate(data.lastDate);
      setHistory(data.history || {});
    }
  }, []);

  useEffect(() => {
    if (streak > 0 && lastDate) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ count: streak, lastDate, history })
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [streak, lastDate, history]);

  const loggedToday = lastDate === today;

  useEffect(() => {
    if (lastDate) {
      const diff = daysBetween(lastDate, today);
      if (diff > 1) {
        setStreak(0);
        setLastDate("");
        setHistory((prev) => {
          const updated = { ...prev };
          delete updated[today];
          return updated;
        });
        localStorage.removeItem(STORAGE_KEY);
        toast.error("You missed a day! Your streak has been reset.");
      }
    }
  }, [today, lastDate]);

  const incrementStreak = () => {
    if (loggedToday) {
      toast("You already logged your streak for today!");
      return;
    }

    let newCount = 1;

    if (!lastDate) {
      newCount = 1;
    } else {
      const diff = daysBetween(lastDate, today);
      if (diff === 1) {
        newCount = streak + 1;
      } else if (diff > 1) {
        if (!confirm("You missed days! Streak will reset. Start over?")) return;
        newCount = 1;
      }
    }

    setStreak(newCount);
    setLastDate(today);
    setHistory((prev) => ({ ...prev, [today]: newCount }));
    toast.success(newCount === 1 ? "Streak started! 🔥" : "Streak incremented! 🔥");
  };

  const resetStreak = () => {
    setStreak(0);
    setLastDate("");
    setHistory({});
    localStorage.removeItem(STORAGE_KEY);
    toast("Streak reset.");
  };

  return {
    streak,
    lastDate,
    today,
    loggedToday,
    incrementStreak,
    resetStreak,
    history, // <== this is what you'll pass to YearStreakChart
  };
}
