const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const authenticateUser = require("../middlewares/authMiddleware");

router.post("/addToCart", authenticateUser, cartController.addMealToCart); // ✅ نحط الميدل وير هنا

router.get("/", authenticateUser, cartController.getCart);
router.delete(
  "/remove/:mealId",
  authenticateUser,
  cartController.removeMealFromCart
);
router.delete("/clear", authenticateUser, cartController.clearCart);
router.put(
  "/update/:mealId",
  authenticateUser,
  cartController.updateMealInCart
);

module.exports = router;
