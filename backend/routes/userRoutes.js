import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ Register user (patient)
router.post("/register", registerUser);

// ✅ User login
router.post("/login", loginUser);

// ✅ Get profile
router.get("/profile", protect, getUserProfile);

// ✅ Update profile
router.put("/update-profile", protect, updateUserProfile);

// ✅ Admin login
router.post("/admin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email and role
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) return res.status(400).json({ message: "Not authorized" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({ token, message: "Admin login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
