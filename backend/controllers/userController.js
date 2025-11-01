import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, age, gender, phone, address } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      age,
      gender,
      phone,
      address,
    });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get User Profile
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) res.json(user);
  else res.status(404).json({ message: "User not found" });
};

// ✅ Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { fullName, age, gender, phone, address } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update only provided fields
    user.fullName = fullName || user.fullName;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        age: updatedUser.age,
        gender: updatedUser.gender,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// ✅ Helper for JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
