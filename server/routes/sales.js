const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');

router.post('/', auth, permit(['admin','creator']), saleController.recordSale);
router.get('/', auth, permit(['admin','creator']), saleController.getSales);

module.exports = router;
