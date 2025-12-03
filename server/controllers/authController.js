const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await user.validatePassword(password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, username: user.username, role: user.role, displayName: user.displayName }
    });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  try {
    // only admin route should call this (route protected)
    const { username, password, role = 'creator', displayName } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'username already exists' });

    const user = new User({ username, role, displayName });
    await user.setPassword(password);
    await user.save();

    res.status(201).json({ message: 'User created', user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
