// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "توكن غير موجود. سجل دخول أولًا." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "مستخدم غير موجود." });
    }

    req.user = user; // ✅ نخزن اليوزر في الريكويست
    next();
  } catch (error) {
    res.status(401).json({ message: "توكن غير صالح أو انتهت صلاحيته." });
  }
};

module.exports = authenticateUser;
