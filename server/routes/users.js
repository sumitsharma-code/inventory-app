const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');

router.get('/', auth, permit('admin'), userController.listUsers);
router.delete('/:id', auth, permit('admin'), userController.deleteUser);

module.exports = router;
