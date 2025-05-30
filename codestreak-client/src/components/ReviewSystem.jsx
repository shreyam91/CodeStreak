import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

function ReviewSystem() {
  const [dueTopics, setDueTopics] = useState([]);

  const fetchDueTopics = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const q = query(
      collection(db, 'topics'),
      where('userId', '==', user.uid),
      where('lastReviewed', '<=', Timestamp.fromDate(today))
    );
    const snapshot = await getDocs(q);
    const topics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDueTopics(topics);
  };

  useEffect(() => {
    fetchDueTopics();
  }, []);

  // Spaced repetition update logic
  // Increase intervalDays if mastered well, reset if not
  const handleReview = async (id, currentInterval, mastered) => {
    const topicRef = doc(db, 'topics', id);
    let newInterval = 1;
    if (mastered) {
      newInterval = currentInterval ? currentInterval * 2 : 2;
    }
    await updateDoc(topicRef, {
      lastReviewed: Timestamp.now(),
      intervalDays: newInterval,
    });
    fetchDueTopics();
  };

  if (dueTopics.length === 0) return <p>No topics due for review today! 🎉</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Review Topics</h2>
      {dueTopics.map(({ id, subject, topic, mastery, intervalDays }) => (
        <div key={id} className="border p-3 rounded flex justify-between items-center">
          <div>
            <p><strong>{subject}:</strong> {topic}</p>
            <p>Mastery: {mastery} | Interval: {intervalDays || 1} day(s)</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => handleReview(id, intervalDays, true)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Mastered
            </button>
            <button
              onClick={() => handleReview(id, intervalDays, false)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Not Yet
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewSystem;
