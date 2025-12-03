const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
    {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    soldBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    priceAtSale: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Sale", SaleSchema);
