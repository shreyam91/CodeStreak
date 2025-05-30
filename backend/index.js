const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // download this from Firebase

const app = express();
app.use(cors());
app.use(express.json());

// Firebase admin init
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
});

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

const topicsRouter = require('./routes/topics');
app.use('/api/topics', verifyFirebaseToken, topicsRouter);

app.listen(5000, () => console.log('Server running on port 5000'));
