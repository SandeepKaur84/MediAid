import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDoctorLogin() {
  const [role, setRole] = useState("admin"); // toggle between admin/doctor
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        role === "admin"
          ? "http://localhost:5000/api/auth/admin/login"
          : "http://localhost:5000/api/auth/doctor/login";

      const { data } = await axios.post(endpoint, { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") navigate("/admin/dashboard");
      else navigate("/doctor/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.toggleContainer}>
          <button
            onClick={() => setRole("admin")}
            style={{
              ...styles.toggleButton,
              ...(role === "admin" ? styles.activeButton : {}),
            }}
          >
            Admin
          </button>
          <button
            onClick={() => setRole("doctor")}
            style={{
              ...styles.toggleButton,
              ...(role === "doctor" ? styles.activeButton : {}),
            }}
          >
            Doctor
          </button>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.heading}>
            {role === "admin" ? "Admin Login" : "Doctor Login"}
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    fontFamily: "Poppins, sans-serif",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    width: "360px",
    textAlign: "center",
  },
  toggleContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "10px",
  },
  toggleButton: {
    flex: 1,
    padding: "10px 15px",
    border: "1px solid #2a5298",
    borderRadius: "8px",
    background: "transparent",
    color: "#2a5298",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.3s",
  },
  activeButton: {
    background: "#2a5298",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  heading: {
    marginBottom: "10px",
    color: "#2a5298",
    fontSize: "1.5rem",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "1rem",
    transition: "0.2s",
  },
  submitButton: {
    padding: "12px",
    background: "#2a5298",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default AdminDoctorLogin;
