const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');

router.post('/login', authController.login);
router.post('/register', auth, permit('admin'), authController.register);

// TEMP: create initial admin (REMOVE after use)
router.post('/create-admin', async (req, res) => {
  const bcrypt = require('bcryptjs');
  const User = require('../models/User');

  const exists = await User.findOne({ username: 'admin' });
  if (exists) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  const hashed = await bcrypt.hash('admin123', 10);

  const admin = await User.create({
    username: 'admin',
    password: hashed,
    role: 'admin',
  });

  res.json({ message: 'Admin created', admin });
});


module.exports = router;
