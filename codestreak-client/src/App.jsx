import { useEffect, useState } from 'react';
import { auth } from './services/firebase';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import PomodoroTimer from './components/PomodoroTimer';
import TopicTracker from './components/TopicTracker';
import Reminders from './components/Reminders';
import ReviewSystem from './components/ReviewSystem';
import MoodTracker from './components/MoodTracker';
import SmartRecommendations from './components/SmartRecommendations';
import HeroSectionOne from './components/heroSection';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return unsubscribe;
  }, []);

  if (!user) {
    return (
      <>
        <HeroSectionOne/>
        <Auth/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {/* <Auth /> */}
      </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">Welcome, {user.email}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <Dashboard />
        <PomodoroTimer />
        <TopicTracker />
        <Reminders />
        <ReviewSystem />
        <SmartRecommendations />
        <MoodTracker />
      </div>
    </div>
  );
}

export default App;
