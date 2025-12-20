const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");

const router = express.Router();

/**
 * ============================
 * GET /users
 * Admin only
 * ============================
 */
router.get("/", auth, allowRoles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/**
 * ============================
 * POST /users
 * Admin only – create user
 * ============================
 */
router.post("/", auth, allowRoles("admin"), async (req, res) => {
  try {
    let { username, password, role, displayName } = req.body;

    // normalize role
    role = role?.toLowerCase() || "staff";

    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashed,
      role,
      displayName,
    });

    res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ message: "Failed to create user" });
  }
});

module.exports = router;
