const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔐 PROTECT ROUTES
exports.protect = async (req, res, next) => {
  let token;

  try {
    // 1. token check (header se)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. token nahi hai
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 3. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. user find karo
    req.user = await User.findById(decoded.id).select("-password");

    next(); // 👈 next route pe jao

  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};