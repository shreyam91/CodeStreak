// routes/topics.js
const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// GET all topics for user
router.get('/', async (req, res) => {
  const topics = await Topic.find({ userId: req.user.uid });
  res.json(topics);
});

// POST new topic
router.post('/', async (req, res) => {
  const topic = new Topic({
    userId: req.user.uid,
    ...req.body,
    createdAt: new Date(),
  });
  await topic.save();
  res.status(201).json(topic);
});

module.exports = router;
