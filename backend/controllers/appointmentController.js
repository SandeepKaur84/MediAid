import Appointment from "../models/Appointment.js";

// ✅ Book Appointment
export const bookAppointment = async (req, res) => {
  try {
    console.log("📥 Incoming body:", req.body);
    console.log("👤 Authenticated user:", req.user);

    const { doctorId, date, time, symptoms } = req.body;
    const userId = req.user._id;

    const appointment = await Appointment.create({
      userId,
      doctorId,
      date,
      time,
      symptoms,
    });

    console.log("✅ Appointment created:", appointment);
    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error("❌ Appointment booking error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all appointments for logged-in user
export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user._id;

    const appointments = await Appointment.find({ userId })
      .populate("doctorId", "name speciality degree")
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Fetch appointments error:", error);
    res.status(500).json({ message: error.message });
  }
};
