// controllers/doctorController.js
import Doctor from "../models/Doctor.js";

// ✅ Add new doctor (Admin)
export const addDoctor = async (req, res) => {
  try {
    const { name, speciality, degree, experience, about, fees, address } = req.body;

    if (!name || !speciality)
      return res.status(400).json({ message: "Name and speciality are required" });

    const doctor = await Doctor.create({
      name,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error adding doctor", error: error.message });
  }
};

// ✅ Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error: error.message });
  }
};

// ✅ Get doctors by speciality
export const getDoctorsBySpeciality = async (req, res) => {
  try {
    const { speciality } = req.params;
    const doctors = await Doctor.find({ speciality });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors by speciality", error: error.message });
  }
};

// ✅ Get single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error: error.message });
  }
};

// ✅ Update doctor (Admin only)
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error: error.message });
  }
};

// ✅ Delete doctor (Admin only)
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    await doctor.deleteOne();
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error: error.message });
  }
};
