const Item = require('../models/Item');

exports.getItems = async (req, res) => {
  try {
    const { search, category, brand, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (search) filter.$text = { $search: search };

    const items = await Item.find(filter).skip((page - 1) * limit).limit(parseInt(limit));
    res.json(items);
  } catch (err) {
    console.error('Get items error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error('Get item error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { itemId, name, category, brand, price, quantity = 0, threshold } = req.body;
    if (!itemId || !name || !category || price == null) return res.status(400).json({ message: 'Missing required fields' });

    const exists = await Item.findOne({ itemId });
    if (exists) return res.status(400).json({ message: 'Item with same itemId exists' });

    const item = new Item({
      itemId,
      name,
      category,
      brand,
      price,
      quantity,
      threshold: threshold ?? 5,
      createdBy: req.user._id
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error('Create item error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updates = req.body;
    const item = await Item.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error('Update item error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Deleted', item });
  } catch (err) {
    console.error('Delete item error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
