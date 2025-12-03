const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemId: { type: String, required: true, unique: true }, // SKU
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, default: 0 },
  threshold: { type: Number, default: 5 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

ItemSchema.index({ name: 'text', brand: 'text', category: 'text' });

module.exports = mongoose.model('Item', ItemSchema);
