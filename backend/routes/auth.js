const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const user = new User({ 
      name, 
      email, 
      password,
      streak: {
        current: 0,
        longest: 0,
        lastCompleted: null
      }
    });
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Send response without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ 
      user: userResponse, 
      token 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: error.message || 'Registration failed' 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Send response without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ 
      user: userResponse, 
      token 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: error.message || 'Login failed' 
    });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    // User is already attached to req by auth middleware
    // and password is already excluded
    res.json(req.user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to fetch profile' 
    });
  }
});

module.exports = router; 