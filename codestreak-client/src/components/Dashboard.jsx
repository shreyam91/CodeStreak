import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
  limit,
} from 'firebase/firestore';

const DAILY_GOAL_MINUTES = 50;
const WEEKLY_GOAL_DAYS = 5;

function Dashboard() {
  const [studySessions, setStudySessions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [dailyMinutes, setDailyMinutes] = useState(0);
  const [weeklyDaysStudied, setWeeklyDaysStudied] = useState(0);

  // Helper to get date string YYYY-MM-DD
  const dateStr = (date) => date.toISOString().slice(0, 10);

  // Fetch all sessions for past 7 days
  const fetchSessions = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 6); // past 7 days including today
    weekAgo.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, 'sessions'),
      where('userId', '==', user.uid),
      where('timestamp', '>=', Timestamp.fromDate(weekAgo)),
      orderBy('timestamp', 'desc')
    );
    const snapshot = await getDocs(q);

    const sessions = snapshot.docs.map((doc) => ({
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
    }));

    setStudySessions(sessions);
  };

  // Calculate streak and goals
  useEffect(() => {
    if (!studySessions.length) {
      setStreak(0);
      setDailyMinutes(0);
      setWeeklyDaysStudied(0);
      return;
    }

    const now = new Date();
    const datesStudiedSet = new Set();

    // Aggregate minutes per day
    const minutesPerDay = {};

    studySessions.forEach(({ timestamp, duration }) => {
      const day = dateStr(timestamp);
      datesStudiedSet.add(day);
      minutesPerDay[day] = (minutesPerDay[day] || 0) + duration;
    });

    // Calculate daily minutes for today
    const todayStr = dateStr(now);
    setDailyMinutes(minutesPerDay[todayStr] || 0);

    // Calculate weekly days studied (days with ≥1 session)
    const weeklyDaysCount = [...datesStudiedSet].length;
    setWeeklyDaysStudied(weeklyDaysCount);

    // Calculate streak: count consecutive days backwards starting today
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(now);
      checkDate.setDate(now.getDate() - i);
      const dayStr = dateStr(checkDate);
      if (datesStudiedSet.has(dayStr)) count++;
      else break;
    }
    setStreak(count);
  }, [studySessions]);

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-6">
      <h2 className="text-2xl font-bold text-center">Dashboard</h2>

      <div>
        <h3 className="text-lg font-semibold">Today’s Study Time</h3>
        <p className="text-xl">{dailyMinutes} minutes</p>
        <progress
          max={DAILY_GOAL_MINUTES}
          value={Math.min(dailyMinutes, DAILY_GOAL_MINUTES)}
          className="w-full h-4 rounded bg-gray-200"
        />
        <p className="text-sm text-gray-600">
          Goal: {DAILY_GOAL_MINUTES} minutes
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Weekly Study Days</h3>
        <p className="text-xl">
          {weeklyDaysStudied} / {WEEKLY_GOAL_DAYS} days
        </p>
        <progress
          max={WEEKLY_GOAL_DAYS}
          value={Math.min(weeklyDaysStudied, WEEKLY_GOAL_DAYS)}
          className="w-full h-4 rounded bg-gray-200"
        />
        <p className="text-sm text-gray-600">Goal: {WEEKLY_GOAL_DAYS} days</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Current Streak</h3>
        <p className="text-3xl font-bold text-green-600">{streak} days</p>
      </div>
    </div>
  );
}

export default Dashboard;
