const mongoose = require('mongoose');
const Item = require('../models/Item');
const Sale = require('../models/Sale');

exports.recordSale = async (req, res) => {
  const { itemId, quantity } = req.body;
  if (!itemId || !quantity || quantity <= 0) return res.status(400).json({ message: 'Invalid payload' });

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const item = await Item.findOne({ itemId }).session(session);
    if (!item) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.quantity < quantity) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Not enough stock' });
    }

    item.quantity -= quantity;
    await item.save({ session });

    const sale = new Sale({
      item: item._id,
      quantity,
      soldBy: req.user._id,
      priceAtSale: item.price
    });
    await sale.save({ session });

    await session.commitTransaction();
    session.endSession();

    const io = req.app.get('io');
    if (io) io.emit('stock-updated', { itemId: item.itemId, quantity: item.quantity });

    res.status(201).json({ sale, item });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('Record sale error', err);
    res.status(500).json({ message: 'Server error recording sale' });
  }
};

exports.getSales = async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const sales = await Sale.find()
      .populate('item')
      .populate('soldBy', 'username displayName')
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(sales);
  } catch (err) {
    console.error('Get sales error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
