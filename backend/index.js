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
  MONGODB_URI: process.env.MONGODB_URI ? 'MongoDB URI is set' : 'MongoDB URI is not set',
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});

// Middleware
app.use(cors());
app.use(express.json());

let retryCount = 0;
const MAX_RETRIES = 3;

// Database connection with retry logic
const connectWithRetry = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set in environment variables');
    process.exit(1); // Exit if no MongoDB URI is set
  }

  if (retryCount >= MAX_RETRIES) {
    console.error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts. Please check your connection string and credentials.`);
    process.exit(1); // Exit after max retries
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    });
    console.log('Connected to MongoDB Atlas successfully');
    retryCount = 0; // Reset retry count on successful connection
  } catch (err) {
    retryCount++;
    console.error(`MongoDB connection error (attempt ${retryCount}/${MAX_RETRIES}):`, err.message);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying connection in 5 seconds... (${retryCount}/${MAX_RETRIES})`);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.error('Max retry attempts reached. Please check your MongoDB Atlas connection string and credentials.');
      process.exit(1);
    }
  }
};

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  if (retryCount < MAX_RETRIES) {
    connectWithRetry();
  }
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
  retryCount = 0; // Reset retry count on successful connection
});

// Initial connection
connectWithRetry();

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

// Function to start server with port fallback
const startServer = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', error);
    }
  }
};

const PORT = process.env.PORT || 3001;
console.log(`Attempting to start server on port ${PORT}`);
startServer(parseInt(PORT)); 