const cartService = require("../services/cartServices");

// controllers/cartController.js
const Cart = require("../models/Cart");

exports.addMealToCart = async (req, res) => {
  try {
    const { mealId, quantity } = req.body;
    const userId = req.user._id; // ✅ هنا user بيكون جاي من middleware

    if (!userId) {
      return res.status(401).json({ message: "يجب تسجيل الدخول أولًا" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, cartItems: [] });
    }

    const existingItem = cart.cartItems.find(
      (item) => item.meal.toString() === mealId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.cartItems.push({
        meal: mealId,
        quantity,
        price: 0,
      });
    }

    cart.totalCartPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getCart = async (req, res) => {
  try {
    // Call the service to get the cart
    const cart = await cartService.getCart();

    // Return success response
    res.status(200).json({
      message: "Cart retrieved successfully",
      cart,
    });
  } catch (err) {
    // Return error response in case of failure
    res.status(500).json({ error: err.message });
  }
};
exports.removeMealFromCart = async (req, res) => {
  try {
    const { mealId } = req.params;

    const cart = await cartService.removeMealFromCart(mealId);

    res.status(200).json({
      message: "Meal removed from cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart();

    res.status(200).json({
      message: "Cart cleared ",
      cart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateMealInCart = async (req, res) => {
  try {
    const { mealId } = req.params; // Extract mealId from the URL parameters
    const { quantity, note } = req.body; // Extract the updated quantity and note from the request body

    const cart = await cartService.updateMealQuantity(mealId, quantity, note);

    res.status(200).json({
      message: "Meal updated in cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
