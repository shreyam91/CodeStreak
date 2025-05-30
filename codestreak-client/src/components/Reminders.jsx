import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { requestNotificationPermission, showNotification } from '../utils/notifications';

function Reminders() {
  const [reminderTime, setReminderTime] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    (async () => {
      const granted = await requestNotificationPermission();
      setPermissionGranted(granted);
    })();

    // Load stored reminder time from Firestore
    const fetchReminder = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.reminderTime) setReminderTime(data.reminderTime);
      }
    };
    fetchReminder();
  }, []);

  const saveReminder = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, { reminderTime }, { merge: true });
    alert('Reminder saved! Notifications will show at set time.');
  };

  // Check every minute if current time matches reminderTime
  useEffect(() => {
    if (!reminderTime || !permissionGranted) return;
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0,5);
      if (currentTime === reminderTime) {
        showNotification('Study Reminder', {
          body: `Time to study!`,
          icon: '/icon.png',
        });
      }
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [reminderTime, permissionGranted]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Set Daily Study Reminder</h2>
      <input
        type="time"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={saveReminder}
        disabled={!permissionGranted}
        className={`w-full py-2 rounded text-white ${
          permissionGranted ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Save Reminder
      </button>
      {!permissionGranted && (
        <p className="text-red-500 text-sm">Enable notifications to receive reminders.</p>
      )}
    </div>
  );
}

export default Reminders;
