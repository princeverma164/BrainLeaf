const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (userId) =>
  jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

const verifyPassword = async (user, password) => {
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch && user.password === password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    isMatch = true;
  }

  return isMatch;
};

exports.registerUser = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!name || !email || !password) {
      return res.status(200).json({ success: false, message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      const isMatch = await verifyPassword(userExists, password);

      if (!isMatch) {
        return res.status(200).json({
          success: false,
          message: "Email already registered. Please login with the correct password",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User already registered, logged in successfully",
        token: createToken(userExists._id),
        user: userExists,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: createToken(user._id),
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!email || !password) {
      return res.status(200).json({ success: false, message: "Please enter email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ success: false, message: "Email not registered" });
    }

    const isMatch = await verifyPassword(user, password);
    if (!isMatch) {
      return res.status(200).json({ success: false, message: "Password incorrect" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: createToken(user._id),
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
