import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

const POMODORO_MINUTES = 25;

function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_MINUTES * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsToday, setSessionsToday] = useState(0);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Timer countdown logic
  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft(secondsLeft - 1), 1000);
    } else if (isActive && secondsLeft === 0) {
      // Timer finished
      setIsActive(false);
      saveSession();
      resetTimer();
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  // Reset timer
  const resetTimer = () => setSecondsLeft(POMODORO_MINUTES * 60);

  // Save session to Firestore
  const saveSession = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await addDoc(collection(db, 'sessions'), {
        userId: user.uid,
        duration: POMODORO_MINUTES,
        timestamp: Timestamp.now(),
      });
      fetchSessionsToday(); // update total time
    } catch (e) {
      console.error('Error saving session: ', e);
    }
  };

  // Fetch sessions for today and sum durations
  const fetchSessionsToday = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, 'sessions'),
      where('userId', '==', user.uid),
      where('timestamp', '>=', Timestamp.fromDate(startOfDay))
    );
    const querySnapshot = await getDocs(q);
    let totalMinutes = 0;
    querySnapshot.forEach((doc) => {
      totalMinutes += doc.data().duration;
    });
    setSessionsToday(totalMinutes);
  };

  // On mount, fetch today’s sessions
  useEffect(() => {
    fetchSessionsToday();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Pomodoro Timer</h2>
      <div className="text-5xl font-mono mb-4">{formatTime(secondsLeft)}</div>
      <div className="flex justify-center gap-4 mb-4">
        {!isActive ? (
          <button
            onClick={() => setIsActive(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => setIsActive(false)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Pause
          </button>
        )}
        <button
          onClick={resetTimer}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
      <p className="text-lg">
        Total study time today: <strong>{sessionsToday} minutes</strong>
      </p>
    </div>
  );
}

export default PomodoroTimer;
