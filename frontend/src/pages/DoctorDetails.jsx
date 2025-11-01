// src/pages/DoctorDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "../assets/assets";
import axios from "axios";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);

  // find doctor from data
  useEffect(() => {
    const found = doctors.find((doc) => doc._id === id);
    setDoctor(found);
  }, [id]);

  const generateDates = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]); // yyyy-mm-dd format
    }
    return dates;
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = 10; // 10 AM
    const end = 20; // 8 PM
    for (let hour = start; hour < end; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  const handleBook = async () => {
    if (!selectedDate || !selectedTime || !symptoms) {
      alert("Please select date, time, and enter symptoms.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          doctorId: doctor._id, // ✅ backend expects Mongo _id
          date: selectedDate,
          time: selectedTime,
          symptoms,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Appointment created:", res.data.appointment);
      alert("Appointment booked successfully!");
      navigate("/my-appointments");
    } catch (err) {
      console.error("❌ Booking error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor)
    return <p className="text-center py-20 text-gray-500">Loading...</p>;

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-8 md:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3 flex justify-center">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-60 h-60 object-cover rounded-2xl shadow-md"
          />
        </div>

        <div className="md:w-2/3 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
          <p className="text-blue-600 font-semibold">
            {doctor.degree} - {doctor.speciality}
          </p>
          <p className="text-gray-600 text-sm">{doctor.experience}</p>

          <div className="pt-4">
            <h3 className="font-semibold text-gray-800 mb-2">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {doctor.about ||
                `Dr. ${doctor.name.split(" ")[1]} has a strong commitment to delivering
                comprehensive medical care, focusing on preventive medicine, early diagnosis,
                and effective treatment strategies.`}
            </p>
          </div>

          <p className="pt-4 font-semibold text-gray-700">
            Appointment Fee:{" "}
            <span className="text-[#3949AB] font-bold">$60</span>
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Select Date & Time Slot
        </h3>

        <div className="flex flex-wrap gap-3 mb-6">
          {generateDates().map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                selectedDate === date
                  ? "bg-[#3949AB] text-white"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {date}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {generateTimeSlots().map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                selectedTime === time
                  ? "bg-[#3949AB] text-white"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        <label className="block mb-2 font-medium text-gray-700">
          Describe your symptoms
        </label>
        <textarea
          className="w-full border p-3 rounded-lg mb-4"
          rows={3}
          placeholder="e.g. Headache and dizziness"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        ></textarea>

        <button
          onClick={handleBook}
          disabled={loading}
          className="w-full bg-[#3949AB] text-white py-3 rounded-lg font-semibold hover:bg-[#2c3a9c] transition-all"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </section>
  );
};

export default DoctorDetails;
