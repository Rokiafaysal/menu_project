// models/Cart.js

const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  meal: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
  quantity: Number,
  price: Number,
  note: String,
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cartItems: [cartItemSchema],
  totalCartPrice: { type: Number, default: 0 },
});

module.exports = mongoose.model("Cart", cartSchema);
