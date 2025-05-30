import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

const MASTERY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

function TopicTracker() {
  const [topics, setTopics] = useState([]);
  const [subject, setSubject] = useState('');
  const [topicName, setTopicName] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch topics from Firestore for the user
  const fetchTopics = async () => {
    const user = auth.currentUser;
    if (!user) return;
    setLoading(true);
    const q = query(collection(db, 'topics'), where('userId', '==', user.uid));
    const snapshot = await getDocs(q);
    const topicsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTopics(topicsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // Add new topic
  const addTopic = async () => {
    if (!subject.trim() || !topicName.trim()) return alert('Fill all fields');
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, 'topics'), {
  userId: user.uid,
  subject,
  topic: topicName,
  mastery: 'Beginner',
  createdAt: Timestamp.now(),
  lastReviewed: Timestamp.now(),
  intervalDays: 1,
});

    setSubject('');
    setTopicName('');
    fetchTopics();
  };

  // Update mastery level
  const updateMastery = async (id, currentLevel) => {
    const currentIndex = MASTERY_LEVELS.indexOf(currentLevel);
    const nextIndex = (currentIndex + 1) % MASTERY_LEVELS.length;
    const newLevel = MASTERY_LEVELS[nextIndex];

    const topicRef = doc(db, 'topics', id);
    await updateDoc(topicRef, { mastery: newLevel });
    fetchTopics();
  };

  // Delete topic
  const deleteTopic = async (id) => {
    const topicRef = doc(db, 'topics', id);
    await deleteDoc(topicRef);
    fetchTopics();
  };

  

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Topic Tracker</h2>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Subject (e.g., JavaScript)"
          className="flex-1 border px-3 py-2 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Topic Name"
          className="flex-1 border px-3 py-2 rounded"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
        <button
          onClick={addTopic}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading topics...</p>
      ) : topics.length === 0 ? (
        <p>No topics added yet.</p>
      ) : (
        <ul>
          {topics.map(({ id, subject, topic, mastery }) => (
            <li
              key={id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <strong>{subject}:</strong> {topic}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateMastery(id, mastery)}
                  className="bg-yellow-300 px-3 py-1 rounded"
                  title="Click to change mastery level"
                >
                  {mastery}
                </button>
                <button
                  onClick={() => deleteTopic(id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  title="Delete topic"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopicTracker;

