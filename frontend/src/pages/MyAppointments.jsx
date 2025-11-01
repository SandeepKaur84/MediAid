import React, { useEffect, useState } from "react";
import axios from "axios";
import { doctors } from "../assets/assets";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/appointments/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data.appointments || res.data || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/appointments/cancel/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    }
  };

  const getDoctorDetails = (doctorId) => doctors.find((d) => d._id === doctorId);

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">Loading appointments...</p>
      </div>
    );

  if (appointments.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg font-medium">
          You haven’t booked any appointments yet.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        My Appointments
      </h1>

      {/* ✅ Grid for responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {appointments.map((apt) => {
          const doctor = getDoctorDetails(apt.doctorId);
          return (
            <div
              key={apt._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center gap-4 p-4"
            >
              {/* Left - Doctor Image */}
              {doctor && (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                />
              )}

              {/* Right - Details */}
              <div className="flex flex-col justify-between w-full">
                {doctor && (
                  <>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {doctor.name}
                    </h2>
                    <p className="text-blue-600 text-sm">{doctor.speciality}</p>
                  </>
                )}

                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-semibold">Date:</span> {apt.date}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Time:</span> {apt.time}
                </p>
                {apt.symptoms && (
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Symptoms:</span>{" "}
                    {apt.symptoms}
                  </p>
                )}

                <button
                  onClick={() => handleCancel(apt._id)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
