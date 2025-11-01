import React, { useState, useContext } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ useContext import

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Access login from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post("/users/login", {
          email: formData.email,
          password: formData.password,
        });

        // ✅ Save token via context — no manual reload needed
        login(res.data.token);

        alert("Login successful!");
        navigate("/");
      } else {
        const res = await axios.post("/users/register", formData);
        alert("Account created successfully!");
        setIsLogin(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Patient Login" : "Create Patient Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              />
              <select
                name="gender"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full p-3 border rounded-md"
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#2E3AA1] text-white p-3 rounded-md hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#2E3AA1] hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
