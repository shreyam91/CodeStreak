const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Update streak
router.post('/update', auth, async (req, res) => {
  try {
    const user = req.user;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastCompleted = user.streak.lastCompleted
      ? new Date(user.streak.lastCompleted)
      : null;
    lastCompleted?.setHours(0, 0, 0, 0);

    // Check if user completed a task today
    if (lastCompleted && lastCompleted.getTime() === today.getTime()) {
      return res.json(user.streak);
    }

    // Check if user completed a task yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastCompleted && lastCompleted.getTime() === yesterday.getTime()) {
      // Increment streak
      user.streak.current += 1;
      if (user.streak.current > user.streak.longest) {
        user.streak.longest = user.streak.current;
      }
    } else {
      // Reset streak
      user.streak.current = 1;
    }

    user.streak.lastCompleted = today;
    await user.save();

    res.json(user.streak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get streak
router.get('/', auth, async (req, res) => {
  try {
    res.json(req.user.streak);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 