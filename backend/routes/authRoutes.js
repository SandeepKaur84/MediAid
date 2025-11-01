import express from "express";
import { adminLogin, doctorLogin } from "../controllers/authController.js";
import Admin from "../models/Admin.js";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// ✅ Login
router.post("/admin/login", adminLogin);
router.post("/doctor/login", doctorLogin);

// ✅ Register
router.post("/admin/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ name, email, password });
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/doctor/register", async (req, res) => {
  try {
    const { name, email, password, speciality } = req.body;
    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ message: "Doctor already exists" });

    const doctor = await Doctor.create({ name, email, password, speciality });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
