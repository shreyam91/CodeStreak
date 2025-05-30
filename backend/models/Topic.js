// models/Topic.js
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  userId: String,
  subject: String,
  topic: String,
  mastery: String,
  createdAt: Date,
  lastReviewed: Date,
  intervalDays: Number,
});

module.exports = mongoose.model('Topic', topicSchema);
