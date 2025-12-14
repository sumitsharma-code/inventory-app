// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const auth = require('../middleware/auth');
// const permit = require('../middleware/roles');

// router.get('/', auth, permit('admin'), userController.listUsers);
// router.delete('/:id', auth, permit('admin'), userController.deleteUser);

// module.exports = router;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "staff"],
      default: "staff",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
