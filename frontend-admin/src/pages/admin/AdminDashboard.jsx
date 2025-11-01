import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Users,
  CalendarDays,
  Stethoscope,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0 });
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  // 🧩 Fetch admin data & stats
  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (role !== "admin" || !token) {
      navigate("/admin/login");
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        // ✅ Get admin profile
        const profileRes = await axios.get("http://localhost:5000/api/admin/profile", { headers });
        setAdmin(profileRes.data);

        // ✅ Get dashboard stats
        const statsRes = await axios.get("http://localhost:5000/api/admin/stats", { headers });
        setStats(statsRes.data);

        // ✅ Get doctors and patients
        const [doctorsRes, patientsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/doctors", { headers }),
          axios.get("http://localhost:5000/api/admin/patients", { headers }),
        ]);

        setDoctors(doctorsRes.data);
        setPatients(patientsRes.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8 text-center">🩺 MediAid Admin</h1>
        <nav className="space-y-3">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 w-full p-2 rounded-md transition ${
              activeTab === "dashboard" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            onClick={() => setActiveTab("doctors")}
            className={`flex items-center gap-3 w-full p-2 rounded-md transition ${
              activeTab === "doctors" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            <Stethoscope size={18} /> Manage Doctors
          </button>

          <button
            onClick={() => setActiveTab("patients")}
            className={`flex items-center gap-3 w-full p-2 rounded-md transition ${
              activeTab === "patients" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            <Users size={18} /> Manage Patients
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`flex items-center gap-3 w-full p-2 rounded-md transition ${
              activeTab === "appointments" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            <CalendarDays size={18} /> Appointments
          </button>
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 mt-6 w-full py-2 rounded"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome, {admin?.name || "Admin"}
          </h2>
          <span className="text-gray-600">Role: Admin</span>
        </div>

        {/* Conditional Rendering */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-center border-t-4 border-blue-600">
              <h3 className="text-xl font-semibold">Doctors</h3>
              <p className="text-4xl font-bold text-blue-700">{stats.doctors}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center border-t-4 border-green-600">
              <h3 className="text-xl font-semibold">Patients</h3>
              <p className="text-4xl font-bold text-green-600">{stats.patients}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center border-t-4 border-purple-600">
              <h3 className="text-xl font-semibold">Appointments</h3>
              <p className="text-4xl font-bold text-purple-600">{stats.appointments}</p>
            </div>
          </div>
        )}

        {/* Manage Doctors */}
        {activeTab === "doctors" && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">All Doctors</h3>
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="min-w-full border-collapse">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Specialization</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc) => (
                    <tr key={doc._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{doc.name}</td>
                      <td className="p-3">{doc.specialization}</td>
                      <td className="p-3">{doc.email}</td>
                      <td className="p-3 text-center space-x-2">
                        <button className="px-3 py-1 bg-green-500 text-white rounded">Approve</button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Manage Patients */}
        {activeTab === "patients" && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">All Patients</h3>
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="min-w-full border-collapse">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p) => (
                    <tr key={p._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">{p.email}</td>
                      <td className="p-3">{p.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Appointments */}
        {activeTab === "appointments" && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">Appointments</h3>
            <p className="text-gray-600">Coming soon – real-time appointment tracking panel.</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
