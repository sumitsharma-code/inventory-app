const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/**
 * ============================
 * POST /auth/login
 * ============================
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ============================
 * POST /auth/create-admin
 * ⚠️ ONE-TIME BOOTSTRAP ROUTE
 * ============================
 */
router.post("/create-admin", async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return res.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });

    res.json({
      message: "Admin created",
      credentials: {
        username: "admin",
        password: "admin123",
      },
    });
  } catch (err) {
    console.error("Create admin error:", err);
    res.status(500).json({ message: "Failed to create admin" });
  }
});

module.exports = router;
