const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');

router.get('/', auth, itemController.getItems);
router.get('/:id', auth, itemController.getItem);

router.post('/', auth, permit(['admin', 'creator']), itemController.createItem);
router.put('/:id', auth, permit('admin'), itemController.updateItem);
router.delete('/:id', auth, permit('admin'), itemController.deleteItem);

module.exports = router;
