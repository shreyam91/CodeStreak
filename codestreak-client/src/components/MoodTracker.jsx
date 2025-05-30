import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

const MOODS = ['😊 Happy', '😐 Neutral', '😞 Sad', '😫 Tired'];

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState('');
  const [todayMood, setTodayMood] = useState(null);

  const fetchTodayMood = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const q = query(
      collection(db, 'moods'),
      where('userId', '==', user.uid),
      where('timestamp', '>=', Timestamp.fromDate(todayStart))
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      setTodayMood(snapshot.docs[0].data().mood);
      setSelectedMood(snapshot.docs[0].data().mood);
    }
  };

  useEffect(() => {
    fetchTodayMood();
  }, []);

  const saveMood = async () => {
    const user = auth.currentUser;
    if (!user) return;
    await addDoc(collection(db, 'moods'), {
      userId: user.uid,
      mood: selectedMood,
      timestamp: Timestamp.now(),
    });
    setTodayMood(selectedMood);
    alert('Mood saved!');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Mood Tracker</h2>
      <select
        value={selectedMood}
        onChange={(e) => setSelectedMood(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select your mood</option>
        {MOODS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <button
        onClick={saveMood}
        disabled={!selectedMood}
        className="w-full py-2 rounded bg-purple-600 text-white"
      >
        Save Mood
      </button>
      {todayMood && <p>Your mood today: <strong>{todayMood}</strong></p>}
    </div>
  );
}

export default MoodTracker;
