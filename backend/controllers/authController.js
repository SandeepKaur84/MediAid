import Admin from "../models/Admin.js";
import Doctor from "../models/Doctor.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, role: "admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Doctor Login
export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const isMatch = await doctor.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(doctor._id, "doctor");
    res.json({ token, role: "doctor" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};