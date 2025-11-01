import express from "express";
import protect from "../middlewares/authMiddleware.js";
import Appointment from "../models/Appointment.js";
import { bookAppointment, getUserAppointments } from "../controllers/appointmentController.js";

const router = express.Router();

// ✅ Book appointment (User)
router.post("/book", protect, bookAppointment);

// ✅ Get all appointments for logged-in user
router.get("/my", protect, getUserAppointments);

// ✅ Get all appointments for a doctor
router.get("/doctor", protect, async (req, res) => {
  try {
    const doctorId = req.user.id; // from JWT token

    const appointments = await Appointment.find({ doctorId })
      .populate("user", "fullName email")
      .populate("doctor", "name speciality");

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});
// ✅ Cancel Appointment
router.delete("/cancel/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment cancelled successfully" });
  } catch (err) {
    console.error("Cancel error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
