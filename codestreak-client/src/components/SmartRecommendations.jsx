import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { collection, query, where, getDocs, Timestamp, orderBy, limit } from 'firebase/firestore';

function SmartRecommendations() {
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const now = new Date();
    const q = query(
      collection(db, 'topics'),
      where('userId', '==', user.uid),
      orderBy('lastReviewed'),
      limit(5)
    );

    const snapshot = await getDocs(q);
    const topics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Recommend topics overdue for review (lastReviewed older than intervalDays)
    const nowTimestamp = Timestamp.now();

    const overdue = topics.filter(({ lastReviewed, intervalDays }) => {
      if (!lastReviewed || !intervalDays) return true;
      const nextReviewDate = lastReviewed.toDate();
      nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);
      return now > nextReviewDate;
    });

    setRecommendations(overdue);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  if (recommendations.length === 0) return <p>You're all caught up! No recommendations right now. 🎉</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Smart Recommendations</h2>
      <ul>
        {recommendations.map(({ id, subject, topic }) => (
          <li key={id} className="border-b py-2">
            <strong>{subject}:</strong> {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SmartRecommendations;
