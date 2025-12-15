const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");

const router = express.Router();

/**
 * GET /users
 * Admin only
 */
router.get("/", auth, allowRoles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/**
 * POST /users
 * Admin only - create staff user
 */
router.post("/", auth, allowRoles("admin"), async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const bcrypt = require("bcryptjs");
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashed,
      role: role || "staff",
    });

    res.json({
      message: "User created",
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user" });
  }
});

module.exports = router;
