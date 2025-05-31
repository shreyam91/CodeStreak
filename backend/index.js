require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const pomodoroRoutes = require('./routes/pomodoro');
const streakRoutes = require('./routes/streak');

const app = express();

// Debug logging
console.log('Environment variables:', {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codestreak', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/pomodoro', pomodoroRoutes);
app.use('/api/streak', streakRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
console.log(`Attempting to start server on port ${PORT}`);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 