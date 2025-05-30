'use client';

import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRedo, FaCheckCircle } from 'react-icons/fa';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SessionEntry {
  type: string;
  duration: string;
  timestamp: string;
  topic: string;
}

const PomodoroTimer: React.FC = () => {
  const [hasSessionEnded, setHasSessionEnded] = useState(false);

  const [topic, setTopic] = useState<string>('');
  const [workMinutes, setWorkMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [sessionHistory, setSessionHistory] = useState<SessionEntry[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset timer when work/break duration or break state changes
  useEffect(() => {
    setSecondsLeft(isBreak ? breakMinutes * 60 : workMinutes * 60);
  }, [workMinutes, breakMinutes, isBreak]);

  // Timer countdown & session end logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1 && !hasSessionEnded) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsRunning(false);
            setHasSessionEnded(true);

            const sessionType = isBreak ? 'Break' : 'Work';
            const duration = `${isBreak ? breakMinutes : workMinutes} min`;
            const timestamp = new Date().toISOString();

            setSessionHistory((prevHistory) => [
              ...prevHistory,
              { type: sessionType, duration, timestamp, topic: topic || 'No topic' },
            ]);

            setTimeout(() => {
              if (!isBreak) {
                const takeBreak = confirm('Work session complete! Time for a break?');
                if (takeBreak) {
                  setIsBreak(true);
                  setSecondsLeft(breakMinutes * 60);
                  setIsRunning(true);
                  setHasSessionEnded(false);
                } else {
                  setHasSessionEnded(false);
                }
              } else {
                alert('Break over! Ready for another session?');
                setIsBreak(false);
                setSecondsLeft(workMinutes * 60);
                setHasSessionEnded(false);
              }
            }, 100);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isBreak, hasSessionEnded, breakMinutes, workMinutes, topic]);

  const formatTime = (totalSeconds: number): string => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Helper to check if two dates are the same calendar day
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Filter only today's sessions
  const today = new Date();
  const todaySessions = sessionHistory.filter((session) =>
    isSameDay(new Date(session.timestamp), today)
  );

  // Group today's sessions by topic and sum durations
  const topicTimeMapToday: { [topic: string]: number } = {};
  todaySessions.forEach((session) => {
    const time = parseInt(session.duration) || 0;
    if (session.type === 'Work') {
      if (!topicTimeMapToday[session.topic]) topicTimeMapToday[session.topic] = 0;
      topicTimeMapToday[session.topic] += time;
    }
  });

  const chartDataToday = {
    labels: Object.keys(topicTimeMapToday),
    datasets: [
      {
        label: 'Time Spent (minutes)',
        data: Object.values(topicTimeMapToday),
        backgroundColor: 'rgba(59, 130, 246, 0.6)', // Tailwind blue-500
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: "Today's Time Spent per Topic" },
    },
  };

  const handleStartStop = (): void => {
    setIsRunning(!isRunning);
    if (!isRunning) setHasSessionEnded(false);
  };

  const handleReset = (): void => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setSecondsLeft(isBreak ? breakMinutes * 60 : workMinutes * 60);
    setHasSessionEnded(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-4">
        {isBreak ? 'Break Time' : 'Pomodoro Timer'}
      </h1>

      <div className="text-4xl font-bold text-center mb-4">{formatTime(secondsLeft)}</div>

      <div className="flex justify-center gap-4 mb-4">
        {!isBreak ? (
          <>
            <label htmlFor="workInput" className="text-lg">
              Work Minutes:
            </label>
            <input
              id="workInput"
              type="number"
              min={1}
              value={workMinutes}
              onChange={(e) => {
                setWorkMinutes(Number(e.target.value));
                setIsRunning(false);
                if (intervalRef.current) clearInterval(intervalRef.current);
                setHasSessionEnded(false);
              }}
              className="w-20 p-2 border border-gray-300 rounded"
            />
          </>
        ) : (
          <>
            <label htmlFor="breakInput" className="text-lg">
              Break Minutes:
            </label>
            <input
              id="breakInput"
              type="number"
              min={1}
              value={breakMinutes}
              onChange={(e) => {
                setBreakMinutes(Number(e.target.value));
                setIsRunning(false);
                if (intervalRef.current) clearInterval(intervalRef.current);
                setHasSessionEnded(false);
              }}
              className="w-20 p-2 border border-gray-300 rounded"
            />
          </>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="topic" className="block mb-1 font-medium">
          Topic:
        </label>
        <input
          type="text"
          id="topic"
          placeholder="e.g. Math - Algebra"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex justify-center gap-6 mb-4">
        <button
          onClick={handleStartStop}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          {isRunning ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={handleReset}
          className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600"
        >
          <FaRedo />
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Session History</h2>
        <ul className="space-y-2 max-h-56 overflow-y-auto">
          {sessionHistory.map((session, index) => (
            <li key={index} className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1" />
              <div className="text-sm text-gray-700">
                <div className="font-medium">{session.topic}</div>
                <div>
                  {session.type} – {session.duration} at{' '}
                  {new Date(session.timestamp).toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {Object.keys(topicTimeMapToday).length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Today's Progress Overview</h2>
          <Bar data={chartDataToday} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;
