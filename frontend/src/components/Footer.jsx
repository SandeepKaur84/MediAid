// src/components/Footer.jsx
import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* ----- Column 1: Brand Info ----- */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={assets.logo} alt="logo" className="w-10 h-10" />
            <h2 className="text-xl font-bold text-white">MediAid</h2>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            MediAid is your trusted platform for finding expert doctors and
            booking online consultations. We ensure reliable healthcare,
            anytime, anywhere.
          </p>
        </div>

        {/* ----- Column 2: Quick Links ----- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/doctors"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Doctors
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* ----- Column 3: Get in Touch ----- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              📍 GNA University, Phagwara, Punjab, India
            </li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ support@mediaid.com</li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 text-lg"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400 text-lg"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 text-lg"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 text-lg"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* ----- Bottom Bar ----- */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MediAid. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
