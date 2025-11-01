import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDoctorLogin from "./pages/AdminDoctorLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" />} />
      <Route path="/admin/login" element={<AdminDoctorLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
