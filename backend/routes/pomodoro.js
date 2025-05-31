const express = require('express');
const Pomodoro = require('../models/Pomodoro');
const auth = require('../middleware/auth');

const router = express.Router();

// Start pomodoro session
router.post('/start', auth, async (req, res) => {
  try {
    const pomodoro = new Pomodoro({
      ...req.body,
      user: req.user._id,
      startTime: new Date()
    });
    await pomodoro.save();
    res.status(201).json(pomodoro);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Complete pomodoro session
router.patch('/:id/complete', auth, async (req, res) => {
  try {
    const pomodoro = await Pomodoro.findOne({ _id: req.params.id, user: req.user._id });
    if (!pomodoro) {
      return res.status(404).json({ message: 'Pomodoro session not found' });
    }

    pomodoro.completed = true;
    pomodoro.endTime = new Date();
    await pomodoro.save();
    res.json(pomodoro);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all pomodoro sessions
router.get('/', auth, async (req, res) => {
  try {
    const pomodoros = await Pomodoro.find({ user: req.user._id })
      .sort({ startTime: -1 });
    res.json(pomodoros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 