const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');

router.get('/low-stock', auth, permit(['admin', 'staff']), async (req, res) => {
  const items = await Item.find({ $expr: { $lt: ["$quantity", "$threshold"] } });
  res.json(items);
});

module.exports = router;
