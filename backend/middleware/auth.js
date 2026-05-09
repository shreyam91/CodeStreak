const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // DEV BYPASS
    req.user = { _id: '64f1b2c3d4e5f6a7b8c9d0e1', name: 'Dev User', email: 'dev@test.com' };
    req.token = 'dummy-token';
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth; 