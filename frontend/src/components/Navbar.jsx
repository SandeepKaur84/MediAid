import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChevronDown, Stethoscope } from "lucide-react"; // Added Stethoscope icon

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🩺 Logo + Name */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold text-[#2E3AA1] hover:text-[#1F2C90] transition-all"
        >
          <Stethoscope className="text-[#2E3AA1]" size={28} />
          <span>MediAid</span>
        </Link>

        {/* 🔗 Navigation Links */}
        <div className="flex space-x-6 items-center text-gray-700 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-[#2E3AA1] transition ${
                isActive ? "text-[#2E3AA1]" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `hover:text-[#2E3AA1] transition ${
                isActive ? "text-[#2E3AA1]" : ""
              }`
            }
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-[#2E3AA1] transition ${
                isActive ? "text-[#2E3AA1]" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-[#2E3AA1] transition ${
                isActive ? "text-[#2E3AA1]" : ""
              }`
            }
          >
            Contact
          </NavLink>

          {/* 👤 Auth Section */}
          {isLoggedIn ? (
            <div className="relative">
              {/* Dropdown Toggle */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center bg-[#2E3AA1] text-white px-4 py-2 rounded-md hover:bg-[#24328C] transition-all"
              >
                My Account
                <ChevronDown size={18} className="ml-2" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-fadeIn">
                  <Link
                    to="/my-profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/my-appointments"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Appointments
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-[#2E3AA1] text-white px-4 py-2 rounded-md hover:bg-[#1F2C90] transition"
              >
                Patient Login
              </Link>
              <a
                href="http://localhost:5174/"
                target="_blank"
                rel="noreferrer"
                className="border border-[#2E3AA1] text-[#2E3AA1] px-4 py-2 rounded-md hover:bg-[#2E3AA1] hover:text-white transition"
              >
                Admin Panel
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
