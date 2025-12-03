const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');

router.post('/login', authController.login);
router.post('/register', auth, permit('admin'), authController.register);

module.exports = router;
