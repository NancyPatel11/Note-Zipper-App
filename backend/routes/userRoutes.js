const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
