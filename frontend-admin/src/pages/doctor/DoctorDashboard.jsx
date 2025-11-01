import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "doctor") return navigate("/admin/login");

    const fetchDoctorData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/doctors/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDoctor(data.doctor);
        setAppointments(data.appointments);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDoctorData();
  }, [navigate]);

  // ✅ Approve / Cancel appointment
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/doctors/appointment/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">
          Welcome, {doctor?.name}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-2">Specialization</h3>
        <p className="text-gray-700">{doctor?.speciality}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Appointments</h3>
        {appointments.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Patient</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Symptoms</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="border p-2">{appt.userId?.name}</td>
                  <td className="border p-2">{appt.date}</td>
                  <td className="border p-2">{appt.time}</td>
                  <td className="border p-2">{appt.symptoms}</td>
                  <td className="border p-2 capitalize">{appt.status}</td>
                  <td className="border p-2 space-x-2">
                    {appt.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(appt._id, "approved")}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(appt._id, "cancelled")}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments yet.</p>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;
