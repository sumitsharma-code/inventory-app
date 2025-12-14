const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');

router.post('/', auth, permit(['admin','staff']), saleController.recordSale);
router.get('/', auth, permit(['admin','staff']), saleController.getSales);

module.exports = router;
