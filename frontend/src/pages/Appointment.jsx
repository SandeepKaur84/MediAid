import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/appointments/book",
        { doctorId: docId, date, time, symptoms },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Appointment booked successfully!");
      navigate("/my-appointments");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-blue-700 text-center">
          Book Appointment
        </h1>

        <label className="block mb-2 font-medium">Date</label>
        <input
          type="date"
          className="w-full border p-2 rounded mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="block mb-2 font-medium">Time</label>
        <input
          type="time"
          className="w-full border p-2 rounded mb-4"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label className="block mb-2 font-medium">Symptoms</label>
        <textarea
          className="w-full border p-2 rounded mb-4"
          rows={3}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        ></textarea>

        <button
          onClick={handleBook}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 w-full rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </div>
  );
};

export default Appointment;
