import express from "express";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Book Appointment
router.post("/book", authMiddleware, async (req, res) => {
  try {
    const { doctorId, date, time, symptoms } = req.body;

    const newAppointment = await Appointment.create({
      userId: req.user.id,
      doctorId,
      date,
      time,
      symptoms,
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking appointment", error: error.message });
  }
});
// ✅ Get doctor profile + appointments
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // req.user.id comes from the decoded JWT token
    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const appointments = await Appointment.find({
      doctorId: req.user.id,
    }).populate("userId", "name email");

    res.json({ doctor, appointments });
  } catch (err) {
    console.error("Doctor profile error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/doctors/appointment/:id/status
router.put("/appointment/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body; // "approved" or "cancelled"
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Appointment not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
