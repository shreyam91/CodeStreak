import { useEffect, useState } from "react";
import useToast from "@/hooks/use-toast";
import { streakApi } from "@/lib/api";

type StreakData = {
  current: number;
  longest: number;
  lastCompleted: string;
  activityData?: { [date: string]: number };
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
  const [history, setHistory] = useState<{ [date: string]: number }>({});
  const [today, setToday] = useState<string>(formatDate(new Date()));
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load streak data from API
  useEffect(() => {
    const loadStreak = async () => {
      try {
        setLoading(true);
        const data = await streakApi.get();
        console.log('API Response:', data);

        setStreak(data.current);
        setLastDate(data.lastCompleted ? formatDate(new Date(data.lastCompleted)) : "");
        
        // Use activityData from API if available, otherwise generate from streak
        if (data.activityData) {
          console.log('Using API activity data:', data.activityData);
          setHistory(data.activityData);
        } else {
          // Generate history from streak data
          const historyData: { [date: string]: number } = {};
          if (data.lastCompleted) {
            const lastCompleted = new Date(data.lastCompleted);
            for (let i = 0; i < data.current; i++) {
              const date = new Date(lastCompleted);
              date.setDate(date.getDate() - i);
              historyData[formatDate(date)] = data.current - i;
            }
          }
          console.log('Generated history data:', historyData);
          setHistory(historyData);
        }
      } catch (error) {
        console.error('Failed to load streak:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load streak data. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
    loadStreak();
  }, [toast]);

  // Update 'today' at midnight rollover
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
      toast({
        title: "New Day Started!",
        description: "Don't forget to log your streak 🔥",
        variant: "success",
      });
    }, msUntilMidnight + 1000);

    return () => clearTimeout(timer);
  }, [today, toast]);

  const loggedToday = lastDate === today;

  const incrementStreak = async () => {
    if (loggedToday) {
      toast({
        title: "Already Logged",
        description: "You already logged your streak for today!",
        variant: "warning",
      });
      return;
    }

    try {
      const data = await streakApi.update();
      console.log('Update API Response:', data);
      
      setStreak(data.current);
      setLastDate(formatDate(new Date(data.lastCompleted)));
      
      // Update history with new data
      if (data.activityData) {
        setHistory(data.activityData);
      } else {
        const newHistory = { ...history };
        newHistory[today] = data.current;
        setHistory(newHistory);
      }

      toast({
        title: data.current === 1 ? "Streak Started! 🔥" : "Streak Incremented! 🔥",
        description: `You're now on a ${data.current} day streak!`,
        variant: "success",
      });
    } catch (error) {
      console.error('Failed to update streak:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update streak. Please try again.",
      });
    }
  };

  return {
    streak,
    lastDate,
    today,
    loggedToday,
    incrementStreak,
    history,
    loading
  };
}
